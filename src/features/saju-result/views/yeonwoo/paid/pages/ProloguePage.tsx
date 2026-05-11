import Image from "next/image";
import type {
  IlganCard,
  OhangKey,
  OhangStrength,
  PaidChapterP0,
  SajuPillarsP0,
} from "../../../../domain/paidReport";
import AiBlock from "../components/AiBlock";
import PageHead from "../components/PageHead";
import QaTemplateLink from "../components/QaTemplateLink";
import SajuPillarsBox from "../components/SajuPillarsBox";

interface ProloguePageProps {
  data?: PaidChapterP0;
}

// dev/디자인 미리보기용 더미. 백엔드 응답이 채워지면 props.data로 대체된다.
const MOCK_P0: PaidChapterP0 = {
  saju_pillars: {
    si_g: "戊",
    si_j: "申",
    il_g: "壬",
    il_j: "戌",
    wl_g: "丙",
    wl_j: "辰",
    yr_g: "庚",
    yr_j: "子",
  },
  ohang_strength: { mok: 50, hwa: 38, to: 15, geum: 48, su: 88 },
  ohang_excess: "su",
  ohang_lack: "to",
  ilgan: "임수(壬水)",
  ilgan_card: {
    name_kor: "임수",
    name_han: "壬水",
    subtitle: "큰 물 · 깊은 바다",
    essence:
      "깊고 잔잔한데 안에서 끊임없이 도는 물. 보이는 것보다 훨씬 큰 사람.",
    in_love: [
      "한 번 빠지면 끝까지 가는 결",
      "표현이 늦지만 한 번 하면 깊음",
      "침묵으로 사랑을 증명하려는 경향",
    ],
    caution: "네 깊이를 못 받는 사람한테 가지 마.",
  },
  // 백엔드 templates/yeonwoo_p0_intro.py compose_p0_intro(임수,수,토) 출력 결과 동기화.
  // 실 적용 시 백엔드 응답 → props.data.ai_intro로 자동 전달됨.
  ai_intro:
    "촛불 앞에 앉으니까 네 결이 보여.\n\n임수(壬水) 일간이라 겉으론 차분한데 속은 깊은 사람이지. 한 번 마음 주면 다 줘버리는 결이야. 매력은 분명한데, 그게 너를 살리기도 하고 다치게도 해.\n\n그러나 수(水)가 너무 넘쳐서 사람들이 그 깊이에 겁을 먹어. 그러다 떠나기도 하지.\n\n그리고 토(土)가 비어 있어서 받쳐주는 자리가 약해. 그래서 흘러내리는 거야.\n\n그러니깐 다음 장부터 이걸 하나씩 풀어줄게. 너는 거기 그대로 있어. 내가 다 보여줄 테니까.",
};

const OHANG_LABELS: Record<OhangKey, { hanja: string; hangul: string }> = {
  mok: { hanja: "木", hangul: "목" },
  hwa: { hanja: "火", hangul: "화" },
  to: { hanja: "土", hangul: "토" },
  geum: { hanja: "金", hangul: "금" },
  su: { hanja: "水", hangul: "수" },
};

const OHANG_ORDER: OhangKey[] = ["mok", "hwa", "to", "geum", "su"];

export default function ProloguePage({ data }: ProloguePageProps) {
  const p0 = data ?? MOCK_P0;

  return (
    <section
      data-page-idx="0"
      className="bg-[#151513] text-[#d8d6d0]"
      style={{ fontFamily: "var(--font-pretendard)" }}
    >
      <PageHead
        chHanja="序"
        chCode="CH-0"
        title="시작에 앞서"
        sub="너의 명줄을 펼치기 전에"
        iconAsset="/yeonwoo/motif/motif_seal_jeom.svg"
        iconOpacity={0.35}
      />
      <SajuPillarsSection pillars={p0.saju_pillars} />
      <OhangStrengthSection
        strength={p0.ohang_strength}
        excess={p0.ohang_excess}
        lack={p0.ohang_lack}
      />
      <IlganCardSection ilgan={p0.ilgan} card={p0.ilgan_card} />
      <GlossarySection />
      <YeonwooViewSection aiIntro={p0.ai_intro} />
    </section>
  );
}

// PageHead는 공통 컴포넌트 사용 (../components/PageHead) — P-1과 동일 디자인 (한자 박스 4모서리 ㄱ자 + 그라디언트 배경 + 우측 챕터 아이콘 글로우).

// ── 섹션 공통 헤더 ─────────────────────────────────────────────

function SectionLabel({
  slabel,
  stitle,
  qaSectionId,
}: {
  slabel: string;
  stitle: React.ReactNode;
  qaSectionId?: string;
}) {
  return (
    <>
      <div className="text-[13px] font-medium tracking-[0.05em] text-[#888] uppercase mb-[5px]">
        {slabel}
        {qaSectionId ? <QaTemplateLink sectionId={qaSectionId} /> : null}
      </div>
      <div
        className="text-[17px] font-semibold leading-[1.5] mb-2 text-[#d8d6d0]"
        style={{ wordBreak: "keep-all" }}
      >
        {stitle}
      </div>
    </>
  );
}

function SectionBody({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[15px] leading-[1.75] mb-2 text-[#b0aea4]"
      style={{ wordBreak: "keep-all", letterSpacing: "-0.01em" }}
    >
      {children}
    </div>
  );
}

// 사용자 데이터 변수(예: ILGAN, OHANG_EXCESS) 강조 — 박스 제거 + bold + 메인 골드.
function VarTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-bold text-[#E8C9A0]">{children}</span>
  );
}

// ── 0-1 사주 원국 ─────────────────────────────────────────────
// 무료 결과 페이지(yeonwoo/sections/SajuChartSection.tsx)의 PillarBox 디자인을
// SajuPillarsBox 컴포넌트에 가져옴. 일관성 + 무료/유료 비교 검증.

function SajuPillarsSection({ pillars }: { pillars: SajuPillarsP0 }) {
  return (
    <div className="px-[14px] pt-[30px] pb-5 border-b border-[#1e1e1c]">
      <SectionLabel
        slabel="0-1 너의 사주 원국"
        stitle="네 명줄을 이루는 여덟 글자."
      />
      <div className="my-2.5">
        <SajuPillarsBox pillars={pillars} />
      </div>
      <SectionBody>
        네 사주 여덟 글자야. 가운데 강조된 게 일간 — 너 자신을 나타내는 글자야.
        이 한 글자가 모든 풀이의 시작이야.
      </SectionBody>
    </div>
  );
}

// ── 0-2 오행의 흐름 ─────────────────────────────────────────────

function OhangStrengthSection({
  strength,
  excess,
  lack,
}: {
  strength: OhangStrength;
  excess: OhangKey;
  lack: OhangKey;
}) {
  return (
    <div className="px-[14px] py-5 border-b border-[#1e1e1c]">
      <SectionLabel slabel="0-2 오행의 흐름" stitle="다섯 기운의 분포." />
      <div className="flex flex-col gap-2 my-2.5">
        {OHANG_ORDER.map((key) => {
          const value = clamp01(strength[key]);
          const isExcess = key === excess;
          const isLack = key === lack;
          const tag = isExcess
            ? "과다"
            : isLack
              ? "부족"
              : value < 40
                ? "낮음"
                : "보통";
          const fillColor = isExcess ? "#E24B4A" : isLack ? "#555" : "#888";
          const tagColor = isExcess ? "#E24B4A" : "#888";
          const tagWeight = isExcess || isLack ? 600 : 400;
          return (
            <div key={key} className="flex items-center gap-2 text-[13px]">
              <span
                className="min-w-[50px] text-[#d8d6d0]"
                style={{ fontFamily: "var(--font-nanum-myeongjo)" }}
              >
                {OHANG_LABELS[key].hanja} ({OHANG_LABELS[key].hangul})
              </span>
              <div className="flex-1 h-2.5 bg-[#1a1a18] border border-[#333] rounded-[5px] overflow-hidden">
                <div
                  className="h-full rounded-[5px]"
                  style={{ width: `${value}%`, background: fillColor }}
                />
              </div>
              <span
                className="min-w-[42px] text-right"
                style={{ color: tagColor, fontWeight: tagWeight }}
              >
                {tag}
              </span>
            </div>
          );
        })}
      </div>
      <SectionBody>
        오행은 너의 기운 분포야. 너무 많은 것도 부족한 것도 둘 다 흐름을 막아.{" "}
        <VarTag>
          {OHANG_LABELS[excess].hanja} ({OHANG_LABELS[excess].hangul})
        </VarTag>
        {josa(OHANG_LABELS[excess].hangul, "이", "가")} 넘치고,{" "}
        <VarTag>
          {OHANG_LABELS[lack].hanja} ({OHANG_LABELS[lack].hangul})
        </VarTag>
        {josa(OHANG_LABELS[lack].hangul, "이", "가")} 비어 있는 게 보여.
      </SectionBody>
    </div>
  );
}

function clamp01(v: number): number {
  if (!Number.isFinite(v)) return 0;
  if (v < 0) return 0;
  if (v > 100) return 100;
  return v;
}

// 한글 받침에 따라 조사 선택. "목/금"은 받침 O → "이", "화/토/수"는 받침 X → "가".
function josa(word: string, withBatchim: string, withoutBatchim: string): string {
  if (!word) return withoutBatchim;
  const last = word[word.length - 1].charCodeAt(0);
  if (last < 0xac00 || last > 0xd7a3) return withoutBatchim;
  return (last - 0xac00) % 28 !== 0 ? withBatchim : withoutBatchim;
}

// ── 0-3 일간 카드 ─────────────────────────────────────────────

function IlganCardSection({ ilgan, card }: { ilgan: string; card: IlganCard }) {
  return (
    <div className="px-[14px] py-5 border-b border-[#1e1e1c]">
      <SectionLabel
        slabel="0-3 너의 일간"
        stitle={
          <>
            <VarTag>{ilgan}</VarTag> — 결을 한눈에.
          </>
        }
        qaSectionId="0-3"
      />
      <div
        className="relative rounded-xl p-3.5 my-2.5"
        style={{
          background: "linear-gradient(180deg,#1a1a18 0%,#161614 100%)",
          border: "0.5px solid rgba(200,168,112,0.25)",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{
            background: "linear-gradient(90deg,transparent,#E8C9A0,transparent)",
          }}
        />
        <div className="text-[16px] font-semibold text-[#E8C9A0] mb-0.5">
          너의 일간 — {card.name_kor}({card.name_han})
        </div>
        <div className="text-[12px] text-[#888] mb-2.5 pb-2 border-b border-dashed border-[rgba(200,168,112,0.2)] tracking-[0.05em]">
          {card.subtitle}
        </div>

        <IlganSec label="결">
          <p>{card.essence}</p>
        </IlganSec>

        <IlganSec label="연애에서">
          <ul className="list-none p-0 m-0">
            {card.in_love.map((item, i) => (
              <li key={i} className="relative pl-2.5 mb-[3px] text-[#d8d6d0]">
                <span className="absolute left-[2px] text-[#E8C9A0]">·</span>
                {item}
              </li>
            ))}
          </ul>
        </IlganSec>

        <IlganSec label="주의">
          <p>{card.caution}</p>
        </IlganSec>
      </div>
    </div>
  );
}

function IlganSec({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-2.5">
      <div className="text-[13px] text-[#E8C9A0] tracking-[0.15em] mb-1 uppercase">
        {label}
      </div>
      <div className="text-[13px] leading-[1.7] text-[#d8d6d0]">{children}</div>
    </div>
  );
}

// ── 0-4 사주 용어 사전 (정적) ─────────────────────────────────

const GLOSSARY_ITEMS: Array<{
  term: string;
  desc: string;
  sub?: Array<{ name: string; desc: string }>;
}> = [
  {
    term: "일간 (日干)",
    desc: "사주 8글자 중 가운데 글자. 너 자신을 나타내는 핵심 기준점.",
  },
  {
    term: "일주 (日柱)",
    desc: "일간과 그 아래 지지 한 쌍. 본바탕을 가장 진하게 보여주는 기둥.",
  },
  {
    term: "오행 (五行)",
    desc: "목·화·토·금·수 다섯 기운. 사주 안 분포 강약을 본다.",
  },
  {
    term: "천간 / 지지",
    desc: "글자의 위(천간) / 아래(지지). 8글자는 천간 4 + 지지 4로 구성.",
  },
  {
    term: "과다 / 부족",
    desc: "오행이 평균보다 많거나 적은 상태. 흐름이 막히는 원인이 됨.",
  },
  {
    term: "매력살 (魅力煞)",
    desc: "연애운에 작용하는 살들의 묶음.",
    sub: [
      { name: "도화살 (桃花煞)", desc: "— 사람을 끌어당기는 매력의 별" },
      { name: "홍염살 (紅艶煞)", desc: "— 강한 끌림과 인상을 만드는 별" },
      { name: "천을귀인 (天乙貴人)", desc: "— 귀한 인연을 부르는 길신" },
    ],
  },
  {
    term: "십성 (十星)",
    desc: "일간을 기준으로 한 다른 글자들과의 관계. 비견·식신·재성·관성·인성 등 10가지 분류.",
  },
  {
    term: "용신 (用神)",
    desc: "너에게 가장 도움이 되는 기운. 부족한 자리를 채워주는 핵심 변수.",
  },
];

function GlossarySection() {
  return (
    <div className="px-[14px] py-5 border-b border-[#1e1e1c]">
      <SectionLabel
        slabel="0-4 알아두면 좋은 사주 용어"
        stitle="앞으로 자주 나올 말들."
      />
      <div
        className="bg-[#141413] rounded-[10px] p-3.5 my-2.5"
        style={{ border: "0.5px solid rgba(200,168,112,0.15)" }}
      >
        <div className="text-[13px] text-[#E8C9A0] tracking-[0.15em] mb-2.5 pb-2 border-b border-dashed border-[rgba(200,168,112,0.2)] uppercase">
          사주 용어 사전
        </div>
        {GLOSSARY_ITEMS.map((item, i) => (
          <div key={i} className={i === GLOSSARY_ITEMS.length - 1 ? "" : "mb-2.5"}>
            <div className="text-[13px] font-semibold text-[#E8C9A0] mb-0.5">
              {item.term}
            </div>
            <div className="text-[13px] text-[#aaa] leading-[1.6]">
              {item.desc}
            </div>
            {item.sub && (
              <div className="mt-1 pl-2">
                {item.sub.map((s, j) => (
                  <div key={j} className="text-[13px] leading-[1.5] mb-0.5">
                    <span className="text-[#E8C9A0] font-medium">{s.name}</span>{" "}
                    <span className="text-[#888]">{s.desc}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 0-5 연우가 본 너 ──────────────────────────────────────────

function YeonwooViewSection({ aiIntro }: { aiIntro: string }) {
  return (
    <div className="px-[14px] py-5">
      <SectionLabel
        slabel="0-5 연우가 본 너"
        stitle="첫눈에 들어온 너의 결."
        qaSectionId="0-5"
      />

      <div className="flex justify-center my-3">
        <div className="relative w-full max-w-[280px] aspect-square">
          <Image
            src="/yeonwoo/sd_yw/yw_01.png"
            alt="강연우 — 첫인사 일러스트"
            fill
            sizes="(max-width: 480px) 80vw, 280px"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      <AiBlock text={aiIntro} />

      <div
        className="rounded-[10px] mt-2 px-3 py-2.5 text-[15px] leading-[1.85] italic bg-[#1e1e1c] text-[#d8d4cc]"
        style={{ border: "0.5px solid #333", wordBreak: "keep-all" }}
      >
        <div className="not-italic text-[12px] mb-1 tracking-[0.05em] text-[#E8C9A0]">
          강연우
        </div>
        &ldquo;이게 너의 시작이야. 천천히 따라와.&rdquo;
      </div>
    </div>
  );
}

// AiBlock / AiCorner / AiFlame은 공통 컴포넌트로 이전 (../components/AiBlock).
