// 유료 리포트 도메인 타입.
// 백엔드 `domains/ai`의 PaidReport 응답을 프론트 view-shape으로 정의.
// chapters는 페이지 작업(P-0 ~ P-11) 진입 시 점진적으로 페이지별 키를 확장한다.

export type PaidReportStatus = "pending" | "ready" | "expired";

export interface PaidReportStatusResponse {
  status: PaidReportStatus;
}

// chapters는 페이지별 결과 데이터 맵. 페이지 작업 시 명시적 타입으로 좁힌다.
export type PaidChapterKey =
  | "p0"
  | "p1"
  | "p2"
  | "p3"
  | "p4"
  | "p5"
  | "p6"
  | "p7"
  | "p8"
  | "p9"
  | "p10"
  | "p11";

// ── P-0 (序 시작에 앞서) ─────────────────────────────────────
// 백엔드 `domains/ai`가 사주 변환 결과(한자/오행/일간 카드)와 AI 인트로 텍스트를 채워 보낸다.
// 프론트는 mapping/transform 없이 그대로 렌더한다.

export type OhangKey = "mok" | "hwa" | "to" | "geum" | "su";

export interface SajuPillarsP0 {
  si_g: string;
  si_j: string;
  il_g: string;
  il_j: string;
  wl_g: string;
  wl_j: string;
  yr_g: string;
  yr_j: string;
}

export type OhangStrength = Record<OhangKey, number>;

export interface IlganCard {
  name_kor: string;
  name_han: string;
  subtitle: string;
  essence: string;
  in_love: string[];
  caution: string;
}

export interface PaidChapterP0 {
  saju_pillars: SajuPillarsP0;
  ohang_strength: OhangStrength;
  ohang_excess: OhangKey;
  ohang_lack: OhangKey;
  ilgan: string;
  ilgan_card: IlganCard;
  ai_intro: string;
}

export interface PaidChapters {
  p0?: PaidChapterP0;
  p1?: string;
  p2?: string;
  p3?: string;
  p4?: string;
  p5?: string;
  p6?: string;
  p7?: string;
  p8?: string;
  p9?: string;
  p10?: string;
  p11?: string;
}

export interface PaidReport {
  order_id: string;
  status: PaidReportStatus;
  chapters: PaidChapters;
  expires_at: string;
}
