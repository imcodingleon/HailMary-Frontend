import type { PaidChapterP8Doyoon } from "../../../../domain/paidReport";
import { DoyoonAiBlock } from "../components/DoyoonAiBlock";
import { DoyoonPageHead } from "../components/DoyoonPageHead";
import {
  DoyoonSection,
} from "../components/DoyoonSection";
import { DOYOON_TOKENS } from "../components/doyoonTokens";

interface DoyoonOpportunityPageProps {
  data?: PaidChapterP8Doyoon;
}

const MOCK_P8: PaidChapterP8Doyoon = {
  user_name: "홍길동",
  months: [
    { label: "5월 (이번달)", hearts: 2, pct: 35, state: "시작", desc: "이번 달부터 흐름 진입 구간이에요. 큰 변동은 없지만 변수가 움직이기 시작해요.", is_peak: false },
    { label: "6월", hearts: 3, pct: 50, state: "진입", desc: "접촉 확률이 빠르게 차오르는 구간이에요. 신호 인지율 높이세요.", is_peak: false },
    { label: "7월", hearts: 4, pct: 65, state: "상승", desc: "신규 접촉 확률 상승. 반복 접촉이 인연으로 발전하는 사례가 많아요.", is_peak: false },
    { label: "8월", hearts: 5, pct: 78, state: "피크", desc: "피크 구간. 적극적 감정 표현 효율이 평균 대비 2.3배예요.", is_peak: true },
    { label: "9월", hearts: 4, pct: 70, state: "심화", desc: "관계 심화 국면. 상대 페이스 존중이 효율적이에요.", is_peak: false },
    { label: "10월", hearts: 3, pct: 55, state: "안정", desc: "안정 전환. 현 상태 유지 전략이 가장 효과적이에요.", is_peak: false },
    { label: "11월", hearts: 2, pct: 42, state: "정체", desc: "변수 최소화 구간. 조급한 밀어붙임은 역효과예요.", is_peak: false },
    { label: "12월", hearts: 3, pct: 55, state: "상승", desc: "신규 환경 진입 권장. 동선 변화로 접촉 변수 재가동돼요.", is_peak: false },
    { label: "'27. 1월", hearts: 5, pct: 82, state: "2차 피크", desc: "연도 전환과 함께 2차 피크. 표현 명확성이 결정적 변수예요.", is_peak: true },
    { label: "'27. 2월", hearts: 4, pct: 68, state: "심화", desc: "관계 안정 단계. 약속 이행 일관성이 신뢰 변수로 가장 크게 작동해요.", is_peak: false },
    { label: "'27. 3월", hearts: 2, pct: 38, state: "정체", desc: "변수 정리 구간. 다음 사이클 진입을 위한 충전 시기예요.", is_peak: false },
    { label: "'27. 4월", hearts: 4, pct: 65, state: "1년차 마무리", desc: "1년 사이클 마무리. 명확한 표현이 다음 흐름 변수를 결정해요.", is_peak: false },
  ],
  ai_intro:
    "향후 12개월 접촉 확률 분포 정리해드릴게요. 이번 달부터 1년이에요.\n\n" +
    "연간 평균 대비 피크 구간이 두 곳이에요. 8월과 '27. 1월. 이 두 달은 신규 인연 접촉 확률이 평균 대비 2.3배까지 올라가요. " +
    "그 사이 구간은 변수 정리·매력 변수 보완에 효율적인 충전 구간이에요.\n\n" +
    "임수(壬水) 일간 표본에서 흐름 거스르는 행동의 ROI(투입 대비 효과)가 가장 낮게 측정돼요. " +
    "피크에 적극 움직이고, 정체기엔 변수 정리에 집중하시는 게 가장 효율적이에요. 데이터가 그렇게 가리키고 있어요.",
  sd_avatar_asset: "dy_04",
  bubble: "이 시기에 접촉 확률이 가장 높게 잡혀요.",
};


export default function DoyoonOpportunityPage({ data }: DoyoonOpportunityPageProps) {
  const d = data ?? MOCK_P8;

  return (
    <section
      data-page-idx="8"
      style={{ background: DOYOON_TOKENS.bg, color: DOYOON_TOKENS.text }}
    >
      <DoyoonPageHead
        ch="5"
        hanja="五"
        title="인연이 오는 시간"
        sub="월별 접촉 확률 · 피크 구간"
      />

      <DoyoonSection>
        <SdSpotlightDy04 asset={d.sd_avatar_asset} />

        <DoyoonAiBlock body={d.ai_intro} />

        <ScrollFrameTimelineDoyoon months={d.months} />

        <BubbleOnlyDoyoon quote={d.bubble} />
      </DoyoonSection>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════
// 인라인 컴포넌트
// ════════════════════════════════════════════════════════════════════

function SdSpotlightDy04({ asset }: { asset: string }) {
  return (
    <div className="flex justify-center my-3">
      <div
        aria-label={`한도윤 — 12개월 확률 데이터 / ${asset}`}
        style={{
          width: 260,
          height: 260,
          backgroundImage: `url(/doyoon/sd_dy/${asset}.png)`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}

function ScrollFrameTimelineDoyoon({
  months,
}: {
  months: ReadonlyArray<{
    label: string;
    hearts: number;
    pct: number;
    state: string;
    desc: string;
    is_peak: boolean;
  }>;
}) {
  return (
    <div
      role="figure"
      aria-label="12개월 인연 접촉 확률 두루마리"
      className="my-3 mx-auto relative w-full"
      style={{
        background:
          "url(/doyoon/dy_sub/scroll_full_dy.png) no-repeat center / 100% 100%",
        aspectRatio: "724 / 2536",
        padding: "53% 19% 46% 19%",
        boxSizing: "border-box",
        overflow: "hidden",
        maxWidth: 430,
      }}
    >
      <div className="flex flex-col gap-1" style={{ height: "100%" }}>
        {months.map((m, i) => (
          <TimelineRowDoyoon key={i} {...m} />
        ))}
      </div>
    </div>
  );
}

function TimelineRowDoyoon({
  label,
  hearts,
  pct,
  desc,
  is_peak,
}: {
  label: string;
  hearts: number;
  pct: number;
  state: string;
  desc: string;
  is_peak: boolean;
}) {
  return (
    <div
      className="rounded-[8px] px-2.5 py-2"
      style={{
        background: is_peak ? "rgba(212,83,126,0.08)" : "transparent",
        borderBottom: is_peak ? "none" : "0.5px dashed rgba(139,105,20,0.18)",
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="text-[12px] flex-shrink-0"
          style={{
            color: is_peak ? DOYOON_TOKENS.pink : DOYOON_TOKENS.text,
            fontWeight: is_peak ? 700 : 600,
            width: 78,
            letterSpacing: "0.02em",
          }}
        >
          {label}
        </span>
        <span className="flex-1 flex gap-[1px]" aria-label={`hearts ${hearts}/5`}>
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              style={{
                fontSize: 13,
                color: n <= hearts
                  ? (is_peak ? DOYOON_TOKENS.pink : DOYOON_TOKENS.warmGold)
                  : "rgba(139,105,20,0.20)",
                lineHeight: 1,
              }}
            >
              {n <= hearts ? "♥" : "♡"}
            </span>
          ))}
        </span>
        <span
          className="text-[12px] font-bold flex-shrink-0"
          style={{
            color: is_peak ? DOYOON_TOKENS.pink : DOYOON_TOKENS.warmGold,
            width: 30,
            textAlign: "right",
          }}
        >
          {pct}%
        </span>
      </div>
      <p
        className="text-[11px] mt-1"
        style={{
          color: is_peak ? DOYOON_TOKENS.pink : DOYOON_TOKENS.textMeta,
          wordBreak: "keep-all",
          lineHeight: 1.55,
        }}
      >
        {desc}
      </p>
    </div>
  );
}

function BubbleOnlyDoyoon({ quote }: { quote: string }) {
  return (
    <div
      className="my-3 rounded-[12px] px-3.5 py-3"
      style={{
        background: "rgba(212,83,126,0.06)",
        border: "0.5px solid rgba(212,83,126,0.22)",
      }}
    >
      <div
        className="text-[12px] font-semibold mb-1.5"
        style={{ color: DOYOON_TOKENS.pink, letterSpacing: "0.03em" }}
      >
        한도윤
      </div>
      <div
        className="text-[14px]"
        style={{ color: DOYOON_TOKENS.text, lineHeight: 1.75, wordBreak: "keep-all" }}
      >
        "{quote}"
      </div>
    </div>
  );
}
