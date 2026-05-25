"use client";

import type { ReactNode } from "react";

const BUBBLE_BG = "#12110F";
const BUBBLE_BORDER = "#856C51";
const TAIL_LEFT_PCT = 25;

type Props = {
  speaker?: string;
  children: ReactNode;
  widthPct?: number;
  tail?: boolean;
  tailPosition?: "top" | "bottom";
  radius?: number;
  textSize?: number;
  lineHeight?: string;
  paddingX?: number;
  paddingY?: number;
};

export function SpeechBubble({
  speaker,
  children,
  widthPct = 64,
  tail = true,
  tailPosition = "top",
  radius = 33,
  textSize = 16,
  lineHeight = "28px",
  paddingX = 24,
  paddingY = 20,
}: Props) {
  const tailStyle =
    tailPosition === "top"
      ? { top: -15 }
      : { bottom: -15, transform: "scaleY(-1)" };
  return (
    <div className="relative inline-block" style={{ maxWidth: `${widthPct}%` }}>
      {tail && (
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          style={{
            position: "absolute",
            ...tailStyle,
            left: `calc(${TAIL_LEFT_PCT}% - 8px)`,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <path d="M 1 16 L 8 1 L 15 16 Z" fill={BUBBLE_BG} />
          <path
            d="M 1 16 L 8 1 L 15 16"
            fill="none"
            stroke={BUBBLE_BORDER}
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
          <rect x="2" y="15.25" width="12" height="2" fill={BUBBLE_BG} />
        </svg>
      )}
      <div
        style={{
          background: BUBBLE_BG,
          border: `1.5px solid ${BUBBLE_BORDER}`,
          borderRadius: `${radius}px`,
          padding: `${paddingY}px ${paddingX}px`,
        }}
      >
        {speaker && (
          <p
            className="text-left mb-2"
            style={{
              color: "#c9a96e",
              fontFamily: "Pretendard, sans-serif",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            {speaker}
          </p>
        )}
        <div
          className="text-left"
          style={{
            color: "#FFF",
            fontFamily: "Pretendard, sans-serif",
            fontSize: `${textSize}px`,
            fontWeight: 500,
            lineHeight,
            letterSpacing: "0.36px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
