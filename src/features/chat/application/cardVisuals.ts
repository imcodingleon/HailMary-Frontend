// [application] 카드 시각 튜닝 상수 — 토큰 팔레트 외 "예외" 값(글로우·밝기 보정)을 한 곳에서 관리. (이번 단계 가드)
// 컴포넌트는 이 값을 hook이 주입한 props로만 받는다(직접 import 금지). 전부 [TBD] 튜닝값.

// 캐릭터별 hover 글로우 색 (box-shadow). 토큰 아님 — 캐릭터 상징색 힌트.
export const ACCENT_GLOW: Record<string, string> = {
  yeonu: '#6B7A99',
  doyoon: '#E8C9A0',
  kkebi: '#D73F59',
  seonjae: '#4A5A8C',
  seojin: '#C9A86A',
  yunjae: '#D73F59',
  ihyeon: '#9B8CC4',
  junhyeok: '#E0524A',
};

// 잠금 실루엣 밝기 보정 (1=원본, <1=더 어둡게). 밝게 튀는 컷을 낮춰 톤 통일.
export const SILHOUETTE_BRIGHTNESS: Record<string, number> = {
  seonjae: 0.7,
  seojin: 0.7,
  ihyeon: 0.72,
  yunjae: 1.0,
  junhyeok: 0.95,
};

export const glowOf = (id: string): string => ACCENT_GLOW[id] ?? '#D73F59';
export const brightnessOf = (id: string): number => SILHOUETTE_BRIGHTNESS[id] ?? 1;
