// 도윤 유료 페이지 공통 색 토큰. 페이지/컴포넌트 어디서나 이 상수 import.
// 도윤_final.html v1.7 CSS 변수 매핑 (line 195~210).

// 도윤 폰트 토큰 — 원본 도윤_final.html 매핑
// --font-sans: 시스템 폰트 (대부분 텍스트)
// --font-serif: Noto Serif KR (한자/일주/오행 이름)
export const DOYOON_FONT_SANS =
  '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR", system-ui, sans-serif';
export const DOYOON_FONT_SERIF = '"Noto Serif KR", "Nanum Myeongjo", serif';

export const DOYOON_TOKENS = {
  bg: "#fffdf7",
  warmGold: "#8B6914",
  goldSoft: "#a07840",
  text: "#2c1a08",
  textSoft: "#4a3215",
  textMeta: "#7a5020",
  pink: "#D4537E",
  excess: "#E24B4A",
  lack: "#a8a07a",
  // 차트 5 오행 hue (무료 WuxingChartSection 미러)
  hueMok: "#4FB84F",
  hueHwa: "#E94E3F",
  hueTo: "#E5A938",
  hueGeum: "#ABABAA",
  hueSu: "#4180DC",
  // 일주 강조용 진한 톤
  hueMokDay: "#3A933A",
  hueHwaDay: "#B8392E",
  hueToDay: "#B0822A",
  hueGeumDay: "#828180",
  hueSuDay: "#2D5BA8",
} as const;
