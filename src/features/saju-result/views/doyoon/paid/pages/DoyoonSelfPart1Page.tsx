import type { PaidChapterP1Doyoon } from "../../../../domain/paidReport";
import { DoyoonAiBlock } from "../components/DoyoonAiBlock";
import { DoyoonBubble } from "../components/DoyoonBubble";
import { DoyoonLineChartEmotion } from "../components/DoyoonLineChartEmotion";
import { DoyoonPageHead } from "../components/DoyoonPageHead";
import { DoyoonPctBadge } from "../components/DoyoonPctBadge";
import { DoyoonSdWithBubble } from "../components/DoyoonSdWithBubble";
import {
  DoyoonSLabel,
  DoyoonSTitle,
  DoyoonSection,
} from "../components/DoyoonSection";
import { DoyoonTriggerFlow } from "../components/DoyoonTriggerFlow";
import { DoyoonVarTag } from "../components/DoyoonVarTag";
import { DOYOON_TOKENS } from "../components/doyoonTokens";

interface DoyoonSelfPart1PageProps {
  data?: PaidChapterP1Doyoon;
}

// dev/미리보기 fallback — 백엔드 응답 없을 때 임수 더미 (HTML 매칭)
const MOCK_P1: PaidChapterP1Doyoon = {
  user_name: "홍길동",
  ilgan: "임수(壬水)",
  ilju: "임술(壬戌)",
  love_type: "정보 처리형 신중 진입자",
  pct_value: 8,
  distribution_pct: 12.4,
  ai_opening:
    "솔직히 말씀드릴게요. 홍길동님은 상위 8% 케이스예요. 이 수치 그냥 던지는 게 아니에요. 동일 일간 안에서 같은 패턴이 이렇게 선명하게 잡히는 경우가 흔하지 않거든요.\n\n임수 일간 분포가 전체 표본의 12.4%인데, 그 안에서 '정보 처리형 신중 진입자'으로 분류되는 케이스는 더 좁아져요. 임술(壬戌) 일주까지 결합하면 세분화가 한 단계 더 들어갑니다.\n\n특징을 정리하면 — 깊이는 있는데 표현이 따라가질 않는 구조예요. 속에서 처리되는 정보량은 많은데, 외부로 출력되는 비율이 평균 대비 0.4배밖에 안 돼요.\n\n딱 하나만 바꿔보세요. 표현 빈도를 주 1회만 의식적으로 늘려보시면, 주변에서 홍길동님을 읽는 방식이 꽤 달라질 거예요.",
  trigger_1: "공유된 지적 발견",
  trigger_2: "답 빠른 메시지 응답",
  trigger_3: "의식적인 거리 좁힘",
  trigger_flow_pcts: [30, 62, 88],
  ai_trigger:
    "흥미로운 부분이에요. 트리거 세 개가 순서대로 발화하면 임계점 도달 확률이 88%예요. 사실상 거의 자동이라는 뜻이죠.\n\n특히 처음 30일 안에 '공유된 지적 발견'과 '답 빠른 메시지 응답'이 같이 잡히면, 홍길동님이 스스로 브레이크를 밟기가 어려워져요. 임수 일간 케이스에서 이 구간 자기조절 성공률이 17%거든요. 정보 처리량이 많아서 빠져나오는 시간이 평균보다 1.4배 걸려요. 알고 들어가시는 게 훨씬 나아요.",
  emotion_curve: [
    { label: "초반", pct: 45, is_crisis: false },
    { label: "중반", pct: 85, is_crisis: false },
    { label: "위기", pct: 95, is_crisis: true },
    { label: "회복", pct: 60, is_crisis: false },
  ],
  crisis_multiplier: "1.8배",
  ai_emotion:
    "그래프 보시면 느끼시겠지만, 위기 구간에서 감정이 95%까지 튀어요. 평균의 1.8배예요. 회복 구간도 60% 수준에서 한참 머물러요.\n\n임수 일간이 원래 이래요. 초반엔 되게 차분한 것처럼 보이다가 어느 순간 한꺼번에 쏟아지는 패턴이죠. 회복 구간도 평균보다 깊고 길어요.\n\n미리 조금씩 꺼내두면 폭발 강도가 줄어요. 작은 표현을 주 2회 이상 의식적으로 노출하시면 위기 구간 강도가 평균 32% 떨어져요. 어렵게 생각하지 마시고, 그냥 작은 표현을 자주 하시면 돼요.",
  bubble_quote: "이거 알고 계신 것만으로도 달라져요. 진짜로요.",
};

export default function DoyoonSelfPart1Page({ data }: DoyoonSelfPart1PageProps) {
  const d = data ?? MOCK_P1;

  return (
    <section
      data-page-idx="1"
      style={{ background: DOYOON_TOKENS.bg, color: DOYOON_TOKENS.text }}
    >
      <DoyoonPageHead
        ch="1"
        hanja="一"
        title={
          <>
            <DoyoonVarTag>{d.user_name}</DoyoonVarTag>님이라는 사람 (1/2)
          </>
        }
        sub="연애 성향 · 감정 구조 · 매력 분석"
      />

      {/* 1-1 나의 연애 유형 */}
      <DoyoonSection>
        <DoyoonSLabel>1-1 나의 연애 유형</DoyoonSLabel>
        <div className="my-2">
          <DoyoonPctBadge pct={d.pct_value} />
        </div>
        <DoyoonSTitle>
          <DoyoonVarTag>{d.love_type}</DoyoonVarTag>
        </DoyoonSTitle>

        {/* 일간 기준 카드 */}
        <div
          className="rounded-lg my-2"
          style={{
            background: "#fff8ec",
            border: "0.5px solid rgba(139,105,20,0.22)",
            padding: "11px 12px",
          }}
        >
          <div
            className="text-[12px] font-bold uppercase"
            style={{ color: DOYOON_TOKENS.warmGold, letterSpacing: "0.08em" }}
          >
            일간 기준
          </div>
          <div
            className="text-[14px] font-bold mt-1"
            style={{ color: DOYOON_TOKENS.text }}
          >
            <DoyoonVarTag>{d.ilgan}</DoyoonVarTag> · <DoyoonVarTag>{d.ilju}</DoyoonVarTag>
          </div>
          <div
            className="text-[13px] mt-1 leading-[1.6]"
            style={{ color: DOYOON_TOKENS.textMeta }}
          >
            전체 표본 대비 동일 일간 분포 {d.distribution_pct}%, 그중 동일 유형은 상위 {d.pct_value}%로 분류됩니다.
          </div>
        </div>

        <DoyoonAiBlock body={d.ai_opening} />

        <DoyoonSdWithBubble
          sdAsset="dy_02"
          ariaLabel="한도윤 SD — 유형 분석"
          quote={`분류 끝났어요. ${d.user_name}님은 ${d.love_type} 유형이에요 — 이게 나쁜 게 아니라, 알고 쓰면 꽤 강한 유형이라는 얘기예요.`}
          size="md"
        />
      </DoyoonSection>

      {/* 1-2 감정 형성 프로세스 */}
      <DoyoonSection>
        <DoyoonSLabel>1-2 감정 형성 프로세스</DoyoonSLabel>
        <DoyoonSTitle>3개 트리거가 순차 발화하면 임계점을 넘어갑니다.</DoyoonSTitle>
        <DoyoonTriggerFlow
          triggers={[d.trigger_1, d.trigger_2, d.trigger_3]}
          flowPcts={d.trigger_flow_pcts}
        />
        <DoyoonAiBlock body={d.ai_trigger} />
      </DoyoonSection>

      {/* 1-3 연애 중 감정 강도 분석 */}
      <DoyoonSection>
        <DoyoonSLabel>1-3 연애 중 감정 강도 분석</DoyoonSLabel>
        <DoyoonSTitle>
          위기 구간에서 감정 강도가 평균 대비 {d.crisis_multiplier}까지 상승합니다.
        </DoyoonSTitle>
        <DoyoonLineChartEmotion
          points={d.emotion_curve}
          caption={`위기 구간 감정 강도 평균 대비 ${d.crisis_multiplier}`}
        />
        <DoyoonAiBlock body={d.ai_emotion} />
        <DoyoonBubble quote={d.bubble_quote} />
      </DoyoonSection>
    </section>
  );
}
