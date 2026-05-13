// dev 전용 P-6 4-2 속마음 투시 — 일간 10 케이스 비교.
//
// 일간별 실 상태 카드 + 행동→심리 2개 카드 + AI 박스.
// backend yeonwoo_p6_destined.compose_p6_destined()의 inner_cards/ai_inner 부분.

import AiBlock from "@/features/saju-result/views/yeonwoo/paid/components/AiBlock";

import cases from "../_cases-p6.json";

interface InnerCard {
  label: string;
  value: string;
  sub: string;
}

interface CaseEntry {
  ilgan: string;
  result: {
    inner_cards: InnerCard[];
    ai_inner: string;
  };
}

const CASES = cases as unknown as ReadonlyArray<CaseEntry>;
const LABELS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const NOTICE_TEXT =
  "지금 마음에 걸리는 상대가 있다면 그 사람에 대입해봐. 아직 없다면 — 곧 들어올 인연을 기준으로 읽으면 돼.";

export default function P6InnerCasesPage() {
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
            P-6 4-2 속마음 투시 — 일간 10
          </h1>
          <p className="text-[12px] text-[#888] mt-2 leading-relaxed">
            실 상태 + 행동→심리 카드 2개 + AI 박스 (모두 일간 변형)
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

              <NoticeBox text={NOTICE_TEXT} />

              <div className="flex flex-col gap-1.5 my-3">
                {c.result.inner_cards.map((card) => (
                  <InnerCardView
                    key={card.label}
                    label={card.label}
                    value={card.value}
                    sub={card.sub}
                  />
                ))}
              </div>

              <AiBlock text={c.result.ai_inner} />
            </section>
          ))}
        </div>

        <footer className="mt-10 mb-4 text-center text-[11px] text-[#666]">
          일간 10 케이스 톤 검증 — 어색한 카드 멘트/AI 박스 발견하면 알려주세요.
        </footer>
      </div>
    </main>
  );
}

// ── 로컬 컴포넌트 ─────────────────────────────────

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

function InnerCardView({
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
        background: "rgba(232,201,160,0.04)",
        border: "0.5px solid rgba(232,201,160,0.18)",
      }}
    >
      <div
        className="text-[11px] font-semibold uppercase mb-[6px]"
        style={{ color: "#E8C9A0", letterSpacing: "0.08em", opacity: 0.85 }}
      >
        {label}
      </div>
      <div
        className="text-[14px] font-semibold leading-[1.45] mb-[6px]"
        style={{ color: "#e8d8b8", wordBreak: "keep-all" }}
      >
        {value}
      </div>
      <div
        className="text-[13px] leading-[1.7]"
        style={{ color: "rgba(216,214,208,0.75)", wordBreak: "keep-all" }}
      >
        {sub}
      </div>
    </div>
  );
}
