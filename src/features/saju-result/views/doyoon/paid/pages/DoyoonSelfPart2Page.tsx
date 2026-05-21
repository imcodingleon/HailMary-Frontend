import type { PaidChapterP2Doyoon } from "../../../../domain/paidReport";
import { DoyoonAiBlock } from "../components/DoyoonAiBlock";
import { DoyoonPageHead } from "../components/DoyoonPageHead";
import {
  DoyoonSBody,
  DoyoonSLabel,
  DoyoonSTitle,
  DoyoonSection,
} from "../components/DoyoonSection";
import { DoyoonSdWithBubble } from "../components/DoyoonSdWithBubble";
import { DOYOON_TOKENS } from "../components/doyoonTokens";

interface DoyoonSelfPart2PageProps {
  data?: PaidChapterP2Doyoon;
}

// dev/검수 fallback — 임수 셀 (원본 도윤_final.html 더미 그대로).
const MOCK_P2: PaidChapterP2Doyoon = {
  user_name: "홍길동",
  hurt_type_1: {
    keyword: "무관심 신호 인지",
    risk_pct: "78%",
    desc: "동일 일간 표본 78%가 이 신호에서 가장 큰 감정 손실을 보고했습니다.",
  },
  hurt_type_2: {
    keyword: "의도 미독해",
    risk_pct: "64%",
    desc: "표현하지 않은 마음을 알아주길 기대하는 경향, 평균 대비 1.4배입니다.",
  },
  ai_hurt:
    "두 유형이 임수(壬水) 일간 표본에서 가장 자주 나와요. 하나씩 보여드릴게요.\n\n" +
    "첫 번째는 무관심 신호 인지예요. 위험도 78%. 동일 일간 표본의 78%가 이 신호에서 가장 큰 감정 손실을 보고했어요. " +
    "상대가 잠깐 답이 늦거나 톤이 낮아진 것만으로도 홍길동님은 그걸 거리감으로 해석하는 경향이 있어요. 평균 대비 1.6배예요.\n\n" +
    "두 번째는 의도 미독해예요. 위험도 64%. 표현하지 않은 마음을 알아주길 기대하는 경향이 평균 대비 1.4배로 측정돼요.\n\n" +
    "둘 다 통제 가능한 영역이에요. 신호 해석 전에 24시간 텀을 두시면 두 패턴 모두 발생률이 41% 떨어져요. 조금만 의식해보세요.",
  meters: [
    { label: "직후", pct: 20 },
    { label: "1개월", pct: 40 },
    { label: "3개월", pct: 65 },
    { label: "6개월", pct: 90 },
  ],
  recovery_lag_multiplier: "1.4배",
  ai_recovery:
    "회복 데이터도 정리해 드릴게요. 임수(壬水) 일간 표본의 평균 회복 곡선이에요.\n\n" +
    "직후 1주 — 감정 강도 92% 유지. 거의 안 떨어져요. 1개월 차 — 78%까지 천천히 내려와요. " +
    "보통 다른 일간이 50% 수준으로 떨어지는 시점인데, 홍길동님 일간은 더 오래 가요. 3개월 차 — 비로소 45% 아래로 내려와요.\n\n" +
    "즉 평균보다 회복이 1.4배 더 느려요. 이게 약점이 아니에요. 홍길동님 일간은 깊게 처리해서 한 번에 정리하는 패턴이거든요. " +
    "빨리 회복하는 일간보다 재발률이 훨씬 낮아요.\n\n" +
    "다만 그 3개월 동안 새 관계를 시작하시면 충돌 확률이 높아져요. 기존 데이터가 정리되기 전이라서요. " +
    "3개월은 비워두시는 게 가장 효율적이에요. 그 다음에 새 변수가 들어와야 깔끔해요.",
  sd_avatar_asset: "dy_03",
  recovery_bubble: "3개월 지나고 한 달만 더 쉬세요. 그게 다음 사람한테 공평한 거예요.",
};


export default function DoyoonSelfPart2Page({ data }: DoyoonSelfPart2PageProps) {
  const d = data ?? MOCK_P2;

  return (
    <section
      data-page-idx="2"
      style={{ background: DOYOON_TOKENS.bg, color: DOYOON_TOKENS.text }}
    >
      <DoyoonPageHead
        ch="1"
        hanja="一"
        title={`${d.user_name}님이라는 사람 (2/2)`}
        sub="연애 성향 · 감정 구조 · 매력 분석"
      />

      {/* ── 1-4 취약 구간 분석 ── */}
      <DoyoonSection>
        <DoyoonSLabel>1-4 취약 구간 분석</DoyoonSLabel>
        <DoyoonSTitle>위험도 측정 — 이 두 유형이 특히 자주 나와요.</DoyoonSTitle>

        <CardsGridDoyoon>
          <HurtCardDoyoon
            index={1}
            risk_pct={d.hurt_type_1.risk_pct}
            keyword={d.hurt_type_1.keyword}
            desc={d.hurt_type_1.desc}
          />
          <HurtCardDoyoon
            index={2}
            risk_pct={d.hurt_type_2.risk_pct}
            keyword={d.hurt_type_2.keyword}
            desc={d.hurt_type_2.desc}
          />
        </CardsGridDoyoon>

        <DoyoonAiBlock body={d.ai_hurt} />
      </DoyoonSection>

      {/* ── 1-5 회복 타임라인 분석 ── */}
      <DoyoonSection>
        <DoyoonSLabel>1-5 회복 타임라인 분석</DoyoonSLabel>
        <DoyoonSTitle>단계별 회복률 — 평균 곡선 대비 {d.recovery_lag_multiplier}.</DoyoonSTitle>
        <DoyoonSBody>4 단계 진행률로 측정한 회복 곡선입니다.</DoyoonSBody>

        <div className="my-3 space-y-2">
          {d.meters.map((m) => (
            <MeterBarDoyoon key={m.label} label={m.label} pct={m.pct} />
          ))}
        </div>

        <DoyoonAiBlock body={d.ai_recovery} />

        <DoyoonSdWithBubble
          sdAsset={d.sd_avatar_asset}
          quote={d.recovery_bubble}
          flow="right"
        />
      </DoyoonSection>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════
// P-2 전용 인라인 컴포넌트 (원본 도윤_final.html .card-warn / .meter 매핑)
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

// 원본 .card-warn 매핑 — 부드러운 핑크/베이지 톤 (라이트 모드)
function HurtCardDoyoon({
  index,
  risk_pct,
  keyword,
  desc,
}: { index: number; risk_pct: string; keyword: string; desc: string }) {
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
        취약 유형 {index} · 위험도 {risk_pct}
      </div>
      <div
        className="text-[15px] font-bold leading-[1.4] mb-1.5"
        style={{ color: "#7a2f4f", wordBreak: "keep-all" }}
      >
        {keyword}
      </div>
      <div
        className="text-[13px] leading-[1.65]"
        style={{
          color: "rgba(122,47,79,0.85)",
          wordBreak: "keep-all",
        }}
      >
        {desc}
      </div>
    </div>
  );
}

// 원본 .meter / .meter-track-dy / .meter-fill-dy 매핑 — 수평 진행바
function MeterBarDoyoon({ label, pct }: { label: string; pct: number }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="text-[13px] font-medium w-[48px] flex-shrink-0"
        style={{ color: DOYOON_TOKENS.textMeta, letterSpacing: "0.02em" }}
      >
        {label}
      </span>
      <div
        className="flex-1 rounded-full overflow-hidden"
        style={{
          height: 10,
          background: "rgba(139,105,20,0.10)",
        }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${DOYOON_TOKENS.warmGold} 0%, #d4a13a 100%)`,
            transition: "width .35s ease",
          }}
        />
      </div>
      <span
        className="text-[13px] font-semibold w-[40px] text-right flex-shrink-0"
        style={{ color: DOYOON_TOKENS.warmGold }}
      >
        {pct}%
      </span>
    </div>
  );
}
