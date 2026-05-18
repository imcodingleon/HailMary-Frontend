import { DOYOON_TOKENS } from "./doyoonTokens";

// 도윤 "상위 N%" 배지 — 도윤_final.html `.pct-badge-dy` 미러.
// P-1 1-1, P-3 등에서 재사용.

interface DoyoonPctBadgeProps {
  pct: number;
  label?: string;  // 기본 "상위 N%" / 커스텀 가능
}

export function DoyoonPctBadge({ pct, label }: DoyoonPctBadgeProps) {
  return (
    <span
      className="inline-flex items-center text-[13px] font-semibold rounded-full"
      style={{
        background: "rgba(212,83,126,0.10)",
        color: DOYOON_TOKENS.pink,
        border: `0.5px solid rgba(212,83,126,0.30)`,
        padding: "3px 12px",
        letterSpacing: "0.05em",
      }}
    >
      {label ?? `상위 ${pct}%`}
    </span>
  );
}
