"use client";

import { WUXING_HANJA, WUXING_ELEMENTS } from "@/features/saju/constants";
import type {
  DayMaster,
  Pillar,
  Wuxing,
  WuxingKey,
} from "@/features/saju/types";

const DOYOON_WUXING_HUES: Record<WuxingKey, string> = {
  목: "#4FB84F",
  화: "#E94E3F",
  토: "#E5A938",
  금: "#ABABAA",
  수: "#4180DC",
};

const Y_TICKS = [100, 75, 50, 25, 0];
const BAR_AREA_H = 154;
const X_LABEL_H = 22;
const BAR_WIDTH = 28;
const Y_LABEL_W = 32;

type Props = {
  pillars: Pillar[];
  dayMaster: DayMaster;
  wuxing: Wuxing;
};

export default function WuxingChartSection({ pillars, dayMaster, wuxing }: Props) {
  const dayPillar = pillars.find((p) => p.label === "일주");
  const dayElementRaw = dayPillar?.element ?? "";
  const dayEl = dayElementRaw.split("/")[0].trim() as WuxingKey;
  const dayStemHanja = dayMaster.stemHanja;
  const dayElementHanja = WUXING_HANJA[dayEl] ?? "";
  const dayColor = DOYOON_WUXING_HUES[dayEl] ?? "#4180DC";

  const safeRatio = (el: WuxingKey): number => {
    const v = Number(wuxing?.ratios?.[el]);
    return Number.isFinite(v) && v >= 0 ? v : 0;
  };
  const ratios = WUXING_ELEMENTS.map(safeRatio);
  // 한국 사주는 대부분 단일 오행 비율이 50%를 넘지 않아, 상대 스케일링(가장 큰 값 = 100%)으로 시각화.
  const maxRatio = Math.max(...ratios);
  const denom = maxRatio > 0 ? maxRatio : 1;

  const overdoneEls = WUXING_ELEMENTS.filter(
    (el) => wuxing?.judgments?.[el] === "과다",
  );
  const lackingEls = WUXING_ELEMENTS.filter(
    (el) => wuxing?.judgments?.[el] === "결핍",
  );
  const hasCaption = overdoneEls.length > 0 || lackingEls.length > 0;

  return (
    <div
      className="w-full"
      style={{
        background: "#FDF5EA",
        paddingTop: "20px",
        paddingBottom: "10px",
      }}
    >
      <div
        style={{
          margin: "0 20px",
          background: "#FDF5EA",
          borderRadius: "22px",
          border: "1px solid #E0CFB6",
          overflow: "hidden",
          zoom: 0.88,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "20px 20px 16px",
            gap: "8px",
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              flexShrink: 0,
              width: "38%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span
                style={{
                  display: "inline-block",
                  fontSize: "12px",
                  fontFamily: "Pretendard, sans-serif",
                  fontWeight: 500,
                  color: "#856C51",
                  background: "#F4E5CD",
                  borderRadius: "9999px",
                  padding: "3px 14px",
                  letterSpacing: "0.05em",
                }}
              >
                무료
              </span>

              <div
                style={{
                  marginTop: "54px",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "6px",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: '"NotoSerifTC", "ChosunNm", serif',
                    fontWeight: 700,
                    fontSize: "clamp(33px, 9.5vw, 43px)",
                    lineHeight: 1.1,
                    color: dayColor,
                    letterSpacing: "0.02em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {dayStemHanja}
                  {dayElementHanja}
                </span>
                <span
                  style={{
                    fontSize: "16px",
                    color: dayColor,
                    opacity: 0.6,
                    fontFamily: "Pretendard, sans-serif",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}
                >
                  ({dayMaster.stem}{dayEl})
                </span>
              </div>

              <div
                style={{
                  marginTop: "8px",
                  fontSize: "18px",
                  fontFamily: "Pretendard, sans-serif",
                  fontWeight: 500,
                  color: "#9C8A6D",
                  letterSpacing: "0.12em",
                  textAlign: "center",
                }}
              >
                일 간
              </div>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: "16px",
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 600,
                color: "#AD7D38",
                letterSpacing: "0.05em",
                marginBottom: "8px",
              }}
            >
              오행 강약
            </div>
            <div
              style={{
                position: "relative",
                height: `${BAR_AREA_H + X_LABEL_H}px`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: Y_LABEL_W,
                  right: 0,
                  top: 0,
                  height: BAR_AREA_H,
                }}
              >
                {Y_TICKS.map((tick) => {
                  const topPx = BAR_AREA_H - (tick / 100) * BAR_AREA_H;
                  return (
                    <div
                      key={tick}
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: topPx,
                        height: "1px",
                        background: "#E5D8C3",
                      }}
                    />
                  );
                })}
              </div>

              <div
                style={{
                  position: "absolute",
                  left: 0,
                  width: Y_LABEL_W,
                  top: 0,
                  height: BAR_AREA_H,
                }}
              >
                {Y_TICKS.map((tick) => {
                  const topPx = BAR_AREA_H - (tick / 100) * BAR_AREA_H;
                  return (
                    <div
                      key={tick}
                      style={{
                        position: "absolute",
                        right: 4,
                        top: topPx,
                        transform: "translateY(-50%)",
                        fontSize: "9px",
                        fontFamily: "Pretendard, sans-serif",
                        fontWeight: 400,
                        color: "#B0997A",
                        lineHeight: 1,
                        whiteSpace: "nowrap",
                        textAlign: "right",
                      }}
                    >
                      {tick}%
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  position: "absolute",
                  left: Y_LABEL_W,
                  right: 0,
                  top: 0,
                  height: `${BAR_AREA_H + X_LABEL_H}px`,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "space-around",
                  paddingBottom: 0,
                }}
              >
                {WUXING_ELEMENTS.map((el, i) => {
                  const ratio = ratios[i];
                  const color = DOYOON_WUXING_HUES[el];
                  const rawH = Math.round((ratio / denom) * BAR_AREA_H);
                  const barH = ratio > 0 ? Math.max(rawH, 4) : 0;

                  return (
                    <div
                      key={el}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 0,
                        height: `${BAR_AREA_H + X_LABEL_H}px`,
                        justifyContent: "flex-end",
                      }}
                    >
                      <div
                        style={{
                          width: `${BAR_WIDTH}px`,
                          height: barH > 0 ? `${barH}px` : "2px",
                          background: color,
                          borderRadius: "4px 4px 0 0",
                          flexShrink: 0,
                          opacity: barH > 0 ? 1 : 0.15,
                        }}
                      />
                      <div
                        style={{
                          height: `${X_LABEL_H}px`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "16px",
                          fontFamily: "Pretendard, sans-serif",
                          fontWeight: 500,
                          color,
                          flexShrink: 0,
                        }}
                      >
                        {el}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {hasCaption && (
          <div
            style={{
              textAlign: "center",
              paddingBottom: "20px",
              paddingLeft: "16px",
              paddingRight: "16px",
              paddingTop: "4px",
              lineHeight: 1.7,
            }}
          >
            {overdoneEls.map((el, idx) => (
              <span
                key={el}
                style={{
                  fontSize: "16px",
                  fontFamily: "Pretendard, sans-serif",
                  fontWeight: 400,
                  color: "#7A6B55",
                }}
              >
                {idx > 0 && " "}
                <span
                  style={{
                    fontFamily: '"NotoSerifTC", "ChosunNm", serif',
                    fontWeight: 600,
                    fontSize: "18px",
                    color: DOYOON_WUXING_HUES[el],
                  }}
                >
                  {WUXING_HANJA[el]}
                </span>{" "}
                과다
              </span>
            ))}
            {overdoneEls.length > 0 && lackingEls.length > 0 && (
              <span
                style={{
                  fontSize: "16px",
                  fontFamily: "Pretendard, sans-serif",
                  color: "#7A6B55",
                }}
              >
                {" · "}
              </span>
            )}
            {lackingEls.map((el, idx) => (
              <span
                key={el}
                style={{
                  fontSize: "16px",
                  fontFamily: "Pretendard, sans-serif",
                  fontWeight: 400,
                  color: "#7A6B55",
                }}
              >
                {idx > 0 && " "}
                <span
                  style={{
                    fontFamily: '"NotoSerifTC", "ChosunNm", serif',
                    fontWeight: 600,
                    fontSize: "18px",
                    color: DOYOON_WUXING_HUES[el],
                  }}
                >
                  {WUXING_HANJA[el]}
                </span>{" "}
                부족
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
