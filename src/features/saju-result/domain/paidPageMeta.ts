// 유료 결과 12 페이지 메타 단일 진실원.
// 이벤트명·page_number·page_title은 모두 이 표에서 파생.
// 캐릭터(연우/도윤) 무관 — character 속성값으로만 구분.

import type { PaidChapterKey } from "./paidReport";

export type PaidPageNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface PaidPageMeta {
  pageKey: PaidChapterKey;     // "p0" ~ "p11"
  pageNumber: PaidPageNumber;  // 1 ~ 12
  pageTitle: string;           // 챕터 슬러그
}

export const PAID_PAGES: readonly PaidPageMeta[] = [
  { pageKey: "p0", pageNumber: 1, pageTitle: "prologue" },
  { pageKey: "p1", pageNumber: 2, pageTitle: "self_part1" },
  { pageKey: "p2", pageNumber: 3, pageTitle: "self_part2" },
  { pageKey: "p3", pageNumber: 4, pageTitle: "blocking_part1" },
  { pageKey: "p4", pageNumber: 5, pageTitle: "blocking_part2" },
  { pageKey: "p5", pageNumber: 6, pageTitle: "charm" },
  { pageKey: "p6", pageNumber: 7, pageTitle: "destined_part1" },
  { pageKey: "p7", pageNumber: 8, pageTitle: "destined_part2" },
  { pageKey: "p8", pageNumber: 9, pageTitle: "timing" },
  { pageKey: "p9", pageNumber: 10, pageTitle: "practice" },
  { pageKey: "p10", pageNumber: 11, pageTitle: "letter" },
  { pageKey: "p11", pageNumber: 12, pageTitle: "epilogue" },
] as const;
