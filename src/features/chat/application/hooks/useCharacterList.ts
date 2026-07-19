'use client';

// [application/hooks] useCharacterList — 친구창 Application Service.
// UI가 쓸 목록·슬롯 + 슬롯 탭 안내(토스트) 핸들러를 제공. UI는 이 hook과 파생 상태로만 동작(Dumb). (부록 B-2·B-3)
// 의존성 방향: Application → Domain/selectors. UI를 import하지 않는다. 라우팅(상세 이동)은 UI에서 처리.
import { useCallback, useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import type { Character, UnlockSlot } from '@/features/chat/domain/model/character';
import {
  baseCharactersAtom,
  lockedSlotsAtom,
} from '@/features/chat/application/selectors/characterSelectors';
import { affinityAtom } from '@/features/chat/application/atoms/affinityAtom';
import { glowOf, brightnessOf } from '@/features/chat/application/cardVisuals';

export interface CharacterCardView {
  character: Character;
  affinityLevel: number; // 호감도 배지 (표시만, 적립 로직 없음 — H6)
  glow: string; // hover 글로우 색 (cardVisuals)
}

export interface LockedSlotView {
  slot: UnlockSlot;
  glow: string; // hover 글로우 색
  brightness: number; // 실루엣 밝기 보정
}

export function useCharacterList() {
  const baseCharacters = useAtomValue(baseCharactersAtom);
  const lockedSlots = useAtomValue(lockedSlotsAtom);
  const affinity = useAtomValue(affinityAtom);
  const [notice, setNotice] = useState<string | null>(null);

  const cards: CharacterCardView[] = baseCharacters.map((character) => ({
    character,
    affinityLevel: affinity[character.id]?.state.level ?? 1,
    glow: glowOf(character.id),
  }));

  const slots: LockedSlotView[] = lockedSlots.map((slot) => ({
    slot,
    glow: glowOf(slot.characterId),
    brightness: brightnessOf(slot.characterId),
  }));

  const tapLockedSlot = useCallback((slot: UnlockSlot) => {
    setNotice(slot.hint);
  }, []);
  const dismissNotice = useCallback(() => setNotice(null), []);

  // 토스트 자동 닫힘
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 2600);
    return () => clearTimeout(timer);
  }, [notice]);

  return { cards, lockedSlots: slots, notice, tapLockedSlot, dismissNotice };
}
