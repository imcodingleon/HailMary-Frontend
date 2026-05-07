"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import type {
  AvoidSlotKey,
  SpouseMatchView,
} from "@/features/saju-result/domain/types";

const SECTION_BG = "#FDF5EA";
const CARD_BG = "#FBF1E7";
const CARD_BORDER = "#E0CFB6";
const ROW_DIVIDER = "#E5D8C3";
const SECTION_LABEL_COLOR = "#AD7D38";
const TITLE_COLOR = "#2a1f15";
const SUBTITLE_COLOR = "#7A6B55";
const ROW_LABEL_COLOR = "#856C51";
const ROW_VALUE_COLOR = "#4a3a2a";
const LOCK_LABEL_COLOR = "#998f82";
const QUOTE_COLOR = "#E94E3F";
const ICON_COLOR = "#AD7D38";
const CTA_COLOR = "#E94E3F";
const GOLD = "#A5773C";

export type DestinedSlotKey =
  | "wood-yang"
  | "wood-yin"
  | "fire-yang"
  | "fire-yin"
  | "earth-yang"
  | "earth-yin"
  | "metal-yang"
  | "metal-yin"
  | "water-yang"
  | "water-yin"
  | "neutral";

export type DestinedPartnerCopy = {
  quote: string;
  impression: string;
  ageGap: string;
  firstFeel: string;
};

export const DESTINED_PARTNER_DIALOGUES: Record<DestinedSlotKey, DestinedPartnerCopy> = {
  "wood-yang": {
    quote: "방향이 분명해서 같이 가고 싶게 만드는 사람",
    impression: "키 크고 어깨 넓은 활동형 인상",
    ageGap: "1~3살 위",
    firstFeel: "주도하는 분위기로 다가옴",
  },
  "wood-yin": {
    quote: "곁에 있으면 자연스럽게 자라게 만드는 사람",
    impression: "선이 얇고 부드러운 식물성 인상",
    ageGap: "비슷하거나 연하",
    firstFeel: "조용히 곁을 채우는 분위기",
  },
  "fire-yang": {
    quote: "처음 본 자리에서 분위기를 환하게 바꾸는 사람",
    impression: "친근하고 말이 많은 타입",
    ageGap: "비슷하거나 연하",
    firstFeel: "편하고 자연스러움",
  },
  "fire-yin": {
    quote: "한 사람만 깊이 들여다보는 인상의 사람",
    impression: "눈매가 따뜻한 섬세형 인상",
    ageGap: "비슷하거나 1~2살 위",
    firstFeel: "조심스럽게 다가옴",
  },
  "earth-yang": {
    quote: "묵직하게 자리 잡아 안정감을 주는 사람",
    impression: "체격이 단단한 안정형 인상",
    ageGap: "3~6살 위",
    firstFeel: "묵직하게 자리 잡음",
  },
  "earth-yin": {
    quote: "내 얘기를 끝까지 들어줄 것 같은 사람",
    impression: "둥근 선의 포용형 인상",
    ageGap: "비슷하거나 1~3살 위",
    firstFeel: "잘 들어주는 분위기",
  },
  "metal-yang": {
    quote: "기준이 분명해서 신뢰가 먼저 생기는 사람",
    impression: "선이 또렷한 결단형 인상",
    ageGap: "1~4살 위",
    firstFeel: "기준을 먼저 보여줌",
  },
  "metal-yin": {
    quote: "단정한 결로 곁을 깔끔히 정돈해주는 사람",
    impression: "정돈된 단정한 인상",
    ageGap: "비슷하거나 1~2살 위",
    firstFeel: "차분하게 거리 좁힘",
  },
  "water-yang": {
    quote: "처음엔 확신을 줄 것처럼 다가오는 사람",
    impression: "여유 있고 자신감 있는 인상",
    ageGap: "비슷하거나 연상·연하 폭 넓음",
    firstFeel: "확신을 줄 것처럼 다가옴",
  },
  "water-yin": {
    quote: "조용한데 한 번 보면 자꾸 떠오르는 사람",
    impression: "조용하고 깊이 있는 인상",
    ageGap: "1~3살 위",
    firstFeel: "말 적지만 시선이 길게 머묾",
  },
  neutral: {
    quote: "어느 쪽으로도 치우치지 않은 결의 사람",
    impression: "특정 인상보다 본인 컨디션에 따라 끌리는 결",
    ageGap: "고정 폭 없음",
    firstFeel: "상황에 따라 다른 분위기로 다가옴",
  },
};

export function slotIdToDestinedKey(slotId: string): DestinedSlotKey {
  const idx = slotId.indexOf("-");
  if (idx < 0) return "neutral";
  const rest = slotId.slice(idx + 1);
  if (rest === "neutral") return "neutral";
  const valid: ReadonlyArray<DestinedSlotKey> = [
    "wood-yang",
    "wood-yin",
    "fire-yang",
    "fire-yin",
    "earth-yang",
    "earth-yin",
    "metal-yang",
    "metal-yin",
    "water-yang",
    "water-yin",
  ];
  return valid.includes(rest as DestinedSlotKey) ? (rest as DestinedSlotKey) : "neutral";
}

const DEFAULT_BAR_WIDTHS: [number, number, number] = [88, 78, 84];
const BAR_WIDTH_VARIANTS: Record<string, [number, number, number]> = {
  "f-water-yang": [92, 80, 86],
  "f-fire-yang": [86, 74, 82],
  "m-fire-yang": [90, 78, 84],
  "m-water-yin": [84, 72, 80],
};

function getBarWidths(slotId: string): [number, number, number] {
  return BAR_WIDTH_VARIANTS[slotId] ?? DEFAULT_BAR_WIDTHS;
}

function FaceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke={ICON_COLOR} strokeWidth="1.2" fill="none" />
      <circle cx="7.2" cy="9" r="0.9" fill={ICON_COLOR} />
      <circle cx="12.8" cy="9" r="0.9" fill={ICON_COLOR} />
      <path d="M 7 12.8 Q 10 14.4 13 12.8" stroke={ICON_COLOR} strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="7" cy="7.5" r="2.4" stroke={ICON_COLOR} strokeWidth="1.2" fill="none" />
      <circle cx="13.2" cy="7.5" r="2.4" stroke={ICON_COLOR} strokeWidth="1.2" fill="none" />
      <path d="M 2.5 16 Q 2.5 11 7 11 Q 11.5 11 11.5 16" stroke={ICON_COLOR} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M 8.7 16 Q 8.7 11 13.2 11 Q 17.5 11 17.5 16" stroke={ICON_COLOR} strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M 10 16.5 C 10 16.5 3 12 3 7.5 C 3 5.4 4.6 4 6.5 4 C 8 4 9.2 4.9 10 6 C 10.8 4.9 12 4 13.5 4 C 15.4 4 17 5.4 17 7.5 C 17 12 10 16.5 10 16.5 Z"
        stroke={ICON_COLOR}
        strokeWidth="1.2"
        fill="none"
        strokeLinejoin="round"
      />
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
      <div
        style={{
          width: "22px",
          flexShrink: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
      <div
        style={{
          width: "22px",
          flexShrink: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
      <div className="flex-1 flex flex-col gap-1.5 justify-center" aria-hidden="true">
        {lineWidths.map((w, i) => (
          <div
            key={i}
            style={{
              height: "16px",
              width: `${w}%`,
              borderRadius: "4px",
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
  spouseMatch: SpouseMatchView | null | undefined;
  displayName: string;
  imageBasePath?: string;
  onLockedClick?: () => void;
  ctaLabel?: string;
};

export default function DestinedPartnerSection({
  spouseMatch,
  displayName,
  imageBasePath = "/images/spouse",
  onLockedClick,
  ctaLabel = "이 사람을 알아보는 법은 전체 결과에서",
}: Props) {
  const slotId: AvoidSlotKey = (spouseMatch?.slotId ?? "neutral") as AvoidSlotKey;
  const destinedKey = slotIdToDestinedKey(slotId);
  const copy = DESTINED_PARTNER_DIALOGUES[destinedKey];
  const [w1, w2, w3] = getBarWidths(slotId);
  const imageSrc = `${imageBasePath}/${slotId}.png`;

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
        곧 다가올 인연
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
        {displayName}님 사주에서 읽히는 그 사람의 윤곽
      </p>
      <div className="flex justify-center" style={{ marginBottom: "24px" }}>
        <div style={{ width: "48px", height: "1px", background: GOLD, opacity: 0.7 }} />
      </div>

      <div style={{ margin: "0 20px 16px" }}>
        <div
          className="relative w-full overflow-hidden"
          style={{
            borderRadius: "14px",
            border: `1px solid ${CARD_BORDER}`,
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
                "radial-gradient(ellipse at center, transparent 40%, rgba(253,245,234,0.45) 100%)",
            }}
          />
        </div>
      </div>

      <div
        className="flex items-start justify-center"
        style={{ gap: "8px", marginBottom: "28px", padding: "0 24px" }}
      >
        <span
          style={{
            fontSize: "20px",
            color: QUOTE_COLOR,
            fontFamily: "serif",
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          ❛❛
        </span>
        <p
          className="text-center"
          style={{
            fontSize: "14px",
            color: ROW_VALUE_COLOR,
            fontFamily: "Pretendard, sans-serif",
            fontWeight: 500,
            lineHeight: 1.6,
            textWrap: "auto",
          }}
        >
          {copy.quote}
        </p>
        <span
          style={{
            fontSize: "20px",
            color: QUOTE_COLOR,
            fontFamily: "serif",
            lineHeight: 1,
            flexShrink: 0,
            alignSelf: "flex-end",
          }}
        >
          ❜❜
        </span>
      </div>

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
          <FreeRow icon={<PeopleIcon />} label="나이 차" value={copy.ageGap} />
          <div style={{ height: "1px", background: ROW_DIVIDER }} />
          <FreeRow icon={<HeartIcon />} label="첫 느낌" value={copy.firstFeel} />
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
          <LockRow label="왜 운명인가" lineWidths={[w1, Math.max(60, w1 - 14)]} />
          <div style={{ height: "1px", background: ROW_DIVIDER }} />
          <LockRow label="만나는 상황" lineWidths={[w2]} />
          <div style={{ height: "1px", background: ROW_DIVIDER }} />
          <LockRow label="놓치지 않는 법" lineWidths={[w3, Math.max(55, w3 - 16)]} />
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
          <LockIcon size={18} color={CTA_COLOR} />
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
