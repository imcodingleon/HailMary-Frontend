// [domain/model] ChatRoom — 순수 타입, 외부 의존 0. (부록 B-1, 스펙 §12)
import type { Message } from './message';
import type { ChatMode } from '../state/chatState';

export interface ChatRoom {
  characterId: string;
  messages: Message[];
  mode: ChatMode; // 'casual' | 'saju'
  lastMessage: string;
  unreadCount: number; // 선발신/안 읽음 (스펙 §11) — 진입 시 0으로 리셋
  lastAt: number; // 마지막 활동 시각(epoch ms) — 리스트 정렬·시간 표기
  // 실 BE 방 id (P4-2a). 목업 모드/미하이드레이션 방은 null|undefined — chatRoomMock 시드도 이 상태.
  roomId?: number | null;
}
