import Image from "next/image";
import PageHead from "../components/PageHead";
import AiBlock from "../components/AiBlock";
import {
  Sec,
  SectionLabel,
  SectionTitle,
  YeonwooBubble,
} from "../components/Section";

// 12개월 매듭 분포 (PAID_FEATURE.md):
// loose × 2 (M+0, M+6), tight × 6 (M+1, M+4, M+5, M+7, M+9, M+11),
// glowing × 3 (M+2, M+3, M+8), peak × 2 (M+3, M+8 = glowing 위 촛불)
type KnotKind = "loose" | "tight" | "glowing";
interface MonthCell {
  monthLabel: string;       // "이번달", "+1개월" ...
  knot: KnotKind;
  peak?: boolean;           // candle_peak 추가 표시
  hint: string;             // 한 줄 힌트
}

interface TimingData {
  months: ReadonlyArray<MonthCell>;
  ai_intro: string;          // 200~300자
}

const DEFAULT_MONTHS: ReadonlyArray<MonthCell> = [
  { monthLabel: "이번달", knot: "loose",   hint: "잔잔. 흐름은 멀리." },
  { monthLabel: "+1개월", knot: "tight",   hint: "묶임이 단단해져." },
  { monthLabel: "+2개월", knot: "glowing", hint: "결이 빛나기 시작해." },
  { monthLabel: "+3개월", knot: "glowing", peak: true, hint: "피크. 인연이 가까워." },
  { monthLabel: "+4개월", knot: "tight",   hint: "여운. 단단함은 유지." },
  { monthLabel: "+5개월", knot: "tight",   hint: "정리되는 자리." },
  { monthLabel: "+6개월", knot: "loose",   hint: "한 호흡 쉬어가." },
  { monthLabel: "+7개월", knot: "tight",   hint: "다시 묶이는 결." },
  { monthLabel: "+8개월", knot: "glowing", peak: true, hint: "두 번째 피크." },
  { monthLabel: "+9개월", knot: "tight",   hint: "단단해진 인연." },
  { monthLabel: "+10개월", knot: "tight",  hint: "안정 구간." },
  { monthLabel: "+11개월", knot: "tight",  hint: "12개월 결말." },
];

const MOCK_P8: TimingData = {
  months: DEFAULT_MONTHS,
  ai_intro:
    "12개월의 결을 두루마리에 펼쳤어. 매듭이 빛나는 자리가 두 번 있어. 그 자리에 인연이 가까워.\n\n壬水 일간한테는 흐름이 중요해. 매듭이 단단한 달엔 너 자신을 정돈해. 빛나는 달엔 흐름을 따라가. 너는 쉬어가는 달엔 쉬는 게 맞아.",
};

export default function TimingPage({ data }: { data?: TimingData }) {
  const p = data ?? MOCK_P8;
  return (
    <section
      data-page-idx="8"
      className="text-[#d8d6d0]"
      style={{ fontFamily: "var(--font-pretendard)" }}
    >
      <PageHead
        chHanja="五"
        chCode="CH-5"
        title="인연이 오는 시간"
        sub="12개월 연애운 전체"
        iconAsset="/yeonwoo/icon/icon_calendar.svg"
      />

      <Sec>
        <SectionLabel>5-1 12개월 운명선</SectionLabel>
        <SectionTitle>두루마리에 펼친 한 해.</SectionTitle>

        <div className="relative my-3 flex justify-center">
          {/* thread_corner 대각 액센트 (Y-9 주변) */}
          <span
            aria-hidden
            className="absolute -top-2 -left-2 w-10 h-10 bg-no-repeat bg-contain pointer-events-none opacity-60"
            style={{ backgroundImage: "url(/yeonwoo/thread/thread_corner.png)" }}
          />
          <span
            aria-hidden
            className="absolute -bottom-2 -right-2 w-10 h-10 bg-no-repeat bg-contain pointer-events-none opacity-60"
            style={{ backgroundImage: "url(/yeonwoo/thread/thread_corner.png)", transform: "scale(-1,-1)" }}
          />
          <div className="relative w-full max-w-[260px] aspect-square">
            <Image
              src="/yeonwoo/sd_yw/yw_08.png"
              alt="강연우 — 12개월 운명선"
              fill
              sizes="(max-width: 480px) 70vw, 260px"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <AiBlock text={p.ai_intro} />
      </Sec>

      <Sec>
        <SectionLabel>5-2 12개월 타임라인</SectionLabel>
        <SectionTitle>두루마리를 한 마디씩 풀면 이런 결.</SectionTitle>
        <Scroll>
          <div className="grid grid-cols-2 gap-2">
            {p.months.map((m) => (
              <MonthCellView key={m.monthLabel} cell={m} />
            ))}
          </div>
        </Scroll>
        <YeonwooBubble text="빛나는 달은 두 번. 그 자리에 인연이 가까워." />
      </Sec>
    </section>
  );
}

function Scroll({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-3">
      <div
        aria-hidden
        className="h-6 bg-no-repeat bg-center"
        style={{
          backgroundImage: "url(/yeonwoo/scroll/scroll_top_yw.svg)",
          backgroundSize: "100% 100%",
        }}
      />
      <div
        className="px-3 py-3"
        style={{
          backgroundImage: "url(/yeonwoo/scroll/scroll_middle_yw.svg)",
          backgroundRepeat: "repeat-y",
          backgroundSize: "100% auto",
        }}
      >
        {children}
      </div>
      <div
        aria-hidden
        className="h-6 bg-no-repeat bg-center"
        style={{
          backgroundImage: "url(/yeonwoo/scroll/scroll_bottom_yw.svg)",
          backgroundSize: "100% 100%",
        }}
      />
    </div>
  );
}

function MonthCellView({ cell }: { cell: MonthCell }) {
  return (
    <div
      className="relative rounded-[8px] px-2.5 py-3 flex items-center gap-2.5"
      style={{ background: "#1a1a18", border: "0.5px solid rgba(200,168,112,0.2)" }}
    >
      <div className="relative w-7 h-7 flex-shrink-0">
        <span
          aria-hidden
          className="absolute inset-0 bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: `url(/yeonwoo/thread/thread_knot_${cell.knot}.svg)` }}
        />
        {cell.peak && (
          <span
            aria-hidden
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-5 bg-no-repeat bg-center bg-contain"
            style={{ backgroundImage: "url(/yeonwoo/candle/candle_peak.svg)" }}
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[12px] text-[#E8C9A0] tracking-[0.05em] mb-0.5">{cell.monthLabel}</div>
        <div className="text-[12px] text-[#a8a6a0] leading-[1.4]" style={{ wordBreak: "keep-all" }}>
          {cell.hint}
        </div>
      </div>
    </div>
  );
}
