// [application/atoms] 캐릭터 목록·미해금 슬롯 전역 상태. 초기값 = mock 시드. (스펙 §3.5)
// 의존성 방향: Application → Domain(모델), → Infrastructure(시드 mock). UI를 import하지 않는다.
// 핸드오프 시 초기값은 adapter 호출로 교체(시그니처 동일). (부록 B-6)
import { atom } from 'jotai';
import type { Character, UnlockSlot } from '@/features/chat/domain/model/character';
import { characterMock } from '@/features/chat/infrastructure/characterMock';
import { unlockSlotMock } from '@/features/chat/infrastructure/unlockSlotMock';

export const charactersAtom = atom<Character[]>(characterMock);
export const unlockSlotsAtom = atom<UnlockSlot[]>(unlockSlotMock);
