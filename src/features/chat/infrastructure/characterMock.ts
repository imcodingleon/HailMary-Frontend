// 카드/상세용 Character — persona 데이터에서 파생(페르소나가 단일 소스). 호감도는 affinityMock(H6).
// HANDOFF(H1): 캐릭터 데이터(이름·태그·대사·모델) → 실 API/계정. persona 데이터가 교체 대상, 구조는 유지.
// [infrastructure] 의존성 방향: Infrastructure → Domain. domain 모델만 import.
import type { Character } from '@/features/chat/domain/model/character';
import { personaList } from './persona';

export const characterMock: Character[] = personaList.map((p) => ({
  id: p.id,
  name: p.name,
  tags: p.tags,
  baseQuote: p.baseQuote,
  storyPreview: p.storyPreview,
  unlocked: true,
  accent: p.accent,
  model: p.model,
}));
