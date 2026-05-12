// saju-result feature domain 타입.
// 백엔드 SajuFreeResponse 확장(charm/blocking/spouseAvoid/spouseMatch/monthlyRomanceFlow)을
// 프론트 view-shape으로 정리. backend-saju 팀이 응답 alias를 dohwa와 동일하게 유지한다는
// 전제로 작성. 변경 시 이 파일만 수정하면 모든 view에 반영됨.

import type {
  Pillar,
  Wuxing,
  WuxingKey,
  YinYang,
  YongSinView,
  DayMaster,
  DaeUn,
} from "@/features/saju/types";

// ── 매력 ──────────────────────────────────────────────────────

export type CharmTypeKey =
  | "active"
  | "passive"
  | "expressive"
  | "mystery"
  | "charisma"
  | "dignified"
  | "free"
  | "withdrawn"
  | "balanced";

export type CharmManifestationKey =
  | "stable"
  | "crescendo"
  | "burst"
  | "peakFade"
  | "oscillating"
  | "latent";

export type CharmVariantTag =
  | "dohwa_active"
  | "dohwa_pillar_year"
  | "dohwa_pillar_month"
  | "dohwa_pillar_day"
  | "dohwa_pillar_hour"
  | "dohwa_multi"
  | "hwagae_present"
  | "yongsin_aligned"
  | "wuxing_dominant"
  | "wuxing_rare";

export interface CharmDohwaView {
  present: boolean;
  pillar: "year" | "month" | "day" | "hour" | null;
  hanja: string | null;
}

export interface CharmView {
  typeKey: CharmTypeKey;
  manifestationKey: CharmManifestationKey;
  variantTags: CharmVariantTag[];
  charmStrength: number; // 0-100
  charmPercentile: number; // 0-100
  showPercent: boolean;
  label: CharmTypeKey;
  dohwa: CharmDohwaView;
}

// 도화 카피 키 — 캐릭터별 dialogue table에서 분기 lookup
export type DohwaCopyKey =
  | "year"
  | "month"
  | "day"
  | "hour"
  | "multi"
  | "absent_hwagae"
  | "absent";

export type CharmCopyPool = {
  charmType: Record<CharmTypeKey, string[]>;
  manifestation: Record<CharmManifestationKey, string[]>;
  dohwa: Record<DohwaCopyKey, string>;
  pickDohwaCopyKey: (
    dohwa: CharmDohwaView,
    variantTags: CharmVariantTag[],
  ) => DohwaCopyKey;
};

// ── 연애 장애물 ──────────────────────────────────────────────

export type TenGodPatternKey =
  | "stubborn_rivalry"
  | "expression_surplus"
  | "officer_pressure"
  | "wealth_scattered"
  | "resource_dependent"
  | "expression_absent"
  | "officer_absent"
  | "wealth_absent";

export interface BlockingView {
  elementOverloadKey: WuxingKey | null;
  tenGodPatternKey: TenGodPatternKey | null;
}

// ── 인연 슬롯 ────────────────────────────────────────────────
// spouseAvoid: 'neutral' (prefix 없음) | '{m|f}-{element}-{yin|yang}'
// spouseMatch: '{m|f}-neutral' (prefix 있음) | '{m|f}-{element}-{yin|yang}'
// dohwa transformer 의도 그대로. backend-saju 확정.

const GENDERED_SLOTS = [
  "f-wood-yang",
  "f-wood-yin",
  "f-fire-yang",
  "f-fire-yin",
  "f-earth-yang",
  "f-earth-yin",
  "f-metal-yang",
  "f-metal-yin",
  "f-water-yang",
  "f-water-yin",
  "m-wood-yang",
  "m-wood-yin",
  "m-fire-yang",
  "m-fire-yin",
  "m-earth-yang",
  "m-earth-yin",
  "m-metal-yang",
  "m-metal-yin",
  "m-water-yang",
  "m-water-yin",
] as const;
type GenderedSlot = (typeof GENDERED_SLOTS)[number];

// neutral은 성별 prefix 필수 (`f-neutral` | `m-neutral`) — 무료 결과지에서
// 동성 사진 노출을 막기 위함. backend `spouse_avoid_service` / `spouse_match_service`
// 둘 다 동일 패턴으로 반환한다.
type NeutralSlot = "f-neutral" | "m-neutral";
export type AvoidSlotKey = NeutralSlot | GenderedSlot;
export type MatchSlotKey = NeutralSlot | GenderedSlot;

// neutral 일 때 avoidElement/avoidYinYang 은 null.
export interface SpouseAvoidView {
  slotId: AvoidSlotKey;
  avoidElement: WuxingKey | null;
  avoidYinYang: YinYang | null;
}

// {m|f}-neutral 일 때 matchElement/matchYinYang 은 null.
export interface SpouseMatchView {
  slotId: MatchSlotKey;
  matchElement: WuxingKey | null;
  matchYinYang: YinYang | null;
}

// ── 월별 연애운 ──────────────────────────────────────────────

export interface VisibleMonth {
  monthLabel: string;
  percentage: number;
  hearts: 1 | 2 | 3 | 4 | 5;
  isPeak: boolean;
}

export interface MonthlyRomanceFlowView {
  visibleMonths: VisibleMonth[];
  lockedSlots: {
    totalCount: number;
    peakOffsetFromVisible: number;
  };
}

// ── 백엔드 응답 (FastAPI /api/saju/free) ────────────────────
// backend-saju 확정 스키마. 영업비밀 필드(yongSin.reasoning, dayMasterStrength.score/analysis,
// gyeokGuk, jiJangGan, branchRelations, wolRyeong, specialMarks)는 응답에서 제외됨.

export interface FreeSajuData {
  pillars: Pillar[];
  highlight: string;
  wuxing: Wuxing;
  yongSin: YongSinView | null;
  dayMaster: DayMaster;
  daeUn: DaeUn;
  userName?: string | null;
}

// 백엔드 응답: spouseAvoid/spouseMatch/monthlyRomanceFlow 는 항상 객체 (null 아님).
// neutral 케이스를 객체 안의 slotId='neutral'/'{m|f}-neutral' 과 nullable 내부 필드로 표현.
export interface FreeResultResponse {
  sajuRequestId: number;
  sajuData: FreeSajuData;
  charm: CharmView;
  blocking: BlockingView;
  spouseAvoid: SpouseAvoidView;
  spouseMatch: SpouseMatchView;
  monthlyRomanceFlow: MonthlyRomanceFlowView;
}

// ── View용 평탄화 데이터 ─────────────────────────────────────
// 도윤/연우 훅이 FreeResultResponse → SajuResultData 로 변환해 props에 주입.
// sajuRequestId는 컴포넌트가 결정론적 카피 picker에 사용하므로 string 변환.

export interface SajuResultData {
  userName: string | null;
  pillars: Pillar[];
  highlight: string;
  wuxing: Wuxing;
  yongSin: YongSinView | null;
  dayMaster: DayMaster;
  daeUn: DaeUn;
  charm: CharmView;
  blocking: BlockingView;
  spouseAvoid: SpouseAvoidView | null;
  spouseMatch: SpouseMatchView | null;
  monthlyRomanceFlow: MonthlyRomanceFlowView | null;
  sajuRequestId: string;
}

// ── 캐릭터 테마 ──────────────────────────────────────────────

export type CharacterTheme = "dohwa-dark" | "doyoon-beige";
