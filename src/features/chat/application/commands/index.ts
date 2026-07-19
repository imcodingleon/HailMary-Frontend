// [application/commands] Intent → 실행 매핑 — `command[intent]` 객체 사용, `switch(intent.type)` 금지(OCP). (부록 B-7)
// 의존성 방향: Application → Domain, 그리고 Infrastructure adapter 호출(외부 호출은 adapter 경유). UI를 import하지 않는다.
// 다음 단계 예정(스펙 §3.5):
//   TOGGLE_SAJU_MODE → setMode('saju') + 코랄 전환
//   SEND_MESSAGE     → chatApi.send(ctx)     (mock/real 무관)
//   CHARGE_TOKEN     → paymentApi.charge()   (mock/real 무관)
export {};
