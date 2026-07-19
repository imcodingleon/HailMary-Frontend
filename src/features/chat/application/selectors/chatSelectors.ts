// [application/selectors] 파생 상태 — UI 분기(색 포함)는 이 파생값으로만(State Driven UI). (부록 B-2)
// 의존성 방향: Application → Domain. atoms를 읽어 파생. UI를 import하지 않는다.
import { atom } from 'jotai';
import type { Message } from '@/features/chat/domain/model/message';
import type { AccentToken } from '@/features/chat/domain/model/character';
import type { ChatMode } from '@/features/chat/domain/state/chatState';
import { DEFAULT_MODE } from '@/features/chat/domain/state/chatState';
import {
  activeCharacterIdAtom,
  chatRoomFilterAtom,
  chatRoomsAtom,
  chatStatusAtom,
  draftAtom,
} from '@/features/chat/application/atoms/chatAtom';
import { charactersAtom } from '@/features/chat/application/atoms/characterAtom';
import { walletAtom } from '@/features/chat/application/atoms/walletAtom';
import { suggestionsAtom } from '@/features/chat/application/atoms/suggestionsAtom';
import { CASUAL_TURN_COST, SAJU_TURN_COST } from '@/features/chat/application/cost';

/** 현재 열린 방. */
export const activeRoomAtom = atom((get) => {
  const id = get(activeCharacterIdAtom);
  return id ? get(chatRoomsAtom)[id] : undefined;
});

/** 현재 방의 메시지 목록 (모드와 무관하게 유지 = 기억·세계관 공유). */
export const messagesAtom = atom<Message[]>((get) => get(activeRoomAtom)?.messages ?? []);

/** 현재 방의 모드 (채팅방 단위로 지속). */
export const chatModeAtom = atom<ChatMode>((get) => get(activeRoomAtom)?.mode ?? DEFAULT_MODE);

/** 현재 캐릭터의 추천 답변 3개 (입력창 옆 버튼에서 사용). */
export const activeSuggestionsAtom = atom<string[]>((get) => {
  const id = get(activeCharacterIdAtom);
  return id ? (get(suggestionsAtom)[id] ?? []) : [];
});

/** 사주 모드 여부 — UI 색 분기는 오직 이 selector로. */
export const isSajuModeAtom = atom((get) => get(chatModeAtom) === 'saju');

/** 현재 모드의 턴당 토큰 비용 (사주=고토큰, 사적=저토큰). DL-C00 균일·DL-C02. */
export const turnCostAtom = atom((get) =>
  get(isSajuModeAtom) ? SAJU_TURN_COST : CASUAL_TURN_COST,
);

/** 토큰 잔량. */
export const tokenBalanceAtom = atom((get) => get(walletAtom).balance);

/** 현재 모드 턴 비용을 못 내면 소진 취급 → 입력 비활성·충전 안내 트리거. */
export const isOutOfTokenAtom = atom((get) => get(tokenBalanceAtom) < get(turnCostAtom));

/** 전송 가능: 초안 비어있지 않고, IDLE이고, 현재 모드 비용을 낼 수 있을 때. */
export const canSendAtom = atom(
  (get) =>
    get(draftAtom).trim() !== '' &&
    get(chatStatusAtom) === 'IDLE' &&
    !get(isOutOfTokenAtom),
);

// ── 대화방 리스트(§7.3) ──
/** 리스트 행 뷰모델 (방 + 캐릭터 정보 조인). */
export interface ChatRoomListItem {
  characterId: string;
  name: string;
  accent: AccentToken;
  lastMessage: string;
  lastAt: number;
  unreadCount: number;
}

/** 진행 중 대화방 리스트 — 최근순 정렬. 캐릭터 이름·액센트 조인. */
export const chatRoomListAtom = atom<ChatRoomListItem[]>((get) => {
  const chars = get(charactersAtom);
  return Object.values(get(chatRoomsAtom))
    .map((r) => {
      const c = chars.find((ch) => ch.id === r.characterId);
      return {
        characterId: r.characterId,
        name: c?.name ?? r.characterId,
        accent: c?.accent ?? 'simyagal',
        lastMessage: r.lastMessage,
        lastAt: r.lastAt,
        unreadCount: r.unreadCount,
      };
    })
    .sort((a, b) => b.lastAt - a.lastAt);
});

/** 안 읽음 총합 (하단 네비 배지·필터 칩 카운트용). */
export const totalUnreadAtom = atom((get) =>
  Object.values(get(chatRoomsAtom)).reduce((sum, r) => sum + r.unreadCount, 0),
);

/** 필터(전체/안 읽음) 적용된 리스트 — 칩 토글이 이 파생을 바꾼다(State Driven UI). */
export const filteredChatRoomListAtom = atom<ChatRoomListItem[]>((get) => {
  const list = get(chatRoomListAtom);
  return get(chatRoomFilterAtom) === 'unread' ? list.filter((r) => r.unreadCount > 0) : list;
});
