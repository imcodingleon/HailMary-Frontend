import type { PaidChapterP5Doyoon } from "../../../../domain/paidReport";
import { DoyoonAiBlock } from "../components/DoyoonAiBlock";
import { DoyoonPageHead } from "../components/DoyoonPageHead";
import { DoyoonSdWithBubble } from "../components/DoyoonSdWithBubble";
import {
  DoyoonSLabel,
  DoyoonSTitle,
  DoyoonSection,
} from "../components/DoyoonSection";
import { DOYOON_TOKENS } from "../components/doyoonTokens";

interface DoyoonCharmPageProps {
  data?: PaidChapterP5Doyoon;
}

const MOCK_P5: PaidChapterP5Doyoon = {
  user_name: "홍길동",
  charm_pct: "상위 8%",
  radar: [
    { name: "존재감", value: 92 },
    { name: "매력살", value: 72 },
    { name: "목소리", value: 68 },
    { name: "깊이감", value: 88 },
    { name: "분위기", value: 78 },
    { name: "눈빛", value: 82 },
  ],
  strength_axis_1: "존재감",
  strength_axis_2: "깊이감",
  strength_multiplier: "1.7배",
  ai_charm_index:
    "상위 8%예요. 이거 그냥 숫자가 아니에요.\n\n" +
    "6개 축 중에서 강점이 두 개예요. 존재감과 깊이감 — 둘 다 평균의 1.7배예요. " +
    "동일 일간 표본에서도 이 두 축에서 이만큼 나오는 분이 흔하지 않아요. " +
    "나머지 4개 축(매력살·목소리·분위기·눈빛)은 평균~약상위 구간이에요. 약점이 있는 게 아니라, 강점이 두드러지는 구조예요.\n\n" +
    "다만 사실 홍길동님은 이걸 아직 제대로 안 쓰고 있어요. " +
    "무의식적으로 발현될 때랑 의식적으로 쓸 때 차이가 2.4배예요. 잠재력이 이 정도면, 조금만 의식해도 주변 반응이 꽤 달라질 거예요.",
  sd_avatar_asset: "dy_06",
  charm_bubble: "이거 그냥 놔두기엔 좀 아깝지 않아요?",
  conversion_steps: [
    { label: "첫 인상", pct: 30 },
    { label: "반복 접촉", pct: 55 },
    { label: "익숙함", pct: 72 },
    { label: "끌림", pct: 88 },
  ],
  ai_conversion:
    "첫 인상 30%에서 시작해서 끌림 88%까지 올라가는 구조예요. 4단계 전환율(다음 단계로 넘어가는 비율)이에요.\n\n" +
    "근데 재미있는 건, 홍길동님은 두 번째 만남에서 전환율이 평균의 1.4배로 뛰어요. " +
    "즉 한 번 만나고 끝내면 진짜 매력의 절반도 못 보여주는 거예요. " +
    "첫 만남에서 끝내는 분과 두 번째까지 가는 분의 최종 호감도 차이가 38%p 벌어져요.\n\n" +
    "첫 만남에서 두 번째 약속을 자연스럽게 만들어두세요. 그게 홍길동님한테 가장 효율적인 전략이에요.",
  appeal_meters: [
    { name: "존재감", value: 92 },
    { name: "깊이감", value: 85 },
    { name: "표현 일관성", value: 64 },
    { name: "반응 속도", value: 71 },
  ],
  ai_appeal:
    "4개 변수 점수 정리해드릴게요.\n\n" +
    "존재감 92, 깊이감 85, 표현 일관성 64, 반응 속도 71. 강점 두 개와 약점 두 개가 명확해요.\n\n" +
    "표현 일관성과 반응 속도가 약점이에요. 이게 홍길동님이 통제하기 가장 쉬운 영역이기도 해요. " +
    "두 변수만 끌어올리면 전체 호감 유발 효율이 26% 상승해요. 강점 보완보다 약점 보완이 효율이 높아요.",
};


export default function DoyoonCharmPage({ data }: DoyoonCharmPageProps) {
  const d = data ?? MOCK_P5;

  return (
    <section
      data-page-idx="5"
      style={{ background: DOYOON_TOKENS.bg, color: DOYOON_TOKENS.text }}
    >
      <DoyoonPageHead
        ch="3"
        hanja="三"
        title="나의 매력 분석"
        sub="매력 지수 · 호감 패턴"
      />

      {/* ── 3-1 매력 지수 ── */}
      <DoyoonSection>
        <DoyoonSLabel>3-1 나의 매력 지수</DoyoonSLabel>
        <ChargmPctBadgeDoyoon pct={d.charm_pct} />
        <DoyoonSTitle>
          6개 축 측정 — {d.strength_axis_1}과 {d.strength_axis_2}이 평균 대비 {d.strength_multiplier}.
        </DoyoonSTitle>

        <RadarChartDoyoon axes={d.radar} />

        <DoyoonAiBlock body={d.ai_charm_index} />

        <DoyoonSdWithBubble
          sdAsset={d.sd_avatar_asset}
          quote={d.charm_bubble}
          flow="left"
        />
      </DoyoonSection>

      {/* ── 3-2 끌림 메커니즘 ── */}
      <DoyoonSection>
        <DoyoonSLabel>3-2 이성이 끌리는 심리적 메커니즘</DoyoonSLabel>
        <DoyoonSTitle>전환율 — 첫 인상에서 끌림까지 4단계.</DoyoonSTitle>

        <FlowStepsDoyoon steps={d.conversion_steps} />

        <DoyoonAiBlock body={d.ai_conversion} />
      </DoyoonSection>

      {/* ── 3-3 호감 유발 패턴 ── */}
      <DoyoonSection>
        <DoyoonSLabel>3-3 호감 유발 패턴 분석</DoyoonSLabel>
        <DoyoonSTitle>핵심 4개 변수 점수 측정.</DoyoonSTitle>

        <div className="my-3 space-y-2">
          {d.appeal_meters.map((m) => (
            <AppealMeterBarDoyoon key={m.name} name={m.name} value={m.value} />
          ))}
        </div>

        <DoyoonAiBlock body={d.ai_appeal} />
      </DoyoonSection>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════
// 인라인 컴포넌트
// ════════════════════════════════════════════════════════════════════

function ChargmPctBadgeDoyoon({ pct }: { pct: string }) {
  return (
    <div className="flex justify-center my-3">
      <span
        className="text-[14px] font-bold px-4 py-1.5 rounded-full"
        style={{
          background: "rgba(212,83,126,0.10)",
          color: DOYOON_TOKENS.pink,
          border: "0.5px solid rgba(212,83,126,0.30)",
          letterSpacing: "0.03em",
        }}
      >
        전체 매력 지수 {pct}
      </span>
    </div>
  );
}

// 원본 .radar-wrap SVG 매핑 (200×200 6각형)
function RadarChartDoyoon({ axes }: { axes: ReadonlyArray<{ name: string; value: number }> }) {
  // 6각형 꼭짓점 좌표 — 100% (반지름 80)
  const center = 100;
  const r = 80;
  const angles = [-90, -30, 30, 90, 150, 210]; // 6각 (12시부터 시계 방향)
  const toXY = (radius: number, angle: number) => {
    const rad = (angle * Math.PI) / 180;
    return { x: center + radius * Math.cos(rad), y: center + radius * Math.sin(rad) };
  };
  const grid100 = angles.map((a) => toXY(r, a));
  const grid66 = angles.map((a) => toXY(r * 0.66, a));
  const grid33 = angles.map((a) => toXY(r * 0.33, a));
  const dataPolygon = axes.map((axis, i) => toXY((axis.value / 100) * r, angles[i]));
  const labelPositions = angles.map((a) => toXY(r + 12, a));

  const polyStr = (points: { x: number; y: number }[]) =>
    points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  return (
    <div
      className="my-3 rounded-[10px] flex flex-col items-center w-full"
      style={{
        background:
          "#fff8ec url(/doyoon/dy_sub/chart_bg_radar_dy.png) no-repeat center center / 100% 100%",
        padding: "32px 28px 18px",
      }}
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 200, overflow: "visible" }}>
        {/* grid (동심 3겹) */}
        <polygon points={polyStr(grid100)} fill="none" stroke="rgba(139,105,20,0.25)" strokeWidth="0.8" />
        <polygon points={polyStr(grid66)} fill="none" stroke="rgba(139,105,20,0.18)" strokeWidth="0.6" />
        <polygon points={polyStr(grid33)} fill="none" stroke="rgba(139,105,20,0.12)" strokeWidth="0.5" />
        {/* data polygon */}
        <polygon
          points={polyStr(dataPolygon)}
          fill="rgba(212,83,126,0.20)"
          stroke={DOYOON_TOKENS.pink}
          strokeWidth="1.5"
        />
        {/* 꼭짓점 */}
        {dataPolygon.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2.5" fill={DOYOON_TOKENS.pink} />
        ))}
        {/* 축 라벨 */}
        {axes.map((axis, i) => {
          const pos = labelPositions[i];
          const anchor =
            angles[i] === -90 || angles[i] === 90
              ? "middle"
              : angles[i] > -90 && angles[i] < 90
              ? "start"
              : "end";
          return (
            <text
              key={axis.name}
              x={pos.x}
              y={pos.y + 3}
              textAnchor={anchor}
              fontSize="10"
              fill={DOYOON_TOKENS.text}
              fontWeight="600"
            >
              {axis.name}
            </text>
          );
        })}
      </svg>
      <p className="text-[12px] text-center mt-2" style={{ color: DOYOON_TOKENS.textMeta }}>
        {axes[0].name}·{axes[3].name} 평균 대비 강점
      </p>
    </div>
  );
}

// 4단계 화살표 flow
function FlowStepsDoyoon({ steps }: { steps: ReadonlyArray<{ label: string; pct: number }> }) {
  return (
    <div className="my-3 flex items-center justify-between gap-1.5">
      {steps.map((s, i) => (
        <>
          <div
            key={s.label}
            className="flex-1 rounded-[8px] px-1.5 py-2 text-center"
            style={{
              background: i === steps.length - 1 ? "rgba(212,83,126,0.10)" : "rgba(139,105,20,0.06)",
              border: i === steps.length - 1
                ? "0.5px solid rgba(212,83,126,0.30)"
                : "0.5px solid rgba(139,105,20,0.20)",
            }}
          >
            <div
              className="text-[11px] mb-1"
              style={{
                color: i === steps.length - 1 ? DOYOON_TOKENS.pink : DOYOON_TOKENS.textMeta,
                fontWeight: 600,
              }}
            >
              {s.label}
            </div>
            <div
              className="text-[14px] font-bold"
              style={{ color: i === steps.length - 1 ? DOYOON_TOKENS.pink : DOYOON_TOKENS.warmGold }}
            >
              {s.pct}%
            </div>
          </div>
          {i < steps.length - 1 && (
            <span style={{ color: DOYOON_TOKENS.goldSoft, fontSize: 11 }}>▶</span>
          )}
        </>
      ))}
    </div>
  );
}

// MeterBar (P-2 패턴 재사용 — 라벨/value 인라인)
function AppealMeterBarDoyoon({ name, value }: { name: string; value: number }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="text-[13px] font-medium flex-shrink-0"
        style={{ color: DOYOON_TOKENS.textMeta, letterSpacing: "0.02em", width: 88, lineHeight: 1.6 }}
      >
        {name}
      </span>
      <div
        className="flex-1 rounded-full overflow-hidden"
        style={{ height: 10, background: "rgba(139,105,20,0.10)" }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${DOYOON_TOKENS.warmGold} 0%, #d4a13a 100%)`,
            transition: "width .35s ease",
          }}
        />
      </div>
      <span
        className="text-[13px] font-bold w-[36px] text-right flex-shrink-0"
        style={{ color: DOYOON_TOKENS.warmGold }}
      >
        {value}
      </span>
    </div>
  );
}
