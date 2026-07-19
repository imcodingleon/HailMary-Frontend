// HANDOFF(H1): 목업 응답 → Claude API(캐릭터당 고정 모델, §8 페르소나 프롬프트). 시그니처/인터페이스 유지.
// HANDOFF(H2): 사주 근거(sajuBlock) 목업 → 만세력/사주 엔진 + LLM. 시그니처 유지. 수치는 임의 표시값.
// [infrastructure] 어댑터 = 시그니처(유지 대상). 페르소나/응답 데이터는 persona 모듈(교체 대상)에서 참조.
// ❗캐릭터 언어 분리(연우↔도윤)·한자 음독 병기 규칙은 persona 데이터에 명문화.
//
// ★ Phase 1 실연동 (CHAT_SSOT.md SSE 계약): NEXT_PUBLIC_CHAT_API_URL 설정 시
//   streamMessage()가 실 백엔드(POST /api/chat/messages, SSE)로 스트리밍.
//   미설정 시 목업이 같은 콜백 시그니처로 canned 응답을 chunk 단위 재생 — 데모 항상 동작.
import type { Message, SajuBlock } from '@/features/chat/domain/model/message';
import type { SceneInfo } from '@/features/chat/domain/model/sceneInfo';
import type { ChatMode } from '@/features/chat/domain/state/chatState';
import { extractInfo, extractSuggestions } from '@/features/chat/domain/service/parseScript';
import { personas } from './persona';
import { streamSse } from './sse';

/** 실연동과 동일하게 고정하는 어댑터 입력 시그니처. */
export interface SendMessageContext {
  characterId: string;
  mode: ChatMode;
  history: Message[];
  userMessage: string;
}

/** 스트리밍 콜백 — 목업·실연동 동일 (CHAT_SSOT.md "FE 어댑터 시그니처"). */
export interface ChatStreamCallbacks {
  onDelta(text: string): void;
  /** saju 구조화 블록(현재 목업 전용 — 실 BE 구조화는 Phase 3). lead = 폴백/접근성 텍스트. */
  onSajuBlock(block: SajuBlock, lead: string): void;
  /** 상태창 INFO — 캐주얼 응답 tail(<<<INFO>>>)에서 파싱된 월드 상태 (done 직전 최대 1회). */
  onInfo?(info: SceneInfo): void;
  /** 추천 답변(유저 1인칭 대사) — 같은 tail에서 파싱 (done 직전 최대 1회). */
  onSuggestions?(list: string[]): void;
  onDone(): void;
  onError(code: 'OUT_OF_TOKEN' | 'UPSTREAM_ERROR' | 'NETWORK'): void;
}

const CHAT_API_BASE = process.env.NEXT_PUBLIC_CHAT_API_URL; // 예: http://127.0.0.1:8010

// 목업 비동기 지연 — LOADING_RESPONSE가 보이도록. [TBD] 연출용 기본값.
const MOCK_LATENCY_MS = 700;
const MOCK_CHUNK_MS = 40;

const FALLBACK_GREETING = '…';
const FALLBACK_REPLY = '음… 조금 더 말해줄래?';
const FALLBACK_SAJU: SajuBlock = { kind: 'kkebi', summary: '음… 사주의 결이 흐릿해. 다시 물어봐줄래?' };
const MOCK_INFO: SceneInfo = {
  place: '촛불 밝힌 상담실',
  timeHint: '늦은 밤',
  relation: '이야기를 나누는 사이',
  situation: '대화가 이어지는 중',
};
const MOCK_SUGGESTIONS = ['조금 더 들어줄래?', '그건 왜 그런 건데?', '음… 잘 모르겠어.'];

/** 사주 블록의 리드 텍스트(폴백/접근성용). */
function leadOf(block: SajuBlock): string {
  if (block.kind === 'yeonu') return block.scene;
  if (block.kind === 'doyoon') return block.comment;
  return block.summary;
}

function mockReply(ctx: SendMessageContext): string {
  const persona = personas[ctx.characterId];
  const pool = persona?.casualReplies ?? [FALLBACK_REPLY];
  const characterTurns = ctx.history.filter((m) => m.role === 'character').length;
  return pool[characterTurns % pool.length];
}

/** 목업: canned 응답을 chunk로 잘라 스트리밍처럼 재생 (시그니처 동일성 보증). */
function streamMock(ctx: SendMessageContext, cb: ChatStreamCallbacks): { abort(): void } {
  let cancelled = false;
  const timers: ReturnType<typeof setTimeout>[] = [];

  timers.push(
    setTimeout(() => {
      if (cancelled) return;
      if (ctx.mode === 'saju') {
        const block = personas[ctx.characterId]?.sajuBlock ?? FALLBACK_SAJU;
        cb.onSajuBlock(block, leadOf(block));
        cb.onDone();
        return;
      }
      const text = mockReply(ctx);
      const chunks = text.match(/.{1,3}/g) ?? [text];
      chunks.forEach((chunk, i) => {
        timers.push(
          setTimeout(() => {
            if (cancelled) return;
            cb.onDelta(chunk);
            if (i === chunks.length - 1) {
              cb.onInfo?.(MOCK_INFO); // 백엔드 꺼져도 상태창 갱신 확인용 canned
              cb.onSuggestions?.(MOCK_SUGGESTIONS);
              cb.onDone();
            }
          }, i * MOCK_CHUNK_MS),
        );
      });
    }, MOCK_LATENCY_MS),
  );

  return {
    abort() {
      cancelled = true;
      timers.forEach(clearTimeout);
    },
  };
}

/** 실연동: BE SSE 계약(start→delta*→done|error) 소비. */
function streamReal(
  base: string,
  ctx: SendMessageContext,
  cb: ChatStreamCallbacks,
): { abort(): void } {
  const payload = {
    character_id: ctx.characterId,
    mode: ctx.mode,
    content: ctx.userMessage,
    history: ctx.history.map((m) => ({ role: m.role, content: m.content })),
  };
  let finished = false;
  let raw = ''; // 델타 누적 원문 — done 시 INFO tail 파싱용
  const finishOnce = (fn: () => void) => {
    if (finished) return;
    finished = true;
    fn();
  };
  const emitTail = () => {
    const info = extractInfo(raw);
    if (info) cb.onInfo?.(info);
    const suggestions = extractSuggestions(raw);
    if (suggestions.length) cb.onSuggestions?.(suggestions);
  };
  return streamSse(`${base}/api/chat/messages`, payload, {
    onFrame(frame) {
      if (frame.event === 'delta' && typeof frame.data.text === 'string') {
        raw += frame.data.text;
        cb.onDelta(frame.data.text); // tail 포함 흘려보내고, 렌더/파서(parseScript)가 분리
      } else if (frame.event === 'saju_block' && frame.data.block) {
        // 사주 모드 구조화 카드(HM-BE-95, tool-use). 목업과 동일 콜백 → SajuMessage 렌더.
        const block = frame.data.block as SajuBlock;
        cb.onSajuBlock(block, leadOf(block));
      } else if (frame.event === 'done') {
        finishOnce(() => {
          emitTail();
          cb.onDone();
        });
      } else if (frame.event === 'error') {
        finishOnce(() => cb.onError('UPSTREAM_ERROR'));
      }
      // start/usage(P4)은 현 단계 미소비. saju_block은 프로필 보유 계정(방 경로, P5)에서만 도달.
    },
    onTransportError(code) {
      finishOnce(() => cb.onError(code === 'OUT_OF_TOKEN' ? 'OUT_OF_TOKEN' : 'NETWORK'));
    },
    onClose() {
      // done 이벤트 없이 스트림이 닫히면 방어적으로 완료 처리.
      finishOnce(() => {
        emitTail();
        cb.onDone();
      });
    },
  });
}

export const chatApi = {
  /** 입장 시 첫 인사(목업, persona.greeting). Phase 2에서 방 생성 시 서버 시드로 대체. */
  greet(characterId: string): string {
    return personas[characterId]?.greeting ?? FALLBACK_GREETING;
  },

  /** 메시지 전송 → 스트리밍 콜백. NEXT_PUBLIC_CHAT_API_URL 설정 시 실 BE, 미설정 시 목업. */
  streamMessage(ctx: SendMessageContext, cb: ChatStreamCallbacks): { abort(): void } {
    return CHAT_API_BASE ? streamReal(CHAT_API_BASE, ctx, cb) : streamMock(ctx, cb);
  },

  /** @deprecated 비스트리밍 경로 — streamMessage로 대체됨. 기존 호출 호환용으로만 유지. */
  async sendMessage(ctx: SendMessageContext): Promise<Message> {
    return new Promise((resolve, reject) => {
      let acc = '';
      this.streamMessage(ctx, {
        onDelta: (t) => {
          acc += t;
        },
        onSajuBlock: (block, lead) => {
          resolve({ id: '', role: 'character', type: 'saju', content: lead, sajuBlock: block });
        },
        onDone: () => {
          if (acc) resolve({ id: '', role: 'character', type: 'text', content: acc });
        },
        onError: () => reject(new Error('chat stream failed')),
      });
    });
  },
};
