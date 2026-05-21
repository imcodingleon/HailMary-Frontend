import type { PaidChapterP3Doyoon } from "../../../../domain/paidReport";
import { DoyoonAiBlock } from "../components/DoyoonAiBlock";
import { DoyoonBubble } from "../components/DoyoonBubble";
import { DoyoonPageHead } from "../components/DoyoonPageHead";
import {
  DoyoonSLabel,
  DoyoonSTitle,
  DoyoonSection,
} from "../components/DoyoonSection";
import { DOYOON_TOKENS } from "../components/doyoonTokens";

interface DoyoonBlockingPart1PageProps {
  data?: PaidChapterP3Doyoon;
}

// dev/검수 fallback — 임수 + 수 과다 케이스 (원본 도윤_final.html 더미).
const MOCK_P3: PaidChapterP3Doyoon = {
  user_name: "홍길동",
  blockade: {
    ohang_excess: "수",
    ohang_excess_hanja: "水",
    blockade_pct: "상위 15%",
    blockade_multiplier: "1.7배",
  },
  ai_blockade:
    "데이터부터 보여드릴게요. 홍길동님의 사주 구조에서 수(水) 기운이 평균 대비 1.7배로 측정돼요. " +
    "단순한 강조 수준이 아니라 구조적으로 과다인 상태예요.\n\n" +
    "이게 새 인연 진입을 차단해요. 같은 기운이 이미 가득 차 있으면 비슷한 결의 사람이 들어올 자리가 없어지거든요. " +
    "동일 일간 표본에서 수(水) 과다 케이스의 신규 인연 접촉률이 평균 대비 36% 낮아요. 우연이 아니에요.\n\n" +
    "해법은 단순해요. 비우는 거예요. 사람이든 미련이든 답 안 오는 연락이든 — 하나만 정리해도 " +
    "새 인연 진입률이 24% 회복돼요. 기존 변수를 줄이는 게 신규 변수를 추가하는 것보다 효율적이에요.",
  blockade_bubble: "분류 끝났어요. 홍길동님 사주는 수(水) 과다 구조예요.",
  patterns: [
    {
      keyword: "초기 과진입",
      pct: "81%",
      desc: "첫 30일 내 감정 투입량이 평균 대비 1.8배입니다.",
    },
    {
      keyword: "중반 무표현",
      pct: "67%",
      desc: "감정 투입은 유지되는데 표현 빈도가 47% 떨어집니다.",
    },
    {
      keyword: "위기 일괄 폭발",
      pct: "54%",
      desc: "누적된 감정이 한 번에 표출되는 빈도가 평균 대비 2.1배입니다.",
    },
  ],
  ai_pattern:
    "홍길동님의 반복 실수 패턴을 3단계로 나눠봤어요.\n\n" +
    "1단계 — 초기 과진입 (발생률 81%). 첫 한 달 안에 감정 자원의 70% 이상을 투입하는 패턴이에요. 평균 케이스의 1.9배 속도예요.\n\n" +
    "2단계 — 중반 무표현 (발생률 67%). 표현 빈도가 초반 대비 60% 이상 떨어지는 구간이에요. " +
    "3단계 — 위기 일괄 폭발 (발생률 54%). 누적된 감정이 한꺼번에 출력되는 구간이에요.\n\n" +
    "임수 일간 특유의 패턴이에요. 다음 관계에서 1단계 속도만 평균선까지 늦추셔도 전체 안정성이 41% 올라가요.",
  pattern_bubble: "사람은 바뀌어도 패턴은 안 바뀌어요. 그래서 데이터가 의미가 있는 거예요.",
  strategies: [
    {
      keyword: "표현 빈도 상한선 설정",
      desc: "주 단위 표현 횟수에 상한·하한 명시. 데이터상 이 한 가지만 적용해도 폭발 빈도가 47% 감소해요.",
      effect_pct: "47%",
    },
    {
      keyword: "감정 일지 24시간 룰",
      desc: "감정 발생 직후가 아니라 24시간 후에 표현. 충동 표현 비율이 평균 38% 감소합니다.",
      effect_pct: "38%",
    },
  ],
  strategy_bubble: "지금 이걸 읽고 계신다는 것 자체가 이미 다음 연애가 달라진다는 신호예요.",
  sd_avatar_asset: "dy_10",
};


export default function DoyoonBlockingPart1Page({ data }: DoyoonBlockingPart1PageProps) {
  const d = data ?? MOCK_P3;

  return (
    <section
      data-page-idx="3"
      style={{ background: DOYOON_TOKENS.bg, color: DOYOON_TOKENS.text }}
    >
      <DoyoonPageHead
        ch="2"
        hanja="二"
        title="연애를 막는 것 (1/2)"
        sub="구조적 원인 · 반복 패턴 · 비호환 유형"
      />

      {/* ── 2-1 구조적 원인 분석 ── */}
      <DoyoonSection>
        <DoyoonSLabel>2-1 구조적 원인 분석</DoyoonSLabel>
        <DoyoonSTitle>방해 강도 측정 — {d.blockade.blockade_pct}.</DoyoonSTitle>

        <BlockadeBigCardDoyoon
          blockade={d.blockade}
        />

        <DoyoonAiBlock body={d.ai_blockade} />

        <DoyoonBubble quote={d.blockade_bubble} />
      </DoyoonSection>

      {/* ── 2-2 반복 실수 패턴 분석 ── */}
      <DoyoonSection>
        <DoyoonSLabel>2-2 반복 실수 패턴 분석</DoyoonSLabel>
        <DoyoonSTitle>발생 빈도 상위 3개 패턴.</DoyoonSTitle>

        <CardsGridDoyoon>
          {d.patterns.map((p, i) => (
            <PatternCardDoyoon
              key={i}
              index={i + 1}
              keyword={p.keyword}
              pct={p.pct}
              desc={p.desc}
            />
          ))}
        </CardsGridDoyoon>

        <DoyoonAiBlock body={d.ai_pattern} />

        <DoyoonBubble quote={d.pattern_bubble} />
      </DoyoonSection>

      {/* ── 2-2-1 변수 통제 가능합니다 ── */}
      <DoyoonSection>
        <DoyoonSLabel>2-2-1 변수 통제 가능합니다</DoyoonSLabel>
        <DoyoonSTitle>실행 가능한 통제 전략 2개.</DoyoonSTitle>

        <SdSpotlightDoyoon asset={d.sd_avatar_asset} />

        <CardsGridDoyoon>
          {d.strategies.map((s, i) => (
            <ControlStrategyCardDoyoon
              key={i}
              index={i + 1}
              keyword={s.keyword}
              desc={s.desc}
            />
          ))}
        </CardsGridDoyoon>

        <DoyoonBubble quote={d.strategy_bubble} />
      </DoyoonSection>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════
// P-3 전용 인라인 컴포넌트
// ════════════════════════════════════════════════════════════════════

function CardsGridDoyoon({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="my-3"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: 8,
      }}
    >
      {children}
    </div>
  );
}

// 원본 큰 card-warn (2-1 single full-width card)
function BlockadeBigCardDoyoon({
  blockade,
}: { blockade: PaidChapterP3Doyoon["blockade"] }) {
  return (
    <div
      className="rounded-[10px] px-3.5 py-3.5 my-2"
      style={{
        background: "rgba(212,83,126,0.06)",
        border: "0.5px solid rgba(212,83,126,0.22)",
      }}
    >
      <div
        className="text-[12px] font-semibold mb-2 uppercase"
        style={{ color: DOYOON_TOKENS.pink, letterSpacing: "0.05em" }}
      >
        변수 진단 · 방해 강도 {blockade.blockade_pct}
      </div>
      <div
        className="text-[16px] font-bold leading-[1.4] mb-2"
        style={{ color: "#7a2f4f", wordBreak: "keep-all" }}
      >
        {blockade.ohang_excess}({blockade.ohang_excess_hanja}) 과다 구조
      </div>
      <div
        className="text-[13px] leading-[1.65]"
        style={{ color: "rgba(122,47,79,0.85)", wordBreak: "keep-all" }}
      >
        동일 일간 표본 대비 이 변수의 누적 강도가 평균 대비 {blockade.blockade_multiplier}로 측정됩니다.
      </div>
    </div>
  );
}

// 원본 card-warn × 3 (반복 패턴)
function PatternCardDoyoon({
  index,
  keyword,
  pct,
  desc,
}: { index: number; keyword: string; pct: string; desc: string }) {
  return (
    <div
      className="rounded-[10px] px-3 py-3"
      style={{
        background: "rgba(212,83,126,0.06)",
        border: "0.5px solid rgba(212,83,126,0.22)",
      }}
    >
      <div
        className="text-[12px] font-semibold mb-2 uppercase"
        style={{ color: DOYOON_TOKENS.pink, letterSpacing: "0.05em" }}
      >
        패턴 {index} · 빈도 {pct}
      </div>
      <div
        className="text-[14px] font-bold leading-[1.4] mb-1.5"
        style={{ color: "#7a2f4f", wordBreak: "keep-all" }}
      >
        {keyword}
      </div>
      <div
        className="text-[13px] leading-[1.65]"
        style={{ color: "rgba(122,47,79,0.85)", wordBreak: "keep-all" }}
      >
        {desc}
      </div>
    </div>
  );
}

// 원본 card-good × 2 (변수 통제 전략) — 녹색 톤
function ControlStrategyCardDoyoon({
  index,
  keyword,
  desc,
}: { index: number; keyword: string; desc: string }) {
  return (
    <div
      className="rounded-[10px] px-3 py-3"
      style={{
        background: "rgba(75,167,138,0.07)",
        border: "0.5px solid rgba(75,167,138,0.25)",
      }}
    >
      <div
        className="text-[12px] font-semibold mb-2 uppercase"
        style={{ color: "#3a8068", letterSpacing: "0.05em" }}
      >
        통제 전략 {index}
      </div>
      <div
        className="text-[14px] font-bold leading-[1.4] mb-1.5"
        style={{ color: "#2a604f", wordBreak: "keep-all" }}
      >
        {keyword}
      </div>
      <div
        className="text-[13px] leading-[1.65]"
        style={{ color: "rgba(42,96,79,0.85)", wordBreak: "keep-all" }}
      >
        {desc}
      </div>
    </div>
  );
}

// 원본 sd-spotlight-slot sz-240 (dy_10 — 손바닥 펼침)
function SdSpotlightDoyoon({ asset }: { asset: string }) {
  return (
    <div className="flex justify-center my-3">
      <div
        aria-label={`한도윤 SD — ${asset}`}
        className="bg-no-repeat bg-center bg-contain"
        style={{
          backgroundImage: `url(/doyoon/sd_dy/${asset}.png)`,
          width: 240,
          height: 240,
        }}
      />
    </div>
  );
}
