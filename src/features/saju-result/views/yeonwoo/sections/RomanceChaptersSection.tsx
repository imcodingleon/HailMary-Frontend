"use client";

import type { Pillar } from "@/features/saju/types";
import {
  ROMANCE_DISPOSITION_DIALOGUES,
} from "../../../domain/romanceDisposition-yeonwoo";
import { isHeavenStemHangul } from "../../../domain/stemDialogues-yeonwoo";

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.5 6.5V4.5C3.5 2.567 5.067 1 7 1C8.933 1 10.5 2.567 10.5 4.5V6.5M3 6.5H11C11.5523 6.5 12 6.94772 12 7.5V12.5C12 13.0523 11.5523 13.5 11 13.5H3C2.44772 13.5 2 13.0523 2 12.5V7.5C2 6.94772 2.44772 6.5 3 6.5Z"
        stroke="#7a716b"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function LockedChapterCard({ label, title }: { label: string; title: string }) {
  return (
    <div
      className="rounded-2xl relative"
      style={{
        padding: "35px",
        background: "rgba(50,46,42,0.45)",
        border: "1px solid #4a4540",
        borderLeftWidth: "5px",
        borderLeftColor: "#6a6056",
      }}
    >
      <span
        className="inline-block text-[10px] tracking-wider px-2.5 py-0.5 rounded-full mb-3"
        style={{ border: "1px solid #6a6056", color: "#7a716b" }}
      >
        {label}
      </span>
      <p className="font-bold tracking-[0.05em] mb-4" style={{ color: "#998f82", fontSize: "19px" }}>
        {title}
      </p>
      <div className="flex flex-col gap-2.5 pr-8">
        <div className="h-3.5 rounded-sm" style={{ background: "rgba(120,110,100,0.28)", width: "92%" }} />
        <div className="h-3.5 rounded-sm" style={{ background: "rgba(120,110,100,0.28)", width: "76%" }} />
        <div className="h-3.5 rounded-sm" style={{ background: "rgba(120,110,100,0.28)", width: "85%" }} />
      </div>
      <div className="absolute bottom-5 right-5">
        <LockIcon />
      </div>
    </div>
  );
}

type Props = { pillars: Pillar[] };

export function RomanceChaptersSection({ pillars }: Props) {
  const dayPillar = pillars.find((p) => p.label === "일주");
  const dayStemHangul = dayPillar?.heavenHangul ?? "";
  const stemKey = isHeavenStemHangul(dayStemHangul) ? dayStemHangul : "계";
  const dayEl = (dayPillar?.element ?? "").split("/")[0].trim();
  const entry = ROMANCE_DISPOSITION_DIALOGUES[stemKey];

  const HANJA_PREFIX_LEN = 2;
  const hanjaPrefix = entry.line1.slice(0, HANJA_PREFIX_LEN);
  const line1Rest = entry.line1.slice(HANJA_PREFIX_LEN);

  return (
    <div className="w-full px-5 py-12" style={{ background: "#000" }}>
      <h2
        className="text-center text-[24px] font-bold tracking-[0.05em] mb-2"
        style={{ color: "#E8DDC8" }}
      >
        지금 네 연애에 걸린 것들
      </h2>
      <p className="text-center text-[14px] tracking-[0.08em] mb-3" style={{ color: "#998f82" }}>
        강연우가 명줄에서 읽어낸 것
      </p>
      <div className="flex justify-center mb-7">
        <div className="w-12 h-[1px]" style={{ background: "#c9a96e", opacity: 0.7 }} />
      </div>

      <div className="flex flex-col gap-3">
        <div
          className="rounded-2xl"
          style={{
            padding: "35px",
            background: "rgba(180,152,116,0.04)",
            border: "1px solid #B49874",
            borderLeftWidth: "5px",
            borderLeftColor: "#B49874",
            boxShadow: "0 0 22px rgba(180,152,116,0.16), inset 0 0 12px rgba(180,152,116,0.05)",
          }}
        >
          <span
            className="inline-block text-[10px] tracking-wider px-2.5 py-0.5 rounded-full mb-3"
            style={{ border: "1px solid #B49874", color: "#B49874" }}
          >
            무료
          </span>
          <p
            className="font-bold tracking-[0.05em] mb-3"
            style={{ color: "#E8DDC8", fontSize: "19px" }}
          >
            내 연애 기질
          </p>
          <p
            className="leading-relaxed mb-1"
            style={{
              color: "#D0C5B6",
              fontFamily: "\"Pretendard\", sans-serif",
              fontWeight: 300,
              fontSize: "16px",
            }}
          >
            <span style={{ fontFamily: "\"NotoSerifTC\", serif", fontWeight: 400, fontSize: "18px" }}>
              {hanjaPrefix}
            </span>
            <span style={{ fontWeight: 700, fontSize: "14px", opacity: 0.6, marginLeft: "4px" }}>
              ({stemKey}{dayEl})
            </span>
            {line1Rest}
          </p>
          <p
            className="leading-relaxed"
            style={{
              color: "#D0C5B6",
              fontFamily: "\"Pretendard\", sans-serif",
              fontWeight: 300,
              fontSize: "16px",
            }}
          >
            {entry.line2}
          </p>
        </div>

        <LockedChapterCard label="용감과" title="지금 연애를 막는 것" />
        <LockedChapterCard label="통감과" title="곧 다가올 인연의 얼굴" />
      </div>

      <p
        className="text-center text-[13px] tracking-[0.1em] mt-8"
        style={{ color: "#7a716b" }}
      >
        총 6개 챕터가 준비되어 있습니다
      </p>
    </div>
  );
}
