// 임시 isolation preview — saju-result 공용 컴포넌트가 mock props로 렌더되는지 시각 확인.
// PR 전 삭제 예정. shared-ui 검증용.

"use client";

import {
  AvoidPartnerSection,
  BlockingSection,
  CharmCards,
  DestinedPartnerSection,
  FullResultIndexSection,
  RealReviewsSection,
  RomanceTimingSection,
  SajuChartSection,
  StickyCheckoutCta,
  WuxingChartSection,
  type BlockingDialogues,
  type ReviewItem,
} from "@/features/saju-result";
import type {
  CharmCopyPool,
  CharmView,
  MonthlyRomanceFlowView,
  SpouseMatchView,
} from "@/features/saju-result/domain/types";
import type {
  DayMaster,
  Pillar,
  Wuxing,
} from "@/features/saju/types";

const MOCK_PILLARS: Pillar[] = [
  {
    label: "년주",
    heaven: "甲",
    earth: "子",
    heavenHangul: "갑",
    earthHangul: "자",
    element: "목/수",
    hue: "#4FB84F",
    yinYang: { heaven: "양", earth: "양" },
    tenGod: { heaven: "비견", earth: "정인", heavenHanja: "比肩", earthHanja: "正印" },
    twelvePhase: { name: "목욕", hanja: "沐浴" },
    sinSals: [],
    unknown: false,
  },
  {
    label: "월주",
    heaven: "丙",
    earth: "寅",
    heavenHangul: "병",
    earthHangul: "인",
    element: "화/목",
    hue: "#E94E3F",
    yinYang: { heaven: "양", earth: "양" },
    tenGod: { heaven: "식신", earth: "비견", heavenHanja: "食神", earthHanja: "比肩" },
    twelvePhase: { name: "건록", hanja: "建祿" },
    sinSals: [],
    unknown: false,
  },
  {
    label: "일주",
    heaven: "甲",
    earth: "午",
    heavenHangul: "갑",
    earthHangul: "오",
    element: "목/화",
    hue: "#4FB84F",
    yinYang: { heaven: "양", earth: "양" },
    tenGod: { heaven: "—", earth: "상관", heavenHanja: "—", earthHanja: "傷官" },
    twelvePhase: { name: "사", hanja: "死" },
    sinSals: [{ slug: "do_hwa_sal", label: "도화살", hanja: "桃花" }],
    unknown: false,
  },
  {
    label: "시주",
    heaven: "戊",
    earth: "辰",
    heavenHangul: "무",
    earthHangul: "진",
    element: "토/토",
    hue: "#E5A938",
    yinYang: { heaven: "양", earth: "양" },
    tenGod: { heaven: "편재", earth: "편재", heavenHanja: "偏財", earthHanja: "偏財" },
    twelvePhase: { name: "쇠", hanja: "衰" },
    sinSals: [],
    unknown: false,
  },
];

const MOCK_WUXING: Wuxing = {
  counts: { 목: 3, 화: 2, 토: 2, 금: 0, 수: 1 },
  ratios: { 목: 38, 화: 25, 토: 25, 금: 0, 수: 12 },
  judgments: { 목: "발달", 화: "적정", 토: "적정", 금: "결핍", 수: "적정" },
};

const MOCK_DAYMASTER: DayMaster = {
  stem: "갑",
  stemHanja: "甲",
  strengthLevel: "신강",
  strengthScale: 7,
  strengthPosition: 5,
};

const MOCK_CHARM: CharmView = {
  typeKey: "im",
  manifestationKey: "stable",
  variantTags: ["dohwa_pillar_day"],
  charmStrength: 72,
  charmPercentile: 85,
  showPercent: true,
  label: "im",
  dohwa: { present: true, pillar: "day", hanja: "桃花" },
};

const MOCK_CHARM_COPIES: CharmCopyPool = {
  charmType: {
    gap: ["곧게 뻗는 결이 또렷하게 드러납니다."],
    eul: [""],
    byeong: [""],
    jeong: [""],
    mu: [""],
    gi: [""],
    gyeong: [""],
    shin: [""],
    im: ["깊고 잔잔한 결이 깊이로 발현됩니다."],
    gye: [""],
  },
  manifestation: {
    stable: ["오랜 시간 변하지 않는 일관된 매력으로 자리잡음."],
    crescendo: [""],
    burst: [""],
    peakFade: [""],
    oscillating: [""],
    latent: [""],
  },
  dohwa: {
    year: "",
    month: "",
    day: "일주에 자리잡은 도화 — 본인 매력의 코어 그 자체.",
    hour: "",
    multi: "",
    absent_cheoneul: "",
    absent_hongyeom: "",
    absent_geumyeo: "",
    absent_hwagae: "",
    absent_gongmang: "",
    absent: "",
  },
  pickDohwaCopyKey: () => "day",
};

const MOCK_BLOCKING_DIALOGUES: BlockingDialogues = {
  elementCopies: {
    목: ["木 과다 - 자기 페이스를 끌고 가는 힘이 강함."],
    화: [""],
    토: [""],
    금: [""],
    수: [""],
  },
  tenGodCopies: {
    stubborn_rivalry: ["고집과 쟁재 - 상대방이 쉽게 지칩니다."],
    expression_surplus: [""],
    officer_pressure: [""],
    wealth_scattered: [""],
    resource_dependent: [""],
    expression_absent: [""],
    officer_absent: [""],
    wealth_absent: [""],
  },
  fallbackCopies: ["균형형 - 강한 차단 패턴은 관측되지 않음."],
};

const MOCK_SPOUSE_MATCH: SpouseMatchView = {
  slotId: "f-water-yang",
  matchElement: "수",
  matchYinYang: "양",
};

const MOCK_FLOW: MonthlyRomanceFlowView = {
  visibleMonths: [
    { monthLabel: "1월", percentage: 42, hearts: 3, isPeak: false },
    { monthLabel: "2월", percentage: 56, hearts: 4, isPeak: false },
  ],
  lockedSlots: { totalCount: 10, peakOffsetFromVisible: 4 },
};

const MOCK_REVIEWS: ReviewItem[] = [
  {
    ilju: "壬戌",
    name: "연*님",
    stars: 5,
    body: "차분하게 설명해주셔서 와닿았어요.",
  },
  {
    ilju: "甲午",
    name: "달*님",
    stars: 5,
    body: "비호환 유형 설명이 소름이었어요.",
  },
];

export default function ResultPreviewPage() {
  return (
    <main className="min-h-screen bg-[#FDF5EA] pb-32" style={{ fontFamily: "var(--font-pretendard)" }}>
      <SajuChartSection pillars={MOCK_PILLARS} displayName="도윤" />
      <WuxingChartSection
        pillars={MOCK_PILLARS}
        dayMaster={MOCK_DAYMASTER}
        wuxing={MOCK_WUXING}
      />
      <CharmCards
        charm={MOCK_CHARM}
        sajuRequestId="mock_preview"
        copies={MOCK_CHARM_COPIES}
        theme="beige"
      />
      <BlockingSection
        blocking={{ elementOverloadKey: "목", tenGodPatternKey: "stubborn_rivalry" }}
        sajuRequestId="mock_preview"
        dialogues={MOCK_BLOCKING_DIALOGUES}
      />
      <AvoidPartnerSection
        slotId="m-fire-yang"
        imageBasePath="/images/spouse/doyoon/free/avoid"
      />
      <DestinedPartnerSection
        spouseMatch={MOCK_SPOUSE_MATCH}
        displayName="도윤"
        imageBasePath="/images/spouse/doyoon/free/match"
      />
      <RomanceTimingSection monthlyRomanceFlow={MOCK_FLOW} />
      <RealReviewsSection reviews={MOCK_REVIEWS} versionBadgeLabel="한도윤 버전" />
      <FullResultIndexSection displayName="도윤" />
      <StickyCheckoutCta ctaLabel="결제하고 한도윤의 정밀 리포트 읽기" />
    </main>
  );
}
