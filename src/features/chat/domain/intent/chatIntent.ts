// [domain/intent] UI 이벤트의 의도 — 외부 의존 0. (부록 B-1·D)
// 실행(Command) 매핑은 application/commands. 이번 단계는 SEND_MESSAGE만 핸들러 구현,
// TOGGLE_SAJU_MODE(6단계)·CHARGE_TOKEN(8단계)은 타입만 선언.

export type ChatIntent =
  | { type: 'SEND_MESSAGE'; text: string }
  | { type: 'TOGGLE_SAJU_MODE' }
  | { type: 'CHARGE_TOKEN'; packageId: string };

export type ChatIntentType = ChatIntent['type'];
