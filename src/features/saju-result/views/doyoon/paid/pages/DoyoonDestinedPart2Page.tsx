import type { PaidChapterP7Doyoon } from "../../../../domain/paidReport";
import { DoyoonAiBlock } from "../components/DoyoonAiBlock";
import { DoyoonPageHead } from "../components/DoyoonPageHead";
import { DoyoonSdWithBubble } from "../components/DoyoonSdWithBubble";
import {
  DoyoonSLabel,
  DoyoonSection,
} from "../components/DoyoonSection";
import { DOYOON_TOKENS } from "../components/doyoonTokens";

interface DoyoonDestinedPart2PageProps {
  data?: PaidChapterP7Doyoon;
}

const MOCK_P7: PaidChapterP7Doyoon = {
  user_name: "홍길동",
  scenarios: [
    { prob_label: "소멸 65%", prob_tone: "low", title: "지금 이대로", desc: "둘 다 기다리다 흐지부지됩니다." },
    { prob_label: "좋은 결말 78%", prob_tone: "high", title: "홍길동님이 먼저", desc: "작은 신호 하나로 상대가 반응할 가능성이 높습니다." },
    { prob_label: "좋은 결말 91%", prob_tone: "best", title: "상대가 먼저", desc: "그 신호 놓치지 마세요." },
  ],
  ai_ending:
    "세 시나리오 각각 성공 확률과 기대값 정리해드릴게요.\n\n" +
    "시나리오 1 — 지금 이대로 유지. 6개월 후 관계 성립 확률 22%. 양쪽 모두 정체된 채로 흐름이 약해지는 패턴이에요. " +
    "가장 흔한 결말이지만 기대값은 가장 낮아요.\n\n" +
    "시나리오 2 — 홍길동님이 먼저 움직임. 6개월 후 관계 성립 확률 71%. " +
    "데이터상 가장 권장되는 분기예요. 임수(壬水) 일간이 먼저 신호를 보냈을 때 상대 호응률이 평균보다 1.4배 높게 측정되거든요. " +
    "깊은 사람이 먼저 표현했을 때의 무게가 데이터로도 잡혀요.\n\n" +
    "시나리오 3 — 상대가 먼저 움직이기를 기다림. 6개월 후 관계 성립 확률 38%. " +
    "가능성은 있지만 시간 비용이 평균 2.7배 더 들어요.\n\n" +
    "홍길동님 결정이에요. 다만 분석가로서 한 가지만 말씀드리면, 시나리오 2가 기대값 기준 압도적이에요. 71% vs 22% — 3배 차이예요.",
  sd_avatar_asset: "dy_05",
  ending_bubble: "홍길동님이 먼저 움직이는 게 제일 안전한 선택이에요. 데이터가 그렇게 나왔어요.",
};


export default function DoyoonDestinedPart2Page({ data }: DoyoonDestinedPart2PageProps) {
  const d = data ?? MOCK_P7;

  return (
    <section
      data-page-idx="7"
      style={{ background: DOYOON_TOKENS.bg, color: DOYOON_TOKENS.text }}
    >
      <DoyoonPageHead
        ch="4"
        hanja="四"
        title="운명의 짝 · 결말 (2/2)"
        sub="궁합 지수 · 심리 분석"
      />

      <DoyoonSection>
        <DoyoonSLabel>4-3 결말 예측 시나리오</DoyoonSLabel>

        <NoticeDoyoon
          icon="📊"
          text={`현재 변수 조합에서 산출 가능한 결말은 3가지입니다. ${d.user_name}님의 행동 변수에 따라 분기됩니다.`}
        />

        <div
          className="my-3 grid gap-1.5"
          style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
        >
          {d.scenarios.map((s, i) => (
            <ScenarioCardComp
              key={i}
              probLabel={s.prob_label}
              probTone={s.prob_tone}
              title={s.title}
              desc={s.desc}
              recommend={i === 1}
            />
          ))}
        </div>

        <DoyoonAiBlock body={d.ai_ending} />

        <DoyoonSdWithBubble
          sdAsset={d.sd_avatar_asset}
          quote={d.ending_bubble}
          flow="right"
        />
      </DoyoonSection>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════
// 인라인 컴포넌트
// ════════════════════════════════════════════════════════════════════

function NoticeDoyoon({ icon, text }: { icon: string; text: string }) {
  return (
    <div
      className="my-3 rounded-[10px] px-3 py-2.5 flex items-start gap-2.5"
      style={{
        background: "rgba(74,130,180,0.08)",
        border: "0.5px solid rgba(74,130,180,0.30)",
      }}
    >
      <span className="text-[16px] flex-shrink-0" aria-hidden>
        {icon}
      </span>
      <span
        className="text-[12px] flex-1"
        style={{ color: DOYOON_TOKENS.text, lineHeight: 1.6, wordBreak: "keep-all" }}
      >
        {text}
      </span>
    </div>
  );
}

function ScenarioCardComp({
  probLabel,
  probTone,
  title,
  desc,
  recommend,
}: {
  probLabel: string;
  probTone: "low" | "high" | "best";
  title: string;
  desc: string;
  recommend: boolean;
}) {
  // 원본 도윤_final.html .sc-low / .sc-high / .sc-best 토큰 매핑
  const toneColor: Record<"low" | "high" | "best", string> = {
    low: "#a32d2d",      // sc-low
    high: DOYOON_TOKENS.warmGold,  // sc-high (warm-gold)
    best: "#1D9E75",     // sc-best
  };
  const toneBg: Record<"low" | "high" | "best", string> = {
    low: "rgba(220,80,80,0.10)",
    high: "rgba(139,105,20,0.12)",
    best: "rgba(29,158,117,0.12)",
  };

  const frameAsset = recommend
    ? "/doyoon/dy_sub/scenario_card_frame_recommend_dy.png"
    : "/doyoon/dy_sub/scenario_card_frame.png";

  return (
    <div
      className="flex flex-col items-center text-center"
      style={{
        background: `#fff8ec url(${frameAsset}) no-repeat center center / 100% 100%`,
        padding: "12px 10px",
        minHeight: 145,
      }}
    >
      <span
        className="font-bold inline-block mb-1.5"
        style={{
          background: toneBg[probTone],
          color: toneColor[probTone],
          fontSize: 11,
          padding: "2px 6px",
          borderRadius: 8,
          letterSpacing: "0.02em",
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {probLabel}
      </span>
      <div
        className="font-bold mb-1"
        style={{
          color: DOYOON_TOKENS.text,
          fontSize: 12,
          wordBreak: "keep-all",
          lineHeight: 1.35,
        }}
      >
        {title}
      </div>
      <div
        style={{
          color: DOYOON_TOKENS.textMeta,
          fontSize: 11,
          wordBreak: "keep-all",
          lineHeight: 1.5,
        }}
      >
        {desc}
      </div>
    </div>
  );
}
