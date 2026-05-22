import type { PaidChapterP9Doyoon } from "../../../../domain/paidReport";
import { DoyoonAiBlock } from "../components/DoyoonAiBlock";
import { DoyoonPageHead } from "../components/DoyoonPageHead";
import { DoyoonSdWithBubble } from "../components/DoyoonSdWithBubble";
import {
  DoyoonSLabel,
  DoyoonSTitle,
  DoyoonSection,
} from "../components/DoyoonSection";
import { DOYOON_TOKENS } from "../components/doyoonTokens";

interface DoyoonOptimizationPageProps {
  data?: PaidChapterP9Doyoon;
}

const MOCK_P9: PaidChapterP9Doyoon = {
  user_name: "홍길동",
  ohang_lack: "수(水)",
  ohang_methods: [
    { label: "보완 방법 1 · 효과 +9%", keyword: "색채 노출 — 검정·짙은 청색",
      desc: "수 기운을 시각 변수로 보완. 옷차림 비율 늘리기." },
    { label: "보완 방법 2 · 효과 +7%", keyword: "공간 변수 — 북쪽 배치",
      desc: "북쪽이 수의 위치 변수. 수공간 가시화 효과적." },
    { label: "보완 방법 3 · 효과 +7%", keyword: "행동 변수 — 수영·반신욕",
      desc: "물 접촉 변수 보완. 주 2회 이상이 효과 가속화 임계점." },
  ],
  ohang_boost_pct: "23%",
  ai_ohang:
    "임수(壬水) 일간은 수(水) 보완에 유독 민감하게 반응해요. 동일 일간 표본에서 보완 적용 전후 인연 접촉률이 평균 23% 차이가 나요. " +
    "일반 케이스보다 1.6배 높은 반응성이에요.\n\n" +
    "세 가지를 30일간 유지하시면 효과가 누적돼요. 단순 합산이 아니라 상호작용 효과까지 포함하면 최대 28%까지 올라가요. " +
    "그냥 생활 패턴 조금 바꾸는 것뿐인데 꽤 큰 변화예요.\n\n" +
    "뭐부터 할지 모르겠으면 제일 가벼운 것부터 시작하세요. 홍길동님께 가장 진입 장벽이 낮은 색채 노출부터 권장드려요.",
  risk_cards: [
    { label: "즉시 · 위험도 81%", tone: "warn", keyword: "미정리 관계 변수",
      desc: "새 인연 진입 차단의 가장 큰 변수. 24시간 내 정리 권장." },
    { label: "단기 · 위험도 64%", tone: "warn", keyword: "충동 표현 빈도",
      desc: "감정 폭발 빈도가 평균 대비 2.1배. 24시간 룰 적용 권장." },
    { label: "중기 · 위험도 47%", tone: "amber", keyword: "동선 단조로움",
      desc: "접촉 노출 변수가 좁음. 월 1회 새 환경 진입이 효율적." },
  ],
  ai_risk:
    "세 개 중에 즉시 변수가 임팩트가 가장 커요. 이것 하나만 정리해도 새 인연 진입률이 36% 올라가거든요. " +
    "단기랑 중기는 차차 하셔도 되는데, 즉시는 말 그대로 지금 바로예요.\n\n" +
    "홍길동님께서 동시에 셋 다 진행하시면 좋긴 한데, 효과가 단순 합산이 아니라 1.4배 수준으로 수렴해요. " +
    "즉 81+64+47 = 192가 아니라 약 130 수준이에요. 그래도 충분히 의미 있는 수치예요. 다만 우선순위는 분명히 잡고 가시는 게 효율적이에요.",
  current_score: 85,
  target_score: 92,
  ai_optimize:
    "85에서 92까지 딱 7점 남았어요. 이 격차는 세 가지 변수에서 발생해요 — 침묵 활용, 시선 안정, 표현 빈도.\n\n" +
    "임수(壬水) 일간은 침묵 활용 하나만 올려도 매력 발현 효율이 1.3%씩 오르거든요. " +
    "30일 의식적으로 해보시면 6~8점은 올라요. 92점을 넘기면 전체 호감 유발 효율이 21% 상승해요.\n\n" +
    "별거 없어요. 그냥 시작하시면 돼요. 분석은 다 끝났어요. 이제 공은 홍길동님한테 있어요.",
  sd_avatar_asset: "dy_06",
  optimize_bubble: "분석은 다 끝났어요. 이제 공은 홍길동님한테 있어요.",
};


export default function DoyoonOptimizationPage({ data }: DoyoonOptimizationPageProps) {
  const d = data ?? MOCK_P9;

  return (
    <section
      data-page-idx="9"
      style={{ background: DOYOON_TOKENS.bg, color: DOYOON_TOKENS.text }}
    >
      <DoyoonPageHead
        ch="6"
        hanja="六"
        title="연애 변수 최적화 가이드"
        sub="변수 보완 · 리스크 제거"
      />

      {/* ── 6-1 오행 보완 ── */}
      <DoyoonSection>
        <DoyoonSLabel>6-1 오행 변수 보완</DoyoonSLabel>
        <DoyoonSTitle>
          <span style={{ color: DOYOON_TOKENS.pink, fontWeight: 700 }}>{d.ohang_lack}</span>
          {" "}변수 보완 시 인연 접촉 확률 평균 {d.ohang_boost_pct} 상승.
        </DoyoonSTitle>

        <div
          className="my-3 grid gap-1.5"
          style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
        >
          {d.ohang_methods.map((m, i) => (
            <CardGoodDoyoon key={i} label={m.label} keyword={m.keyword} desc={m.desc} />
          ))}
        </div>

        <DoyoonAiBlock body={d.ai_ohang} />
      </DoyoonSection>

      {/* ── 6-2 리스크 제거 ── */}
      <DoyoonSection>
        <DoyoonSLabel>6-2 리스크 변수 제거</DoyoonSLabel>
        <DoyoonSTitle>즉시·단기·중기 — 우선순위별 제거 전략.</DoyoonSTitle>

        <div
          className="my-3 grid gap-1.5"
          style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
        >
          {d.risk_cards.map((r, i) => (
            <CardRiskDoyoon key={i} label={r.label} tone={r.tone} keyword={r.keyword} desc={r.desc} />
          ))}
        </div>

        <DoyoonAiBlock body={d.ai_risk} />
      </DoyoonSection>

      {/* ── 6-3 매력 최적화 ── */}
      <DoyoonSection>
        <DoyoonSLabel>6-3 매력 변수 최적화</DoyoonSLabel>
        <DoyoonSTitle>
          현재 활성화 → 목표치까지 {d.target_score - d.current_score}%p 상승 가능.
        </DoyoonSTitle>

        <div className="my-3 space-y-2">
          <ScoreMeterDoyoon name="현재 활성화" value={d.current_score} />
          <ScoreMeterDoyoon name="목표" value={d.target_score} />
        </div>

        <DoyoonAiBlock body={d.ai_optimize} />

        <DoyoonSdWithBubble
          sdAsset={d.sd_avatar_asset}
          quote={d.optimize_bubble}
          flow="left"
        />
      </DoyoonSection>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════
// 인라인 컴포넌트
// ════════════════════════════════════════════════════════════════════

function CardGoodDoyoon({ label, keyword, desc }: { label: string; keyword: string; desc: string }) {
  return (
    <div
      className="rounded-[10px] px-2.5 py-2.5 flex flex-col"
      style={{
        background: "rgba(75,167,138,0.08)",
        border: "0.5px solid rgba(75,167,138,0.25)",
      }}
    >
      <div
        className="text-[10px] font-semibold mb-1"
        style={{ color: "#3a8068", letterSpacing: "0.03em", lineHeight: 1.3 }}
      >
        {label}
      </div>
      <div
        className="text-[12px] font-bold mb-1"
        style={{ color: "#2a604f", wordBreak: "keep-all", lineHeight: 1.35 }}
      >
        {keyword}
      </div>
      <div
        className="text-[10.5px]"
        style={{ color: "rgba(42,96,79,0.82)", wordBreak: "keep-all", lineHeight: 1.5 }}
      >
        {desc}
      </div>
    </div>
  );
}

function CardRiskDoyoon({
  label, tone, keyword, desc,
}: { label: string; tone: "warn" | "amber"; keyword: string; desc: string }) {
  const warnColor = "#a32d2d";
  const warnBg = "rgba(220,80,80,0.10)";
  const warnBorder = "rgba(220,80,80,0.30)";
  const amberColor = "#9c6f1f";
  const amberBg = "rgba(212,160,40,0.10)";
  const amberBorder = "rgba(212,160,40,0.30)";
  const color = tone === "warn" ? warnColor : amberColor;
  const bg = tone === "warn" ? warnBg : amberBg;
  const border = tone === "warn" ? warnBorder : amberBorder;
  return (
    <div
      className="rounded-[10px] px-2.5 py-2.5 flex flex-col"
      style={{ background: bg, border: `0.5px solid ${border}` }}
    >
      <div
        className="text-[10px] font-semibold mb-1"
        style={{ color, letterSpacing: "0.03em", lineHeight: 1.3 }}
      >
        {label}
      </div>
      <div
        className="text-[12px] font-bold mb-1"
        style={{ color, wordBreak: "keep-all", lineHeight: 1.35 }}
      >
        {keyword}
      </div>
      <div
        className="text-[10.5px]"
        style={{ color: "rgba(0,0,0,0.72)", wordBreak: "keep-all", lineHeight: 1.5 }}
      >
        {desc}
      </div>
    </div>
  );
}

function ScoreMeterDoyoon({ name, value }: { name: string; value: number }) {
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
