// [application/selectors] 파생 상태 — UI 분기는 이 파생값으로만(State Driven UI). (부록 B-2)
// 의존성 방향: Application → Domain. atoms를 읽어 파생. UI를 import하지 않는다.
import { atom } from 'jotai';
import {
  charactersAtom,
  unlockSlotsAtom,
} from '@/features/chat/application/atoms/characterAtom';

/** 해금된 기본 캐릭터만 (친구창 카드). */
export const baseCharactersAtom = atom((get) =>
  get(charactersAtom).filter((c) => c.unlocked),
);

/** 미해금 슬롯 (회색 카드). */
export const lockedSlotsAtom = atom((get) => get(unlockSlotsAtom));
