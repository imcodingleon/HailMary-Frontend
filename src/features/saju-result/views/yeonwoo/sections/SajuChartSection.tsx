"use client";

import { toTableOrder, WUXING_HUES } from "@/features/saju/constants";
import type { Pillar, WuxingKey } from "@/features/saju/types";

function elementHues(element: string, fallback: string): { heaven: string; earth: string } {
  const [h, e] = element.split("/").map((s) => s.trim()) as (WuxingKey | undefined)[];
  return {
    heaven: (h && WUXING_HUES[h]) || fallback,
    earth: (e && WUXING_HUES[e]) || fallback,
  };
}

function PillarBox({
  hanja,
  hangul,
  hue,
  isDay,
  unknown,
  unknownLabel,
}: {
  hanja: string;
  hangul: string;
  hue: string;
  isDay: boolean;
  unknown: boolean;
  unknownLabel?: string;
}) {
  return (
    <div
      className="w-full flex flex-col items-center justify-center rounded-xl gap-4"
      style={{
        background: `${hue}1a`,
        border: `${isDay ? "1.5px" : "1px"} solid ${hue}${isDay ? "99" : "55"}`,
        boxShadow: isDay ? `0 0 14px ${hue}88, inset 0 0 8px ${hue}33` : "none",
        opacity: unknown ? 0.6 : 1,
        aspectRatio: "9 / 11",
      }}
    >
      <span
        className="text-3xl leading-none"
        style={{
          color: hue,
          textShadow: unknown ? "none" : `0 0 12px ${hue}80`,
          fontFamily: "\"NotoSerifTC\", \"ChosunNm\", serif",
          fontWeight: 700,
        }}
      >
        {unknown ? "?" : hanja}
      </span>
      <span
        className="text-[14px] leading-none"
        style={{
          color: "#c9b89e",
          opacity: 0.7,
          fontFamily: "\"JejuMyeongjo\", \"Pretendard\", serif",
        }}
      >
        {unknown ? unknownLabel ?? "" : hangul}
      </span>
    </div>
  );
}

function PillarCard({ pillar: p }: { pillar: Pillar }) {
  const isDay = p.label === "일주";
  const hues = elementHues(p.element, p.hue);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <p className="text-[10px] tracking-widest" style={{ color: "#856C51" }}>
        {p.label}
      </p>
      <PillarBox
        hanja={p.heaven}
        hangul={p.heavenHangul}
        hue={hues.heaven}
        isDay={isDay}
        unknown={p.unknown}
      />
      <PillarBox
        hanja={p.earth}
        hangul={p.earthHangul}
        hue={hues.earth}
        isDay={isDay}
        unknown={p.unknown}
        unknownLabel="시간 미입력"
      />
    </div>
  );
}

type Props = { pillars: Pillar[] };

export function SajuChartSection({ pillars }: Props) {
  const orderedPillars = toTableOrder(pillars);

  return (
    <div className="w-full px-5 pt-12" style={{ paddingBottom: "68px" }}>
      <div
        className="w-full rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
        }}
      >
        <div className="px-6 pt-6" style={{ paddingBottom: "48px" }}>
          <span
            className="inline-block text-[13px] tracking-wider px-3 py-1 rounded-full mb-4"
            style={{
              background: "#FFFFFF",
              color: "#1FAE6A",
              fontWeight: 600,
            }}
          >
            무료
          </span>

          <p className="text-[18px] font-bold tracking-[0.35em] mb-6" style={{ color: "#c9a96e" }}>
            사주 원국
          </p>

          <div className="grid grid-cols-4 gap-3">
            {orderedPillars.map((p) => (
              <PillarCard key={p.label} pillar={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
