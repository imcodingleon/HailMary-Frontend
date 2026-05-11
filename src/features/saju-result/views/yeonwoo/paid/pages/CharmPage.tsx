import Image from "next/image";
import PageHead from "../components/PageHead";
import AiBlock from "../components/AiBlock";
import CharmSalCard, { type CharmSalProps } from "../components/CharmSalCard";
import {
  composeCharmAi,
  getStageCards,
  getPointCards,
  getMechanismAi,
  getSenseAi,
} from "../charm-ai";
import {
  Sec,
  SectionLabel,
  SectionTitle,
  YeonwooBubble,
} from "../components/Section";

// HTML 명세 (line 2078~2224) 정밀 포팅.
// 3-1 나의 매력 지수: 매력살 한자 + 한자 5단계 스케일 + sbody + AI + SD yw_06 + 강연우 버블
// 3-2 이성이 끌리는 메커니즘: 카드 4개 (1~4단계) + AI + 강연우 버블
// 3-3 감각적 매력 포인트: 카드 3개 (눈빛/목소리/분위기) + 촛불 일러스트 + flame-label + AI

interface CharmData {
  // 3-1
  charm_score: number;          // 0~100 (백엔드 charmStrength)
  charm_percentile: number;     // 상위 N% (예: 12 = 상위 12%, 백엔드 100 - lookup)
  charm_sals: ReadonlyArray<CharmSalProps>; // 보유 매력살만 (가변, 백엔드 charm_service.get_user_charm_sals)
  stage_cards: ReadonlyArray<{ label: string; value: string; sub: string }>; // 3-2 4개 (일간 10 변형)
  point_cards: ReadonlyArray<{
    label: string;       // "매력 포인트 1 · 눈빛"
    strength: "weak" | "medium" | "strong";
    flame_label: string; // "은은하게"
    sub: string;
  }>;
  ai_charm: string;       // 일간별 조언 (도화살 메타포 X)
  ai_mechanism: string;
  ai_sense: string;
}

const MOCK_P5: CharmData = {
  // 백엔드 templates/yeonwoo_p5_charm.py compose_p5_charm(ilgan="임수") + charm_service.get_user_charm_sals() 동기화 예정.
  charm_score: 72,
  charm_percentile: 18,  // 상위 18%
  charm_sals: [
    {
      charm_key: "do_hwa_sal",
      name_kor: "도화살",
      name_han: "桃花煞",
      trait: "사람을 끌어당기는 자기 매력",
    },
    {
      charm_key: "hong_yeom_sal",
      name_kor: "홍염살",
      name_han: "紅艶煞",
      trait: "한 번 보면 잊히지 않는 강렬한 매력",
    },
    {
      charm_key: "cheon_eul_gwi_in",
      name_kor: "천을귀인",
      name_han: "天乙貴人",
      trait: "귀인 중 최상 — 어디서든 사랑받는 결",
    },
  ],
  // 일간별 4 단계 카드 자동 합성 (charm-ai.ts getStageCards)
  stage_cards: getStageCards("임수"),
  // 일간별 3 매력 포인트 카드 자동 합성 (charm-ai.ts getPointCards)
  point_cards: getPointCards("임수"),
  // 보유 매력살 + 일간 기반 자동 합성 (charm-ai.ts composeCharmAi)
  ai_charm: composeCharmAi(
    ["do_hwa_sal", "hong_yeom_sal", "cheon_eul_gwi_in"],
    "임수",
  ),
  // 일간별 AI 박스 자동 합성 (charm-ai.ts)
  ai_mechanism: getMechanismAi("임수"),
  ai_sense: getSenseAi("임수"),
};

export default function CharmPage({ data }: { data?: CharmData }) {
  const p = data ?? MOCK_P5;
  return (
    <section
      data-page-idx="5"
      className="text-[#d8d6d0]"
      style={{ fontFamily: "var(--font-pretendard)" }}
    >
      <PageHead
        chHanja="三"
        chCode="CH-3"
        title="매력 분석"
        sub="매력 지수 · 끌리는 방식 · 감각적 매력"
        iconAsset="/yeonwoo/icon/icon_candle.svg"
      />

      {/* ── 3-1 나의 매력 지수 ── */}
      <Sec>
        <SectionLabel qaSectionId="3-1">3-1 나의 매력 지수</SectionLabel>
        <SectionTitle>매력살</SectionTitle>

        <CharmScoreGauge
          score={p.charm_score}
          label={`상위 ${p.charm_percentile}%`}
        />

        {/* 보유 매력살 카드 그리드 (가변 길이, 2-col grid) */}
        <div className="my-3 grid grid-cols-2 gap-2">
          {p.charm_sals.map((s) => (
            <CharmSalCard key={s.charm_key ?? s.name_kor} sal={s} />
          ))}
        </div>

        <AiBlock text={p.ai_charm} />

        {/* SD yw_06 (sz-md 120×120) + 강연우 버블 (data-flow="left") */}
        <div className="flex items-start gap-3 my-3">
          <div className="relative w-[120px] h-[120px] flex-shrink-0">
            <Image
              src="/yeonwoo/sd_yw/yw_06.png"
              alt="강연우 — 매력 분석"
              fill
              sizes="120px"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="flex-1">
            <YeonwooBubble text="매력 타고났으면서 왜 이렇게 안 쓰고 있어." />
          </div>
        </div>
      </Sec>

      {/* ── 3-2 이성이 끌리는 메커니즘 ── */}
      <Sec>
        <SectionLabel qaSectionId="3-2">3-2 이성이 끌리는 메커니즘</SectionLabel>
        <SectionTitle>네 매력이 가장 강하게 발동하는 4단계.</SectionTitle>

        <CardsGrid>
          {p.stage_cards.map((c, i) => (
            <CardYwTriTier
              key={i}
              label={c.label}
              value={c.value}
              sub={c.sub}
            />
          ))}
        </CardsGrid>

        <AiBlock text={p.ai_mechanism} />

        <YeonwooBubble text="이게 네 매력이 가장 강하게 발동하는 순간이야." />
      </Sec>

      {/* ── 3-3 감각적 매력 포인트 ── */}
      <Sec>
        <SectionLabel qaSectionId="3-3">3-3 감각적 매력 포인트</SectionLabel>
        <SectionTitle>네 몸에 새겨진 세 개의 매력살.</SectionTitle>

        <CardsGrid>
          {p.point_cards.map((c) => (
            <CharmPointCard
              key={c.label}
              label={c.label}
              strength={c.strength}
              flameLabel={c.flame_label}
              sub={c.sub}
            />
          ))}
        </CardsGrid>

        <AiBlock text={p.ai_sense} />
      </Sec>
    </section>
  );
}

// ── 매력 지수 게이지 (점수 + 그라디언트 바 + 단계 라벨) ──
function CharmScoreGauge({ score, label }: { score: number; label: string }) {
  const pct = Math.max(0, Math.min(100, score));
  return (
    <div
      className="my-3 rounded-[10px] p-4"
      style={{
        background: "#141413",
        border: "0.5px solid #2a2a28",
      }}
    >
      {/* 점수 + 단계 라벨 */}
      <div className="flex items-end justify-between mb-3">
        <div className="flex flex-col">
          <span
            className="text-[11px] uppercase mb-0.5"
            style={{ color: "#888", letterSpacing: "0.08em" }}
          >
            매력 지수
          </span>
          <span
            className="text-[13px]"
            style={{ color: "#E8C9A0", fontWeight: 600 }}
          >
            {label}
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span
            className="text-[36px] font-bold leading-none"
            style={{
              color: "#E8C9A0",
              fontFamily: "var(--font-nanum-myeongjo)",
            }}
          >
            {pct}
          </span>
          <span className="text-[14px] text-[#888]">/ 100</span>
        </div>
      </div>
      {/* 게이지 바 */}
      <div
        className="h-2.5 rounded-[5px] overflow-hidden"
        style={{
          background: "#1a1a18",
          border: "0.5px solid #333",
        }}
      >
        <div
          className="h-full rounded-[5px] transition-[width] duration-300"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, #E8C9A0 0%, #D4537E 100%)",
          }}
        />
      </div>
    </div>
  );
}

// .cards 그리드 (P-2/P-3/P-4 동일)
function CardsGrid({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="my-[7px]"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: "6px",
      }}
    >
      {children}
    </div>
  );
}

// .card-yw 3-tier (cl/cv/csub) — 3-2 단계 카드용
function CardYwTriTier({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div
      className="rounded-[8px] px-[11px] py-[10px]"
      style={{
        background: "#1a1a18",
        border: "0.5px solid #2a2a28",
      }}
    >
      <div
        className="text-[12px] font-semibold uppercase mb-[14px]"
        style={{ color: "#E8C9A0", letterSpacing: "0.08em" }}
      >
        {label}
      </div>
      <div
        className="text-[14px] font-semibold leading-[1.45] mb-[8px]"
        style={{ color: "#f0ede8", wordBreak: "keep-all" }}
      >
        {value}
      </div>
      <div
        className="text-[14px] leading-[1.7]"
        style={{
          color: "#b0aea4",
          letterSpacing: "-0.01em",
          wordBreak: "keep-all",
        }}
      >
        {sub}
      </div>
    </div>
  );
}

// 매력 포인트 카드 — cv 영역에 촛불 일러스트 + flame-label
function CharmPointCard({
  label,
  strength,
  flameLabel,
  sub,
}: {
  label: string;
  strength: "weak" | "medium" | "strong";
  flameLabel: string;
  sub: string;
}) {
  return (
    <div
      className="rounded-[8px] px-[11px] py-[10px]"
      style={{
        background: "#1a1a18",
        border: "0.5px solid #2a2a28",
      }}
    >
      <div
        className="text-[12px] font-semibold uppercase mb-[14px]"
        style={{ color: "#E8C9A0", letterSpacing: "0.08em" }}
      >
        {label}
      </div>
      <div className="flex items-end gap-2 mb-[8px]">
        <span
          aria-hidden
          className="inline-block w-6 h-10 bg-no-repeat bg-contain bg-bottom flex-shrink-0"
          style={{
            backgroundImage: `url(/yeonwoo/candle/candle_${strength}.svg)`,
          }}
        />
        <span
          className="text-[14px] font-semibold leading-[1.45] pb-1"
          style={{ color: "#f0ede8", wordBreak: "keep-all" }}
        >
          {flameLabel}
        </span>
      </div>
      <div
        className="text-[14px] leading-[1.7]"
        style={{
          color: "#b0aea4",
          letterSpacing: "-0.01em",
          wordBreak: "keep-all",
        }}
      >
        {sub}
      </div>
    </div>
  );
}
