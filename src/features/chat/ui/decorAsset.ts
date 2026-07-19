// [ui] 장식(decor) 이미지 경로 일원화 — 컴포넌트가 경로를 직접 조합하지 않게. (iconAsset와 동일 원칙)
// 없으면 <IconImg> onError로 fallback(무늬 없이 프레임만) 렌더. 임의 생성 금지.
export const decorAsset = {
  // 편액 양끝 당초무늬 좌우 1쌍 (선황금)
  frameOrnamentLeft: '/decor/frame-ornament-left.png',
  frameOrnamentRight: '/decor/frame-ornament-right.png',
  // 대화 시작하기 버튼 통이미지(도화홍 편액, 텍스트 없음) — 실제 위치 /decor. 없으면 도화홍 pill fallback
  btnStart: '/decor/btn-start.png',
  // 호감도 게이지 채움 끝점 문양 — 없으면 장식 없이 채움만 fallback
  gaugeTip: '/decor/gauge-tip.png',
  // 헤더 하단 수평 구분선(선황금) — 없으면 선황금 얇은 라인 fallback
  dividerThread: '/decor/divider-thread2.png',
  // 헤더 타이틀 옆 선황금 문양 — 없으면 문양 없이 타이틀만 fallback
  titleOrnament: '/decor/title-ornament.png',
} as const;
