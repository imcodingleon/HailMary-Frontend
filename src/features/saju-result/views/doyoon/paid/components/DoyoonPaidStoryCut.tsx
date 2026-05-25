"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { SpeechBubble } from "../../components/SpeechBubble";

// 도윤 유료 페이지 스토리 컷 — 연우 PaidStoryCut과 동일 구조이나
// bg색(#fffdf7 라이트)과 SpeechBubble을 도윤 버전으로 사용.
// 이미지 클리핑은 이미지 wrapper에만 → 말풍선이 박스 위로 살짝 빠져도 안 잘림.

const DOYOON_BG = "#fffdf7";

export function DoyoonPaidStoryCut({
  src,
  alt,
  text,
  speaker = "한도윤",
  bubbleTopPct = 3,
  bubbleOffsetY = 0,
  headroomPct = 30,
  fadeTop = false,
  fadeBottom = false,
  topPad = 20,
  bottomPad = 60,
  textSize,
  lineHeight,
  paddingX,
  radius = 40,
  widthPct = 72,
  tail = "down" as "down" | "up" | false,
}: {
  src: string;
  alt: string;
  text: ReactNode;
  speaker?: string;
  bubbleTopPct?: number;
  bubbleOffsetY?: number;
  headroomPct?: number;
  fadeTop?: boolean;
  fadeBottom?: boolean;
  topPad?: number;
  bottomPad?: number;
  textSize?: number;
  lineHeight?: string;
  paddingX?: number;
  radius?: number;
  widthPct?: number;
  tail?: "down" | "up" | false;
}) {
  const IMG_W = 977;
  const IMG_H = 1612;
  const extra = (IMG_W * headroomPct) / 100;
  return (
    <div
      className="relative w-full -mx-1"
      style={{
        paddingTop: `${topPad}px`,
        paddingBottom: `${bottomPad}px`,
        background: DOYOON_BG,
      }}
    >
      <div
        className="relative w-full"
        style={{ aspectRatio: `${IMG_W} / ${IMG_H + extra}` }}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ background: DOYOON_BG }}
        >
          <div
            className="absolute inset-x-0 bottom-0"
            style={{ aspectRatio: `${IMG_W} / ${IMG_H}` }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width:480px) 100vw, 430px"
              style={{ objectFit: "cover" }}
            />
            {fadeTop && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-[80px]"
                style={{
                  background: `linear-gradient(to bottom, ${DOYOON_BG} 0%, rgba(255,253,247,0) 100%)`,
                }}
              />
            )}
            {fadeBottom && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[80px]"
                style={{
                  background: `linear-gradient(to top, ${DOYOON_BG} 0%, rgba(255,253,247,0) 100%)`,
                }}
              />
            )}
          </div>
        </div>
        <div
          className="absolute left-0 right-0 flex justify-center"
          style={{
            top: `${bubbleTopPct}%`,
            transform: bubbleOffsetY
              ? `translateY(${bubbleOffsetY}px)`
              : undefined,
          }}
        >
          <SpeechBubble
            speaker={speaker}
            widthPct={widthPct}
            paddingX={paddingX ?? 28}
            radius={radius}
            tail={tail}
            {...(textSize !== undefined && { textSize })}
            {...(lineHeight !== undefined && { lineHeight })}
          >
            {text}
          </SpeechBubble>
        </div>
      </div>
    </div>
  );
}
