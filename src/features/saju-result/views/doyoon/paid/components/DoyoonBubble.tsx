import { DOYOON_TOKENS } from "./doyoonTokens";

// 도윤 멘트 박스 — 도윤_final.html `.bubble.bub-dy` 미러.

interface DoyoonBubbleProps {
  name?: string;
  quote: string;
}

export function DoyoonBubble({ name = "한도윤", quote }: DoyoonBubbleProps) {
  return (
    <div
      className="rounded-[10px] px-[13px] py-[11px] my-2 italic text-[15px] leading-[1.85]"
      style={{
        background: "#fff8f0",
        color: DOYOON_TOKENS.text,
        border: "0.5px solid rgba(139,105,20,0.20)",
        letterSpacing: "-0.01em",
        wordBreak: "keep-all",
      }}
    >
      <div
        className="text-[12px] mb-1 not-italic font-bold"
        style={{ color: DOYOON_TOKENS.warmGold, letterSpacing: "0.05em" }}
      >
        {name}
      </div>
      &ldquo;{quote}&rdquo;
    </div>
  );
}
