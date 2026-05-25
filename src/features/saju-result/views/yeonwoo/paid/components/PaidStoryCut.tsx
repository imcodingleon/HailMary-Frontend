"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { SpeechBubble } from "../../components/SpeechBubble";

// 사진 + bg색 헤드룸을 묶은 라운드 박스에 말풍선을 absolute(%) 로 띄우는 스토리 컷.
// 상/하 페이드 그라데이션으로 다음 컷과 자연스럽게 연결 가능.
// 이미지 클리핑은 이미지 wrapper에만 → 말풍선이 박스 위로 살짝 빠져도 안 잘림.
export function PaidStoryCut({
  src,
  alt,
  text,
  speaker = "강연우",
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
}: {
  src: string;
  alt: string;
  text: ReactNode;
  speaker?: string;
  bubbleTopPct?: number;
  bubbleOffsetY?: number; // px (음수=위로)
  headroomPct?: number;   // 사진 위 가상 영역 = 사진 폭의 N%
  fadeTop?: boolean;
  fadeBottom?: boolean;
  topPad?: number;
  bottomPad?: number;
  textSize?: number;
  lineHeight?: string;
  paddingX?: number;
  radius?: number;
  widthPct?: number;
}) {
  const IMG_W = 977;
  const IMG_H = 1612;
  const extra = (IMG_W * headroomPct) / 100;
  return (
    <div
      className="relative w-full -mx-1 bg-[#0a0a09]"
      style={{ paddingTop: `${topPad}px`, paddingBottom: `${bottomPad}px` }}
    >
      <div
        className="relative w-full"
        style={{ aspectRatio: `${IMG_W} / ${IMG_H + extra}` }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-[60px] bg-[#0a0a09]">
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
                  background:
                    "linear-gradient(to bottom, #0a0a09 0%, rgba(10,10,9,0) 100%)",
                }}
              />
            )}
            {fadeBottom && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[80px]"
                style={{
                  background:
                    "linear-gradient(to top, #0a0a09 0%, rgba(10,10,9,0) 100%)",
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
            tailPosition="bottom"
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
