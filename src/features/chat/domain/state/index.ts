// [domain/state] 채팅 도메인 상태 머신 — 외부 의존 0. (부록 B-1)
// 의존성 방향: domain 내부만 참조(model). Application/UI를 import하지 않는다.
// ChatState = Discriminated Union (스펙 §3.5)
//   IDLE | LOADING_RESPONSE | ERROR | OUT_OF_TOKEN  (+ mode: 'casual' | 'saju'). STREAMING은 후속.
export * from './chatState';
