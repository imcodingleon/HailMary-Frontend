// [infrastructure] SSE 스트리밍 리더 — fetch POST + ReadableStream 수제 파서.
// EventSource 미사용 이유: POST 불가 + Authorization 헤더 불가 (CHAT_SSOT.md SSE 계약).
// ⚠️ lib/api 계열 공통 wrapper를 쓰지 않는다 — 90s AbortController가 장시간 스트림과 충돌
//    (병합(P5) 시에도 이 파일이 chat 전용 전송층으로 유지, 예외 근거는 CHAT_SSOT.md).

export interface SseFrame {
  event: string;
  data: Record<string, unknown>;
}

export interface SseCallbacks {
  onFrame(frame: SseFrame): void;
  onTransportError(code: 'NETWORK' | 'OUT_OF_TOKEN' | 'HTTP_ERROR', status?: number): void;
  onClose(): void;
}

function parseFrame(raw: string): SseFrame | null {
  let event = 'message';
  let data = '';
  for (const line of raw.split('\n')) {
    if (line.startsWith('event:')) event = line.slice(6).trim();
    else if (line.startsWith('data:')) data += line.slice(5).trim();
  }
  if (!data) return null;
  try {
    return { event, data: JSON.parse(data) as Record<string, unknown> };
  } catch {
    return null;
  }
}

/** POST JSON → text/event-stream 프레임 콜백. abort()로 중단 가능. */
export function streamSse(
  url: string,
  payload: unknown,
  cb: SseCallbacks,
  headers?: Record<string, string>,
): { abort(): void } {
  const controller = new AbortController();
  let aborted = false;

  void (async () => {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        cb.onTransportError(res.status === 402 ? 'OUT_OF_TOKEN' : 'HTTP_ERROR', res.status);
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        let idx = buf.indexOf('\n\n');
        while (idx !== -1) {
          const frame = parseFrame(buf.slice(0, idx));
          buf = buf.slice(idx + 2);
          if (frame) cb.onFrame(frame);
          idx = buf.indexOf('\n\n');
        }
      }
      cb.onClose();
    } catch {
      if (!aborted) cb.onTransportError('NETWORK');
    }
  })();

  return {
    abort() {
      aborted = true;
      controller.abort();
    },
  };
}
