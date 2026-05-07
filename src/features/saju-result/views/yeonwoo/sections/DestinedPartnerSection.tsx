"use client";

import Image from "next/image";
import type { SpouseMatchView } from "../../../domain/types";
import {
  DESTINED_PARTNER_DIALOGUES,
  slotIdToDestinedKey,
} from "../../../domain/destinedPartner-yeonwoo";

type Props = { spouseMatch: SpouseMatchView | null };

const DEFAULT_BAR_WIDTHS: [number, number, number] = [58, 50, 55];

const BAR_WIDTH_VARIANTS: Record<string, [number, number, number]> = {
  "f-water-yang": [60, 52, 56],
  "f-fire-yang": [55, 48, 52],
  "m-fire-yang": [58, 50, 54],
  "m-water-yin": [54, 46, 50],
};

function getBarWidths(slotId: string): [number, number, number] {
  return BAR_WIDTH_VARIANTS[slotId] ?? DEFAULT_BAR_WIDTHS;
}

const TEXT_COLOR = "#D0C5B6";
const LABEL_COLOR = "#998f82";
const ROW_DIVIDER = "#2a2520";
const GOLD = "#c9a96e";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-[13px]" style={{ color: LABEL_COLOR }}>
        {label}
      </span>
      <span className="text-[13px] font-medium" style={{ color: TEXT_COLOR }}>
        {value}
      </span>
    </div>
  );
}

function BlurredRow({ label, widthPct = 60 }: { label: string; widthPct?: number }) {
  return (
    <div className="flex items-center justify-between py-3 gap-4">
      <span className="text-[13px] flex-shrink-0" style={{ color: LABEL_COLOR }}>
        {label}
      </span>
      <div
        className="rounded-[3px] flex-shrink-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(120,110,100,0.36) 0%, rgba(140,130,120,0.42) 50%, rgba(120,110,100,0.36) 100%)",
          height: "14px",
          width: `${widthPct}%`,
          maxWidth: "62%",
        }}
        aria-hidden="true"
      />
    </div>
  );
}

function CtaLockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.5 6.5V4.5C3.5 2.567 5.067 1 7 1C8.933 1 10.5 2.567 10.5 4.5V6.5M3 6.5H11C11.5523 6.5 12 6.94772 12 7.5V12.5C12 13.0523 11.5523 13 11 13H3C2.44772 13 2 13.0523 2 12.5V7.5C2 6.94772 2.44772 6.5 3 6.5Z"
        stroke="#E05C6A"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function DestinedPartnerSection({ spouseMatch }: Props) {
  const slotId = spouseMatch?.slotId ?? "neutral";
  const destinedKey = slotIdToDestinedKey(slotId);
  const copy = DESTINED_PARTNER_DIALOGUES[destinedKey];
  const [w1, w2, w3] = getBarWidths(slotId);
  const imageSrc = `/images/spouse/${slotId}.png`;

  return (
    <div className="w-full px-5 py-12" style={{ background: "#000" }}>
      <h2
        className="text-center text-[22px] font-bold tracking-[0.05em] mb-2"
        style={{ color: "#E8DDC8" }}
      >
        곧 다가올 인연
      </h2>
      <p className="text-center text-[14px] tracking-[0.08em] mb-3" style={{ color: LABEL_COLOR }}>
        네 사주에서 읽히는 그 사람의 윤곽
      </p>
      <div className="flex justify-center mb-6">
        <div className="w-12 h-[1px]" style={{ background: GOLD, opacity: 0.7 }} />
      </div>

      <div
        className="relative w-full overflow-hidden mb-5"
        style={{
          borderRadius: "16px",
          border: "1px solid #2a2520",
          aspectRatio: "1 / 1",
        }}
      >
        <Image
          src={imageSrc}
          alt=""
          width={448}
          height={448}
          className="w-full h-full object-cover block"
          sizes="(max-width: 448px) 100vw, 448px"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      </div>

      <div className="flex items-start justify-center gap-2 mb-7 px-2">
        <span
          className="text-[18px] leading-none flex-shrink-0"
          style={{ color: GOLD, opacity: 0.7, fontFamily: "serif" }}
        >
          “
        </span>
        <p className="text-[14px] text-center leading-relaxed" style={{ color: TEXT_COLOR }}>
          {copy.quote}
        </p>
        <span
          className="text-[18px] leading-none flex-shrink-0 self-end"
          style={{ color: GOLD, opacity: 0.7, fontFamily: "serif" }}
        >
          ”
        </span>
      </div>

      <p className="text-[13px] font-semibold mb-1" style={{ color: GOLD }}>
        공개 정보
      </p>
      <div className="border-t" style={{ borderColor: ROW_DIVIDER }}>
        <InfoRow label="인상" value={copy.impression} />
        <div className="h-[1px]" style={{ background: ROW_DIVIDER }} />
        <InfoRow label="나이 차" value={copy.ageGap} />
        <div className="h-[1px]" style={{ background: ROW_DIVIDER }} />
        <InfoRow label="첫 느낌" value={copy.firstFeel} />
      </div>

      <p className="text-[13px] font-semibold mt-7 mb-1" style={{ color: LABEL_COLOR }}>
        잠긴 정보
      </p>
      <div className="border-t" style={{ borderColor: ROW_DIVIDER }}>
        <BlurredRow label="왜 끌리는가" widthPct={w1} />
        <div className="h-[1px]" style={{ background: ROW_DIVIDER }} />
        <BlurredRow label="결정적 순간" widthPct={w2} />
        <div className="h-[1px]" style={{ background: ROW_DIVIDER }} />
        <BlurredRow label="다가가는 방법" widthPct={w3} />
      </div>

      <button
        type="button"
        className="w-full rounded-xl py-3.5 mt-7 flex items-center justify-center gap-2 text-[16px] font-medium tracking-[0.05em]"
        style={{
          border: "1px solid #5a2026",
          background: "#1a0a0c",
          color: "#E05C6A",
        }}
        onClick={() => {
          alert("풀결과에서 확인할 수 있어요.");
        }}
      >
        <CtaLockIcon />
        <span>이 사람을 알아보는 법은 전체결과에서</span>
      </button>
    </div>
  );
}
