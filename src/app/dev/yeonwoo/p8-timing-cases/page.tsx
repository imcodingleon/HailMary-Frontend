// dev 전용 P-8 5-1 12개월 운명선 — 일간 10 케이스 비교.
//
// 각 일간에 합리적 사주(일지/yongSin) 가정으로 12 row + AI 3단락 비교.
// backend yeonwoo_p8_timing.compose_p8_timing() 결과를 _cases-p8.json에 추출.

import AiBlock from "@/features/saju-result/views/yeonwoo/paid/components/AiBlock";
import { YeonwooBubble } from "@/features/saju-result/views/yeonwoo/paid/components/Section";

import cases from "../_cases-p8.json";

type KnotKind = "loose" | "tight" | "glowing";

interface MonthRow {
  label: string;
  hearts: number;
  knot: KnotKind;
  state: string;
  desc: string;
  is_peak?: boolean;
}

interface CaseEntry {
  ilgan: string;
  user_gender: string;
  yongSin: string;
  day_branch: string;
  result: {
    months: MonthRow[];
    ai_intro: string;
    bubble: string;
  };
}

const CASES = cases as unknown as ReadonlyArray<CaseEntry>;
const LABELS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

export default function P8TimingCasesPage() {
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
            P-8 5-1 12개월 운명선 — 일간 10
          </h1>
          <p className="text-[12px] text-[#888] mt-2 leading-relaxed">
            각 일간에 합리적 사주(일지/yongSin) 가정으로 12개월 hearts/state/desc 비교.
            <br />
            피크 2개는 hearts 5★ 강제. AI 3단락 = 고정 도입 + 피크 월 2개 + 일간별 흐름.
            <br />
            <span className="text-[#888]">
              모든 케이스 2026-05 시작 가정. 실제 사주는 yongSin/일지 다르면 피크가 완전히 다르게 떨어짐.
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
                  {LABELS[i]} · {c.ilgan} · {c.user_gender}
                </span>
                <span className="text-[12px] text-[#888]">
                  일지={c.day_branch} · 用神={c.yongSin}
                </span>
              </div>

              <AiBlock text={c.result.ai_intro} />

              <div
                className="rounded-[8px] my-2 px-3 py-2"
                style={{
                  background: "#1a1a18",
                  border: "0.5px solid #2a2a28",
                }}
              >
                {c.result.months.map((m) => (
                  <MonthRowView key={m.label} row={m} />
                ))}
              </div>

              <YeonwooBubble text={c.result.bubble} />
            </section>
          ))}
        </div>

        <footer className="mt-10 mb-4 text-center text-[11px] text-[#666]">
          일간 10 케이스 톤 검증 — 어색한 hearts/state/desc/AI 박스 발견하면 알려주세요.
        </footer>
      </div>
    </main>
  );
}

// ── 로컬 컴포넌트 (TimingPage TimelineRow 단순화) ────────────

function MonthRowView({ row }: { row: MonthRow }) {
  const isPeak = !!row.is_peak;
  const labelColor = isPeak ? "#D4537E" : "#d8d6d0";
  const stateColor = isPeak ? "#B83E66" : "#888";
  const descColor = isPeak ? "#B83E66" : "#888";
  return (
    <div
      className="py-1.5 px-1"
      style={{
        borderBottom: "0.5px solid rgba(216,214,208,0.08)",
        background: isPeak ? "rgba(212,83,126,0.08)" : "transparent",
        borderRadius: isPeak ? "4px" : 0,
      }}
    >
      <div className="flex items-center gap-2 flex-wrap" style={{ fontSize: "13px" }}>
        <span
          style={{ color: labelColor, fontWeight: isPeak ? 700 : 500, minWidth: "80px" }}
        >
          {row.label}
        </span>
        <span style={{ whiteSpace: "nowrap" }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              style={{ color: i < row.hearts ? "#D4537E" : "rgba(216,214,208,0.2)" }}
            >
              {i < row.hearts ? "♥" : "♡"}
            </span>
          ))}
        </span>
        <span
          className="ml-auto"
          style={{ color: stateColor, fontSize: "12px", fontWeight: isPeak ? 600 : 400 }}
        >
          {row.state}
        </span>
      </div>
      <p
        className="mt-1"
        style={{ fontSize: "11px", color: descColor, lineHeight: 1.6, wordBreak: "keep-all" }}
      >
        {row.desc}
      </p>
    </div>
  );
}
