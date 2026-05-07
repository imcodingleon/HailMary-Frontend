import Image from "next/image";
import PageHead from "../components/PageHead";
import AiBlock from "../components/AiBlock";
import {
  Sec,
  SectionLabel,
  SectionTitle,
  CardYw,
  VarTag,
  YeonwooBubble,
} from "../components/Section";

interface CharmData {
  charm_sal: string;        // "도화살" 등
  charm_score: number;      // 0~100
  charm_point_1: string;
  charm_point_2: string;
  charm_point_3: string;
  ai_opening: string;       // Ch3 오프닝 300~350자
  ai_mechanism: string;     // 매력 발동 메커니즘 200~250자
  ai_sense: string;         // Ch3 클로징 250~300자
}

const MOCK_P5: CharmData = {
  charm_sal: "도화살(桃花煞)",
  charm_score: 78,
  charm_point_1: "눈빛",
  charm_point_2: "목소리",
  charm_point_3: "분위기",
  ai_opening:
    "촛불 가까이 와봐. 네 매력은 분명히 있어. 사람을 끄는 결이 사주 안에 박혀 있어.\n\n도화살(桃花煞)이 네 자리에 앉아 있어. 사람을 끌어당기는 별이야. 너는 의식 안 해도 누군가 너를 보고 있어. 그게 너의 진짜 자리야.\n\n근데 너는 그 매력을 너무 자주 묻어둬. 깊은 물 안에 가라앉혀. 한 번쯤은 표면으로 끌어올려 봐.",
  ai_mechanism:
    "매력은 단계로 발동해. 처음엔 눈. 그 다음에 소리. 마지막에 분위기. 셋이 합쳐지면 상대는 못 빠져나와.\n\n壬水 일간은 시간이 지날수록 깊어지는 결이야. 첫인상보다 두 번째가 더 강해. 세 번째에 결정 나.",
  ai_sense:
    "감각적인 매력이 너한테 있어. 의식하지 마. 의식하면 사라져.\n\n작은 디테일에 사람이 묶여. 향, 손짓, 침묵. 너는 큰 동작보다 작은 결로 사람을 묶는 사람이야. 그게 네 자리야. 거기서 흔들리지 마.",
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
        title="나의 매력 분석"
        sub="매력 지수 · 끌리는 방식 · 감각적 매력"
        iconAsset="/yeonwoo/icon/icon_candle.svg"
      />

      <Sec>
        <SectionLabel>3-1 매력살 진단</SectionLabel>
        <SectionTitle>
          네 자리에 앉은 살은 <VarTag>{p.charm_sal}</VarTag>.
        </SectionTitle>
        <CardYw
          label="매력 지수"
          value={`${p.charm_score} / 100`}
          sub="사주 안에 박힌 매력살의 강도. 의식 안 해도 사람을 끄는 결이야."
        />
        <CharmGauge score={p.charm_score} />
        <AiBlock text={p.ai_opening} />

        <div className="flex items-start gap-3 my-3">
          <div className="relative w-[96px] h-[128px] flex-shrink-0">
            <Image
              src="/yeonwoo/sd_yw/yw_06.png"
              alt="강연우 — 매력 분석"
              fill
              sizes="96px"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="flex-1">
            <YeonwooBubble text="네 매력은 분명히 있어. 너만 모르고 있을 뿐이야." />
          </div>
        </div>
      </Sec>

      <Sec>
        <SectionLabel>3-2 매력 발동 메커니즘</SectionLabel>
        <SectionTitle>4단계로 작동해.</SectionTitle>
        <div className="grid grid-cols-2 gap-2 my-2.5">
          <StageCard idx="1단계" title="시선" desc="처음 마주친 짧은 순간." />
          <StageCard idx="2단계" title="소리" desc="목소리 한 줄로 묶여." />
          <StageCard idx="3단계" title="분위기" desc="공기까지 네 결로 변해." />
          <StageCard idx="4단계" title="결정" desc="상대는 이미 못 빠져나와." />
        </div>
        <AiBlock text={p.ai_mechanism} />
      </Sec>

      <Sec>
        <SectionLabel>3-3 감각 매력 포인트</SectionLabel>
        <SectionTitle>세 가지 결이 너를 끌어당겨.</SectionTitle>
        <CharmPoint label="포인트 1" value={p.charm_point_1} strength="weak" />
        <CharmPoint label="포인트 2" value={p.charm_point_2} strength="medium" />
        <CharmPoint label="포인트 3" value={p.charm_point_3} strength="strong" />
        <AiBlock text={p.ai_sense} />
        <YeonwooBubble text="작은 결이 사람을 묶어. 의식하지 마." />
      </Sec>
    </section>
  );
}

function CharmGauge({ score }: { score: number }) {
  const pct = Math.max(0, Math.min(100, score));
  return (
    <div className="my-2.5">
      <div
        className="h-2 rounded-[4px] overflow-hidden"
        style={{ background: "#1a1a18", border: "0.5px solid #333" }}
      >
        <div
          className="h-full rounded-[4px]"
          style={{ width: `${pct}%`, background: "linear-gradient(90deg, #E8C9A0, #D4537E)" }}
        />
      </div>
    </div>
  );
}

function StageCard({ idx, title, desc }: { idx: string; title: string; desc: string }) {
  return (
    <div
      className="rounded-[8px] px-2.5 py-3"
      style={{ background: "#1a1a18", border: "0.5px solid rgba(200,168,112,0.2)" }}
    >
      <div className="text-[12px] text-[#E8C9A0] tracking-[0.05em] mb-0.5">{idx}</div>
      <div className="text-[14px] font-semibold text-[#d8d6d0] mb-1">{title}</div>
      <div className="text-[12px] text-[#a8a6a0] leading-[1.5]" style={{ wordBreak: "keep-all" }}>
        {desc}
      </div>
    </div>
  );
}

function CharmPoint({ label, value, strength }: { label: string; value: string; strength: "weak" | "medium" | "strong" }) {
  return (
    <div
      className="flex items-center gap-3 my-1.5 rounded-[8px] px-3 py-2.5"
      style={{ background: "#1a1a18", border: "0.5px solid rgba(200,168,112,0.2)" }}
    >
      <span
        aria-hidden
        className="inline-block w-5 h-7 bg-no-repeat bg-contain flex-shrink-0"
        style={{ backgroundImage: `url(/yeonwoo/candle/candle_${strength}.svg)` }}
      />
      <div className="flex-1">
        <div className="text-[12px] text-[#888] mb-0.5">{label}</div>
        <div className="text-[15px] font-semibold text-[#d8d6d0]">
          <VarTag>{value}</VarTag>
        </div>
      </div>
    </div>
  );
}
