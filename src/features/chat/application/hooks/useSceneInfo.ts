'use client';

// [application/hooks] useSceneInfo — 상단 INFO 패널용 월드 상태. UI는 이것만 본다(Dumb).
// 의존성 방향: Application → Domain/atoms. UI를 import하지 않는다.
import { useAtomValue } from 'jotai';
import type { SceneInfo } from '@/features/chat/domain/model/sceneInfo';
import { sceneInfoAtom, sceneInfoSeed } from '@/features/chat/application/atoms/sceneInfoAtom';

export function useSceneInfo(characterId: string): SceneInfo | undefined {
  const map = useAtomValue(sceneInfoAtom);
  return map[characterId] ?? sceneInfoSeed[characterId];
}
