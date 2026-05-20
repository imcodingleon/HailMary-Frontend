// PaidShell 의 character-agnostic 인터페이스.
// 캐릭터별 차이(헤더 텍스트·모티프 이미지·TOC 항목)는 모두 이 타입을 통해 주입한다.

export interface PaidShellBranding {
  /** 헤더 좌측 상단 캐릭터명 (예: "강연우") */
  headerName: string;
  /** 헤더 캐릭터명 아래 서브타이틀 (예: "직관 풀이") */
  headerSubtitle: string;
  /** 헤더 모티프 SVG 경로 (예: "/yeonwoo/motif/motif_seal_myeong.svg") */
  motifUrl: string;
  /** TOC 헤더에 들어가는 캐릭터 식별 텍스트 (예: "강연우 · 직관 풀이") */
  tocTitle: string;
}

export interface TocItem {
  /** 점프할 슬라이드 인덱스 (0~11) */
  jumpTo: number;
  /** 챕터 번호 표기 (예: "Ch 1", "시작에 앞서") */
  num: string;
  /** 챕터 제목 */
  title: string;
  /** 챕터 부제 (선택) */
  sub?: string;
}
