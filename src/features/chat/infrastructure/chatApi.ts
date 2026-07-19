// HANDOFF(H1): 목업 응답 → Claude API(캐릭터당 고정 모델, §8 페르소나 프롬프트). 시그니처/인터페이스 유지.
// HANDOFF(H2): 사주 근거(sajuBlock) 목업 → 만세력/사주 엔진 + LLM. 시그니처 유지. 수치는 임의 표시값.
// [infrastructure] 어댑터 = 시그니처(유지 대상). 페르소나/응답 데이터는 persona 모듈(교체 대상)에서 참조.
// ❗캐릭터 언어 분리(연우↔도윤)·한자 음독 병기 규칙은 persona 데이터에 명문화.
//
// ★ Phase 1 실연동 (CHAT_SSOT.md SSE 계약): NEXT_PUBLIC_CHAT_API_URL 설정 시
//   streamMessage()가 실 백엔드(POST /api/chat/rooms/{roomId}/messages, SSE)로 스트리밍.
//   미설정 시 목업이 같은 콜백 시그니처로 canned 응답을 chunk 단위 재생 — 데모 항상 동작.
// ★ P4-2a: 실연동 시 방 get-or-create(ensureRoom) + 히스토리(fetchHistory)도 이 어댑터가 담당.
//   모든 실-BE 호출은 authStore(account JWT)를 Bearer로 첨부한다. 목업 경로는 네트워크 호출 0.
import type { Message, SajuBlock } from '@/features/chat/domain/model/message';
import type { SceneInfo } from '@/features/chat/domain/model/sceneInfo';
import type { ChatMode } from '@/features/chat/domain/state/chatState';
import { extractInfo, extractSuggestions } from '@/features/chat/domain/service/parseScript';
import { authStore } from '@/lib/authStore';
import { personas } from './persona';
import { streamSse } from './sse';

/** 실연동과 동일하게 고정하는 어댑터 입력 시그니처. */
export interface SendMessageContext {
  characterId: string;
  mode: ChatMode;
  history: Message[];
  userMessage: string;
  /** 실 BE 방 id — /rooms/{roomId}/messages URL에 사용. 목업 모드는 무시. */
  roomId: number | null;
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
  /** 실 BE usage 이벤트(cost>0 턴만, done 직전) — 코인 잔량 갱신용. 목업은 미호출. */
  onUsage?(balance: number): void;
  onDone(): void;
  onError(code: 'OUT_OF_TOKEN' | 'UPSTREAM_ERROR' | 'NETWORK' | 'UNAUTHORIZED'): void;
}

const CHAT_API_BASE = process.env.NEXT_PUBLIC_CHAT_API_URL; // 예: http://127.0.0.1:8010

/** 실 BE HTTP 호출 실패 — status로 401(로그인 필요) 등을 구분하기 위한 typed error. */
export class ChatHttpError extends Error {
  constructor(public readonly status: number) {
    super(`chat api http ${status}`);
    this.name = 'ChatHttpError';
  }
}

function authHeader(): Record<string, string> {
  const token = authStore.get();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/** JSON 요청 — account JWT 첨부, non-2xx는 ChatHttpError로 throw. */
async function chatFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...authHeader(), ...(init?.headers ?? {}) },
  });
  if (!res.ok) throw new ChatHttpError(res.status);
  return (await res.json()) as T;
}

// ── BE 응답 DTO (app/domains/chat/application/response/room_responses.py 1:1) ──
interface BeChatMessage {
  id: number;
  role: 'user' | 'character';
  type: 'text' | 'saju';
  mode: 'casual' | 'saju';
  content: string;
  saju_block?: Record<string, unknown> | null;
  created_at?: string | null;
}
interface BeOpenRoomResponse {
  room_id: number;
  character_id: string;
  created: boolean;
  messages: BeChatMessage[];
}
interface BeMessagesPageResponse {
  messages: BeChatMessage[];
}

function mapBeMessage(m: BeChatMessage): Message {
  return {
    id: String(m.id),
    role: m.role,
    type: m.type,
    content: m.content,
    ...(m.saju_block ? { sajuBlock: m.saju_block as unknown as SajuBlock } : {}),
  };
}

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

/** 실연동: BE SSE 계약(start→delta*→saju_block?→usage?→done|error) 소비. 방 기준 전송 — history 없음(서버가 권위). */
function streamReal(
  base: string,
  ctx: SendMessageContext,
  cb: ChatStreamCallbacks,
): { abort(): void } {
  if (ctx.roomId == null) {
    // 방 미확보(ensureRoom 실패/미로그인) — 네트워크 호출 없이 즉시 인증 에러로 표면화.
    queueMicrotask(() => cb.onError('UNAUTHORIZED'));
    return { abort() {} };
  }
  const payload = { mode: ctx.mode, content: ctx.userMessage };
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
  return streamSse(
    `${base}/api/chat/rooms/${ctx.roomId}/messages`,
    payload,
    {
      onFrame(frame) {
        if (frame.event === 'delta' && typeof frame.data.text === 'string') {
          raw += frame.data.text;
          cb.onDelta(frame.data.text); // tail 포함 흘려보내고, 렌더/파서(parseScript)가 분리
        } else if (frame.event === 'saju_block' && frame.data.block) {
          // 사주 모드 구조화 카드(HM-BE-95, tool-use). 목업과 동일 콜백 → SajuMessage 렌더.
          const block = frame.data.block as SajuBlock;
          cb.onSajuBlock(block, leadOf(block));
        } else if (frame.event === 'usage' && typeof frame.data.balance === 'number') {
          // 코인 차감 완료 — BE 권위 잔량으로 지갑 갱신 (cost>0 턴만 emit, done 직전).
          cb.onUsage?.(frame.data.balance);
        } else if (frame.event === 'done') {
          finishOnce(() => {
            emitTail();
            cb.onDone();
          });
        } else if (frame.event === 'error') {
          finishOnce(() => cb.onError('UPSTREAM_ERROR'));
        }
        // start는 현 단계 미소비(room_id/user_message_id — 이미 알고 있음).
      },
      onTransportError(code) {
        finishOnce(() =>
          cb.onError(
            code === 'OUT_OF_TOKEN' ? 'OUT_OF_TOKEN' : code === 'UNAUTHORIZED' ? 'UNAUTHORIZED' : 'NETWORK',
          ),
        );
      },
      onClose() {
        // done 이벤트 없이 스트림이 닫히면 방어적으로 완료 처리.
        finishOnce(() => {
          emitTail();
          cb.onDone();
        });
      },
    },
    authHeader(),
  );
}

function greetOf(characterId: string): string {
  return personas[characterId]?.greeting ?? FALLBACK_GREETING;
}

function makeMockMessageId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/** 방 get-or-create 실연동: POST /api/chat/rooms {character_id} → room_id + 시드 메시지. */
async function ensureRoomReal(
  base: string,
  characterId: string,
): Promise<{ roomId: number; greetingMessages: Message[] }> {
  const data = await chatFetch<BeOpenRoomResponse>(`${base}/api/chat/rooms`, {
    method: 'POST',
    body: JSON.stringify({ character_id: characterId }),
  });
  return { roomId: data.room_id, greetingMessages: data.messages.map(mapBeMessage) };
}

/** 히스토리 실연동: GET /api/chat/rooms/{roomId}/messages (오름차순). */
async function fetchHistoryReal(base: string, roomId: number): Promise<Message[]> {
  const data = await chatFetch<BeMessagesPageResponse>(`${base}/api/chat/rooms/${roomId}/messages`);
  return data.messages.map(mapBeMessage);
}

export const chatApi = {
  /** 실 BE 배선 여부 — application 레이어의 방/히스토리 분기 판단용(P4-2a). */
  isReal: Boolean(CHAT_API_BASE),

  /** 입장 시 첫 인사(목업, persona.greeting). 실연동은 ensureRoom의 서버 시드가 대체. */
  greet(characterId: string): string {
    return greetOf(characterId);
  },

  /**
   * 방 get-or-create. 목업(CHAT_API_BASE 미설정): 네트워크 호출 없이 로컬 인사 시드 반환(roomId=null).
   * 실연동: POST /api/chat/rooms + Bearer JWT → 실 room_id + BE 시드 메시지.
   */
  async ensureRoom(characterId: string): Promise<{ roomId: number | null; greetingMessages: Message[] }> {
    if (!CHAT_API_BASE) {
      return {
        roomId: null,
        greetingMessages: [
          { id: makeMockMessageId(), role: 'character', type: 'text', content: greetOf(characterId) },
        ],
      };
    }
    return ensureRoomReal(CHAT_API_BASE, characterId);
  },

  /** 히스토리 하이드레이션. 목업 모드는 항상 빈 배열(호출 자체가 무의미 — 로컬 시드만 사용). */
  async fetchHistory(roomId: number): Promise<Message[]> {
    if (!CHAT_API_BASE) return [];
    return fetchHistoryReal(CHAT_API_BASE, roomId);
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
