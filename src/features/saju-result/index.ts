// saju-result feature 외부 export.

export type * from "./domain/types";

export { default as SajuChartSection } from "./views/shared/SajuChartSection";
export { default as WuxingChartSection } from "./views/shared/WuxingChartSection";
export { default as CharmCards } from "./views/shared/CharmCards";
export { default as BlockingSection } from "./views/shared/BlockingSection";
export type { BlockingDialogues } from "./views/shared/BlockingSection";
export { default as AvoidPartnerSection } from "./views/shared/AvoidPartnerSection";
export { default as DestinedPartnerSection } from "./views/shared/DestinedPartnerSection";
export {
  DESTINED_PARTNER_DIALOGUES,
  slotIdToDestinedKey,
  type DestinedSlotKey,
  type DestinedPartnerCopy,
} from "./views/shared/DestinedPartnerSection";
export { default as RomanceTimingSection } from "./views/shared/RomanceTimingSection";
export { default as RealReviewsSection } from "./views/shared/RealReviewsSection";
export type { ReviewItem } from "./views/shared/RealReviewsSection";
export { default as FullResultIndexSection } from "./views/shared/FullResultIndexSection";
export { default as StickyCheckoutCta } from "./views/shared/StickyCheckoutCta";

export { default as DoyoonResultScene } from "./views/doyoon/DoyoonResultScene";
export { default as YeonwooResultScene } from "./views/yeonwoo/YeonwooResultScene";

// 유료 (paid) 파트 — 연우 v1.8 라이브 / 도윤 v1.7 placeholder.
export type {
  PaidReport,
  PaidReportStatus,
  PaidReportStatusResponse,
  PaidChapterKey,
  PaidChapters,
  CharacterKey,
} from "./domain/paidReport";
export { usePaidReport } from "./hooks/usePaidReport";
export type { PaidReportFetchState } from "./hooks/usePaidReport";
export { usePaidResultPolling } from "./hooks/usePaidResultPolling";
export { default as YeonwooPaidScene } from "./views/yeonwoo/paid/YeonwooPaidScene";
export { default as DoyoonPaidScene } from "./views/doyoon/paid/DoyoonPaidScene";
export { default as PaidResultLoading } from "./views/yeonwoo/paid/PaidResultLoading";
