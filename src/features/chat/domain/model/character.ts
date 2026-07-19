// [domain/model] 순수 비즈니스 모델 — 외부 의존 0 (React/API/storage import 금지). (부록 B-1)
// 스펙 §12. accent는 디자인 토큰 키로 제한 → UI에서 토큰만 쓰도록 강제(하드코딩 차단).

/** 디자인 토큰 키 (globals.css :root / tailwind 토큰과 1:1). 색 하드코딩 대신 이 키만 사용. */
export type AccentToken =
  | 'meokheuk'
  | 'dohwahong'
  | 'seonhwanggeum'
  | 'simyagal'
  | 'hwaseonji';

// 호감도는 affinity.ts(AffinityState/AffinityProfile)로 일원화. Character는 호감도 필드를 갖지 않는다.

export interface Character {
  id: string;
  name: string;
  tags: string[];
  baseQuote: string;
  storyPreview: string;
  unlocked: boolean;
  accent: AccentToken; // 토큰 키 (캐릭터 액센트)
  model: string; // 핸드오프 표기 — 실연동 시 캐릭터별 고정 모델 (H1)
}

/** 미해금 슬롯 정책 (스펙 §7.2 / DL-C01): 조건 명시(shown)·미공개(hidden)·예고(coming) 섞기. */
export type UnlockPolicy = 'shown' | 'hidden' | 'coming';

export interface UnlockSlot {
  id: string;
  characterId: string; // 잠금 실루엣 이미지 매핑용 (고정 ID)
  name: string; // 미리보기용 표시 이름 (카드는 ??? 유지)
  policy: UnlockPolicy;
  hint: string;
  signatureQuote: string; // 캐릭터성·말투 기반 상징 대사 (사주 도메인 아님)
}
