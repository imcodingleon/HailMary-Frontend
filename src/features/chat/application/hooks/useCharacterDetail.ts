'use client';

// [application/hooks] useCharacterDetail — 캐릭터 상세 Application Service.
// 라우트 id로 캐릭터 1건 + 샘플 카피 가공을 반환. 호감도는 useAffinity로 분리(일원화). UI는 Dumb. (부록 B-2·B-3)
// 의존성 방향: Application → Domain/atoms. UI를 import하지 않는다.
import { useAtomValue } from 'jotai';
import type { Character, UnlockSlot } from '@/features/chat/domain/model/character';
import {
  charactersAtom,
  unlockSlotsAtom,
} from '@/features/chat/application/atoms/characterAtom';

const SAMPLE_PREFIX = '[샘플]';

function stripSample(text: string): string {
  return text.startsWith(SAMPLE_PREFIX) ? text.slice(SAMPLE_PREFIX.length).trim() : text;
}

export interface CharacterDetailView {
  character: Character | undefined;
  lockedSlot: UnlockSlot | undefined; // 잠금 캐릭터(프로토타입 미리보기)일 때만
  quoteText: string; // [샘플] 접두 제거된 대표 대사
  storyText: string; // [샘플] 접두 제거된 스토리 미리보기
  isSampleCopy: boolean; // 임시 샘플 카피 여부(노출 시 안내문 표시)
}

export function useCharacterDetail(id: string): CharacterDetailView {
  const characters = useAtomValue(charactersAtom);
  const lockedSlots = useAtomValue(unlockSlotsAtom);
  const character = characters.find((c) => c.id === id);
  // 기본 캐릭터가 아니면 잠금 슬롯에서 미리보기 데이터 조회
  const lockedSlot = character ? undefined : lockedSlots.find((s) => s.characterId === id);

  // 스토리 미리보기 기준으로 샘플 카피 판정 (도윤·깨비)
  const isSampleCopy = character?.storyPreview.startsWith(SAMPLE_PREFIX) ?? false;

  return {
    character,
    lockedSlot,
    quoteText: character ? stripSample(character.baseQuote) : '',
    storyText: character ? stripSample(character.storyPreview) : '',
    isSampleCopy,
  };
}
