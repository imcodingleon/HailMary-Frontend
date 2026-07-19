// [application/atoms] 호감도 전역 상태 (캐릭터별). 초기값 = mock 시드(표시용, H6). (스펙 §7.7)
// 의존성 방향: Application → Domain, → Infrastructure(시드). UI를 import하지 않는다.
import { atom } from 'jotai';
import type { AffinityProfile } from '@/features/chat/domain/model/affinity';
import { affinityMock } from '@/features/chat/infrastructure/affinityMock';

export const affinityAtom = atom<Record<string, AffinityProfile>>(affinityMock);
