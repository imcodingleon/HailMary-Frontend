"use client";

import type { ReactNode } from "react";
import { AVOID_PARTNER_FREE_DIALOGUES } from "../../../domain/avoidPartner";
import type { AvoidSlotKey } from "../../../domain/types";

const SECTION_BG = "#FDF5EA";
const CARD_BG = "#FBF1E7";
const CARD_BORDER = "#E0CFB6";
const ROW_DIVIDER = "#E5D8C3";
const SECTION_LABEL_COLOR = "#AD7D38";
const ROW_LABEL_COLOR = "#856C51";
const ROW_VALUE_COLOR = "#4a3a2a";
const LOCK_LABEL_COLOR = "#998f82";
const CTA_COLOR = "#E94E3F";
const ICON_COLOR = "#AD7D38";

function FaceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke={ICON_COLOR} strokeWidth="1.2" fill="none" />
      <circle cx="7.2" cy="9" r="0.9" fill={ICON_COLOR} />
      <circle cx="12.8" cy="9" r="0.9" fill={ICON_COLOR} />
      <path d="M 7 13.2 Q 10 12 13 13.2" stroke={ICON_COLOR} strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function CycleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M 4 10 a 6 6 0 0 1 11 -3.5" stroke={ICON_COLOR} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M 12.5 6 L 15.5 6.5 L 15 9.5" stroke={ICON_COLOR} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 16 10 a 6 6 0 0 1 -11 3.5" stroke={ICON_COLOR} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M 7.5 14 L 4.5 13.5 L 5 10.5" stroke={ICON_COLOR} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <ellipse cx="10" cy="10" rx="8" ry="5" stroke={ICON_COLOR} strokeWidth="1.2" fill="none" />
      <circle cx="10" cy="10" r="2.2" stroke={ICON_COLOR} strokeWidth="1.2" fill="none" />
    </svg>
  );
}

function LockIcon({ size = 14, color = LOCK_LABEL_COLOR }: { size?: number; color?: string }) {
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

function FreeRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-stretch" style={{ padding: "14px 16px", gap: "12px" }}>
      <div style={{ width: "22px", flexShrink: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
        {icon}
      </div>
      <div
        style={{
          width: "56px",
          flexShrink: 0,
          fontSize: "13px",
          color: ROW_LABEL_COLOR,
          fontFamily: "Pretendard, sans-serif",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
        }}
      >
        {label}
      </div>
      <div style={{ width: "1px", background: ROW_DIVIDER, alignSelf: "stretch" }} />
      <div
        className="flex-1"
        style={{
          fontSize: "13px",
          color: ROW_VALUE_COLOR,
          fontFamily: "Pretendard, sans-serif",
          fontWeight: 500,
          lineHeight: 1.55,
          textWrap: "auto",
          display: "flex",
          alignItems: "center",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function LockRow({ label, lineWidths }: { label: string; lineWidths: number[] }) {
  return (
    <div className="flex items-stretch" style={{ padding: "14px 16px", gap: "12px" }}>
      <div style={{ width: "22px", flexShrink: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <LockIcon />
      </div>
      <div
        style={{
          width: "84px",
          flexShrink: 0,
          fontSize: "13px",
          color: LOCK_LABEL_COLOR,
          fontFamily: "Pretendard, sans-serif",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
        }}
      >
        {label}
      </div>
      <div style={{ width: "1px", background: ROW_DIVIDER, alignSelf: "stretch" }} />
      <div
        className="flex-1 flex flex-col gap-1.5 justify-center"
        aria-hidden="true"
      >
        {lineWidths.map((w, i) => (
          <div
            key={i}
            style={{
              height: "10px",
              width: `${w}%`,
              borderRadius: "3px",
              background:
                "linear-gradient(90deg, rgba(133,108,81,0.18) 0%, rgba(133,108,81,0.28) 50%, rgba(133,108,81,0.18) 100%)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

type Props = {
  slotId: AvoidSlotKey | null | undefined;
  onLockedClick?: () => void;
};

export default function AvoidPartnerInfoSection({ slotId, onLockedClick }: Props) {
  const safeSlot: AvoidSlotKey = slotId ?? "m-neutral";
  const copy =
    AVOID_PARTNER_FREE_DIALOGUES[safeSlot] ?? AVOID_PARTNER_FREE_DIALOGUES["m-neutral"];

  return (
    <div
      className="w-full"
      style={{ background: SECTION_BG, paddingTop: "20px", paddingBottom: "32px" }}
    >
      <div style={{ margin: "0 20px" }}>
        <div className="flex items-center" style={{ gap: "10px", marginBottom: "10px" }}>
          <p
            style={{
              fontSize: "13px",
              fontFamily: "Pretendard, sans-serif",
              fontWeight: 600,
              color: SECTION_LABEL_COLOR,
              letterSpacing: "0.02em",
            }}
          >
            공개 정보
          </p>
          <div style={{ flex: 1, borderTop: `1px dashed ${SECTION_LABEL_COLOR}55` }} />
        </div>
        <div
          style={{
            borderRadius: "14px",
            border: `1px solid ${CARD_BORDER}`,
            background: CARD_BG,
            marginBottom: "20px",
            overflow: "hidden",
          }}
        >
          <FreeRow icon={<FaceIcon />} label="인상" value={copy.impression} />
          <div style={{ height: "1px", background: ROW_DIVIDER }} />
          <FreeRow icon={<CycleIcon />} label="패턴" value={copy.ageGap} />
          <div style={{ height: "1px", background: ROW_DIVIDER }} />
          <FreeRow icon={<EyeIcon />} label="신호" value={copy.firstFeel} />
        </div>

        <div className="flex items-center" style={{ gap: "10px", marginBottom: "10px" }}>
          <p
            style={{
              fontSize: "13px",
              fontFamily: "Pretendard, sans-serif",
              fontWeight: 600,
              color: SECTION_LABEL_COLOR,
              letterSpacing: "0.02em",
            }}
          >
            잠긴 정보
          </p>
          <div style={{ flex: 1, borderTop: `1px dashed ${SECTION_LABEL_COLOR}55` }} />
        </div>
        <div
          style={{
            borderRadius: "14px",
            border: `1px solid ${CARD_BORDER}`,
            background: CARD_BG,
            marginBottom: "20px",
            overflow: "hidden",
          }}
        >
          <LockRow label="왜 비호환인가" lineWidths={[80, 60]} />
          <div style={{ height: "1px", background: ROW_DIVIDER }} />
          <LockRow label="결정적 순간" lineWidths={[70]} />
          <div style={{ height: "1px", background: ROW_DIVIDER }} />
          <LockRow label="대응 전략" lineWidths={[85, 55]} />
        </div>

        <button
          type="button"
          className="w-full"
          style={{
            padding: "16px",
            borderRadius: "14px",
            border: `1.5px solid ${CTA_COLOR}55`,
            background: "transparent",
            color: CTA_COLOR,
            fontSize: "14px",
            fontFamily: "Pretendard, sans-serif",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
          onClick={() => {
            if (onLockedClick) {
              onLockedClick();
            } else {
              alert("유료 결제 후 확인할 수 있어요.");
            }
          }}
        >
          <LockIcon size={14} color={CTA_COLOR} />
          상세 분석은 전체 결과에서
        </button>
      </div>
    </div>
  );
}
