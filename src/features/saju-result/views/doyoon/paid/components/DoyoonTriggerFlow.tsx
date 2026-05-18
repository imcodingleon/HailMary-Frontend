import { DOYOON_TOKENS } from "./doyoonTokens";

// 도윤 트리거 발화 flow — 도윤_final.html line 2021~2041 미러.
// 3 트리거 (각 도달 % 표시) + 100% 전부 투입 (분홍 강조) 4단계 가로 flow.

interface DoyoonTriggerFlowProps {
  triggers: ReadonlyArray<string>;          // 3개
  flowPcts: ReadonlyArray<number>;          // 3개 — 각 트리거 누적 도달 %
}

export function DoyoonTriggerFlow({ triggers, flowPcts }: DoyoonTriggerFlowProps) {
  if (triggers.length !== 3 || flowPcts.length !== 3) {
    throw new Error("DoyoonTriggerFlow expects exactly 3 triggers + flowPcts");
  }
  return (
    <div className="flex items-center gap-1.5 flex-wrap my-2.5">
      <FlowStep label={triggers[0]} pct={flowPcts[0]} />
      <Arrow />
      <FlowStep label={triggers[1]} pct={flowPcts[1]} />
      <Arrow />
      <FlowStep label={triggers[2]} pct={flowPcts[2]} />
      <Arrow />
      <FlowStep label="전부 투입" pct={100} highlight />
    </div>
  );
}

function FlowStep({
  label,
  pct,
  highlight = false,
}: {
  label: string;
  pct: number;
  highlight?: boolean;
}) {
  return (
    <div
      className="flex-1 min-w-[60px] flex flex-col items-center justify-center rounded-lg"
      style={{
        padding: "8px 6px",
        background: highlight ? "rgba(212,83,126,0.12)" : "#fff8ec",
        border: highlight
          ? "0.5px solid rgba(212,83,126,0.3)"
          : "0.5px solid rgba(139,105,20,0.22)",
      }}
    >
      <div
        className="text-[12px] text-center font-medium"
        style={{
          color: highlight ? DOYOON_TOKENS.pink : DOYOON_TOKENS.text,
          wordBreak: "keep-all",
          lineHeight: 1.3,
        }}
      >
        {label}
      </div>
      <div
        className="text-[13px] font-bold mt-1"
        style={{ color: highlight ? DOYOON_TOKENS.pink : DOYOON_TOKENS.warmGold }}
      >
        {pct}%
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <span
      className="text-[13px] font-bold"
      style={{ color: DOYOON_TOKENS.warmGold }}
    >
      ▶
    </span>
  );
}
