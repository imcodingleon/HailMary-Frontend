import Image from "next/image";
import PageHead from "../components/PageHead";
import AiBlock from "../components/AiBlock";
import {
  Sec,
  SectionLabel,
  SectionTitle,
  SectionBody,
  VarTag,
  YeonwooBubble,
} from "../components/Section";

// HTML 명세 (line 2078~2224) 정밀 포팅.
// 3-1 나의 매력 지수: 매력살 한자 + 한자 5단계 스케일 + sbody + AI + SD yw_06 + 강연우 버블
// 3-2 이성이 끌리는 메커니즘: 카드 4개 (1~4단계) + AI + 강연우 버블
// 3-3 감각적 매력 포인트: 카드 3개 (눈빛/목소리/분위기) + 촛불 일러스트 + flame-label + AI

interface CharmData {
  charm_sal: string;          // "도화살(桃花煞)" 등 한자 포함
  charm_score: number;        // 0~100 (백엔드 점수)
  charm_level_label: string;  // "중 · 보통" 등 (점수→단계 변환 결과)
  stage_cards: ReadonlyArray<{ label: string; value: string; sub: string }>; // 3-2 4개
  point_cards: ReadonlyArray<{
    label: string;       // "매력 포인트 1 · 눈빛"
    strength: "weak" | "medium" | "strong";
    flame_label: string; // "은은하게"
    sub: string;
  }>;
  ai_charm: string;
  ai_mechanism: string;
  ai_sense: string;
}

const MOCK_P5: CharmData = {
  // 백엔드 templates/yeonwoo_p5_charm.py compose_p5_charm(ilgan="임수", charm_sal="도화살", charm_level="中") 결과 동기화 (예정).
  charm_sal: "도화살(桃花煞)",
  charm_score: 62,
  charm_level_label: "중 · 보통",
  stage_cards: [
    {
      label: "1단계 · 첫 마주침",
      value: "눈빛이 먼저 닿아",
      sub: "너는 말보다 눈으로 먼저 닿는 사람이야.",
    },
    {
      label: "2단계 · 반복 접촉",
      value: "두 번째부터 깊어져",
      sub: "너는 한 번 보고 안 끝나. 두 번째에 마음이 묶여.",
    },
    {
      label: "3단계 · 익숙함",
      value: "곁에 있는 게 자연스러워져",
      sub: "너의 깊이가 편안함으로 변해. 그게 너의 무기야.",
    },
    {
      label: "4단계 · 끌림",
      value: "상대가 빠져들어",
      sub: "이쯤 되면 네가 가만히 있어도 상대가 와.",
    },
  ],
  point_cards: [
    {
      label: "매력 포인트 1 · 눈빛",
      strength: "weak",
      flame_label: "은은하게",
      sub: "조용히 응시할 때가 가장 강해.",
    },
    {
      label: "매력 포인트 2 · 목소리",
      strength: "medium",
      flame_label: "잔잔하게",
      sub: "낮게 말할 때 사람이 다가와.",
    },
    {
      label: "매력 포인트 3 · 분위기",
      strength: "strong",
      flame_label: "깊게",
      sub: "말없이 앉아있을 때의 깊이감이 너의 핵심이야.",
    },
  ],
  ai_charm:
    "도화살(桃花煞)이 네 사주에 들어와 있어. 매력살이라는 건 타고난 빛 같은 거야. 가만히 있어도 새어 나오는 결.\n\n" +
    "임수(壬水) 일간은 원래 매력 자체가 깊어. 얕게 빛나는 사람이 아니야. 한 번 보면 잊히지 않는 결을 가진 사람이지. 근데 너는 그걸 잠재워 두고 살아. 거울 앞에 안 서고, 향수도 안 뿌리고, 옷장 앞에서 머뭇거리지.\n\n" +
    "옷, 향, 시선 — 다 도구야. 안 쓰면 매력살은 잠들어. 일주일만 의식적으로 깨워봐. 거울 보고 한 번 웃고, 향수 한 번 더 뿌려. 그 정도면 흐름이 돌아. 너는 이미 가진 사람이야. 켜기만 하면 돼.",
  ai_mechanism:
    "네 매력은 한 번에 안 보여. 첫 마주침은 약해. 두 번째에 흐름이 묶이고, 세 번째에 익숙함으로 바뀌어. 그 다음에 상대가 빠져.\n\n" +
    "임수(壬水) 일간이 그래. 깊이감으로 끌어당기는 사람이야. 첫인상으로 승부 보는 결이 아니야. 그러니까 한 번 만나고 평가하지 마. 두 번째까지 갈 자리를 만들어. 거기서 네 진짜 매력이 켜져.",
  ai_sense:
    "너의 매력은 눈빛, 목소리, 분위기에 다 들어 있어. 특히 침묵할 때의 깊이가 너의 핵심이야.\n\n" +
    "눈빛은 흘리지 마. 잡아. 한 사람을 보면 그 사람만 봐. 임수(壬水) 일간 특유의 깊이감이 그렇게 나와. 시선 하나로 사람이 묶여.\n\n" +
    "목소리는 낮게 해. 빠르게 말하면 깊이가 안 실려. 한 박자 늦게, 낮은 톤으로. 그게 너야.\n\n" +
    "분위기는 만들지 말고 두면 돼. 가만히 앉아 있을 때의 결이 너의 가장 강한 무기야. 꾸미려 하면 흐려져. 이 세 개만 의식해도 같은 너인데 전혀 달라 보여.",
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
        <SectionTitle>
          매력살 — <VarTag>{p.charm_sal}</VarTag>
        </SectionTitle>

        <CharmScoreGauge score={p.charm_score} label={p.charm_level_label} />

        <SectionBody>
          현재 단계: <VarTag>{p.charm_level_label}</VarTag> — 자리에 맞는 흐름이야.
          다만 너는 이걸 안 쓰고 있어. 매력은 켜야 보여.
        </SectionBody>

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
