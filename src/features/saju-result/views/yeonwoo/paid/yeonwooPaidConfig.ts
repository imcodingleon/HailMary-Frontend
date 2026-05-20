// 연우 유료 결과 셸에 주입할 캐릭터 config.
// PaidShell 자체는 character-agnostic — 이 파일이 연우의 차이점을 모두 표현한다.

import type { PaidShellBranding, TocItem } from "../../shared/paid/types";

export const YEONWOO_BRANDING: PaidShellBranding = {
  headerName: "강연우",
  headerSubtitle: "직관 풀이",
  motifUrl: "/yeonwoo/motif/motif_seal_myeong.svg",
  tocTitle: "강연우 · 직관 풀이",
};

export const YEONWOO_TOC_ITEMS: ReadonlyArray<TocItem> = [
  { jumpTo: 0, num: "시작에 앞서", title: "네 사주, 한눈에 보기", sub: "너의 명줄을 펼치기 전에" },
  { jumpTo: 1, num: "Ch 1", title: "너라는 사람", sub: "연애 유형 · 감정 구조 · 매력" },
  { jumpTo: 3, num: "Ch 2", title: "지금 연애를 막는 것", sub: "방해 구조 · 반복 패턴 · 악연 컷팅" },
  { jumpTo: 5, num: "Ch 3", title: "나의 매력 분석", sub: "매력 지수 · 끌리는 방식 · 감각적 매력" },
  { jumpTo: 6, num: "Ch 4", title: "운명의 짝 · 그 사람", sub: "인연 프로파일 · 속마음 · 결말 예측" },
  { jumpTo: 8, num: "Ch 5", title: "인연이 오는 시간", sub: "12개월 연애운 전체" },
  { jumpTo: 9, num: "Ch 6", title: "연애운 상승 실천 가이드", sub: "오행 보완 · 매력살 활용" },
  { jumpTo: 10, num: "Ch 7", title: "연우의 편지", sub: "너의 한 줄에 답하다" },
  { jumpTo: 11, num: "에필로그", title: "연우의 마지막 말" },
];
