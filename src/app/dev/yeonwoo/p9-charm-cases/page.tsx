// dev 전용 P-9 6-2 매력살 활용 — 일간 10 × Primary 매력살 / 보유 수 / 단계 케이스 비교.
//
// backend yeonwoo_p9_charm.compose_p9_charm() 결과를 _cases-p9-charm.json에 추출.
// 케이스 분포: n=0 (am_rok 폴백) ~ n=6 (풀세트) + 매력살 7종 + 단계 5종.

import AiBlock from "@/features/saju-result/views/yeonwoo/paid/components/AiBlock";

import cases from "../_cases-p9-charm.json";

interface PracticeCard {
  label: string;
  value: string;
  sub: string;
}

interface CaseEntry {
  ilgan: string;
  sal_keys_input: string[];
  charm_score_input: number;
  result: {
    primary_charm_key: string;
    primary_charm_label: string;
    charm_count: number;
    charm_current: string;
    charm_target: string;
    charm_practice_cards: PracticeCard[];
    charm_practice_body: string;
    ai_charm: string;
  };
}

const CASES = cases as unknown as ReadonlyArray<CaseEntry>;
const LABELS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

export default function P9CharmCasesPage() {
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
            P-9 6-2 매력살 활용 — 일간 10
          </h1>
          <p className="text-[12px] text-[#888] mt-2 leading-relaxed">
            Primary 매력살 1개 집중 + 보유 수 인식 한 줄 + 일간 마무리.
            <br />
            n=0(am_rok 폴백) ~ n=6 분포로 변형 검증.
            <br />
            <span className="text-[#888]">
              매력살 7종 × 단계 5종 × 일간 10 = 350조합을 51셀로 합성.
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
                <span className="text-[11px] text-[#888]">
                  보유 {c.result.charm_count}개 · score {c.charm_score_input}
                </span>
                <span
                  className="text-[11px] px-1.5 py-0.5 rounded"
                  style={{
                    color: "#E8C9A0",
                    background: "rgba(232,201,160,0.12)",
                  }}
                >
                  {c.result.primary_charm_label}
                </span>
                <span className="text-[11px] text-[#D4537E]">
                  {c.result.charm_current} → {c.result.charm_target}
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
                {c.result.charm_practice_cards.map((m) => (
                  <PracticeCardView key={m.label} card={m} />
                ))}
              </div>

              <div
                className="my-2 text-[12px] leading-[1.7] px-3 py-2 rounded-[8px]"
                style={{
                  color: "#d8d6d0",
                  background: "#1a1a18",
                  border: "0.5px solid #2a2a28",
                }}
              >
                {c.result.charm_practice_body}
              </div>

              <AiBlock text={c.result.ai_charm} />
            </section>
          ))}
        </div>

        <footer className="mt-10 mb-4 text-center text-[11px] text-[#666]">
          매력살 보유 수 × 일간 케이스 톤 검증 — 어색한 부분 알려주세요.
        </footer>
      </div>
    </main>
  );
}

function PracticeCardView({ card }: { card: PracticeCard }) {
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
