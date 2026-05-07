"use client";

import { WUXING_HANJA, WUXING_ELEMENTS } from "@/features/saju/constants";
import type { Pillar, Wuxing, WuxingKey, DayMaster } from "@/features/saju/types";

const FREE_PILL = (
  <span
    className="text-[10px] tracking-wider px-2.5 py-1 rounded-full"
    style={{ border: "1px solid #856C51", background: "transparent", color: "#c9a96e" }}
  >
    무료
  </span>
);

const BAR_MAX_H = 100;

const WUXING_BAR_HUES: Record<WuxingKey, string> = {
  목: "#3A933A",
  화: "#AD3032",
  토: "#C28A2E",
  금: "#8D8C8B",
  수: "#296ACE",
};

const WUXING_DAY_HUES: Record<WuxingKey, string> = {
  목: "#5BAA5B",
  화: "#D14545",
  토: "#DCA742",
  금: "#B5B4B3",
  수: "#5589DA",
};

type Props = {
  wuxing: Wuxing;
  dayMaster: DayMaster;
  pillars: Pillar[];
};

export function WuxingChartSection({ wuxing, dayMaster, pillars }: Props) {
  const dayPillar = pillars.find((p) => p.label === "일주");
  const dayElementRaw = dayPillar?.element ?? "";
  const dayEl = dayElementRaw.split("/")[0].trim() as WuxingKey;
  const dayHue = WUXING_DAY_HUES[dayEl] ?? "#c9a96e";
  const dayHanja = WUXING_HANJA[dayEl] ?? "";

  const safeRatio = (el: WuxingKey): number => {
    const v = Number(wuxing?.ratios?.[el]);
    return Number.isFinite(v) && v >= 0 ? v : 0;
  };
  const ratios = WUXING_ELEMENTS.map(safeRatio);
  const maxRatio = Math.max(...ratios);
  const denom = maxRatio > 0 ? maxRatio : 1;

  const overdoneEls = WUXING_ELEMENTS.filter((el) => wuxing.judgments[el] === "과다");
  const lackingEls = WUXING_ELEMENTS.filter((el) => wuxing.judgments[el] === "결핍");
  const showFooter = overdoneEls.length > 0 || lackingEls.length > 0;

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
          <div className="flex items-center mb-5">{FREE_PILL}</div>

          <div className="flex flex-col items-center mb-1">
            <div className="flex items-baseline gap-2">
              <span
                className="leading-none"
                style={{
                  color: dayHue,
                  textShadow: `0 0 8px ${dayHue}40`,
                  fontFamily: "\"NotoSerifTC\", \"ChosunNm\", serif",
                  fontSize: "46px",
                  fontWeight: 600,
                }}
              >
                {dayMaster.stemHanja}
              </span>
              <span
                className="leading-none"
                style={{
                  color: dayHue,
                  textShadow: `0 0 8px ${dayHue}40`,
                  fontFamily: "\"NotoSerifTC\", \"ChosunNm\", serif",
                  fontSize: "46px",
                  fontWeight: 600,
                }}
              >
                {dayHanja}
              </span>
              <span
                style={{ color: dayHue, opacity: 0.6, fontSize: "16px", fontWeight: 700 }}
              >
                ({dayMaster.stem}{dayEl})
              </span>
            </div>
            <p className="text-[12px] tracking-widest mt-1" style={{ color: "#856C51" }}>
              일간
            </p>
          </div>

          <p
            className="text-[16px] tracking-widest mt-5"
            style={{ color: "#c9a96e", marginBottom: "22px" }}
          >
            오행 강약
          </p>

          <div className="grid grid-cols-5 gap-2">
            {WUXING_ELEMENTS.map((el) => {
              const ratio = safeRatio(el);
              const hue = WUXING_BAR_HUES[el];
              const rawH = Math.round((ratio / denom) * BAR_MAX_H);
              const barH = ratio > 0 ? Math.max(rawH, 4) : 0;
              return (
                <div key={el} className="flex flex-col items-center">
                  <span
                    style={{
                      color: hue,
                      fontSize: "16px",
                      fontFamily: "\"NotoSerifTC\", \"ChosunNm\", serif",
                      fontWeight: 600,
                      marginBottom: "20px",
                    }}
                  >
                    {WUXING_HANJA[el]}
                  </span>
                  <div
                    className="flex items-end justify-center w-full"
                    style={{ height: `${BAR_MAX_H}px` }}
                  >
                    <div
                      className="rounded-t-md"
                      style={{
                        width: "60%",
                        height: `${barH}px`,
                        background: `linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 35%, rgba(0,0,0,0.05) 100%), ${hue}`,
                        boxShadow: barH > 0 ? `0 0 4px ${hue}30` : "none",
                        opacity: ratio === 0 ? 0.18 : 1,
                      }}
                    />
                  </div>
                  <span
                    className="mt-1.5"
                    style={{ color: hue, opacity: 0.8, fontSize: "16px" }}
                  >
                    {el}
                  </span>
                </div>
              );
            })}
          </div>

          {showFooter && (
            <p className="text-center text-[15px] mt-4" style={{ color: "#c9a96e" }}>
              {overdoneEls.map((el) => (
                <span
                  key={el}
                  style={{
                    color: WUXING_BAR_HUES[el],
                    fontFamily: "\"NotoSerifTC\", \"ChosunNm\", serif",
                    fontWeight: 600,
                  }}
                >
                  {WUXING_HANJA[el]}
                </span>
              ))}
              {overdoneEls.length > 0 && " 과다"}
              {overdoneEls.length > 0 && lackingEls.length > 0 && " · "}
              {lackingEls.map((el) => (
                <span
                  key={el}
                  style={{
                    color: WUXING_BAR_HUES[el],
                    fontFamily: "\"NotoSerifTC\", \"ChosunNm\", serif",
                    fontWeight: 600,
                  }}
                >
                  {WUXING_HANJA[el]}
                </span>
              ))}
              {lackingEls.length > 0 && " 부족"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
