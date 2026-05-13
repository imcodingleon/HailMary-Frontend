// dev 전용 P-9 6-1 오행 보완 — 일간 10 × 부족 오행 대표 케이스 비교.
//
// 각 일간에 대표 부족 오행(목/화/토/금/수) 1개 가정으로 method cards 3개 + AI 3단락 비교.
// backend yeonwoo_p9_practice.compose_p9_practice() 결과를 _cases-p9.json에 추출.

import AiBlock from "@/features/saju-result/views/yeonwoo/paid/components/AiBlock";

import cases from "../_cases-p9.json";

interface MethodCard {
  label: string;
  value: string;
  sub: string;
}

interface CaseEntry {
  ilgan: string;
  ohang_lack_input: string;
  result: {
    ohang_lack: string;
    ohang_method_cards: MethodCard[];
    ai_ohang: string;
  };
}

const CASES = cases as unknown as ReadonlyArray<CaseEntry>;
const LABELS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

export default function P9OhangCasesPage() {
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
            P-9 6-1 오행 보완 — 일간 10
          </h1>
          <p className="text-[12px] text-[#888] mt-2 leading-relaxed">
            각 일간에 대표 부족 오행(목/화/토/금/수) 1개 가정으로 method cards 3 + AI 3단락 비교.
            <br />
            AI 3단락 = 부족 오행 헤더 + 색/공간/행동 본문 + 일간별 마무리.
            <br />
            <span className="text-[#888]">
              method cards는 부족 오행만, AI는 일간 × 부족 오행 둘 다 변형.
            </span>
          </p>
        </header>

        <div className="space-y-12">
          {CASES.map((c, i) => (
            <section key={c.ilgan}>
              <div className="mb-2 flex items-center gap-2 flex-wrap">
                <span
                  className="inline-flex items-center justify-center px-2 h-7 rounded-full text-[11px] font-bold text-[#0a0a09]"
                  style={{ background: "#E8C9A0" }}
                >
                  {LABELS[i]} · {c.ilgan}
                </span>
                <span className="text-[12px] text-[#888]">
                  부족 오행 = {c.result.ohang_lack}
                </span>
              </div>

              <div
                className="my-2"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: "6px",
                }}
              >
                {c.result.ohang_method_cards.map((m) => (
                  <MethodCardView key={m.label} card={m} />
                ))}
              </div>

              <AiBlock text={c.result.ai_ohang} />
            </section>
          ))}
        </div>

        <footer className="mt-10 mb-4 text-center text-[11px] text-[#666]">
          일간 10 케이스 톤 검증 — 어색한 카드 sub / AI 박스 발견하면 알려주세요.
        </footer>
      </div>
    </main>
  );
}

// ── 로컬 컴포넌트 (PracticePage CardGood 단순화) ────────────

function MethodCardView({ card }: { card: MethodCard }) {
  return (
    <div
      className="rounded-[8px] px-[11px] py-[10px]"
      style={{
        background: "rgba(29,158,117,0.07)",
        border: "0.5px solid rgba(29,158,117,0.2)",
      }}
    >
      <div
        className="text-[11px] font-semibold uppercase mb-[10px]"
        style={{ color: "#5DCAA5", letterSpacing: "0.08em" }}
      >
        {card.label}
      </div>
      <div
        className="text-[13px] font-semibold leading-[1.45] mb-[8px]"
        style={{ color: "#a0e8d0", wordBreak: "keep-all" }}
      >
        {card.value}
      </div>
      <div
        className="text-[12px] leading-[1.6]"
        style={{ color: "rgba(160,220,200,0.8)", wordBreak: "keep-all" }}
      >
        {card.sub}
      </div>
    </div>
  );
}
