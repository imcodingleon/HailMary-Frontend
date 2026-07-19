// [application/commands] Intent → Command 매핑. `command[intent.type]` 객체 사용, switch 금지(OCP). (부록 B-7)
// 의존성 방향: Application → Domain + Infrastructure adapter 호출. UI를 import하지 않는다.
import { atom, type Getter, type Setter } from 'jotai';
import type { ChatIntent, ChatIntentType } from '@/features/chat/domain/intent/chatIntent';
import type { Message } from '@/features/chat/domain/model/message';
import type { ChatRoom } from '@/features/chat/domain/model/chatRoom';
import { chatApi, ChatHttpError } from '@/features/chat/infrastructure/chatApi';
import { paymentApi } from '@/features/chat/infrastructure/paymentApi';
import { analytics } from '@/features/chat/infrastructure/analytics';
import {
  activeCharacterIdAtom,
  chatRoomsAtom,
  chatStatusAtom,
} from '@/features/chat/application/atoms/chatAtom';
import { walletAtom } from '@/features/chat/application/atoms/walletAtom';
import { sceneInfoAtom } from '@/features/chat/application/atoms/sceneInfoAtom';
import { suggestionsAtom } from '@/features/chat/application/atoms/suggestionsAtom';
import { CASUAL_TURN_COST, SAJU_TURN_COST } from '@/features/chat/application/cost';

function makeId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function pushMessage(set: Setter, get: Getter, characterId: string, message: Message): void {
  const rooms = get(chatRoomsAtom);
  const room = rooms[characterId];
  if (!room) return;
  set(chatRoomsAtom, {
    ...rooms,
    [characterId]: {
      ...room,
      messages: [...room.messages, message],
      lastMessage: message.content,
      lastAt: Date.now(),
    },
  });
}

/** 스트리밍 갱신 — 특정 메시지에 부분 패치 (델타 누적·속마음 부착 공용). */
function patchMessage(
  set: Setter,
  get: Getter,
  characterId: string,
  messageId: string,
  patch: Partial<Message>,
): void {
  const rooms = get(chatRoomsAtom);
  const room = rooms[characterId];
  if (!room) return;
  const next = room.messages.map((m) => (m.id === messageId ? { ...m, ...patch } : m));
  const target = next.find((m) => m.id === messageId);
  set(chatRoomsAtom, {
    ...rooms,
    [characterId]: {
      ...room,
      messages: next,
      lastMessage: target?.content ?? room.lastMessage,
      lastAt: Date.now(),
    },
  });
}

interface CommandArgs {
  get: Getter;
  set: Setter;
  characterId?: string; // 채팅방 명령에만 필요 (충전은 불필요)
  intent: ChatIntent;
}
type Command = (args: CommandArgs) => void | Promise<void>;

const sendMessage: Command = async ({ get, set, characterId, intent }) => {
  if (intent.type !== 'SEND_MESSAGE') return; // 타입 좁히기 (dispatch는 객체 매핑으로 분기)
  if (!characterId) return;
  const text = intent.text.trim();
  if (!text) return;

  const room = get(chatRoomsAtom)[characterId];
  if (!room) return;

  // HANDOFF(H9): 전방 윤리 게이트 자리(미성년자 보호·과몰입) — 전송 전 검사 지점. 현재 자리만.

  // HANDOFF(H8): 모드별 과금 — 사주 ON=고토큰/사적=저토큰(DL-C02). 균일 단가 과금으로 교체(인터페이스 유지).
  const cost = room.mode === 'saju' ? SAJU_TURN_COST : CASUAL_TURN_COST;
  if (get(walletAtom).balance < cost) return; // 잔량 부족 → 전송 막음(UI는 이미 비활성)

  // 1) 유저 메시지 push
  pushMessage(set, get, characterId, { id: makeId(), role: 'user', type: 'text', content: text });

  // 2) 로딩
  set(chatStatusAtom, 'LOADING_RESPONSE');

  // 3) infrastructure adapter (H1) — 스트리밍 콜백 (CHAT_SSOT.md SSE 계약).
  // HANDOFF(H5): 기억 = 현재 세션·로컬(chatRoomsAtom messages)을 그대로 조립·전달.
  //   Phase 2(영속화)부터 서버 이력이 권위 — 이 조립은 그때 제거.
  const current = get(chatRoomsAtom)[characterId];

  await new Promise<void>((resolve) => {
    let replyId: string | null = null;
    let acc = '';
    // 실 BE usage 이벤트로 받은 권위 잔량(P4-2a). 목업은 항상 null → 기존 로컬 차감 유지.
    let usageBalance: number | null = null;

    const complete = (): void => {
      // 분석(H10) + 토큰 차감 + 상태 복귀 — 성공 종료 시 1회.
      analytics.track(
        current.mode === 'saju'
          ? { name: 'saju_message_sent', characterId }
          : { name: 'casual_message_sent', characterId },
      );
      const wallet = get(walletAtom);
      set(walletAtom, {
        balance: usageBalance ?? Math.max(0, wallet.balance - cost),
        history: [
          ...wallet.history,
          { id: makeId(), type: 'spend', amount: cost, mode: current.mode, at: Date.now() },
        ],
      });
      set(chatStatusAtom, 'IDLE');
      resolve();
    };

    chatApi.streamMessage(
      {
        characterId,
        mode: current.mode,
        history: current.messages, // 모드와 무관하게 그대로(기억·세계관 공유)
        userMessage: text,
        roomId: current.roomId ?? null,
      },
      {
        onDelta(t) {
          acc += t;
          if (!replyId) {
            // 첫 델타 → 캐릭터 말풍선 생성 + STREAMING 전이 (그 전까지 TypingIndicator)
            replyId = makeId();
            pushMessage(set, get, characterId, {
              id: replyId,
              role: 'character',
              type: 'text',
              content: acc,
            });
            set(chatStatusAtom, 'STREAMING');
          } else {
            patchMessage(set, get, characterId, replyId, { content: acc });
          }
        },
        onSajuBlock(block, lead) {
          pushMessage(set, get, characterId, {
            id: makeId(),
            role: 'character',
            type: 'saju',
            content: lead,
            sajuBlock: block,
          });
        },
        onInfo(info) {
          // 상태창 갱신 — 캐릭터별 월드 상태 스냅샷 교체 (INFO tail).
          set(sceneInfoAtom, { ...get(sceneInfoAtom), [characterId]: info });
        },
        onSuggestions(list) {
          // 추천 답변 갱신 — 캐릭터별 유저 답변 후보 교체 (INFO tail).
          set(suggestionsAtom, { ...get(suggestionsAtom), [characterId]: list });
        },
        onUsage(balance) {
          // BE 권위 잔량 — complete()의 로컬 차감 대신 이 값을 사용(중복 차감 방지).
          usageBalance = balance;
        },
        onDone: complete,
        onError(code) {
          set(
            chatStatusAtom,
            code === 'OUT_OF_TOKEN' ? 'OUT_OF_TOKEN' : code === 'UNAUTHORIZED' ? 'UNAUTHORIZED' : 'ERROR',
          );
          resolve();
        },
      },
    );
  });
};

// 사주 모드 토글 — 상태 토글(한 번 켜면 끌 때까지 유지, 매 턴 리셋 금지). (DL-C02)
const toggleSajuMode: Command = ({ get, set, characterId }) => {
  if (!characterId) return;
  const rooms = get(chatRoomsAtom);
  const room = rooms[characterId];
  if (!room) return;
  const nextMode = room.mode === 'saju' ? 'casual' : 'saju';
  set(chatRoomsAtom, { ...rooms, [characterId]: { ...room, mode: nextMode } });
};

// 충전(목업) — paymentApi.charge(H4)로 토큰 지급, walletAtom 잔량·내역 갱신. (스펙 §7.6/§10)
const chargeToken: Command = async ({ get, set, intent }) => {
  if (intent.type !== 'CHARGE_TOKEN') return;
  const { tokenAmount } = await paymentApi.charge(intent.packageId);
  const wallet = get(walletAtom);
  set(walletAtom, {
    balance: wallet.balance + tokenAmount,
    history: [
      ...wallet.history,
      { id: makeId(), type: 'charge', amount: tokenAmount, at: Date.now() },
    ],
  });
  // HANDOFF(H10): 분석 이벤트 자리(no-op) — 재충전 기록.
  analytics.track({ name: 'token_charged', packageId: intent.packageId });
};

// Intent → Command 매핑 (switch 금지)
const command: Record<ChatIntentType, Command> = {
  SEND_MESSAGE: sendMessage,
  TOGGLE_SAJU_MODE: toggleSajuMode,
  CHARGE_TOKEN: chargeToken,
};

/** UI(hook)는 이 dispatch atom으로만 intent를 흘린다. */
export const dispatchChatAtom = atom(
  null,
  async (get, set, payload: { characterId?: string; intent: ChatIntent }) => {
    await command[payload.intent.type]({
      get,
      set,
      characterId: payload.characterId,
      intent: payload.intent,
    });
  },
);

/**
 * 방 진입 시 초기화: 활성 방 지정 + (없으면) 인사 시드 + 안 읽음 리셋.
 *
 * 목업(CHAT_API_BASE 미설정)은 아래 첫 분기 그대로 — 기존 동작과 완전히 동일(동기, 네트워크 0).
 * 실연동은 BE가 이력의 권위원 — roomId 없는(=미하이드레이션) 방이면 매 진입마다
 * ensureRoom(get-or-create) + fetchHistory로 덮어써 chatRoomsAtom 초기 목업 시드를 대체한다.
 */
export const initRoomAtom = atom(null, async (get, set, characterId: string) => {
  set(activeCharacterIdAtom, characterId);
  set(chatStatusAtom, 'IDLE');

  if (!chatApi.isReal) {
    const rooms = get(chatRoomsAtom);
    const existing = rooms[characterId];
    const room: ChatRoom = existing ?? {
      characterId,
      messages: [
        { id: makeId(), role: 'character', type: 'text', content: chatApi.greet(characterId) },
      ],
      mode: 'casual',
      lastMessage: chatApi.greet(characterId),
      unreadCount: 0,
      lastAt: Date.now(),
    };
    // 진입 시 안 읽음 리셋
    set(chatRoomsAtom, { ...rooms, [characterId]: { ...room, unreadCount: 0 } });
    return;
  }

  // ── 실연동 ──
  const rooms = get(chatRoomsAtom);
  const existing = rooms[characterId];
  if (existing?.roomId != null) {
    // 이미 이번 세션에 하이드레이션된 방 — 재진입 시 재조회 없이 안 읽음만 리셋.
    set(chatRoomsAtom, { ...rooms, [characterId]: { ...existing, unreadCount: 0 } });
    return;
  }

  // 하이드레이션 대기 중 전송 가능(canSendAtom은 status==='IDLE'에서만 허용)해지는 경합 방지.
  set(chatStatusAtom, 'LOADING_RESPONSE');
  try {
    const { roomId, greetingMessages } = await chatApi.ensureRoom(characterId);
    let messages = greetingMessages;
    if (roomId != null) {
      const history = await chatApi.fetchHistory(roomId);
      if (history.length > 0) messages = history;
    }
    const latest = get(chatRoomsAtom); // 비동기 대기 중 다른 갱신이 있었을 수 있어 재조회
    const room: ChatRoom = {
      characterId,
      roomId,
      messages,
      mode: latest[characterId]?.mode ?? 'casual',
      lastMessage: messages[messages.length - 1]?.content ?? '',
      unreadCount: 0,
      lastAt: Date.now(),
    };
    set(chatRoomsAtom, { ...latest, [characterId]: room });
    set(chatStatusAtom, 'IDLE');
  } catch (e) {
    // 로그인 필요(401)는 구분된 상태로 — 나머지는 일반 에러(재시도 유도는 후속 단계).
    set(chatStatusAtom, e instanceof ChatHttpError && e.status === 401 ? 'UNAUTHORIZED' : 'ERROR');
  }
});
