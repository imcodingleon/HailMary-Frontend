// 캐릭터 페르소나 데이터 — 실 Claude API 시스템 프롬프트의 기준. (스펙 §8)
// 목업 응답·실 API 양쪽의 단일 기준. 하드코딩 대사·톤을 여기로 모은다.
//
// ❗규칙 (절대 준수, load-bearing):
//  · 캐릭터 언어 분리(부록 A): 연우(운명론·한자·오행·촛불) ↔ 도윤(데이터·퍼센트·레이더) 혼용 금지.
//  · 한자는 음독 병기 필수 — UI 노출 텍스트(예: 亥子丑(해자축), 壬水(임수)). 코드 변수는 로마자.
//  · 사주 변수(일간·오행)는 "유저의 사주" 기준(캐릭터 사주 아님).
import type { AccentToken } from '@/features/chat/domain/model/character';
import type { SajuBlock } from '@/features/chat/domain/model/message';

export interface Persona {
  id: string;
  name: string;
  // 카드/상세 표시 데이터 (characterMock이 이걸로 Character를 파생)
  tags: string[];
  baseQuote: string;
  storyPreview: string;
  accent: AccentToken;
  model: string; // HANDOFF(H1): 캐릭터별 고정 모델 표기
  // 톤/응답 규격 (프롬프트 기준 — §8)
  toneRule: string;
  responseSpec: string;
  // 목업 응답 데이터 (교체 대상)
  greeting: string;
  casualReplies: string[]; // 사적 모드(저토큰) 응답 풀
  sajuBlock: SajuBlock; // 사주 모드(고토큰) 구조화 근거 (H2)
}

// HANDOFF(H1): 캐릭터별 고정 모델 표기 — 실 Claude API 모델 ID로 교체. [TBD] 단가/모델 확정 후.
export const HANDOFF_MODEL = '[TBD] 캐릭터 고정 모델 — 핸드오프 H1';
