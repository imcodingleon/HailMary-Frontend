// [domain/model] 사주 확인 모달 — 순수 타입, 외부 의존 0. (부록 B-1, CHAT_SSOT.md §7.1 H3)
// BE 계약(app/domains/chat/application/request/saju_profile_request.py) 1:1 미러.
// ❗chat은 features/auth를 import하지 않는다 — AccountProfile.lastUsed와 형태만 동일한 자체 타입(SajuProfilePrefill)을 둔다.

export type SajuCalendar = 'solar' | 'lunar';
export type SajuGender = 'male' | 'female';

/** 확인 모달 제출 페이로드 — chatApi.saveProfile 입력. */
export interface SajuProfileFormInput {
  birthDate: string; // 'YYYY-MM-DD'
  birthTime: string | null; // 'HH:MM' | null(모름)
  birthTimeUnknown: boolean;
  calendar: SajuCalendar;
  gender: SajuGender;
}

/**
 * 계정 last_used 프리필 — features/auth의 AccountProfile.lastUsed와 필드가 1:1 동일하다.
 * 경계 규칙(chat은 auth를 import 금지) 때문에 여기 별도 정의 — app 레벨(ChatRoomClient)이
 * AccountProfile.lastUsed를 그대로 이 형태로 넘겨준다(구조적 타이핑이라 변환 코드 불필요).
 */
export interface SajuProfilePrefill {
  birth: string; // 'YYYY-MM-DD'
  calendar: string; // 기대값 'solar' | 'lunar' — 방어적으로 string
  time: string | null; // 'HH:MM' | null
  gender: string; // 기대값 'male' | 'female' — 방어적으로 string
}
