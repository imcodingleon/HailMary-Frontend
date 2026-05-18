import { DOYOON_TOKENS } from "./doyoonTokens";

// 도윤 감정 곡선 라인 차트 — 도윤_final.html line 2053~2082 미러.
// SVG 인라인. 4 데이터 포인트 (초반/중반/위기/회복). 위기 강조.

interface EmotionPoint {
  label: string;
  pct: number;
  is_crisis: boolean;
}

interface DoyoonLineChartEmotionProps {
  points: ReadonlyArray<EmotionPoint>;  // 4개
  caption: string;                       // "위기 구간 감정 강도 평균 대비 1.8배"
}

// SVG 좌표: 30, 110, 190, 270 (4 step) — viewBox 300x120
const X_POS = [30, 110, 190, 270];
const TEXT_BOTTOM_Y = 108;
const Y_TOP = 12;
const Y_BOTTOM = 90;

function pctToY(pct: number): number {
  // 0% → Y_BOTTOM, 100% → Y_TOP
  return Y_BOTTOM - (pct / 100) * (Y_BOTTOM - Y_TOP);
}

export function DoyoonLineChartEmotion({
  points,
  caption,
}: DoyoonLineChartEmotionProps) {
  if (points.length !== 4) {
    throw new Error("DoyoonLineChartEmotion expects exactly 4 points");
  }
  const ys = points.map((p) => pctToY(p.pct));
  const linePts = X_POS.map((x, i) => `${x},${ys[i]}`).join(" ");
  const areaPts = `M${X_POS[0]} ${ys[0]} ` +
    X_POS.slice(1).map((x, i) => `L${x} ${ys[i + 1]}`).join(" ") +
    ` L${X_POS[3]} 100 L${X_POS[0]} 100 Z`;

  return (
    <div className="my-3">
      <svg
        viewBox="0 0 300 120"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto" }}
      >
        <defs>
          <linearGradient id="dy-chart-pink-fade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={DOYOON_TOKENS.pink} stopOpacity="0.22" />
            <stop offset="100%" stopColor={DOYOON_TOKENS.pink} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Y 축 (3개 가로선) */}
        <line x1="0" y1="90" x2="300" y2="90" stroke="#E5D8C3" strokeWidth="0.6" />
        <line x1="0" y1="60" x2="300" y2="60" stroke="#E5D8C3" strokeWidth="0.6" />
        <line x1="0" y1="30" x2="300" y2="30" stroke="#E5D8C3" strokeWidth="0.6" />
        {/* 영역 fill */}
        <path d={areaPts} fill="url(#dy-chart-pink-fade)" />
        {/* 데이터 line */}
        <polyline
          points={linePts}
          fill="none"
          stroke={DOYOON_TOKENS.pink}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* 데이터 포인트 */}
        {points.map((p, i) => (
          <circle
            key={p.label}
            cx={X_POS[i]}
            cy={ys[i]}
            r={p.is_crisis ? 4.5 : 3}
            fill={p.is_crisis ? DOYOON_TOKENS.pink : "#fff8ec"}
            stroke={DOYOON_TOKENS.pink}
            strokeWidth="1.5"
            style={
              p.is_crisis
                ? { filter: "drop-shadow(0 0 4px rgba(212,83,126,0.7))" }
                : undefined
            }
          />
        ))}
        {/* X 라벨 */}
        {points.map((p, i) => (
          <text
            key={`label-${p.label}`}
            x={X_POS[i]}
            y={TEXT_BOTTOM_Y}
            textAnchor="middle"
            fontSize="9"
            fill={p.is_crisis ? DOYOON_TOKENS.pink : DOYOON_TOKENS.textMeta}
            fontWeight={p.is_crisis ? 700 : 400}
          >
            {p.label}
          </text>
        ))}
        {/* 데이터 % 라벨 */}
        {points.map((p, i) => (
          <text
            key={`pct-${p.label}`}
            x={X_POS[i]}
            y={ys[i] - 6}
            textAnchor="middle"
            fontSize={p.is_crisis ? "8.5" : "8"}
            fill={p.is_crisis ? DOYOON_TOKENS.pink : DOYOON_TOKENS.textMeta}
            fontWeight={p.is_crisis ? 700 : 400}
          >
            {p.pct}%
          </text>
        ))}
      </svg>
      <p
        className="text-center text-[13px] mt-1"
        style={{ color: DOYOON_TOKENS.pink, fontWeight: 600 }}
      >
        {caption}
      </p>
    </div>
  );
}
