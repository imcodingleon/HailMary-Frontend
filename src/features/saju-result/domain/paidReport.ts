// 유료 리포트 도메인 타입.
// 백엔드 `domains/ai`의 PaidReport 응답을 프론트 view-shape으로 정의.
// chapters는 페이지 작업(P-0 ~ P-11) 진입 시 점진적으로 페이지별 키를 확장한다.

export type PaidReportStatus = "pending" | "ready" | "expired";

export type CharacterKey = "yeonwoo" | "doyoon";

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

// ── P-0 도윤 패널 ─────────────────────────────────────────────
// 백엔드 `domains/ai`의 PaidChapterP0Doyoon과 1:1 매칭.
// 연우와 별도 chapters 키 (`p0_doyoon`). ilgan_card 스키마가 다름 + user_name 호명.

export interface DoyoonIlganCard {
  name_kor: string;
  name_han: string;
  subtitle: string;
  data_traits: ReadonlyArray<string>;
  love_variables: ReadonlyArray<string>;
  main_conflict: string;
}

export interface PaidChapterP0Doyoon {
  saju_pillars: SajuPillarsP0;        // 연우와 공유
  ohang_strength: OhangStrength;      // 연우와 공유
  ohang_excess: OhangKey;
  ohang_lack: OhangKey;
  ilgan: string;
  user_name: string;
  ilgan_card: DoyoonIlganCard;
  ai_intro: string;
}

// ── P-1 도윤 패널 ─────────────────────────────────────────────
// 백엔드 PaidChapterP1Doyoon과 1:1.

export interface EmotionPointDoyoon {
  label: string;
  pct: number;
  is_crisis: boolean;
}

export interface PaidChapterP1Doyoon {
  user_name: string;
  ilgan: string;                              // "임수(壬水)"
  ilju: string;                               // "임술(壬戌)"
  // 1-1
  love_type: string;
  pct_value: number;
  distribution_pct: number;
  ai_opening: string;
  // 1-2
  trigger_1: string;
  trigger_2: string;
  trigger_3: string;
  trigger_flow_pcts: ReadonlyArray<number>;   // 3 — (30, 62, 88)
  ai_trigger: string;
  // 1-3
  emotion_curve: ReadonlyArray<EmotionPointDoyoon>;  // 4
  crisis_multiplier: string;                  // "1.8배"
  ai_emotion: string;
  bubble_quote: string;
}

// ── P-2 도윤 패널 ─────────────────────────────────────────────
// 백엔드 PaidChapterP2Doyoon과 1:1. 2026-05-21 원본 도윤_final.html 구조 정합 재설계.

export interface HurtTypeDoyoon {
  keyword: string;       // "무관심 신호 인지"
  risk_pct: string;      // "78%"
  desc: string;
}

export interface RecoveryMeterDoyoon {
  label: string;         // "직후" / "1개월" / "3개월" / "6개월"
  pct: number;           // 0~100 회복률
}

export interface PaidChapterP2Doyoon {
  user_name: string;
  // 1-4 약점 트리거 (card-warn × 2)
  hurt_type_1: HurtTypeDoyoon;
  hurt_type_2: HurtTypeDoyoon;
  ai_hurt: string;
  // 1-5 회복 곡선 (meter × 4 + SD + bubble)
  meters: ReadonlyArray<RecoveryMeterDoyoon>;   // 4
  recovery_lag_multiplier: string;              // "1.4배"
  ai_recovery: string;
  sd_avatar_asset: string;                      // "dy_03" 등
  recovery_bubble: string;
}

// ── P-3 도윤 패널 ─────────────────────────────────────────────
// 백엔드 PaidChapterP3Doyoon과 1:1.

export interface BlockadeOhangP3Doyoon {
  ohang_excess: string;            // "수"
  ohang_excess_hanja: string;      // "水"
  blockade_pct: string;            // "상위 15%"
  blockade_multiplier: string;     // "1.7배"
}

export interface PatternEntryDoyoon {
  keyword: string;
  pct: string;
  desc: string;
}

export interface ControlStrategyDoyoon {
  keyword: string;
  desc: string;
  effect_pct: string;
}

// ── P-6 도윤 패널 ─────────────────────────────────────────────

export interface InyonInfoRowDoyoon {
  key: string;
  val: string;
}

export interface BehaviorCardDoyoon {
  label: string;
  keyword: string;
  desc: string;
}

export interface PaidChapterP6Doyoon {
  user_name: string;
  match_slot_id: string;
  pct_value: string;
  keyword_tags: ReadonlyArray<string>;
  info_rows: ReadonlyArray<InyonInfoRowDoyoon>;
  compatibility_pct: string;
  ai_profile: string;
  ai_meeting: string;
  profile_bubble: string;
  interest_score: number;
  expression_score: number;
  durability_score: number;
  behavior_cards: ReadonlyArray<BehaviorCardDoyoon>;
  ai_pattern: string;
  sd_avatar_asset: string;
}

// ── P-5 도윤 패널 ─────────────────────────────────────────────

export interface RadarAxisDoyoon {
  name: string;
  value: number;
}

export interface ConversionStepDoyoon {
  label: string;
  pct: number;
}

export interface AppealMeterDoyoon {
  name: string;
  value: number;
}

export interface PaidChapterP5Doyoon {
  user_name: string;
  charm_pct: string;
  radar: ReadonlyArray<RadarAxisDoyoon>;
  strength_axis_1: string;
  strength_axis_2: string;
  strength_multiplier: string;
  ai_charm_index: string;
  sd_avatar_asset: string;
  charm_bubble: string;
  conversion_steps: ReadonlyArray<ConversionStepDoyoon>;
  ai_conversion: string;
  appeal_meters: ReadonlyArray<AppealMeterDoyoon>;
  ai_appeal: string;
}

// ── P-7 도윤 패널 ─────────────────────────────────────────────

export interface ScenarioCardDoyoon {
  prob_label: string;
  prob_tone: "low" | "high" | "best";
  title: string;
  desc: string;
}

export interface PaidChapterP7Doyoon {
  user_name: string;
  scenarios: ReadonlyArray<ScenarioCardDoyoon>;
  ai_ending: string;
  sd_avatar_asset: string;
  ending_bubble: string;
}

// ── P-8 도윤 패널 ─────────────────────────────────────────────

export interface MonthRowDoyoon {
  label: string;
  hearts: number;       // 1~5
  pct: number;
  state: string;
  desc: string;
  is_peak: boolean;
}

export interface PaidChapterP8Doyoon {
  user_name: string;
  months: ReadonlyArray<MonthRowDoyoon>;
  ai_intro: string;
  sd_avatar_asset: string;
  bubble: string;
}

// ── P-9 도윤 패널 ─────────────────────────────────────────────

export interface OhangMethodCardDoyoon {
  label: string;
  keyword: string;
  desc: string;
}

export interface RiskCardDoyoon {
  label: string;
  tone: "warn" | "amber";
  keyword: string;
  desc: string;
}

export interface PaidChapterP9Doyoon {
  user_name: string;
  ohang_lack: string;
  ohang_methods: ReadonlyArray<OhangMethodCardDoyoon>;
  ohang_boost_pct: string;
  ai_ohang: string;
  risk_cards: ReadonlyArray<RiskCardDoyoon>;
  ai_risk: string;
  current_score: number;
  target_score: number;
  ai_optimize: string;
  sd_avatar_asset: string;
  optimize_bubble: string;
}

export interface PaidChapterP3Doyoon {
  user_name: string;
  // 2-1 구조적 원인
  blockade: BlockadeOhangP3Doyoon;
  ai_blockade: string;
  blockade_bubble: string;
  // 2-2 반복 패턴
  patterns: ReadonlyArray<PatternEntryDoyoon>;   // 3
  ai_pattern: string;
  pattern_bubble: string;
  // 2-2-1 변수 통제
  strategies: ReadonlyArray<ControlStrategyDoyoon>;   // 2
  strategy_bubble: string;
  sd_avatar_asset: string;
}

// ── P-4 도윤 패널 ─────────────────────────────────────────────
// 백엔드 PaidChapterP4Doyoon과 1:1.

export interface AkyonInfoRowDoyoon {
  key: string;
  val: string;
}

export interface IllusionSignDoyoon {
  keyword: string;
  pct: string;
  desc: string;
}

export interface PaidChapterP4Doyoon {
  user_name: string;
  // 2-3 비호환
  akyon_slot_id: string;
  keyword_tags: ReadonlyArray<string>;            // 5
  info_rows: ReadonlyArray<AkyonInfoRowDoyoon>;   // 10
  ai_akyon: string;
  sd_avatar_asset: string;                         // "dy_08"
  akyon_bubble: string;
  // 2-4 착각 인연
  illusion_signs: ReadonlyArray<IllusionSignDoyoon>;   // 3
  ai_illusion: string;
  illusion_bubble: string;
  // 결정 분기점 (모든 일간 공통)
  decisive_gradient_label: string;
  real_growth_pct: string;
  fake_drop_pct: string;
  accuracy_multiplier: string;
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

// ── P-8 (五 12개월 운명선) ─────────────────────────────────────
// 5-1 12개월 타임라인 + 일간별 흐름 AI.

export type KnotKind = "loose" | "tight" | "glowing";

export interface MonthRow {
  label: string;        // "5월 (이번달)" / "6월" / "'27. 1월"
  hearts: number;       // 1~5
  knot: KnotKind;
  state: string;        // 시작/진입/상승/피크/심화/안정/정체/재상승/2차 피크/신뢰/충전/1년차 마무리
  desc: string;
  is_peak?: boolean;
}

export interface PaidChapterP8 {
  months: ReadonlyArray<MonthRow>;   // 12
  ai_intro: string;                  // 3 단락
  bubble: string;                    // 강연우 멘트 (고정)
}

// ── P-9 (六 실천 가이드) — 6-1 오행 보완 + 6-2 매력살 활용 ────

export interface OhangMethodCard {
  label: string;
  value: string;
  sub: string;
}

export type CharmStage = "微" | "弱" | "中" | "強" | "極";

export interface CharmPracticeCard {
  label: string;
  value: string;
  sub: string;
}

export interface PaidChapterP9 {
  // 6-1
  ohang_lack: string;                                  // "토(土)" 한자 포함
  ohang_method_cards: ReadonlyArray<OhangMethodCard>;  // 3 (색/공간/행동)
  ai_ohang: string;                                    // 3 단락
  // 6-2
  primary_charm_key: string;       // "do_hwa_sal" / "am_rok" 등
  primary_charm_label: string;     // "도화살(桃花煞)"
  charm_count: number;             // 0~6
  charm_current: CharmStage;
  charm_target: CharmStage;
  charm_practice_cards: ReadonlyArray<CharmPracticeCard>;  // 3 (감각/태도/언어)
  charm_practice_body: string;     // 카드 3 요약 + 단계 변화 한 줄
  ai_charm: string;                // 3 단락
}

// ── P-10 (七 편지) ─────────────────────────────────────────────
// 박스 1·2·3 통합. 박스 3 답장은 AI 호출 1회 (fill-in-the-middle).

export interface PaidChapterP10 {
  ilju_with_hanja: string;     // "병인(丙寅)"
  box1_body: string;            // 박스 1 (도입 멘트 + step1 부분집합 본문)
  box2_body: string;            // 박스 2 (4단락 합성)
  quote_text: string;           // step3 raw 또는 "..."
  quote_label: string;          // "— 네가 적은 너의 고민" / "— 적지 못한 너의 고민"
  box3_body: string;            // AI 답장 또는 폴백
  emphasis: string;             // 박스 3 강조구 (일간 10셀)
  tail: string;                 // 박스 3 꼬리 (고정)
  uses_ai: boolean;             // AI 호출 여부 (감사 로그용)
  // 도윤 패널 chip 표시용 (연우는 null)
  step1_labels?: string[] | null;
  step2_labels?: string[] | null;
}

// ── chapters wrapper ──────────────────────────────────────────
// P-11은 백엔드 templates 작성 후 확장. 현재는 응답에 없으므로
// 프론트는 MOCK fallback (`*Page.tsx`의 MOCK_PN)으로 렌더한다.

export interface PaidChapters {
  p0?: PaidChapterP0;
  p0_doyoon?: PaidChapterP0Doyoon;
  p1?: PaidChapterP1;
  p1_doyoon?: PaidChapterP1Doyoon;
  p2?: PaidChapterP2;
  p2_doyoon?: PaidChapterP2Doyoon;
  p3?: PaidChapterP3;
  p3_doyoon?: PaidChapterP3Doyoon;
  p4?: PaidChapterP4;
  p4_doyoon?: PaidChapterP4Doyoon;
  p5_doyoon?: PaidChapterP5Doyoon;
  p6_doyoon?: PaidChapterP6Doyoon;
  p7_doyoon?: PaidChapterP7Doyoon;
  p8_doyoon?: PaidChapterP8Doyoon;
  p9_doyoon?: PaidChapterP9Doyoon;
  p5?: PaidChapterP5;
  p6?: PaidChapterP6;
  p7?: PaidChapterP7;
  p8?: PaidChapterP8;
  p9?: PaidChapterP9;
  p10?: PaidChapterP10;
  // p11은 templates 작성 후 추가.
}

// Amplitude user property 가공값 (백엔드 PaidUserPropertiesResponse 와 동일 형상).
// 원본 PII 는 절대 포함하지 않음 — 해시·이니셜·연령대·시진 등 가공값만.
export interface PaidReportUser {
  user_id: string;
  user_nickname: string | null;
  user_name_initial: string;
  user_email_domain: string;
  user_email_hash: string;
  birth_year: number;
  age_group: string;
  birth_branch: string | null;
  gender: string;
}

export interface PaidReport {
  order_id: string;
  status: PaidReportStatus;
  chapters: PaidChapters;
  expires_at: string;
  character: CharacterKey;
  user?: PaidReportUser | null;
}
