// 페르소나 색인 — 캐릭터 데이터 단일 소스. characterMock·chatApi가 여기서 참조.
import type { Persona } from './types';
import { yeonu } from './yeonu';
import { doyoon } from './doyoon';
import { kkebi } from './kkebi';

export type { Persona } from './types';

/** 카드 표시 순서 = 강연우 → 한도윤 → 깨비. */
export const personaList: Persona[] = [yeonu, doyoon, kkebi];

/** id로 조회. */
export const personas: Record<string, Persona> = { yeonu, doyoon, kkebi };
