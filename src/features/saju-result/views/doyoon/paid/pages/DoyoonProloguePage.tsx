import type {
  OhangKey,
  OhangStrength,
  PaidChapterP0Doyoon,
  SajuPillarsP0,
} from "../../../../domain/paidReport";

interface DoyoonProloguePageProps {
  data?: PaidChapterP0Doyoon;
}

// dev/미리보기 fallback — 백엔드 응답 채워지면 props.data로 대체.
const MOCK_P0: PaidChapterP0Doyoon = {
  saju_pillars: {
    si_g: "戊", si_j: "申",
    il_g: "壬", il_j: "戌",
    wl_g: "丙", wl_j: "辰",
    yr_g: "庚", yr_j: "子",
  },
  ohang_strength: { mok: 50, hwa: 38, to: 15, geum: 48, su: 88 },
  ohang_excess: "su",
  ohang_lack: "to",
  ilgan: "임수(壬水)",
  user_name: "홍길동",
  ilgan_card: {
    name_kor: "임수",
    name_han: "壬水",
    subtitle: "큰 물 / 깊은 바다 유형",
    data_traits: [
      "깊이감 평균 대비 1.7배",
      "표현 빈도 0.4배",
      "감정 회복 속도 1.4배 느림",
    ],
    love_variables: [
      "장기 관계 유지율 ↑",
      "첫 진입 속도 ↓",
      "깊이 호환 매칭 시 안정성 ↑↑",
    ],
    main_conflict: "표현 따라잡기 못하는 상대와 매칭 시 충돌.",
  },
  ai_intro:
    "홍길동님, 데이터 정리 다 끝났어요.\n\n일간은 임수(壬水) — 깊이감과 통찰력이 평균 대비 1.7배인 유형이에요. 매력 변수도 동일 일간 평균보다 높게 측정돼요.\n\n다만 오행 분포에서 수(水) 기운이 과다(상위 15%) 상태고, 토(土) 기운이 부족(하위 12%)으로 측정돼요. 이 두 변수가 연애 영역에서 직접적인 영향을 주거든요. 실제로 동일 패턴 표본의 신규 인연 접촉률이 평균보다 36% 낮게 잡혀요.\n\n다음 장부터 이 변수들을 하나씩 분석해드릴게요. 그냥 따라오시면 돼요.",
};

const OHANG_LABELS: Record<OhangKey, { hanja: string; hangul: string }> = {
  mok: { hanja: "木", hangul: "목" },
  hwa: { hanja: "火", hangul: "화" },
  to:  { hanja: "土", hangul: "토" },
  geum:{ hanja: "金", hangul: "금" },
  su:  { hanja: "水", hangul: "수" },
};

const OHANG_ORDER: ReadonlyArray<OhangKey> = ["mok", "hwa", "to", "geum", "su"];

// 도윤 색
const C = {
  bg: "#fffdf7",
  warmGold: "#8B6914",
  goldSoft: "#a07840",
  text: "#2c1a08",
  textSoft: "#4a3215",
  textMeta: "#7a5020",
  pink: "#D4537E",
  excess: "#E24B4A",
  lack: "#a8a07a",
};

export default function DoyoonProloguePage({ data }: DoyoonProloguePageProps) {
  const d = data ?? MOCK_P0;

  return (
    <div className="rounded-md" style={{ background: C.bg, color: C.text }}>
      {/* 페이지 헤더 */}
      <DoyoonPageHead title="시작에 앞서" sub="분석 시작 전 데이터 요약" ch="0" />

      {/* 0-1 사주 원국 데이터 */}
      <SectionDy>
        <SLabel>0-1 사주 원국 데이터</SLabel>
        <STitle>8개 글자로 구성된 사주 데이터.</STitle>
        <SajuTableDoyoon pillars={d.saju_pillars} />
        <SBody>
          <VarTag>{d.user_name}</VarTag>님 사주 8글자예요. 가운데 강조된 일간이 모든 분석의
          기준점이고, 나머지 7글자가 변수로 작동해요.
        </SBody>
      </SectionDy>

      {/* 0-2 오행 분포 데이터 */}
      <SectionDy>
        <SLabel>0-2 오행 분포 데이터</SLabel>
        <STitle>5개 변수의 강도 측정값.</STitle>
        <OhangListDoyoon
          strength={d.ohang_strength}
          excess={d.ohang_excess}
          lack={d.ohang_lack}
        />
        <SBody>
          오행 5개 변수의 강도예요. 평균 대비 +1.7배 이상은 과다, -0.6배 이하는 부족으로
          분류해요.{" "}
          <VarTag>
            {OHANG_LABELS[d.ohang_excess].hangul}({OHANG_LABELS[d.ohang_excess].hanja})
          </VarTag>{" "}
          과다,{" "}
          <VarTag>
            {OHANG_LABELS[d.ohang_lack].hangul}({OHANG_LABELS[d.ohang_lack].hanja})
          </VarTag>{" "}
          부족 상태로 측정돼요.
        </SBody>
      </SectionDy>

      {/* 0-3 일간 분석 */}
      <SectionDy>
        <SLabel>0-3 일간 분석</SLabel>
        <STitle>
          <VarTag>{d.ilgan}</VarTag> — 핵심 데이터.
        </STitle>
        <IlganCardDoyoon userName={d.user_name} card={d.ilgan_card} />
      </SectionDy>

      {/* 0-4 사주 용어 사전 (고정) */}
      <SectionDy>
        <SLabel>0-4 알아두면 좋은 사주 용어</SLabel>
        <STitle>앞으로 자주 나올 용어들.</STitle>
        <GlossaryDoyoon />
      </SectionDy>

      {/* 0-5 분석 진입 요약 */}
      <SectionDy>
        <SLabel>0-5 분석 진입 요약</SLabel>
        <STitle>본격 분석에 앞서 핵심 데이터부터.</STitle>
        <DoyoonSdSpotlight />
        <AiBlockDoyoon body={d.ai_intro} />
        <BubbleDoyoon
          name="한도윤"
          quote="이게 분석의 출발점이에요. 차근차근 가볼게요."
        />
      </SectionDy>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// Inline sub-components (P-0 전용; P-1+ 진입 시 공통 추출 검토)
// ════════════════════════════════════════════════════════════════════

function DoyoonPageHead({ title, sub, ch }: { title: string; sub: string; ch: string }) {
  return (
    <div
      className="flex items-center gap-3 px-3.5 py-3 relative"
      style={{ borderBottom: `0.5px solid rgba(139,105,20,0.10)` }}
    >
      <span
        className="inline-flex items-center justify-center min-w-[50px] h-[34px] rounded-[5px] px-2"
        style={{
          background: "rgba(139,105,20,0.10)",
          border: "0.5px solid rgba(139,105,20,0.25)",
          color: C.warmGold,
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: "0.08em",
        }}
      >
        序 · CH-{ch}
      </span>
      <div className="flex-1">
        <div className="text-[16px] font-bold" style={{ color: C.text }}>
          {title}
        </div>
        <div className="text-[12px] mt-[2px]" style={{ color: C.goldSoft }}>
          {sub}
        </div>
      </div>
      <span
        aria-hidden
        className="inline-block w-[42px] h-[42px] bg-no-repeat bg-center bg-contain"
        style={{
          backgroundImage: "url(/doyoon/dy_sub/seal_bunseok_dy_.png)",
          opacity: 0.35,
        }}
      />
    </div>
  );
}

function SectionDy({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="px-3.5 py-5 relative"
      style={{ borderBottom: `0.5px solid rgba(139,105,20,0.10)` }}
    >
      {children}
    </div>
  );
}

function SLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[13px] font-semibold mb-1.5 uppercase"
      style={{ color: C.goldSoft, letterSpacing: "0.05em" }}
    >
      {children}
    </div>
  );
}

function STitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[17px] font-bold mb-2 leading-[1.5]"
      style={{ color: C.text, letterSpacing: "-0.01em", wordBreak: "keep-all" }}
    >
      {children}
    </div>
  );
}

function SBody({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[15px] leading-[1.75] mb-2"
      style={{ color: C.textMeta, letterSpacing: "-0.01em", wordBreak: "keep-all" }}
    >
      {children}
    </div>
  );
}

function VarTag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block rounded px-[7px] py-[2px] text-[13px] font-medium"
      style={{
        background: "#EEEDFE",
        color: "#3C3489",
        border: "0.5px solid #AFA9EC",
      }}
    >
      {children}
    </span>
  );
}

function SajuTableDoyoon({ pillars }: { pillars: SajuPillarsP0 }) {
  const cols = [
    { label: "時 시주", g: pillars.si_g, j: pillars.si_j, isIlgan: false },
    { label: "日 일주", g: pillars.il_g, j: pillars.il_j, isIlgan: true },
    { label: "月 월주", g: pillars.wl_g, j: pillars.wl_j, isIlgan: false },
    { label: "年 연주", g: pillars.yr_g, j: pillars.yr_j, isIlgan: false },
  ];
  return (
    <div className="grid grid-cols-4 gap-1.5 my-2">
      {cols.map((col, i) => (
        <div key={i} className="flex flex-col items-center">
          <div
            className="text-[12px] font-semibold mb-1"
            style={{
              color: col.isIlgan ? C.pink : C.goldSoft,
              letterSpacing: "0.05em",
            }}
          >
            {col.label}
          </div>
          <SajuCellDoyoon char={col.g} isIlgan={col.isIlgan} />
          <SajuCellDoyoon char={col.j} isIlgan={false} />
        </div>
      ))}
    </div>
  );
}

function SajuCellDoyoon({ char, isIlgan }: { char: string; isIlgan: boolean }) {
  return (
    <div
      className="flex items-center justify-center w-full text-[22px] font-bold mb-1 rounded-md"
      style={{
        height: 56,
        background: isIlgan ? "rgba(212,83,126,0.10)" : "#fff8ec",
        border: isIlgan
          ? `0.5px solid ${C.pink}`
          : "0.5px solid rgba(139,105,20,0.22)",
        color: isIlgan ? C.pink : C.text,
      }}
    >
      {char}
    </div>
  );
}

function OhangListDoyoon({
  strength, excess, lack,
}: { strength: OhangStrength; excess: OhangKey; lack: OhangKey }) {
  const valueFor = (k: OhangKey): number => strength[k];
  const tagFor = (k: OhangKey, v: number): { label: string; tone: "excess" | "lack" | "normal" } => {
    if (k === excess) return { label: "과다", tone: "excess" };
    if (k === lack) return { label: "부족", tone: "lack" };
    if (v >= 60) return { label: "보통", tone: "normal" };
    return { label: "낮음", tone: "normal" };
  };
  return (
    <div className="flex flex-col gap-1.5 my-2">
      {OHANG_ORDER.map((k) => {
        const v = valueFor(k);
        const t = tagFor(k, v);
        const fillColor = t.tone === "excess" ? C.excess : t.tone === "lack" ? C.lack : C.warmGold;
        const tagColor = t.tone === "excess" ? C.excess : t.tone === "lack" ? "#888" : C.goldSoft;
        return (
          <div key={k} className="flex items-center gap-2.5">
            <span
              className="text-[14px] font-semibold min-w-[50px]"
              style={{ color: C.text }}
            >
              {OHANG_LABELS[k].hanja} ({OHANG_LABELS[k].hangul})
            </span>
            <div
              className="flex-1 h-[10px] rounded-[5px] overflow-hidden"
              style={{ background: "rgba(139,105,20,0.10)" }}
            >
              <div
                className="h-full rounded-[5px]"
                style={{ background: fillColor, width: `${v}%` }}
              />
            </div>
            <span
              className="text-[13px] min-w-[42px] text-right font-semibold"
              style={{ color: tagColor }}
            >
              {t.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function IlganCardDoyoon({
  userName, card,
}: { userName: string; card: PaidChapterP0Doyoon["ilgan_card"] }) {
  return (
    <div
      className="rounded-lg px-4 py-3.5 my-2 relative"
      style={{
        background: "#fff8ec",
        border: "0.5px solid rgba(139,105,20,0.22)",
      }}
    >
      <div
        className="text-[16px] font-bold"
        style={{ color: C.warmGold }}
      >
        <VarTag>{userName}</VarTag>님의 일간 — {card.name_kor}({card.name_han})
      </div>
      <div className="text-[13px] mt-0.5" style={{ color: C.goldSoft }}>
        {card.subtitle}
      </div>

      <IlganSec label="데이터 특성">
        <ul className="list-none pl-1">
          {card.data_traits.map((t, i) => (
            <li key={i} className="relative pl-3 leading-[1.7] text-[13px]"
                style={{ color: C.text }}>
              <span className="absolute left-[2px]" style={{ color: C.warmGold }}>·</span>
              {t}
            </li>
          ))}
        </ul>
      </IlganSec>

      <IlganSec label="연애 특화 변수">
        <ul className="list-none pl-1">
          {card.love_variables.map((v, i) => (
            <li key={i} className="relative pl-3 leading-[1.7] text-[13px]"
                style={{ color: C.text }}>
              <span className="absolute left-[2px]" style={{ color: C.warmGold }}>·</span>
              {v}
            </li>
          ))}
        </ul>
      </IlganSec>

      <IlganSec label="주요 변수 충돌">
        <div className="text-[13px] leading-[1.7]" style={{ color: C.text }}>
          {card.main_conflict}
        </div>
      </IlganSec>
    </div>
  );
}

function IlganSec({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-2.5">
      <div
        className="text-[12px] font-semibold mb-1"
        style={{ color: C.warmGold, letterSpacing: "0.05em" }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

const GLOSSARY: ReadonlyArray<{ term: string; desc: string; subs?: ReadonlyArray<{ name: string; desc: string }> }> = [
  { term: "일간 (日干)", desc: "사주 8글자 중 가운데 글자. 너 자신을 나타내는 핵심 기준점." },
  { term: "일주 (日柱)", desc: "일간과 그 아래 지지 한 쌍. 본바탕을 가장 진하게 보여주는 기둥." },
  { term: "오행 (五行)", desc: "목·화·토·금·수 다섯 기운. 사주 안 분포 강약을 본다." },
  { term: "천간 / 지지", desc: "글자의 위(천간) / 아래(지지). 8글자는 천간 4 + 지지 4로 구성." },
  { term: "과다 / 부족", desc: "오행이 평균보다 많거나 적은 상태. 흐름이 막히는 원인이 됨." },
  {
    term: "매력살 (魅力煞)",
    desc: "연애운에 작용하는 살들의 묶음.",
    subs: [
      { name: "도화살 (桃花煞)", desc: "사람을 끌어당기는 매력의 별" },
      { name: "홍염살 (紅艶煞)", desc: "강한 끌림과 인상을 만드는 별" },
      { name: "천을귀인 (天乙貴人)", desc: "귀한 인연을 부르는 길신" },
    ],
  },
  { term: "십성 (十星)", desc: "일간을 기준으로 한 다른 글자들과의 관계. 비견·식신·재성·관성·인성 등 10가지 분류." },
  { term: "용신 (用神)", desc: "너에게 가장 도움이 되는 기운. 부족한 자리를 채워주는 핵심 변수." },
];

function GlossaryDoyoon() {
  return (
    <div
      className="rounded-lg px-3.5 py-3 my-2"
      style={{
        background: "rgba(139,105,20,0.04)",
        border: "0.5px solid rgba(139,105,20,0.15)",
      }}
    >
      <div
        className="text-[13px] font-bold mb-2"
        style={{ color: C.warmGold, letterSpacing: "0.05em" }}
      >
        사주 용어 사전
      </div>
      {GLOSSARY.map((g) => (
        <div key={g.term} className="mb-2.5">
          <div
            className="text-[13px] font-bold mb-0.5"
            style={{ color: C.warmGold }}
          >
            {g.term}
          </div>
          <div
            className="text-[13px] leading-[1.6]"
            style={{ color: C.textMeta }}
          >
            {g.desc}
          </div>
          {g.subs && (
            <div className="mt-1.5 pl-2">
              {g.subs.map((s) => (
                <div key={s.name} className="text-[13px] leading-[1.7]">
                  <span
                    className="font-semibold"
                    style={{ color: C.warmGold }}
                  >
                    {s.name}
                  </span>{" "}
                  <span style={{ color: C.textMeta }}>— {s.desc}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function DoyoonSdSpotlight() {
  return (
    <div className="flex justify-center my-3">
      <div
        aria-label="한도윤 — 진입/미소"
        className="bg-no-repeat bg-center bg-contain"
        style={{
          backgroundImage: "url(/doyoon/sd_dy/dy_01.png)",
          width: 280,
          height: 280,
        }}
      />
    </div>
  );
}

function AiBlockDoyoon({ body }: { body: string }) {
  return (
    <div
      className="relative rounded-md my-2.5"
      style={{
        background:
          "linear-gradient(rgba(255,250,240,0.62), rgba(255,250,240,0.62)), url(/doyoon/texture/texture_hanji_light.png)",
        backgroundSize: "auto, 200px 200px",
        padding: "14px 16px",
        boxShadow:
          "0 0 0 0.5px rgba(139,105,20,0.22), 0 1px 3px rgba(120,80,30,0.06)",
      }}
    >
      <Corner pos="tl" />
      <Corner pos="tr" />
      <Corner pos="bl" />
      <Corner pos="br" />
      <div
        className="absolute right-[10px] top-[10px] w-[96px] h-[72px] bg-no-repeat bg-right-top bg-contain"
        style={{
          backgroundImage: "url(/doyoon/icon/icon_line_chart.png)",
          opacity: 0.13,
          pointerEvents: "none",
        }}
        aria-hidden
      />
      <p
        className="relative text-[14px] leading-[1.95] whitespace-pre-line"
        style={{ color: C.textSoft, zIndex: 1 }}
      >
        {body}
      </p>
    </div>
  );
}

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const map: Record<"tl" | "tr" | "bl" | "br", { top?: number; bottom?: number; left?: number; right?: number; transform?: string }> = {
    tl: { top: 5, left: 5 },
    tr: { top: 5, right: 5, transform: "scaleX(-1)" },
    bl: { bottom: 5, left: 5, transform: "scaleY(-1)" },
    br: { bottom: 5, right: 5, transform: "scale(-1,-1)" },
  };
  return (
    <span
      aria-hidden
      className="absolute w-5 h-5 bg-no-repeat bg-contain pointer-events-none"
      style={{
        ...map[pos],
        backgroundImage: "url(/doyoon/motif/motif_corner_frame_piece.png)",
        opacity: 0.7,
        filter: "hue-rotate(-15deg) saturate(1.05)",
        zIndex: 0,
      }}
    />
  );
}

function BubbleDoyoon({ name, quote }: { name: string; quote: string }) {
  return (
    <div
      className="rounded-[10px] px-[13px] py-[11px] my-2 italic text-[15px] leading-[1.85]"
      style={{
        background: "#fff8f0",
        color: C.text,
        border: "0.5px solid rgba(139,105,20,0.20)",
        letterSpacing: "-0.01em",
        wordBreak: "keep-all",
      }}
    >
      <div
        className="text-[12px] mb-1 not-italic font-bold"
        style={{ color: C.warmGold, letterSpacing: "0.05em" }}
      >
        {name}
      </div>
      &ldquo;{quote}&rdquo;
    </div>
  );
}
