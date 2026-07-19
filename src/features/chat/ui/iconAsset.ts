// [ui] UI 아이콘(png) 경로 일원화 — 컴포넌트가 경로 문자열을 직접 조합하지 않게. (characterAsset와 동일 원칙, 스펙 §4.1)
// 준비된 png가 없으면 <IconImg>가 onError로 fallback(기존 글리프/텍스트)을 렌더한다. 임의 생성 금지.
export const iconAsset = {
  // 하단 네비 4종 (활성/비활성 단일 파일 — opacity로 상태 표현)
  navHome: '/icons/nav/home.png',
  navContacts: '/icons/nav/contacts.png',
  navChat: '/icons/nav/chat.png',
  navCharge: '/icons/charge.png', // 충전 아이콘은 nav/ 가 아니라 icons/ 루트에 있음
  // 뒤로가기 (실제 위치: /icons/nav/back.png)
  back: '/icons/nav/back.png',
  // 토큰 (잔량·패키지 = token / 충전 버튼·강조 = token-charge)
  token: '/icons/token.png',
  tokenCharge: '/icons/token-charge.png', // [TBD] 파일 준비 전 — 없으면 fallback
  // 호감도 하트 / 잠금
  heart: '/icons/heart.png',
  lock: '/icons/lock.png',
} as const;

export type IconKey = keyof typeof iconAsset;
