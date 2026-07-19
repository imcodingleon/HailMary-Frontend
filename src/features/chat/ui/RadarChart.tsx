// [ui] RadarChart — 경량 자작 SVG 레이더(도윤 전용, 라이브러리 없음). 표시 전용 Dumb.
// 색은 currentColor + text-토큰으로만(하드코딩 hex 없음). 수치는 목업 표시값(H2).
import type { DoyoonRadarAxis } from '@/features/chat/domain/model/message';

export interface RadarChartProps {
  data: DoyoonRadarAxis[];
}

const SIZE = 180;
const CENTER = SIZE / 2;
const MAX_R = CENTER - 26;
const GRID_LEVELS = [0.25, 0.5, 0.75, 1];

export default function RadarChart({ data }: RadarChartProps) {
  const n = data.length;
  const angle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const point = (i: number, r: number): [number, number] => [
    CENTER + r * Math.cos(angle(i)),
    CENTER + r * Math.sin(angle(i)),
  ];
  const toPoints = (pts: [number, number][]) => pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

  const dataPolygon = toPoints(data.map((d, i) => point(i, MAX_R * (d.score / 100))));

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="mx-auto h-44 w-44" role="img" aria-label="운세 레이더 차트">
      {/* 격자 (심야갈) */}
      {GRID_LEVELS.map((lv, li) => (
        <polygon
          key={li}
          points={toPoints(data.map((_, i) => point(i, MAX_R * lv)))}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          className="text-simyagal"
        />
      ))}
      {/* 축선 (심야갈) */}
      {data.map((_, i) => {
        const [x, y] = point(i, MAX_R);
        return (
          <line key={i} x1={CENTER} y1={CENTER} x2={x} y2={y} stroke="currentColor" strokeWidth={1} className="text-simyagal" />
        );
      })}
      {/* 데이터 폴리곤 (도화홍) */}
      <polygon points={dataPolygon} fill="currentColor" fillOpacity={0.3} stroke="currentColor" strokeWidth={1.5} className="text-dohwahong" />
      {/* 축 라벨 (화선지) */}
      {data.map((d, i) => {
        const [x, y] = point(i, MAX_R + 12);
        return (
          <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="currentColor" fontSize={9} className="fill-current text-hwaseonji">
            {d.axis}
          </text>
        );
      })}
    </svg>
  );
}
