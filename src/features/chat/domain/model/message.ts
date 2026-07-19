// [domain/model] Message + 사주 근거 블록 — 순수 타입, 외부 의존 0. (부록 B-1, 스펙 §7.5·§8·§12)
// 사주 변수(일간·오행 등)는 모두 "유저의 사주"를 가리킨다 — 캐릭터 사주가 아님.
// ❗캐릭터 언어 분리(부록 A): 연우=운명론·한자·오행·촛불 / 도윤=데이터·퍼센트·레이더. 혼용 금지(타입으로도 분리).

export type MessageRole = 'user' | 'character';
export type MessageType = 'text' | 'saju';

// ── 강연우: 3단 구조 (장면 → 한자·오행 근거 → 조언). 음독 병기 필수. ──
export interface YeonuEvidence {
  hanja: string; // 음독 병기 필수, 예: '亥子丑(해자축)'
  element: string; // 오행, 예: '수(水)'
  note: string;
}
export interface YeonuSajuBlock {
  kind: 'yeonu';
  scene: string; // ① 운명론적·초자연적 장면 묘사
  evidence: YeonuEvidence[]; // ② 사주 근거(한자·오행, 음독 병기)
  advice: string; // ③ 실전 조언
}

// ── 한도윤: 분석 코멘트 + 레이더 + 퍼센트 (데이터 컨설턴트). 한자·운명론 금지. ──
export interface DoyoonRadarAxis {
  axis: string; // 예: '연애', '재물'
  score: number; // 0~100 표시용 더미
}
export interface DoyoonPercent {
  label: string;
  value: number; // 0~100 표시용 더미
}
export interface DoyoonSajuBlock {
  kind: 'doyoon';
  comment: string;
  radar: DoyoonRadarAxis[]; // 3~5축 더미
  percents: DoyoonPercent[];
}

// ── 깨비: 가벼운 요약(영물 톤). 본격 근거 연출 아님. ──
export interface KkebiSajuBlock {
  kind: 'kkebi';
  summary: string;
}

export type SajuBlock = YeonuSajuBlock | DoyoonSajuBlock | KkebiSajuBlock;

export interface Message {
  id: string; // React key·이력 식별용 (스펙 §12 외 실용 추가)
  role: MessageRole;
  type: MessageType;
  content: string; // 'saju'일 때는 폴백/접근성용 리드 텍스트
  sajuBlock?: SajuBlock; // type === 'saju'일 때만
}
