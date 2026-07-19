// [domain/state] 채팅 상태머신 — 외부 의존 0. (부록 B-1, 스펙 §3.5)
// status 기준 Discriminated Union. mode는 동반 속성, 기본 'casual'.
// STREAMING/saju 분기는 후속 단계(6·7)에서. 지금은 타입만 열어둔다.

export type ChatMode = 'casual' | 'saju';

export type ChatStatus =
  | 'IDLE'
  | 'LOADING_RESPONSE'
  | 'STREAMING' // 첫 delta 도착 ~ done. (CHAT_SSOT.md SSE 계약)
  | 'ERROR'
  | 'OUT_OF_TOKEN'
  | 'UNAUTHORIZED'; // 실 BE 401 — 로그인 필요 (P4-2a: 상태만, 로그인 모달은 P4-2b)

/** 상태머신 정식 형태(문서/후속 단계용). 런타임은 status + mode를 분리 보관. */
export type ChatState =
  | { status: 'IDLE'; mode: ChatMode }
  | { status: 'LOADING_RESPONSE'; mode: ChatMode }
  | { status: 'STREAMING'; mode: ChatMode }
  | { status: 'ERROR'; mode: ChatMode }
  | { status: 'OUT_OF_TOKEN'; mode: ChatMode }
  | { status: 'UNAUTHORIZED'; mode: ChatMode };

export const DEFAULT_MODE: ChatMode = 'casual';
