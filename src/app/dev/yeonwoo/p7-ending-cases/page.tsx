// dev 전용 P-7 4-3 결말 예측 시나리오 — 일간 10 케이스 비교.
//
// 일간별 결말 카드 3종 (warn/good/amber) + AI 박스.
// backend yeonwoo_p7_inner.compose_p7_inner() 결과를 _cases-p7.json에 추출.

import AiBlock from "@/features/saju-result/views/yeonwoo/paid/components/AiBlock";
import { YeonwooBubble } from "@/features/saju-result/views/yeonwoo/paid/components/Section";

import cases from "../_cases-p7.json";

type CardTone = "warn" | "good" | "amber";

interface EndingCard {
  label: string;
  value: string;
  sub: string;
  tone: CardTone;
}

interface CaseEntry {
  ilgan: string;
  result: {
    ending_card_1: EndingCard;
    ending_card_2: EndingCard;
    ending_card_3: EndingCard;
    ai_ending: string;
    notice: string;
    bubble: string;
  };
}

const CASES = cases as unknown as ReadonlyArray<CaseEntry>;
const LABELS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

export default function P7EndingCasesPage() {
  return (
    <main
      className="bg-[#0a0a09] min-h-screen"
      data-paid-scene="yeonwoo"
      style={{ fontFamily: "var(--font-pretendard)" }}
    >
      <div className="max-w-[430px] mx-auto py-6 px-4">
        <header className="mb-6 text-center">
          <h1
            className="text-[20px] font-bold text-[#E8C9A0]"
            style={{ fontFamily: "var(--font-nanum-myeongjo)" }}
          >
            P-7 4-3 결말 예측 시나리오 — 일간 10
          </h1>
          <p className="text-[12px] text-[#888] mt-2 leading-relaxed">
            카드 3종(warn/good/amber) + AI 박스 (모두 일간 변형)
          </p>
        </header>

        <div className="space-y-12">
          {CASES.map((c, i) => (
            <section key={c.ilgan}>
              <div className="mb-2 flex items-center gap-2">
                <span
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[13px] font-bold text-[#0a0a09]"
                  style={{ background: "#E8C9A0" }}
                >
                  {LABELS[i]}
                </span>
                <span className="text-[13px] text-[#d8d6d0]">{c.ilgan}</span>
              </div>

              <NoticeBox text={c.result.notice} />

              <CardsGrid>
                <EndingCardView card={c.result.ending_card_1} />
                <EndingCardView card={c.result.ending_card_2} />
                <EndingCardView card={c.result.ending_card_3} />
              </CardsGrid>

              <AiBlock text={c.result.ai_ending} />
              <YeonwooBubble text={c.result.bubble} />
            </section>
          ))}
        </div>

        <footer className="mt-10 mb-4 text-center text-[11px] text-[#666]">
          일간 10 케이스 톤 검증 — 어색한 카드/AI 박스 발견하면 알려주세요.
        </footer>
      </div>
    </main>
  );
}

// ── 로컬 컴포넌트 (DestinedPart2Page에서 복제) ────────────────

function NoticeBox({ text }: { text: string }) {
  return (
    <div
      className="my-2 rounded-[8px] px-3 py-2.5 flex items-start gap-2"
      style={{
        background: "rgba(212,83,126,0.06)",
        border: "0.5px solid rgba(212,83,126,0.22)",
      }}
    >
      <span className="text-[16px] leading-[1.4]" aria-hidden>
        🔮
      </span>
      <span
        className="text-[13px] leading-[1.7] flex-1"
        style={{ color: "rgba(232,201,160,0.95)", wordBreak: "keep-all" }}
      >
        {text}
      </span>
    </div>
  );
}

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

const CARD_TONE_STYLES: Record<
  CardTone,
  { bg: string; border: string; labelColor: string; valueColor: string; subColor: string }
> = {
  warn: {
    bg: "rgba(220,60,60,0.08)",
    border: "0.5px solid rgba(220,80,80,0.2)",
    labelColor: "#E24B4A",
    valueColor: "#f0c0c0",
    subColor: "rgba(240,180,180,0.85)",
  },
  good: {
    bg: "rgba(29,158,117,0.07)",
    border: "0.5px solid rgba(29,158,117,0.2)",
    labelColor: "#5DCAA5",
    valueColor: "#a0e8d0",
    subColor: "rgba(160,220,200,0.8)",
  },
  amber: {
    bg: "rgba(200,168,112,0.08)",
    border: "0.5px solid rgba(200,168,112,0.2)",
    labelColor: "#E8C9A0",
    valueColor: "#e8d080",
    subColor: "rgba(200,168,112,0.8)",
  },
};

function EndingCardView({ card }: { card: EndingCard }) {
  const s = CARD_TONE_STYLES[card.tone];
  return (
    <div
      className="rounded-[8px] px-[11px] py-[10px]"
      style={{ background: s.bg, border: s.border }}
    >
      <div
        className="text-[12px] font-semibold uppercase mb-[14px]"
        style={{ color: s.labelColor, letterSpacing: "0.08em" }}
      >
        {card.label}
      </div>
      <div
        className="text-[14px] font-semibold leading-[1.45] mb-[8px]"
        style={{ color: s.valueColor, wordBreak: "keep-all" }}
      >
        {card.value}
      </div>
      <div
        className="text-[14px] leading-[1.7]"
        style={{ color: s.subColor, letterSpacing: "-0.01em", wordBreak: "keep-all" }}
      >
        {card.sub}
      </div>
    </div>
  );
}
