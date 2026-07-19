'use client';

// [application/hooks] useAffinity — 호감도 화면·게이지 Application Service. UI는 이것만 본다(Dumb). (부록 B-2·B-3)
// 의존성 방향: Application → Domain/atoms. UI를 import하지 않는다. 표시만(적립 로직 없음, H6).
import { useAtomValue } from 'jotai';
import type { AffinityProfile } from '@/features/chat/domain/model/affinity';
import { affinityAtom } from '@/features/chat/application/atoms/affinityAtom';
import { charactersAtom } from '@/features/chat/application/atoms/characterAtom';

export interface AffinityView {
  name: string;
  profile: AffinityProfile | undefined;
}

export function useAffinity(characterId: string): AffinityView {
  const map = useAtomValue(affinityAtom);
  const characters = useAtomValue(charactersAtom);
  return {
    name: characters.find((c) => c.id === characterId)?.name ?? characterId,
    profile: map[characterId],
  };
}
