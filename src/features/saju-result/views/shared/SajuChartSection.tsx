"use client";

import { toTableOrder } from "@/features/saju/constants";
import type { Pillar, WuxingKey } from "@/features/saju/types";

const DOYOON_WUXING_HUES: Record<WuxingKey, string> = {
  목: "#4FB84F",
  화: "#E94E3F",
  토: "#E5A938",
  금: "#ABABAA",
  수: "#4180DC",
};

const DOYOON_WUXING_HUES_DAY: Record<WuxingKey, string> = {
  목: "#3A933A",
  화: "#B8392E",
  토: "#B0822A",
  금: "#828180",
  수: "#2D5BA8",
};

const GRID_BORDER = "#E0CFB6";
const DAY_BORDER = "#C9A96E";
const DAY_HIGHLIGHT_BG = "#FCEFD9";

function parseElementPair(element: string): {
  heaven: WuxingKey | null;
  earth: WuxingKey | null;
} {
  const parts = element.split("/").map((s) => s.trim());
  const validKeys: WuxingKey[] = ["목", "화", "토", "금", "수"];
  const heaven = (parts[0] && validKeys.includes(parts[0] as WuxingKey)
    ? parts[0]
    : null) as WuxingKey | null;
  const earth = (parts[1] && validKeys.includes(parts[1] as WuxingKey)
    ? parts[1]
    : null) as WuxingKey | null;
  return { heaven, earth };
}

function getHeavenHue(pillar: Pillar, isDay: boolean): string {
  const { heaven } = parseElementPair(pillar.element);
  if (!heaven) return isDay ? "#2D5BA8" : "#4180DC";
  return isDay ? DOYOON_WUXING_HUES_DAY[heaven] : DOYOON_WUXING_HUES[heaven];
}

function getEarthHue(pillar: Pillar, isDay: boolean): string {
  const { earth } = parseElementPair(pillar.element);
  if (!earth) return isDay ? "#828180" : "#ABABAA";
  return isDay ? DOYOON_WUXING_HUES_DAY[earth] : DOYOON_WUXING_HUES[earth];
}

type PillarBoxProps = {
  hanja: string;
  hangul: string;
  hue: string;
  isDay: boolean;
  unknown: boolean;
  unknownLabel?: string;
};

function PillarBox({ hanja, hangul, hue, isDay, unknown, unknownLabel }: PillarBoxProps) {
  return (
    <div
      className="w-full flex flex-col items-center justify-center rounded-xl gap-2"
      style={{
        background: isDay ? DAY_HIGHLIGHT_BG : "#FDF5EA",
        border: `${isDay ? "1.5px" : "1px"} solid ${isDay ? DAY_BORDER : GRID_BORDER}`,
        opacity: unknown ? 0.6 : 1,
        aspectRatio: "9 / 11",
      }}
    >
      <span
        style={{
          fontFamily: '"NotoSerifTC", "ChosunNm", serif',
          fontWeight: 700,
          fontSize: "clamp(28px, 7vw, 40px)",
          lineHeight: 1,
          color: hue,
        }}
      >
        {unknown ? "?" : hanja}
      </span>
      <span
        style={{
          fontFamily: '"JejuMyeongjo", "Pretendard", serif',
          fontWeight: 400,
          fontSize: "12px",
          color: "#9C8A6D",
        }}
      >
        {unknown ? unknownLabel ?? "" : hangul}
      </span>
    </div>
  );
}

function PillarCard({ pillar: p }: { pillar: Pillar }) {
  const isDay = p.label === "일주";
  const heavenHue = getHeavenHue(p, isDay);
  const earthHue = getEarthHue(p, isDay);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <p
        className="text-center"
        style={{
          fontSize: "14px",
          fontFamily: "Pretendard, sans-serif",
          fontWeight: 500,
          color: "#A89272",
        }}
      >
        {p.label}
      </p>
      <PillarBox
        hanja={p.heaven}
        hangul={p.heavenHangul}
        hue={heavenHue}
        isDay={isDay}
        unknown={p.unknown}
        unknownLabel="미입력"
      />
      <PillarBox
        hanja={p.earth}
        hangul={p.earthHangul}
        hue={earthHue}
        isDay={isDay}
        unknown={p.unknown}
        unknownLabel="시간 미입력"
      />
    </div>
  );
}

type Props = {
  pillars: Pillar[];
  displayName: string;
};

export default function SajuChartSection({ pillars, displayName }: Props) {
  const orderedPillars = toTableOrder(pillars);
  const dayPillar = orderedPillars.find((p) => p.label === "일주");
  const dayHeavenHue = dayPillar ? getHeavenHue(dayPillar, true) : "#2D5BA8";

  return (
    <div
      className="w-full"
      style={{
        background: "#FDF5EA",
        paddingTop: "10px",
        paddingBottom: "10px",
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: "calc(100% - 40px)",
          background: "#FDF5EA",
          borderRadius: "28px",
          border: "1px solid #E0CFB6",
        }}
      >
        <div style={{ padding: "24px 20px 28px" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "13px",
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

          <h2
            style={{
              marginTop: "14px",
              fontSize: "26px",
              fontFamily: '"NotoSerifTC", "JejuMyeongjo", "Pretendard", serif',
              fontWeight: 600,
              color: "#2a1f15",
              letterSpacing: "-0.02em",
            }}
          >
            사주 원국
          </h2>

          <div
            className="grid grid-cols-4 gap-2 sm:gap-3"
            style={{ marginTop: "24px" }}
          >
            {orderedPillars.map((p) => (
              <PillarCard key={p.label} pillar={p} />
            ))}
          </div>

          {dayPillar && (
            <p
              className="text-center"
              style={{
                marginTop: "24px",
                fontSize: "16px",
                fontFamily: '"JejuMyeongjo", "Pretendard", serif',
                fontWeight: 400,
                color: "#7A6B55",
              }}
            >
              {"일주("}
              <span
                style={{
                  fontFamily: '"NotoSerifTC", "ChosunNm", serif',
                  fontWeight: 700,
                  fontSize: "18px",
                  color: dayHeavenHue,
                }}
              >
                {dayPillar.heaven}
                {dayPillar.earth}
              </span>
              {")는 "}
              {displayName}
              {"님의 핵심 명식입니다"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
