// dev 전용 P-5 3-2 이성이 끌리는 메커니즘 — 일간 10 케이스 비교.
// 4 단계 카드 (1단계 첫 마주침 ~ 4단계 끌림)의 value/sub 일간별 변형.
// 라벨은 모두 고정.

import {
  getStageCards,
  getMechanismAi,
} from "@/features/saju-result/views/yeonwoo/paid/charm-ai";
import AiBlock from "@/features/saju-result/views/yeonwoo/paid/components/AiBlock";
import { YeonwooBubble } from "@/features/saju-result/views/yeonwoo/paid/components/Section";

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

export default function P5MechanismCasesPage() {
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
            P-5 3-2 이성이 끌리는 메커니즘 — 10 일간
          </h1>
          <p className="text-[12px] text-[#888] mt-2 leading-relaxed">
            4 단계 카드 (첫 마주침 → 반복 접촉 → 익숙함 → 끌림)
            <br />
            라벨 고정 / value + sub 일간별 변형
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
                {getStageCards(ilgan).map((c, i) => (
                  <div
                    key={i}
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
                    <div
                      className="text-[14px] font-semibold leading-[1.45] mb-[8px]"
                      style={{ color: "#f0ede8", wordBreak: "keep-all" }}
                    >
                      {c.value}
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
              <AiBlock text={getMechanismAi(ilgan)} />
              <YeonwooBubble text="이게 네 매력이 가장 강하게 발동하는 순간이야." />
            </section>
          ))}
        </div>

        <footer className="mt-10 mb-4 text-center text-[11px] text-[#666]">
          어색한 일간/단계/AI 발견하면 알려주세요. (라벨/버블 고정)
        </footer>
      </div>
    </main>
  );
}
