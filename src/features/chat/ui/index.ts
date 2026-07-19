// [ui] Dumb 컴포넌트 — 상태·로직·side effect 금지. (부록 B-2, C-4)
// 의존성 방향: UI → Application (useChat/selector 파생 상태로만 분기). domain/infra를 직접 import하지 않는다.
// ❗색·여백 하드코딩 금지 → tailwind 토큰(bg-meokheuk 등)만 사용. 캐릭터·배경 임의 이미지 금지(§4.1).
// 다음 단계 예정(스펙 §14-3 이후): CharacterCard, ChatRoom, ModeToggle, CharacterSlot …
export {};
