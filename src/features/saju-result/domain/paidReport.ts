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

// ── P-1 (一 너라는 사람 1/2) ──────────────────────────────────
// 1-1 챕터 오프닝 + 1-2 트리거 + 1-3 감정 폭발 패턴.
// 백엔드 `yeonwoo_p1_*.compose_*` 결과 1:1 매핑.

export type CandleFlame = "weak" | "medium" | "strong";

export interface CandleRow {
  label: string;          // "초반" / "중반" / "후반"
  flames: ReadonlyArray<CandleFlame>;
  desc: string;
  is_peak: boolean;
}

export interface PaidChapterP1 {
  ilgan: string;          // "임수(壬水)"
  ilju: string;           // "임술(壬戌)"
  love_type: string;
  trigger_1: string;
  trigger_2: string;
  trigger_3: string;
  trigger_desc_1: string;
  trigger_desc_2: string;
  trigger_desc_3: string;
  candle_rows: ReadonlyArray<CandleRow>;
  emotion_bubble: string;
  ai_opening: string;
  ai_trigger: string;
  ai_emotion: string;
}

// ── P-2 (一 너라는 사람 2/2) ──────────────────────────────────
// 1-4 상처 시나리오 + 1-5 이별 후 회복 타임라인.

export interface RecoveryTimelineRow {
  time: string;
  title: string;
  desc: string;
}

export interface RecoveryAccel {
  value: string;
  sub: string;
}

export interface PaidChapterP2 {
  scenario_1_when: string;
  scenario_1_desc: string;
  scenario_2_when: string;
  scenario_2_desc: string;
  ai_hurt: string;
  hurt_bubble: string;
  recovery_timeline: ReadonlyArray<RecoveryTimelineRow>;
  recovery_accel: RecoveryAccel;
  ai_recovery: string;
}

// ── P-3 (二 연애를 막는 것 1/2) ───────────────────────────────
// 2-1 명줄(과다 오행) + 2-2 반복 패턴 + 2-2-1 역이용.

export interface ReverseCard {
  value: string;
  sub: string;
}

export interface PaidChapterP3 {
  ohang_excess: string;       // "수(水)" — 한자 포함 표기
  blockade_card_sub: string;
  ai_blockade: string;
  pattern_body: string;
  ai_pattern: string;
  reverse_card_1: ReverseCard;
  reverse_card_2: ReverseCard;
}

// ── P-4 (二 연애를 막는 것 2/2) ───────────────────────────────
// 2-3 피해야 할 인연(slotId 20 매트릭스) + 2-4 착각 인연.

export interface InfoRow {
  key: string;
  val: string;
}

export interface IllusionSignal {
  value: string;
  sub: string;
}

export interface IllusionGoodCard {
  value: string;
  sub: string;
}

export interface PaidChapterP4 {
  akyon_slot_id: string;      // "m-water-yang"
  akyon_keyword_tags: ReadonlyArray<string>;   // 5
  akyon_info_rows: ReadonlyArray<InfoRow>;     // 6
  ai_akyon: string;
  illusion_stitle: string;
  illusion_signals: ReadonlyArray<IllusionSignal>; // 3
  illusion_good_card: IllusionGoodCard;
  ai_illusion: string;
}

// ── P-5 (三 매력 분석) ────────────────────────────────────────
// 3-1 매력 지수 + 매력살 카드 + 3-2 메커니즘 + 3-3 감각 포인트.

export interface CharmSalView {
  charm_key: string;
  name_kor: string;
  name_han: string;
  trait: string;
}

export interface StageCard {
  label: string;
  value: string;
  sub: string;
}

export type PointStrength = "weak" | "medium" | "strong";

export interface PointCard {
  label: string;
  strength: PointStrength;
  flame_label: string;
  sub: string;
}

export interface PaidChapterP5 {
  charm_score: number;        // 0~100 (charmStrength)
  charm_percentile: number;   // 상위 N% (백엔드 100 - lookup_percentile)
  charm_sals: ReadonlyArray<CharmSalView>;
  stage_cards: ReadonlyArray<StageCard>;
  point_cards: ReadonlyArray<PointCard>;
  ai_charm: string;
  ai_mechanism: string;
  ai_sense: string;
}

// ── P-6 (四 붉은 실이 이어진 사람 1/2) ───────────────────────
// 4-1 인연 외형/매칭/첫 만남 + 4-2 속마음 투시.

export interface InnerCard {
  label: string;
  value: string;
  sub: string;
}

export interface PaidChapterP6 {
  // 4-1
  match_slot_id: string;                     // "m-water-yang" — PersonFrame 동적 사진용
  keyword_tags: ReadonlyArray<string>;       // 5
  info_rows: ReadonlyArray<InfoRow>;         // 8
  ai_looks: string;
  ai_match: string;
  ai_first_meeting: string;
  bubble: string;
  // 4-2
  inner_cards: ReadonlyArray<InnerCard>;     // 3
  ai_inner: string;
}

// ── P-7 (四 결말 예측 시나리오 2/2) ──────────────────────────
// 4-3 세 갈래 결말 카드 (warn/good/amber) + 권유 AI.

export type EndingTone = "warn" | "good" | "amber";

export interface EndingCard {
  label: string;
  value: string;
  sub: string;
  tone: EndingTone;
}

export interface PaidChapterP7 {
  ending_card_1: EndingCard;   // warn
  ending_card_2: EndingCard;   // good (권장)
  ending_card_3: EndingCard;   // amber
  ai_ending: string;            // 일간별 4 단락
  notice: string;               // 🔮 안내문 (고정)
  bubble: string;               // 강연우 멘트 (고정)
}

// ── chapters wrapper ──────────────────────────────────────────
// P-8 ~ P-11은 백엔드 templates 작성 후 확장. 현재는 응답에 없으므로
// 프론트는 MOCK fallback (`*Page.tsx`의 MOCK_PN)으로 렌더한다.

export interface PaidChapters {
  p0?: PaidChapterP0;
  p1?: PaidChapterP1;
  p2?: PaidChapterP2;
  p3?: PaidChapterP3;
  p4?: PaidChapterP4;
  p5?: PaidChapterP5;
  p6?: PaidChapterP6;
  p7?: PaidChapterP7;
  // p8 ~ p11은 templates 작성 후 추가.
}

export interface PaidReport {
  order_id: string;
  status: PaidReportStatus;
  chapters: PaidChapters;
  expires_at: string;
}
