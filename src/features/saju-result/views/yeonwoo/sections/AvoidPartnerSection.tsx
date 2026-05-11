"use client";

import Image from "next/image";
import type { SpouseAvoidView } from "../../../domain/types";
import { AVOID_PARTNER_FREE_DIALOGUES } from "../../../domain/avoidPartner-yeonwoo";

type Props = { spouseAvoid: SpouseAvoidView | null };

type FieldWidths = [number[], number[], number[]];

const DEFAULT_WIDTHS: FieldWidths = [
  [94, 82, 56],
  [68],
  [88, 50],
];

const WIDTH_VARIANTS: Record<string, FieldWidths> = {
  "f-wood-yang": [[96, 84, 60], [72], [86, 54]],
  "f-fire-yang": [[90, 78, 52], [62], [82, 46]],
  "m-water-yang": [[92, 80, 58], [70], [84, 48]],
};

function getBarWidths(slotId: string): FieldWidths {
  return WIDTH_VARIANTS[slotId] ?? DEFAULT_WIDTHS;
}

const RED_LABEL_COLOR = "#E05C6A";
const BLUE_LABEL_COLOR = "#33A183";
const TEXT_COLOR = "#D0C5B6";

const DIVIDER_STYLE = {
  height: "1px",
  background: "rgba(133, 108, 81, 0.22)",
} as const;

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[13px] tracking-[0.3em] mb-1" style={{ color: "#856C51" }}>
        {label}
      </p>
      <p className="text-[16px] leading-relaxed" style={{ color: TEXT_COLOR }}>
        {value}
      </p>
    </div>
  );
}

function BlurredField({ label, lineWidths }: { label: string; lineWidths: number[] }) {
  return (
    <div>
      <p className="text-[13px] tracking-[0.3em] mb-1.5" style={{ color: "#856C51" }}>
        {label}
      </p>
      <div className="flex flex-col gap-1.5" aria-hidden="true">
        {lineWidths.map((w, i) => (
          <div
            key={i}
            className="rounded-[3px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(120,110,100,0.36) 0%, rgba(140,130,120,0.42) 50%, rgba(120,110,100,0.36) 100%)",
              height: "14px",
              width: `${w}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function AvoidPartnerSection({ spouseAvoid }: Props) {
  const slotId = spouseAvoid?.slotId ?? "neutral";
  const copy = AVOID_PARTNER_FREE_DIALOGUES[slotId] ?? AVOID_PARTNER_FREE_DIALOGUES["neutral"];
  const [w1, w2, w3] = getBarWidths(slotId);
  const imageSrc = `/images/spouse/${slotId}.png`;

  return (
    <div className="w-full px-3 py-12" style={{ background: "#000" }}>
      <h2
        className="text-center text-[22px] font-bold tracking-[0.05em] mb-2"
        style={{ color: "#E8DDC8" }}
      >
        피해야 할 인연
      </h2>
      <p
        className="text-center text-[12px] tracking-[0.08em] mb-3"
        style={{ color: "#998f82" }}
      >
        네 사주에서 비껴가야 할 그 사람의 윤곽
      </p>
      <div className="flex justify-center mb-6">
        <div className="w-12 h-[1px]" style={{ background: "#c9a96e", opacity: 0.7 }} />
      </div>

      <div
        className="w-full overflow-hidden mb-4"
        style={{ borderRadius: "12px", border: "1px solid #2a1a1a" }}
      >
        <Image
          src={imageSrc}
          alt=""
          width={448}
          height={300}
          className="w-full h-auto block"
          sizes="(max-width: 448px) 100vw, 448px"
        />
      </div>

      <h3
        className="text-center font-bold tracking-[0.05em] mb-3"
        style={{ fontSize: "20px", color: RED_LABEL_COLOR }}
      >
        이런 인연이야
      </h3>
      <div
        className="mb-6"
        style={{
          margin: "0 10px 24px",
          padding: "16px 16px",
          borderRadius: "12px",
          border: "1px solid #681B21",
          background: "#160A0B",
        }}
      >
        <FieldRow label="첫인상" value={copy.impression} />
        <div className="my-3" style={DIVIDER_STYLE} />
        <FieldRow label="나이 패턴" value={copy.ageGap} />
        <div className="my-3" style={DIVIDER_STYLE} />
        <FieldRow label="처음 느낌" value={copy.firstFeel} />
      </div>

      <h3
        className="text-center font-bold tracking-[0.05em] mb-3"
        style={{ fontSize: "20px", color: RED_LABEL_COLOR }}
      >
        왜 위험한지
      </h3>
      <div
        className="mb-6"
        style={{
          margin: "0 10px 24px",
          padding: "16px 16px",
          borderRadius: "12px",
          border: "1px solid #681B21",
          background: "#160A0B",
        }}
      >
        <BlurredField label="위험한 이유" lineWidths={w1} />
        <div className="my-3" style={DIVIDER_STYLE} />
        <BlurredField label="결정적 순간" lineWidths={w2} />
        <div className="my-3" style={DIVIDER_STYLE} />
        <BlurredField label="피하는 법" lineWidths={w3} />
      </div>

      <div style={{ margin: "0 30px" }}>
        <button
          className="w-full text-[16px] tracking-[0.05em] font-medium"
          style={{
            padding: "16px 16px",
            borderRadius: "14px",
            border: `1.5px solid ${BLUE_LABEL_COLOR}`,
            background:
              "linear-gradient(180deg, rgba(51,161,131,0.16) 0%, rgba(51,161,131,0.08) 100%), #0A1410",
            color: BLUE_LABEL_COLOR,
            boxShadow:
              "0 10px 28px rgba(0,0,0,0.55), 0 0 0 1px rgba(51,161,131,0.18), inset 0 1px 0 rgba(51,161,131,0.18)",
          }}
          onClick={() => {
            alert("유료 결제 후 확인할 수 있어요.");
          }}
        >
          이 사람을 알아보는 법은 전체 결과에서 →
        </button>
      </div>
    </div>
  );
}
