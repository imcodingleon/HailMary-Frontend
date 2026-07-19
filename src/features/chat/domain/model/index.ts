// [domain/model] 순수 비즈니스 모델 — 외부 의존 0 (React/API/storage import 금지). (부록 B-1)
// 의존성 방향: 가장 안쪽 레이어. 어떤 레이어도 import하지 않는다.
// 모델(스펙 §12): Character, UnlockSlot, Message, ChatRoom, TokenWallet …
export * from './character';
export * from './message';
export * from './chatRoom';
export * from './wallet';
export * from './affinity';
export * from './userProfile';
