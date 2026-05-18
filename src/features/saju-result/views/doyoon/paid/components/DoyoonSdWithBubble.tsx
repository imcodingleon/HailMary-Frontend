import { DoyoonBubble } from "./DoyoonBubble";

// SD 아바타 + 도윤 멘트 row 묶음 — 도윤_final.html `.sd-with-content` 패턴 미러.
// dy_02 ~ dy_10 캐릭터별 자산. P-1~P-9에서 재사용.

interface DoyoonSdWithBubbleProps {
  sdAsset: string;     // "dy_02" 등 — public/doyoon/sd_dy/{asset}.png
  ariaLabel?: string;
  quote: string;
  flow?: "left" | "right";   // SD 위치
  size?: "sm" | "md" | "lg"; // 120 / 140 / 150×200
}

const SIZE_MAP = {
  sm: { w: 100, h: 100 },
  md: { w: 120, h: 120 },
  lg: { w: 140, h: 140 },
};

export function DoyoonSdWithBubble({
  sdAsset,
  ariaLabel,
  quote,
  flow = "left",
  size = "md",
}: DoyoonSdWithBubbleProps) {
  const dim = SIZE_MAP[size];
  return (
    <div
      className="flex items-end gap-2 my-2.5"
      style={{ flexDirection: flow === "right" ? "row-reverse" : "row" }}
    >
      <div
        aria-label={ariaLabel ?? `한도윤 SD — ${sdAsset}`}
        className="flex-shrink-0 bg-no-repeat bg-center bg-contain"
        style={{
          backgroundImage: `url(/doyoon/sd_dy/${sdAsset}.png)`,
          width: dim.w,
          height: dim.h,
        }}
      />
      <div className="flex-1 min-w-0">
        <DoyoonBubble quote={quote} />
      </div>
    </div>
  );
}
