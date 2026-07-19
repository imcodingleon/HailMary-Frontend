'use client';

// [application/hooks] useChatRooms — 대화방 리스트 Application Service. UI는 이것만 본다(Dumb). (부록 B-2·B-3)
// 의존성 방향: Application → selectors/atoms. 필터(전체/안읽음)는 selector 파생, 라우팅(방 열기)은 UI에서.
import { useAtom, useAtomValue } from 'jotai';
import { chatRoomFilterAtom } from '@/features/chat/application/atoms/chatAtom';
import {
  filteredChatRoomListAtom,
  totalUnreadAtom,
} from '@/features/chat/application/selectors/chatSelectors';

export function useChatRooms() {
  const rooms = useAtomValue(filteredChatRoomListAtom);
  const totalUnread = useAtomValue(totalUnreadAtom);
  const [filter, setFilter] = useAtom(chatRoomFilterAtom);
  return { rooms, totalUnread, filter, setFilter };
}
