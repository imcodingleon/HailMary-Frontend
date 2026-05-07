"use client";

import {
  ROMANCE_DISPOSITION_DIALOGUES,
  isHeavenStemHangul,
} from "../../../domain/romanceDisposition";
import type { Pillar } from "@/features/saju";

const SECTION_BG = "#FDF5EA";
const CARD_BG = "#F8EFE0";
const CARD_BORDER = "#E0CFB6";
const TITLE_COLOR = "#2a1f15";
const SUBTITLE_COLOR = "#7A6B55";
const BODY_COLOR = "#4a3a2a";
const FREE_PILL_BG = "#F4E5CD";
const FREE_PILL_TEXT = "#856C51";
const LOCKED_PILL_BG = "#EFE6D9";
const LOCKED_PILL_TEXT = "#9C8A6D";
const LOCKED_TITLE_COLOR = "#9C8A6D";
const LOCK_ICON_COLOR = "#998f82";
const FOOTER_COLOR = "#998f82";

const HANJA_PREFIX_LEN = 2;

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M3.5 6.5V4.5C3.5 2.567 5.067 1 7 1C8.933 1 10.5 2.567 10.5 4.5V6.5M3 6.5H11C11.5523 6.5 12 6.94772 12 7.5V12.5C12 13.0523 11.5523 13.5 11 13.5H3C2.44772 13.5 2 13.0523 2 12.5V7.5C2 6.94772 2.44772 6.5 3 6.5Z"
        stroke={LOCK_ICON_COLOR}
        strokeWidth="1.2"
      />
    </svg>
  );
}

function LockedChapterCard({ label, title }: { label: string; title: string }) {
  return (
    <div
      style={{
        padding: "22px 22px 26px",
        background: CARD_BG,
        border: `3px solid ${CARD_BORDER}`,
        borderLeftWidth: "6px",
        borderRadius: "16px",
        position: "relative",
      }}
    >
      <span
        style={{
          display: "inline-block",
          fontSize: "13px",
          background: LOCKED_PILL_BG,
          color: LOCKED_PILL_TEXT,
          borderRadius: "9999px",
          padding: "3px 12px",
          marginBottom: "10px",
          fontFamily: "Pretendard, sans-serif",
          fontWeight: 500,
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </span>
      <p
        style={{
          fontFamily: '"JejuMyeongjo", "Pretendard", serif',
          fontWeight: 500,
          fontSize: "20px",
          color: LOCKED_TITLE_COLOR,
          marginBottom: "16px",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </p>
      <div className="flex flex-col gap-2" aria-hidden="true">
        <div style={{ height: "10px", width: "92%", background: "rgba(133,108,81,0.18)", borderRadius: "3px" }} />
        <div style={{ height: "10px", width: "76%", background: "rgba(133,108,81,0.18)", borderRadius: "3px" }} />
        <div style={{ height: "10px", width: "85%", background: "rgba(133,108,81,0.18)", borderRadius: "3px" }} />
      </div>
      <div style={{ position: "absolute", bottom: "20px", right: "20px" }}>
        <LockIcon />
      </div>
    </div>
  );
}

type Props = {
  pillars: Pillar[];
  displayName: string;
};

export default function RomanceChaptersSection({ pillars, displayName }: Props) {
  const dayPillar = pillars.find((p) => p.label === "일주");
  const dayStemHangul = dayPillar?.heavenHangul ?? "";
  const stemKey = isHeavenStemHangul(dayStemHangul) ? dayStemHangul : "계";
  const entry = ROMANCE_DISPOSITION_DIALOGUES[stemKey];

  const hanjaPrefix = entry.line1.slice(0, HANJA_PREFIX_LEN);
  const line1Rest = entry.line1.slice(HANJA_PREFIX_LEN);

  return (
    <div
      className="w-full"
      style={{
        background: SECTION_BG,
        paddingTop: "32px",
        paddingBottom: "48px",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "22px",
          fontFamily: '"JejuMyeongjo", "Pretendard", serif',
          fontWeight: 600,
          color: TITLE_COLOR,
          marginBottom: "8px",
          letterSpacing: "-0.01em",
        }}
      >
        {displayName}님의 연애에 걸린 변수들
      </h2>
      <p
        style={{
          textAlign: "center",
          fontSize: "13px",
          fontFamily: "Pretendard, sans-serif",
          fontWeight: 500,
          color: SUBTITLE_COLOR,
          marginBottom: "24px",
          letterSpacing: "0.04em",
        }}
      >
        한도윤이 데이터로 분류한 것
      </p>

      <div className="flex flex-col gap-3">
        <div
          style={{
            padding: "22px 22px 26px",
            background: CARD_BG,
            border: `3px solid ${CARD_BORDER}`,
            borderLeft: `6px solid #3A8A3A`,
            borderRadius: "16px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              fontSize: "13px",
              background: FREE_PILL_BG,
              color: FREE_PILL_TEXT,
              borderRadius: "9999px",
              padding: "3px 12px",
              marginBottom: "12px",
              fontFamily: "Pretendard, sans-serif",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            무료
          </span>
          <p
            style={{
              fontFamily: '"JejuMyeongjo", "Pretendard", serif',
              fontWeight: 600,
              fontSize: "20px",
              color: TITLE_COLOR,
              marginBottom: "12px",
              letterSpacing: "-0.01em",
            }}
          >
            내 연애 기질
          </p>
          <p
            style={{
              color: BODY_COLOR,
              fontFamily: "Pretendard, sans-serif",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: 1.7,
              textWrap: "auto",
              marginBottom: "4px",
            }}
          >
            <span
              style={{
                fontFamily: '"NotoSerifTC", "ChosunNm", serif',
                fontWeight: 600,
                fontSize: "16px",
              }}
            >
              {hanjaPrefix}
            </span>
            {line1Rest}
          </p>
          <p
            style={{
              color: BODY_COLOR,
              fontFamily: "Pretendard, sans-serif",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: 1.7,
              textWrap: "auto",
            }}
          >
            {entry.line2}
          </p>
        </div>

        <LockedChapterCard label="전체 결과" title="연애를 방해하는 변수들" />
        <LockedChapterCard label="전체 결과" title="곧 다가올 인연의 얼굴" />
      </div>

      <p
        style={{
          textAlign: "center",
          fontSize: "13px",
          fontFamily: "Pretendard, sans-serif",
          fontWeight: 400,
          color: FOOTER_COLOR,
          marginTop: "24px",
          letterSpacing: "0.05em",
        }}
      >
        총 6개 챕터가 준비되어 있습니다
      </p>
    </div>
  );
}
