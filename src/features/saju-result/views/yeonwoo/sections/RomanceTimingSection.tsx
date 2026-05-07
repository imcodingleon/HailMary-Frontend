"use client";

import Image from "next/image";
import type { MonthlyRomanceFlowView } from "../../../domain/types";

type Props = { flow: MonthlyRomanceFlowView | null };

const GOLD = "#c9a96e";
const PEAK_RED = "#E05C6A";
const HEART_FILLED = "#E05C6A";
const HEART_EMPTY = "#3a2a2a";
const LOCKED_TEXT = "#4a3a3a";

function HeartRow({ filled, total = 5 }: { filled: number; total?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          style={{ color: i < filled ? HEART_FILLED : HEART_EMPTY, fontSize: "14px" }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}

function VisibleRow({
  monthLabel,
  percentage,
  hearts,
  isPeak,
  isLast,
}: {
  monthLabel: string;
  percentage: number;
  hearts: 1 | 2 | 3 | 4 | 5;
  isPeak: boolean;
  isLast: boolean;
}) {
  return (
    <>
      <div
        className="flex items-center justify-between px-4 py-3"
        style={
          isPeak
            ? {
                border: `1px solid ${PEAK_RED}`,
                borderRadius: "10px",
                background: "rgba(224,92,106,0.06)",
                boxShadow: `0 0 12px rgba(224,92,106,0.18)`,
                margin: "2px 0",
              }
            : {}
        }
      >
        <div className="flex items-center gap-3">
          <span
            className="text-[13px] font-bold w-8"
            style={{ color: isPeak ? PEAK_RED : GOLD }}
          >
            {monthLabel}
          </span>
          <HeartRow filled={hearts} />
        </div>
        <div className="flex items-center gap-2">
          {isPeak && (
            <span
              className="text-[9px] tracking-widest px-2 py-0.5 rounded-full"
              style={{ border: `1px solid ${PEAK_RED}`, color: PEAK_RED }}
            >
              PEAK
            </span>
          )}
          <span className="text-[12px] tabular-nums" style={{ color: isPeak ? PEAK_RED : GOLD }}>
            {percentage}%
          </span>
        </div>
      </div>
      {!isLast && (
        <div className="w-full h-px mx-0" style={{ background: "rgba(133,108,81,0.2)" }} />
      )}
    </>
  );
}

function PeakRow({ isLast }: { isLast: boolean }) {
  return (
    <>
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{
          border: `1px solid ${PEAK_RED}`,
          borderRadius: "10px",
          background: "rgba(224,92,106,0.06)",
          boxShadow: `0 0 12px rgba(224,92,106,0.18)`,
          margin: "2px 0",
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-[13px] font-bold w-8" style={{ color: PEAK_RED }}>
            ?월
          </span>
          <HeartRow filled={5} />
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-[9px] tracking-widest px-2 py-0.5 rounded-full"
            style={{ border: `1px solid ${PEAK_RED}`, color: PEAK_RED }}
          >
            PEAK
          </span>
          <span className="text-[12px] tabular-nums" style={{ color: PEAK_RED }}>
            ???%
          </span>
        </div>
      </div>
      {!isLast && (
        <div className="w-full h-px" style={{ background: "rgba(133,108,81,0.2)" }} />
      )}
    </>
  );
}

function LockedRow({ isLast }: { isLast: boolean }) {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-[13px] font-bold w-8" style={{ color: LOCKED_TEXT }}>
            ??
          </span>
          <HeartRow filled={0} />
        </div>
        <span className="text-[12px] tabular-nums" style={{ color: LOCKED_TEXT }}>
          ??%
        </span>
      </div>
      {!isLast && (
        <div className="w-full h-px" style={{ background: "rgba(133,108,81,0.1)" }} />
      )}
    </>
  );
}

export function RomanceTimingSection({ flow }: Props) {
  const visibleMonths = flow?.visibleMonths ?? [];
  const lockedTotal = flow?.lockedSlots.totalCount ?? 10;
  const peakOffset = flow?.lockedSlots.peakOffsetFromVisible ?? 5;

  const renderPeakInLocked = peakOffset > 0;
  const lockedBefore = 0;
  const lockedAfter = renderPeakInLocked ? lockedTotal - 1 : lockedTotal;
  const totalRows =
    visibleMonths.length + lockedTotal + (renderPeakInLocked ? 1 : 0);

  let rowIdx = 0;

  return (
    <div className="w-full px-3 py-4" style={{ background: "#000" }}>
      <h2
        className="text-center text-[22px] font-bold tracking-[0.05em] mb-2"
        style={{ color: "#E8DDC8" }}
      >
        인연이 오는 시간
      </h2>
      <p
        className="text-center text-[14px] tracking-[0.08em] mb-3"
        style={{ color: "#998f82" }}
      >
        향후 12개월 연애운 흐름
      </p>
      <div className="flex justify-center mb-6">
        <div className="w-12 h-[1px]" style={{ background: GOLD, opacity: 0.7 }} />
      </div>

      <div
        className="w-full rounded-2xl overflow-hidden mb-4"
        style={{ background: "#0a0a0a", border: "1px solid #856C51" }}
      >
        {visibleMonths.map((m) => {
          rowIdx++;
          return (
            <VisibleRow
              key={m.monthLabel}
              monthLabel={m.monthLabel}
              percentage={m.percentage}
              hearts={m.hearts}
              isPeak={m.isPeak}
              isLast={rowIdx === totalRows}
            />
          );
        })}

        {Array.from({ length: lockedBefore }, (_, idx) => {
          rowIdx++;
          return <LockedRow key={`locked-before-${idx}`} isLast={rowIdx === totalRows} />;
        })}

        {renderPeakInLocked &&
          (() => {
            rowIdx++;
            return <PeakRow key="peak" isLast={rowIdx === totalRows} />;
          })()}

        {Array.from({ length: lockedAfter }, (_, idx) => {
          rowIdx++;
          return <LockedRow key={`locked-after-${idx}`} isLast={rowIdx === totalRows} />;
        })}
      </div>

      <div
        className="flex items-center mb-4"
        style={{ height: "200px", paddingLeft: "20px", paddingRight: "20px" }}
      >
        <div className="relative" style={{ width: "50%", paddingRight: "8px" }}>
          <div
            className="rounded-2xl px-4"
            style={{
              background: "#141311",
              border: "1px solid rgba(201,169,110,0.3)",
              paddingTop: "16px",
              paddingBottom: "16px",
            }}
          >
            <p
              className="tracking-[0.3em]"
              style={{ color: GOLD, fontSize: "11px", marginBottom: "8px" }}
            >
              강연우
            </p>
            <p className="leading-relaxed" style={{ color: "#D0C5B6", fontSize: "14px" }}>
              이 시기 그냥 넘기면 나중에 후회한다. 진심이야.
            </p>
          </div>
          <div
            className="absolute bottom-6"
            style={{
              right: "1px",
              width: 0,
              height: 0,
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderLeft: "7px solid rgba(201,169,110,0.3)",
            }}
          />
        </div>

        <div
          className="flex items-center justify-center"
          style={{ width: "50%", height: "100%", paddingLeft: "8px", overflow: "visible" }}
        >
          <Image
            src="/saju/yeonwoo/result/14-yeonwoo-sd-sitting.png"
            alt=""
            width={1024}
            height={1536}
            className="w-auto block"
            style={{ height: "120%", objectFit: "contain" }}
          />
        </div>
      </div>

      <button
        className="w-full rounded-xl py-3 flex items-center justify-center text-[16px] tracking-[0.05em] font-medium"
        style={{
          border: "1px solid #5a4a30",
          background: "#1a1410",
          color: GOLD,
        }}
        onClick={() => {
          alert("전체결과에서 확인할 수 있어요.");
        }}
      >
        🔒 피크 시기 전체 확인은 전체결과에서
      </button>
    </div>
  );
}
