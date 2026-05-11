// dev 전용 P-5 3-3 감각적 매력 포인트 — 일간 10 케이스 비교.
// 3 카드 (눈빛/목소리/분위기 라벨 고정).
// strength + flame_label + sub만 일간별 변형 — 일간 본질에 따라 강조 포인트 다름.

import {
  getPointCards,
  getSenseAi,
} from "@/features/saju-result/views/yeonwoo/paid/charm-ai";
import AiBlock from "@/features/saju-result/views/yeonwoo/paid/components/AiBlock";

const ILGAN_LIST: ReadonlyArray<{ label: string; ilgan: string; disp: string }> = [
  { label: "A", ilgan: "갑목", disp: "갑목(甲木)" },
  { label: "B", ilgan: "을목", disp: "을목(乙木)" },
  { label: "C", ilgan: "병화", disp: "병화(丙火)" },
  { label: "D", ilgan: "정화", disp: "정화(丁火)" },
  { label: "E", ilgan: "무토", disp: "무토(戊土)" },
  { label: "F", ilgan: "기토", disp: "기토(己土)" },
  { label: "G", ilgan: "경금", disp: "경금(庚金)" },
  { label: "H", ilgan: "신금", disp: "신금(辛金)" },
  { label: "I", ilgan: "임수", disp: "임수(壬水)" },
  { label: "J", ilgan: "계수", disp: "계수(癸水)" },
];

export default function P5SenseCasesPage() {
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
            P-5 3-3 감각적 매력 포인트 — 10 일간
          </h1>
          <p className="text-[12px] text-[#888] mt-2 leading-relaxed">
            3 카드 (눈빛 · 목소리 · 분위기) — 라벨 고정
            <br />
            strength(촛불 크기) + flame_label + sub 일간별 변형
          </p>
        </header>

        <div className="space-y-10">
          {ILGAN_LIST.map(({ label, ilgan, disp }) => (
            <section key={ilgan}>
              <div className="mb-2 flex items-center gap-2">
                <span
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[13px] font-bold text-[#0a0a09]"
                  style={{ background: "#E8C9A0" }}
                >
                  {label}
                </span>
                <span className="text-[13px] text-[#d8d6d0]">{disp}</span>
              </div>
              <div
                className="my-[7px]"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: "6px",
                }}
              >
                {getPointCards(ilgan).map((c) => (
                  <div
                    key={c.label}
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
                      {c.label}
                    </div>
                    <div className="flex items-end gap-2 mb-[8px]">
                      <span
                        aria-hidden
                        className="inline-block w-6 h-10 bg-no-repeat bg-contain bg-bottom flex-shrink-0"
                        style={{
                          backgroundImage: `url(/yeonwoo/candle/candle_${c.strength}.svg)`,
                        }}
                      />
                      <span
                        className="text-[14px] font-semibold leading-[1.45] pb-1"
                        style={{ color: "#f0ede8", wordBreak: "keep-all" }}
                      >
                        {c.flame_label}
                      </span>
                    </div>
                    <div
                      className="text-[14px] leading-[1.7]"
                      style={{
                        color: "#b0aea4",
                        wordBreak: "keep-all",
                      }}
                    >
                      {c.sub}
                    </div>
                  </div>
                ))}
              </div>
              <AiBlock text={getSenseAi(ilgan)} />
            </section>
          ))}
        </div>

        <footer className="mt-10 mb-4 text-center text-[11px] text-[#666]">
          촛불 크기(weak/medium/strong) — 일간 본질에 따라 강조 포인트가 달라요.
          <br />
          예: 갑목=분위기 strong / 을목=목소리 strong / 임수=분위기 strong (HTML 원본)
        </footer>
      </div>
    </main>
  );
}
