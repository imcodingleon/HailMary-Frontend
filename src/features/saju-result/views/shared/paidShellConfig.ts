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
  sealImage: "/doyoon/dy_sub/seal_bunseok_dy_.png",
  gold: "#8B6914",
  goldDim: "rgba(139,105,20,0.3)",
  goldFaint: "rgba(139,105,20,0.15)",
  lastNavLabel: "분석 끝까지 확인하셨어요",
  nextNavLabel: "다음 →",
  tocHeaderLabel: "목차 · 한도윤 · 데이터 분석",
  tocItems: [
    { jumpTo: 0, num: "시작에 앞서", title: "분석 시작 전 데이터 요약", sub: "사주 원국 · 오행 분포 · 일간" },
    { jumpTo: 1, num: "Ch 1", title: "당신이라는 사람", sub: "유형 · 트리거 · 감정 곡선" },
    { jumpTo: 3, num: "Ch 2", title: "지금 연애를 막는 것", sub: "구조적 원인 · 반복 패턴 · 비호환" },
    { jumpTo: 5, num: "Ch 3", title: "매력 분석", sub: "매력 지수 · 전환율 · 호감 변수" },
    { jumpTo: 6, num: "Ch 4", title: "운명의 짝 · 그 사람", sub: "프로파일 · 시나리오 · 결말 예측" },
    { jumpTo: 8, num: "Ch 5", title: "인연이 오는 시간", sub: "12개월 접촉 확률" },
    { jumpTo: 9, num: "Ch 6", title: "실천 가이드", sub: "오행 보완 · 리스크 제거 · 매력 최적화" },
    { jumpTo: 10, num: "Ch 7", title: "도윤의 편지", sub: "분석 결과를 정리해 드립니다" },
    { jumpTo: 11, num: "에필로그", title: "도윤의 마지막 말" },
  ],
};
