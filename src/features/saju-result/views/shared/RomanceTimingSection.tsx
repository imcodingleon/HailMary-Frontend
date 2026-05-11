"use client";

import type { ReactNode } from "react";
import type { MonthlyRomanceFlowView } from "@/features/saju-result/domain/types";

const SECTION_BG = "#FDF5EA";
const CARD_BG = "#FBF1E7";
const CARD_BORDER = "#E0CFB6";
const TITLE_COLOR = "#2a1f15";
const SUBTITLE_COLOR = "#998f82";
const HEART_FILLED = "#E94E3F";
const HEART_EMPTY = "#E0CFB6";
const MONTH_LABEL_COLOR = "#4a3a2a";
const LOCKED_BAR_COLOR = "rgba(133,108,81,0.22)";
const PERCENT_COLOR = "#856C51";
const LOCKED_PERCENT_COLOR = "#977e68";
const PEAK_ROW_BG = "#FBE7E3";
const PEAK_PILL_BG = "#E94E3F";
const PEAK_PILL_TEXT = "#FFFFFF";
const ROW_DIVIDER = "#E5D8C3";
const CTA_COLOR = "#E94E3F";

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="21" height="21" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M 10 17 C 10 17 3 12.5 3 8 C 3 5.5 5 4 7 4 C 8.5 4 9.6 5 10 6 C 10.4 5 11.5 4 13 4 C 15 4 17 5.5 17 8 C 17 12.5 10 17 10 17 Z"
        fill={filled ? HEART_FILLED : "none"}
        stroke={filled ? HEART_FILLED : HEART_EMPTY}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartRow({ count, total = 5 }: { count: number; total?: number }) {
  return (
    <div className="flex items-center" style={{ gap: "7px" }}>
      {Array.from({ length: total }).map((_, i) => (
        <HeartIcon key={i} filled={i < count} />
      ))}
    </div>
  );
}

function LockIcon({ size = 14, color = "#998f82" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M3.5 6.5V4.5C3.5 2.567 5.067 1 7 1C8.933 1 10.5 2.567 10.5 4.5V6.5M3 6.5H11C11.5523 6.5 12 6.94772 12 7.5V12.5C12 13.0523 11.5523 13.5 11 13.5H3C2.44772 13.5 2 13.0523 2 12.5V7.5C2 6.94772 2.44772 6.5 3 6.5Z"
        stroke={color}
        strokeWidth="1.2"
      />
    </svg>
  );
}

function VisibleMonthRow({
  monthLabel,
  hearts,
  percentage,
  isLast,
}: {
  monthLabel: string;
  hearts: number;
  percentage: number;
  isLast: boolean;
}) {
  return (
    <>
      <div className="flex items-center" style={{ padding: "14px 18px" }}>
        <div
          style={{
            width: "46px",
            flexShrink: 0,
            fontSize: "15px",
            color: MONTH_LABEL_COLOR,
            fontFamily: "Pretendard, sans-serif",
            fontWeight: 500,
          }}
        >
          {monthLabel}
        </div>
        <div className="flex-1 flex justify-center">
          <HeartRow count={hearts} />
        </div>
        <div
          style={{
            width: "56px",
            flexShrink: 0,
            textAlign: "right",
            fontSize: "15px",
            color: PERCENT_COLOR,
            fontFamily: "Pretendard, sans-serif",
            fontWeight: 500,
          }}
        >
          {percentage}%
        </div>
      </div>
      {!isLast && (
        <div style={{ height: "1px", background: ROW_DIVIDER, margin: "0 16px" }} />
      )}
    </>
  );
}

function PeakLockedRow({ isLast }: { isLast: boolean }) {
  return (
    <>
      <div
        className="flex items-center"
        style={{ padding: "14px 18px", background: PEAK_ROW_BG }}
      >
        <div
          style={{
            width: "46px",
            flexShrink: 0,
            fontSize: "15px",
            color: MONTH_LABEL_COLOR,
            fontFamily: "Pretendard, sans-serif",
            fontWeight: 500,
          }}
        >
          ?월
        </div>
        <div className="flex-1 flex justify-center">
          <HeartRow count={5} />
        </div>
        <div
          style={{
            width: "56px",
            flexShrink: 0,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <span
            style={{
              display: "inline-block",
              background: PEAK_PILL_BG,
              color: PEAK_PILL_TEXT,
              fontSize: "12px",
              fontFamily: "Pretendard, sans-serif",
              fontWeight: 700,
              padding: "4px 10px",
              borderRadius: "5px",
              letterSpacing: "0.08em",
            }}
          >
            PEAK
          </span>
        </div>
      </div>
      {!isLast && (
        <div style={{ height: "1px", background: ROW_DIVIDER, margin: "0 16px" }} />
      )}
    </>
  );
}

function NormalLockedRow({ isLast }: { isLast: boolean }) {
  return (
    <>
      <div className="flex items-center" style={{ padding: "14px 18px" }}>
        <div style={{ width: "46px", flexShrink: 0 }}>
          <div
            style={{
              height: "12px",
              width: "82%",
              background: LOCKED_BAR_COLOR,
              borderRadius: "3px",
            }}
          />
        </div>
        <div className="flex-1 flex justify-center">
          <HeartRow count={0} />
        </div>
        <div
          style={{
            width: "56px",
            flexShrink: 0,
            textAlign: "right",
            fontSize: "15px",
            color: LOCKED_PERCENT_COLOR,
            fontFamily: "Pretendard, sans-serif",
            fontWeight: 500,
          }}
        >
          ??
        </div>
      </div>
      {!isLast && (
        <div style={{ height: "1px", background: ROW_DIVIDER, margin: "0 16px" }} />
      )}
    </>
  );
}

type Props = {
  monthlyRomanceFlow: MonthlyRomanceFlowView | null | undefined;
  speechBubble?: ReactNode;
  ctaLabel?: string;
  onLockedClick?: () => void;
  subtitle?: string;
};

export default function RomanceTimingSection({
  monthlyRomanceFlow,
  speechBubble,
  ctaLabel = "피크 시기 전체 확인은 전체 결과에서",
  onLockedClick,
  subtitle = "향후 12개월 연애운 흐름",
}: Props) {
  const visibleMonths = monthlyRomanceFlow?.visibleMonths ?? [];
  const lockedTotal = monthlyRomanceFlow?.lockedSlots?.totalCount ?? 10;
  const peakOffset = monthlyRomanceFlow?.lockedSlots?.peakOffsetFromVisible ?? 1;
  const visibleCount = visibleMonths.length;
  // 연우와 동일하게: PEAK은 backend 값과 관계없이 visible 행 바로 다음(첫 locked 슬롯)에 고정.
  const renderPeakInLocked = peakOffset > 0;
  const lockedAfter = renderPeakInLocked ? lockedTotal - 1 : lockedTotal;
  const totalRows = visibleCount + lockedTotal;

  const handleLocked = () => {
    if (onLockedClick) {
      onLockedClick();
    } else {
      alert("유료 결제 후 확인할 수 있어요.");
    }
  };

  return (
    <div
      className="w-full"
      style={{
        background: SECTION_BG,
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
      <h2
        className="text-center"
        style={{
          fontSize: "24px",
          fontFamily: '"JejuMyeongjo", "Pretendard", serif',
          fontWeight: 600,
          color: TITLE_COLOR,
          letterSpacing: "0.01em",
          marginBottom: "8px",
        }}
      >
        인연이 오는 시간
      </h2>
      <p
        className="text-center"
        style={{
          fontSize: "14px",
          fontFamily: "Pretendard, sans-serif",
          fontWeight: 500,
          color: SUBTITLE_COLOR,
          letterSpacing: "0.04em",
          marginBottom: "16px",
        }}
      >
        {subtitle}
      </p>
      <div className="flex justify-center" style={{ marginBottom: "24px" }}>
        <div
          style={{ width: "48px", height: "1px", background: "#A5773C", opacity: 0.7 }}
        />
      </div>

      <div
        style={{
          margin: "0 30px",
          border: `1px solid ${CARD_BORDER}`,
          borderRadius: "14px",
          background: CARD_BG,
          overflow: "hidden",
        }}
      >
        {visibleMonths.map((m, i) => (
          <VisibleMonthRow
            key={`v-${m.monthLabel}-${i}`}
            monthLabel={m.monthLabel}
            hearts={m.hearts}
            percentage={m.percentage}
            isLast={false}
          />
        ))}
        {renderPeakInLocked && (
          <PeakLockedRow isLast={visibleCount + 1 === totalRows} />
        )}
        {Array.from({ length: lockedAfter }).map((_, i) => {
          const offset = (renderPeakInLocked ? 2 : 1) + i;
          const isLast = visibleCount + offset === totalRows;
          return <NormalLockedRow key={`l-${i}`} isLast={isLast} />;
        })}
      </div>

      {speechBubble && (
        <div
          className="flex justify-center"
          style={{ marginTop: "24px", padding: "0 20px" }}
        >
          {speechBubble}
        </div>
      )}

      <div style={{ margin: "20px 20px 0" }}>
        <button
          type="button"
          className="w-full"
          style={{
            padding: "16px",
            borderRadius: "14px",
            border: `1.5px solid ${CTA_COLOR}55`,
            background: "transparent",
            color: CTA_COLOR,
            fontSize: "16px",
            fontFamily: "Pretendard, sans-serif",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
          onClick={handleLocked}
        >
          <LockIcon size={14} color={CTA_COLOR} />
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
