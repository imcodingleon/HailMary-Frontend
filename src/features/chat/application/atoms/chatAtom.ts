// [application/atoms] 채팅방 전역 상태. (스펙 §3.5)
// 의존성 방향: Application → Domain. UI를 import하지 않는다.
import { atom } from 'jotai';
import type { ChatRoom } from '@/features/chat/domain/model/chatRoom';
import type { ChatStatus } from '@/features/chat/domain/state/chatState';
import { chatRoomMock } from '@/features/chat/infrastructure/chatRoomMock';

/** 캐릭터별 채팅방(메시지·mode). 키 = characterId. 초기값 = 진행 중 대화 시드(H7 선발신 포함). */
export const chatRoomsAtom = atom<Record<string, ChatRoom>>(chatRoomMock);

/** 현재 열린 채팅방의 characterId. */
export const activeCharacterIdAtom = atom<string | null>(null);

/** 현재 채팅방의 상태머신 status (mode는 방에 보관). */
export const chatStatusAtom = atom<ChatStatus>('IDLE');

/** 입력창 초안(전송 전). UI는 이 atom을 바인딩만 한다. */
export const draftAtom = atom('');

/** 대화방 리스트 필터 (전체/안 읽음). */
export type ChatRoomFilter = 'all' | 'unread';
export const chatRoomFilterAtom = atom<ChatRoomFilter>('all');
