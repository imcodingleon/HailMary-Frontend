// 유료 결과 12 페이지 셸 캐릭터 설정. PaidShell + TocModal에 주입.
// 각 캐릭터의 헤더·골드색·인장·마지막 페이지 버튼 라벨·TocModal 페이지 목록을 묶는다.

export interface TocItem {
  jumpTo: number;
  num: string;
  title: string;
  sub?: string;
}

export interface PaidShellConfig {
  // 헤더
  name: string;              // "강연우" / "한도윤"
  role: string;              // "직관 풀이" / "데이터 분석"
  sealImage: string;         // 상단 헤더 인장 경로 (public/ 기준)
  // 배경
  pageBg: string;            // 430px 본문 컨테이너 — 다크 "#0a0a09" / 라이트 "#fffdf7"
  outerBg: string;           // 화면 끝까지 채우는 바깥 배경. 도윤은 radial-gradient (cream→wheat) 으로 가운데 포커스
  shellHeaderBg: string;     // 상단 sticky 헤더 — 다크 "#111110" / 라이트 "#fffaf0"
  shellNavBg: string;        // 하단 네비 — 다크 "rgba(15,15,13,0.95)" / 라이트 "rgba(255,250,240,0.95)"
  buttonBg: string;          // 보조 버튼(목차/이전) — 다크 "#1a1a18" / 라이트 "#fff8ec"
  nextButtonTextColor: string; // 다음 버튼 텍스트 — 다크 "#2c1a08" / 라이트 "#fff"
  // TocModal 캐릭터별 색
  modalOverlay: string;       // 오버레이 — 다크 "rgba(0,0,0,0.55)" / 도윤 웜브라운 "rgba(60,40,20,0.45)"
  modalInnerBg: string;       // 모달 본체 — 다크 "#111110" / 라이트 "#fffaf0"
  modalTextColor: string;     // 메인 텍스트 — 다크 "#d8d6d0" / 라이트 "#2c1a08"
  modalSubTextColor: string;  // 서브 텍스트 — 다크 "#888780" / 라이트 "#a07840"
  modalCurrentBg: string;     // 현재 항목 강조 — 다크 "#1a1a18" / 라이트 "#fff3e0"
  // 색
  gold: string;              // "#E8C9A0" / "#8B6914"
  goldDim: string;           // 진행바 배경 등 30% 톤
  goldFaint: string;         // 경계선 등 15% 톤
  // 라스트 페이지 다음 버튼 라벨 (캐릭터 톤)
  lastNavLabel: string;      // "끝까지 다 봤어" / "끝까지 확인하셨어요"
  nextNavLabel: string;      // "다음 →"
  // Toc 헤더 라벨
  tocHeaderLabel: string;    // "목차 · 강연우 · 직관 풀이"
  // 12 페이지 목차 (챕터 그룹핑)
  tocItems: ReadonlyArray<TocItem>;
}

// ── 강연우 (라이브) ────────────────────────────────────────────
export const YEONWOO_SHELL_CONFIG: PaidShellConfig = {
  name: "강연우",
  role: "직관 풀이",
  sealImage: "/yeonwoo/motif/motif_seal_myeong.svg",
  pageBg: "#0a0a09",
  outerBg: "#0a0a09",
  modalOverlay: "rgba(0,0,0,0.55)",
  modalInnerBg: "#111110",
  modalTextColor: "#d8d6d0",
  modalSubTextColor: "#888780",
  modalCurrentBg: "#1a1a18",
  shellHeaderBg: "#111110",
  shellNavBg: "rgba(15,15,13,0.95)",
  buttonBg: "#1a1a18",
  nextButtonTextColor: "#2c1a08",
  gold: "#E8C9A0",
  goldDim: "rgba(200,168,112,0.3)",
  goldFaint: "rgba(200,168,112,0.15)",
  lastNavLabel: "끝까지 다 봤어",
  nextNavLabel: "다음 →",
  tocHeaderLabel: "목차 · 강연우 · 직관 풀이",
  tocItems: [
    { jumpTo: 0, num: "시작에 앞서", title: "네 사주, 한눈에 보기", sub: "너의 명줄을 펼치기 전에" },
    { jumpTo: 1, num: "Ch 1", title: "너라는 사람", sub: "연애 유형 · 감정 구조 · 매력" },
    { jumpTo: 3, num: "Ch 2", title: "지금 연애를 막는 것", sub: "방해 구조 · 반복 패턴 · 악연 컷팅" },
    { jumpTo: 5, num: "Ch 3", title: "나의 매력 분석", sub: "매력 지수 · 끌리는 방식 · 감각적 매력" },
    { jumpTo: 6, num: "Ch 4", title: "운명의 짝 · 그 사람", sub: "인연 프로파일 · 속마음 · 결말 예측" },
    { jumpTo: 8, num: "Ch 5", title: "인연이 오는 시간", sub: "12개월 연애운 전체" },
    { jumpTo: 9, num: "Ch 6", title: "연애운 상승 실천 가이드", sub: "오행 보완 · 매력살 활용" },
    { jumpTo: 10, num: "Ch 7", title: "연우의 편지", sub: "너의 한 줄에 답하다" },
    { jumpTo: 11, num: "에필로그", title: "연우의 마지막 말" },
  ],
};

// ── 한도윤 (도윤 P-0 작업 시작) ─────────────────────────────────
export const DOYOON_SHELL_CONFIG: PaidShellConfig = {
  name: "한도윤",
  role: "데이터 분석",
  sealImage: "/doyoon/motif/motif_seal_yeon_full.png",
  pageBg: "#fffdf7",
  // 도윤_final.html line 284 — radial gradient cream → wheat → amber edges
  outerBg: "radial-gradient(ellipse at 50% 25%, #fff8ec 0%, #fdf0d8 35%, #f4e2c2 70%, #e8d2a8 100%)",
  // 도윤_final.html line 1657~1730 미러
  modalOverlay: "rgba(60,40,20,0.45)",
  modalInnerBg: "#fffaf0",
  modalTextColor: "#2c1a08",
  modalSubTextColor: "#a07840",
  modalCurrentBg: "#fff3e0",
  shellHeaderBg: "#fffaf0",
  shellNavBg: "rgba(255,250,240,0.95)",
  buttonBg: "#fff8ec",
  nextButtonTextColor: "#fff",
  gold: "#8B6914",
  goldDim: "rgba(139,105,20,0.3)",
  goldFaint: "rgba(139,105,20,0.15)",
  lastNavLabel: "분석 끝까지 확인하셨어요",
  nextNavLabel: "다음 →",
  tocHeaderLabel: "목차 · 한도윤 · 데이터 분석",
  // 도윤_final.html line 3215~3290 원본 카피 매칭
  tocItems: [
    { jumpTo: 0, num: "시작에 앞서", title: "네 데이터, 한눈에 보기", sub: "분석 시작 전 데이터 요약" },
    { jumpTo: 1, num: "Ch 1", title: "당신이라는 사람", sub: "연애 성향 · 감정 구조 · 매력 분석" },
    { jumpTo: 3, num: "Ch 2", title: "연애를 막는 것", sub: "구조적 원인 · 반복 패턴 · 비호환 유형" },
    { jumpTo: 5, num: "Ch 3", title: "나의 매력 분석", sub: "매력 지수 · 호감 패턴 · 끌리는 방식" },
    { jumpTo: 6, num: "Ch 4", title: "운명의 짝 · 그 사람", sub: "인연 프로파일 · 궁합 지수 · 결말 예측" },
    { jumpTo: 8, num: "Ch 5", title: "인연이 오는 시간", sub: "월별 접촉 확률 · 피크 구간" },
    { jumpTo: 9, num: "Ch 6", title: "연애 변수 최적화 가이드", sub: "변수 보완 · 리스크 제거" },
    { jumpTo: 10, num: "Ch 7", title: "도윤의 편지", sub: "당신의 한 줄에 답하다" },
    { jumpTo: 11, num: "에필로그", title: "도윤의 마지막 말" },
  ],
};
