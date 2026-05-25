import type { PaidChapterP6Doyoon } from "../../../../domain/paidReport";
import SpouseImage from "../../../yeonwoo/paid/components/SpouseImage";
import { DoyoonAiBlock } from "../components/DoyoonAiBlock";
import { DoyoonPageHead } from "../components/DoyoonPageHead";
import {
  DoyoonSLabel,
  DoyoonSTitle,
  DoyoonSection,
} from "../components/DoyoonSection";
import { DOYOON_TOKENS } from "../components/doyoonTokens";

interface DoyoonDestinedPart1PageProps {
  data?: PaidChapterP6Doyoon;
}

const MOCK_P6: PaidChapterP6Doyoon = {
  user_name: "홍길동",
  match_slot_id: "f-water-yang",
  pct_value: "상위 8%",
  keyword_tags: ["따뜻한 인상", "조용한 사람", "표현 일관성", "감정 안정", "기다림 가능"],
  info_rows: [
    { key: "키 분포", val: "평균 ±5cm 범위 표본 71%" },
    { key: "체형", val: "균형 잡힌 골격 · 어깨선 단단" },
    { key: "얼굴상", val: "선이 부드러운 둥근형 · 이마 넓음" },
    { key: "이목구비", val: "눈매 길고 끝 부드러움 · 입꼬리 상향" },
    { key: "손·실루엣", val: "손가락 길고 단정 · 자세 차분" },
    { key: "성격 데이터", val: "감정 변동성 평균 대비 0.6배" },
    { key: "직업군", val: "기획·교육·창작 계열" },
    { key: "접촉 시나리오", val: "기존 동선 내 재접촉 확률 높음" },
    { key: "궁합 지수", val: "82%" },
  ],
  compatibility_pct: "82%",
  ai_profile:
    "궁합 지수 상위 8%예요. 데이터가 분류한 최적 인연의 모습부터 보여드릴게요.\n\n" +
    "외형 데이터 — 키 분포는 평균 ±5cm 범위 표본이 71%로 가장 많아요. 체형은 균형 잡힌 골격에 어깨선이 단단한 편이에요. " +
    "얼굴 데이터는 선이 부드러운 둥근형, 이마가 넓은 비율이 64%. " +
    "눈매가 길고 끝이 부드럽게 떨어지는 패턴이 동일 호환 사례의 78%를 차지해요.\n\n" +
    "성격 변수도 봐드릴게요. 감정 변동성이 평균 대비 0.6배예요. 즉 안정성이 1.7배 높다는 뜻이에요. " +
    "직업군은 기획·교육·창작 계열에서 매칭률이 가장 높게 나와요.\n\n" +
    "화(火) 보완 효율이 결정적이에요. 홍길동님 사주에서 비어 있는 변수를 이 프로파일이 정확히 채워주거든요. " +
    "임수(壬水) 일간과의 궁합 지수가 82%까지 올라가는 이유예요. 평균 궁합 지수 54% 대비 1.5배 수치예요.",
  ai_meeting:
    "만남 발생 확률이 가장 높은 환경부터 짚어드릴게요. 신규 환경보다 기존 동선 내 재접촉 확률이 2.3배 높아요. " +
    "즉 새로운 곳보다 이미 가는 곳에서 만날 가능성이 높다는 뜻이에요.\n\n" +
    "첫 접촉 패턴 — 짧고 평이한 대화로 시작해요. 인상에 강하게 남지 않는 케이스가 73%예요. " +
    "그래서 첫 만남에서 알아채지 못할 가능성이 커요. 의도적으로 못 알아보시는 게 아니라, 데이터 자체가 그렇게 분포돼요.\n\n" +
    "결정적인 건 두 번째 접촉이에요. 두 번째 마주칠 때 호감 전환율이 첫 번째 대비 2.4배로 급상승해요. " +
    "임수 일간 표본에서도 이 패턴이 일관되게 나타나요. 홍길동님, 첫 만남에서 두 번째 약속을 자연스럽게 만들어두시면 효율이 가장 높아요.",
  profile_bubble: "이 사람, 홍길동님 주변에 이미 있을 확률이 높아요. 데이터가 그렇게 가리키고 있어요.",
  interest_score: 78,
  expression_score: 52,
  durability_score: 88,
  behavior_cards: [
    {
      label: "행동 → 심리 1",
      keyword: "먼저 연락 안 함",
      desc: "관심 부재 신호 아닙니다. 표현 의지 점수(52)가 낮아 망설이는 단계입니다.",
    },
    {
      label: "행동 → 심리 2",
      keyword: "대화는 길게 받음",
      desc: "관심도(78)와 지속 가능성(88)이 일치하는 응답 패턴입니다.",
    },
  ],
  ai_pattern:
    "상대의 행동 데이터를 분석해드릴게요.\n\n" +
    "연락 빈도 — 답장은 길게 받는데 먼저 연락하지 않는 패턴이에요. " +
    "이게 보통 \"관심 없음\"으로 해석되는데, 데이터상 관심 없는 케이스의 답장 길이는 평균 3.2배 짧아요. " +
    "길게 받는다는 건 시간을 들이고 있다는 뜻이에요. 그냥 먼저 움직이는 사람이 아닌 거예요.\n\n" +
    "심리 추정값 — 망설임 지수 78%, 단절 의지 12%. 끊을 마음은 거의 없어요. 다만 시작할 결정도 안 내린 상태예요.\n\n" +
    "임수(壬水) 일간 표본에서 이런 교착 상태는 둘 중 한 명이 작은 신호를 보내면 87% 확률로 해소돼요. " +
    "통계적으로 홍길동님 쪽에서 먼저 보내는 게 더 효율적이에요. 먼저 움직였을 때 매칭 성공률이 1.4배 높거든요.",
  sd_avatar_asset: "dy_07",
};


export default function DoyoonDestinedPart1Page({ data }: DoyoonDestinedPart1PageProps) {
  const d = data ?? MOCK_P6;

  return (
    <section
      data-page-idx="6"
      style={{ background: DOYOON_TOKENS.bg, color: DOYOON_TOKENS.text }}
    >
      <DoyoonPageHead
        ch="4"
        hanja="四"
        title="운명의 짝 · 그 사람 (1/2)"
        sub="궁합 지수 · 심리 분석"
      />

      {/* ── 4-1 인연 프로파일 ── */}
      <DoyoonSection>
        <DoyoonSLabel>4-1 오행 궁합 지수 최상위 — 인연 프로파일</DoyoonSLabel>
        <PctBadgePinkDoyoon pct={d.pct_value} prefix="궁합 지수" />
        <DoyoonSTitle>데이터가 분류한 최적 인연의 모습.</DoyoonSTitle>

        <SpouseImage
          character="doyoon"
          type="match"
          slotId={d.match_slot_id}
          alt="인연 프로파일"
        />

        <KeywordTagsDoyoon tags={d.keyword_tags} />

        <InfoGridInyonDoyoon rows={d.info_rows} compatibility_pct={d.compatibility_pct} />

        <DoyoonAiBlock body={d.ai_profile} />

        <DoyoonAiBlock body={d.ai_meeting} />

        <BubbleOnlyDoyoon quote={d.profile_bubble} />
      </DoyoonSection>

      {/* ── 4-2 행동 패턴 ── */}
      <DoyoonSection>
        <DoyoonSLabel>4-2 행동 패턴 분석</DoyoonSLabel>
        <NoticeDoyoon
          icon="📊"
          text="현재 관심 있는 상대가 있다면 그 상대를 기준으로 분석하세요. 아직 없다면 근 시일 내 만나게 될 인연에 대입하면 됩니다."
        />
        <DoyoonSTitle>상대의 심리 게이지 측정.</DoyoonSTitle>

        <SdSpotlightDoyoon asset={d.sd_avatar_asset} />

        <div className="my-3 space-y-2">
          <PsychMeterDoyoon name="관심도" value={d.interest_score} />
          <PsychMeterDoyoon name="표현 의지" value={d.expression_score} />
          <PsychMeterDoyoon name="지속 가능성" value={d.durability_score} />
        </div>

        <div
          className="my-3 grid gap-2"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}
        >
          {d.behavior_cards.map((c, i) => (
            <BehaviorCardComp key={i} label={c.label} keyword={c.keyword} desc={c.desc} />
          ))}
        </div>

        <DoyoonAiBlock body={d.ai_pattern} />
      </DoyoonSection>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════
// 인라인 컴포넌트
// ════════════════════════════════════════════════════════════════════

function PctBadgePinkDoyoon({ pct, prefix }: { pct: string; prefix: string }) {
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
        {prefix} {pct}
      </span>
    </div>
  );
}

function KeywordTagsDoyoon({ tags }: { tags: ReadonlyArray<string> }) {
  return (
    <div className="flex flex-wrap gap-1.5 my-3 justify-center">
      {tags.map((t, i) => (
        <span
          key={i}
          className="text-[11px] font-medium px-2 py-0.5 rounded-full"
          style={{
            background: "rgba(212,180,140,0.18)",
            color: DOYOON_TOKENS.text,
            border: "0.5px solid rgba(139,105,20,0.30)",
            letterSpacing: "0.02em",
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function InfoGridInyonDoyoon({
  rows,
  compatibility_pct,
}: { rows: ReadonlyArray<{ key: string; val: string }>; compatibility_pct: string }) {
  return (
    <div
      className="rounded-[10px] my-3 overflow-hidden"
      style={{
        background: "rgba(139,105,20,0.04)",
        border: "0.5px solid rgba(139,105,20,0.20)",
      }}
    >
      {rows.map((r, i) => {
        const isCompat = r.key === "궁합 지수";
        return (
          <div
            key={i}
            className="flex items-start gap-3 px-3.5 py-2.5"
            style={{
              borderBottom:
                i < rows.length - 1
                  ? "0.5px solid rgba(139,105,20,0.10)"
                  : undefined,
            }}
          >
            <span
              className="text-[13px] font-medium flex-shrink-0"
              style={{
                color: DOYOON_TOKENS.goldSoft,
                letterSpacing: "0.02em",
                width: 80,
                lineHeight: 1.6,
              }}
            >
              {r.key}
            </span>
            <span
              className="text-[13px] flex-1 font-bold text-right"
              style={{
                color: isCompat ? DOYOON_TOKENS.pink : DOYOON_TOKENS.text,
                wordBreak: "keep-all",
                lineHeight: 1.6,
              }}
            >
              {r.val}
            </span>
          </div>
        );
      })}
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

function SdSpotlightDoyoon({ asset }: { asset: string }) {
  return (
    <div className="flex justify-center my-3">
      <div
        aria-label={`한도윤 SD — ${asset}`}
        style={{
          width: 200,
          height: 264,
          backgroundImage: `url(/doyoon/sd_dy/${asset}.png)`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}

function PsychMeterDoyoon({ name, value }: { name: string; value: number }) {
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

function BehaviorCardComp({
  label,
  keyword,
  desc,
}: { label: string; keyword: string; desc: string }) {
  return (
    <div
      className="rounded-[10px] px-3 py-3"
      style={{
        background: "rgba(139,105,20,0.05)",
        border: "0.5px solid rgba(139,105,20,0.22)",
      }}
    >
      <div
        className="text-[11px] font-semibold mb-1.5 uppercase"
        style={{ color: DOYOON_TOKENS.goldSoft, letterSpacing: "0.05em" }}
      >
        {label}
      </div>
      <div
        className="text-[14px] font-bold mb-1.5"
        style={{ color: DOYOON_TOKENS.text, wordBreak: "keep-all", lineHeight: 1.4 }}
      >
        {keyword}
      </div>
      <div
        className="text-[12px]"
        style={{ color: DOYOON_TOKENS.textMeta, wordBreak: "keep-all", lineHeight: 1.6 }}
      >
        {desc}
      </div>
    </div>
  );
}
