// [domain/intent] UI 이벤트의 의도(Intent) 정의 — 외부 의존 0. (부록 B-1)
// 의존성 방향: domain 내부만. 실행(Command)은 application/commands에서 매핑한다.
// ChatIntent (스펙 §3.5, 부록 D): SEND_MESSAGE | TOGGLE_SAJU_MODE | CHARGE_TOKEN
export * from './chatIntent';
