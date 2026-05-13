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

// HTML 명세 (line 2585~2678) 정밀 포팅.
// 6-1 오행 보완: stitle + card-good × 3 (색/공간/행동) + AI
// 6-2 매력살 활용: stitle + 한자 스케일 5단계 + card-good × 3 (감각/태도/언어) + AI + SD yw_04 + 버블

type CharmLevel = "微" | "弱" | "中" | "強" | "極";

// PaidChapterP9 backend wiring과 1:1.
interface PracticeData {
  // 6-1
  ohang_lack: string;          // "토(土)" 한자 포함
  ohang_method_cards: ReadonlyArray<{ label: string; value: string; sub: string }>;
  ai_ohang: string;
  // 6-2
  primary_charm_label: string;     // "도화살(桃花煞)" / "암록(暗祿)"
  charm_count: number;             // 0~6
  charm_current: CharmLevel;
  charm_target: CharmLevel;
  charm_practice_cards: ReadonlyArray<{ label: string; value: string; sub: string }>;
  charm_practice_body: string;
  ai_charm: string;
}

// 한자 5단계 — 의미는 정적, "현재 자리/목표 단계" 라벨은 activeLevel/targetLevel과 비교해서 동적으로 결정
const HANJA_SCALE_PRACTICE: ReadonlyArray<{
  char: CharmLevel;
  read: string;
  meaning: string;  // stage 본질 의미 (active/target 아닐 때 표시)
}> = [
  { char: "微", read: "미", meaning: "잠재 상태" },
  { char: "弱", read: "약", meaning: "살짝 깸" },
  { char: "中", read: "중", meaning: "중간 단계" },
  { char: "強", read: "강", meaning: "강하게 발동" },
  { char: "極", read: "극", meaning: "완전 발동" },
];

function getStageDesc(
  char: CharmLevel,
  activeLevel: CharmLevel,
  targetLevel: CharmLevel,
  meaning: string,
): string {
  if (char === activeLevel) return "현재 자리";
  if (char === targetLevel) return "목표 단계";
  return meaning;
}

const MOCK_P9: PracticeData = {
  ohang_lack: "토(土)",
  ohang_method_cards: [
    { label: "방법 1 · 색", value: "초록 계열 가까이 둬", sub: "토(土) 기운을 색으로 끌어와. 옷, 소품, 화면 다 좋아." },
    { label: "방법 2 · 공간", value: "동쪽 자리 의식해", sub: "동쪽이 토(土)의 자리야. 책상이든 침대 머리든 그 방향으로." },
    { label: "방법 3 · 행동", value: "아침 산책 30분", sub: "살아있는 기운을 몸에 채워. 식물, 나무, 흙 가까이." },
  ],
  ai_ohang:
    "토(土)가 비어 있어. 채워야 흐름이 도네. 빈 채로 두면 인연이 들어와도 머물 자리가 없어.\n\n" +
    "색은 초록. 옷이든 소품이든 화면이든 일상에 들여놔. 자리는 동쪽. 책상이든 침대 머리든 동쪽으로 돌려. 행동은 아침 산책. 30분이면 돼.\n\n" +
    "이 셋을 한 달만 의식해. 명줄의 매듭이 풀리기 시작해. 임수(壬水) 일간은 원래 깊은데 거기에 살아있는 기운이 들어가야 비로소 인연이 움직여. 작은 거 하나부터 시작하면 돼.",

  primary_charm_label: "도화살(桃花煞)",
  charm_count: 1,
  charm_current: "中",
  charm_target: "強",
  charm_practice_cards: [
    { label: "방법 1 · 감각", value: "자기 향 하나 고정", sub: "향수 한 방울이면 돼. 매번 같은 결로 박혀야 사람이 기억해." },
    { label: "방법 2 · 태도", value: "한 박자 머무는 눈빛", sub: "스쳐 보지 말고 잠깐 잡아. 도화는 시선에서 켜져." },
    { label: "방법 3 · 언어", value: "한 박자 늦게 답하기", sub: "바로 답하지 말고 한 호흡 쉬어. 그 빈 자리에 끌림이 와." },
  ],
  charm_practice_body:
    "향 한 방울. 한 박자 머무는 눈빛. 한 박자 늦게 답하기. 이 셋만 일주일 해봐. 中에서 強으로 한 칸 올라가.",
  ai_charm:
    "너에겐 매력살이 하나 있어. 이거만 잘 깨우면 돼. 도화살(桃花煞)은 살아 있어야 켜져. 잠재워 두면 그대로 잠들어.\n\n" +
    "향 한 방울. 한 박자 머무는 눈빛. 한 박자 늦게 답하기. 이 셋만 일주일 해봐. 中에서 強으로 한 칸 올라가.\n\n" +
    "도화살(桃花煞)은 임수(壬水) 일간과 잘 맞아. 깊은 결이라 매력이 켜지면 가만히 있어도 사람이 와. 안 깨우면 그대로 잠들어 있어. 결국 너의 선택이야.",
};

// data prop = PaidChapterP9 1:1. backend 미합성 시 MOCK fallback.
export default function PracticePage({ data }: { data?: PracticeData }) {
  const p: PracticeData = data ?? MOCK_P9;
  return (
    <section
      data-page-idx="9"
      className="text-[#d8d6d0]"
      style={{ fontFamily: "var(--font-pretendard)" }}
    >
      <PageHead
        chHanja="六"
        chCode="CH-6"
        title="실천 가이드"
        sub="오행 보완 · 매력살 활용"
        iconAsset="/yeonwoo/icon/icon_flint.svg"
      />

      {/* ── 6-1 오행 보완 ── */}
      <Sec>
        <SectionLabel qaSectionId="6-1">6-1 오행 보완</SectionLabel>
        <SectionTitle>
          부족한 <VarTag>{p.ohang_lack}</VarTag>을(를) 채우는 법.
        </SectionTitle>

        <CardsGrid>
          {p.ohang_method_cards.map((c) => (
            <CardGood
              key={c.label}
              label={c.label}
              value={c.value}
              sub={c.sub}
            />
          ))}
        </CardsGrid>

        <AiBlock text={p.ai_ohang} />
      </Sec>

      {/* ── 6-2 매력살 활용 ── */}
      <Sec>
        <SectionLabel qaSectionId="6-2">6-2 매력살 활용</SectionLabel>
        <SectionTitle>
          잠든 <VarTag>{p.primary_charm_label}</VarTag>을(를) 깨우는 법.
        </SectionTitle>

        <HanjaScale
          activeLevel={p.charm_current}
          targetLevel={p.charm_target}
        />

        <CardsGrid>
          {p.charm_practice_cards.map((c) => (
            <CardGood key={c.label} label={c.label} value={c.value} sub={c.sub} />
          ))}
        </CardsGrid>

        <SectionBody>{p.charm_practice_body}</SectionBody>

        <AiBlock text={p.ai_charm} />

        {/* SD yw_04 (sz-lg 140×140) + 강연우 버블 (data-flow="left") */}
        <div className="flex items-start gap-3 my-3">
          <div className="relative w-[140px] h-[140px] flex-shrink-0">
            <Image
              src="/yeonwoo/sd_yw/yw_04.png"
              alt="강연우 — 매력살 활용"
              fill
              sizes="140px"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="flex-1">
            <YeonwooBubble text="기운을 바꾸는 방법이야. 지금 당장 해." />
          </div>
        </div>
      </Sec>
    </section>
  );
}

// ── 로컬 컴포넌트 ──

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

// card-good (3-tier 청록)
function CardGood({
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
        background: "rgba(29,158,117,0.07)",
        border: "0.5px solid rgba(29,158,117,0.2)",
      }}
    >
      <div
        className="text-[12px] font-semibold uppercase mb-[14px]"
        style={{ color: "#5DCAA5", letterSpacing: "0.08em" }}
      >
        {label}
      </div>
      <div
        className="text-[14px] font-semibold leading-[1.45] mb-[8px]"
        style={{ color: "#a0e8d0", wordBreak: "keep-all" }}
      >
        {value}
      </div>
      <div
        className="text-[14px] leading-[1.7]"
        style={{
          color: "rgba(160,220,200,0.8)",
          wordBreak: "keep-all",
        }}
      >
        {sub}
      </div>
    </div>
  );
}

// 한자 5단계 스케일 (P-9 매력살 활용) — 현재 단계 + 목표 단계 둘 다 강조.
function HanjaScale({
  activeLevel,
  targetLevel,
}: {
  activeLevel: CharmLevel;
  targetLevel: CharmLevel;
}) {
  return (
    <div
      className="my-3 rounded-[10px] p-3"
      style={{
        background: "#141413",
        border: "0.5px solid #2a2a28",
      }}
    >
      <div className="grid grid-cols-5 gap-1.5">
        {HANJA_SCALE_PRACTICE.map((item) => {
          const isActive = item.char === activeLevel;
          const isTarget = item.char === targetLevel;
          const highlight = isActive || isTarget;
          return (
            <div
              key={item.char}
              className="flex flex-col items-center text-center px-1 py-2 rounded-[6px]"
              style={{
                background: isActive
                  ? "rgba(232,201,160,0.10)"
                  : isTarget
                    ? "rgba(212,83,126,0.08)"
                    : "transparent",
                border: isActive
                  ? "0.5px solid rgba(232,201,160,0.45)"
                  : isTarget
                    ? "0.5px dashed rgba(212,83,126,0.45)"
                    : "0.5px solid transparent",
              }}
            >
              <span
                className="text-[22px] mb-1"
                style={{
                  fontFamily: "var(--font-nanum-myeongjo)",
                  color: isActive ? "#E8C9A0" : isTarget ? "#D4537E" : "#666",
                  fontWeight: highlight ? 700 : 400,
                }}
              >
                {item.char}
              </span>
              <span
                className="text-[10px] mb-1"
                style={{
                  color: isActive ? "#E8C9A0" : isTarget ? "#D4537E" : "#888",
                  letterSpacing: "0.02em",
                  wordBreak: "keep-all",
                }}
              >
                {item.read}
              </span>
              <span
                className="text-[10px] leading-[1.4]"
                style={{
                  color: highlight ? "#b0aea4" : "#666",
                  wordBreak: "keep-all",
                }}
              >
                {getStageDesc(item.char, activeLevel, targetLevel, item.meaning)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
