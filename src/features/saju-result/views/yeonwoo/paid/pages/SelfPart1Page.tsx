import Image from "next/image";
import PageHead from "../components/PageHead";
import AiBlock from "../components/AiBlock";
import {
  Sec,
  SectionLabel,
  SectionTitle,
  SectionBody,
  CardYw,
  VarTag,
  YeonwooBubble,
} from "../components/Section";

interface SelfPart1Data {
  ilgan: string;
  ilju: string;
  love_type: string;
  trigger_1: string;
  trigger_2: string;
  trigger_3: string;
  trigger_desc_1: string;
  trigger_desc_2: string;
  trigger_desc_3: string;
  candle_rows: ReadonlyArray<{
    label: string;
    flames: ReadonlyArray<"weak" | "medium" | "strong">;
    desc: string;
    is_peak: boolean;
  }>;
  emotion_bubble: string;
  ai_opening: string;     // 챕터 오프닝 350~400자
  ai_trigger: string;     // 트리거 메커니즘 200~250자
  ai_emotion: string;     // 감정 폭발 패턴 250~300자
}

const MOCK_P1: SelfPart1Data = {
  // 백엔드 templates/yeonwoo_p1_chapter_opening.py compose_p1_chapter_opening(ilgan="임수", ilju="임술") 결과 동기화.
  ilgan: "임수(壬水)",
  ilju: "임술(壬戌)",
  love_type: "깊고 잔잔한 결",
  trigger_1: "첫 눈빛",
  trigger_2: "반복된 마주침",
  trigger_3: "한순간의 빗장",
  // 백엔드 templates/yeonwoo_p1_trigger.py TRIGGER_DESCRIPTIONS_BY_ILGAN[임수] 동기화.
  trigger_desc_1: "처음 마주친 그 순간의 눈빛 하나로 시작돼.",
  trigger_desc_2: "반복해서 보는 것만으로 마음이 묶여.",
  trigger_desc_3: "한 번 빗장이 열리면 전부 다 줘버려.",
  // 백엔드 templates/yeonwoo_p1_emotion.py CANDLE_PATTERN_BY_ILGAN[임수] 동기화.
  candle_rows: [
    { label: "초반", flames: ["weak"], desc: "잔잔해. 아직 불꽃이 작아.", is_peak: false },
    { label: "중반", flames: ["weak", "medium"], desc: "타오르기 시작해. 걷잡기 어려워.", is_peak: false },
    { label: "후반", flames: ["weak", "medium", "strong"], desc: "걷잡을 수 없어. 한꺼번에 터져.", is_peak: true },
  ],
  // BUBBLE_BY_ILGAN[임수] 동기화.
  emotion_bubble: "속에서 다 끓는데 밖으로 안 내보내잖아. 상대는 네가 관심 없는 줄 알아.",
  ai_opening:
    "촛불 앞에 앉으니 네 명줄이 보여. 깊은 물처럼 흐르는데 표면은 잔잔해. 안에서 돌고 있어. 밖에선 안 보일 뿐이야.\n\n" +
    "임수(壬水) 일간이 그래. 속이 너무 깊어서 사람들이 네 진짜 마음을 못 읽어. 너는 이미 다 줬는데 상대는 아직도 모르고 있어.\n\n" +
    "임술(壬戌) 일주는 거기에 한 겹 더 얹은 결이야. 깊은 물 위에 또 안개가 낀 모양이지. 그래서 너는 누가 다가와도 한 번에 못 알아봐.\n\n" +
    "깊고 잔잔한 결이라는 게 그래서 나와. 한 번쯤은 네가 먼저 말해. 침묵으로 사랑을 증명하려 들지 마. 그건 네 방식일 뿐 상대의 언어가 아니야.",
  // 백엔드 templates/yeonwoo_p1_trigger.py compose_p1_trigger(ilgan="임수") 결과 동기화.
  ai_trigger:
    "불 앞에 실이 흔들려. 네 마음의 매듭은 세 개야. 첫 눈빛, 반복된 마주침, 그리고 한순간의 빗장. 이 셋이 한꺼번에 걸리면 네가 막을 수 없어.\n\n" +
    "임수(壬水) 일간은 한번 빠지면 못 빠져나와. 그러니까 처음에 잘 봐. 이 세 개 중 하나라도 어색하면 그건 네 인연이 아니야. 들어가지 마. 한번 들어가면 너는 또 다 줄 거야.",
  // 백엔드 templates/yeonwoo_p1_emotion.py compose_p1_emotion(ilgan="임수") 결과 동기화.
  ai_emotion:
    "초에 불을 붙여 놓고 가만히 있으면 처음엔 작아. 손바닥만 한 불꽃이야. 근데 어느 순간부터 멈출 수가 없어. 네 사랑이 그래.\n\n" +
    "임수(壬水) 일간은 표현이 늦어. 속에선 이미 활활 타고 있는데 밖에 안 보여. 그러다 위기가 오면 한꺼번에 터져. 네 자신도 놀랄 만큼.\n\n" +
    "그 전에 작은 불꽃이라도 보여줘. 한 줄, 한 마디면 돼. 안 그러면 상대는 영영 못 알아. 너는 또 혼자 끓다가 혼자 무너질 거야.",
};

export default function SelfPart1Page({ data }: { data?: SelfPart1Data }) {
  const p = data ?? MOCK_P1;
  return (
    <section
      data-page-idx="1"
      className="text-[#d8d6d0]"
      style={{ fontFamily: "var(--font-pretendard)" }}
    >
      <PageHead
        chHanja="一"
        chCode="CH-1"
        title="너라는 사람 (1/2)"
        sub="연애 유형 · 감정 구조 · 매력"
        iconAsset="/yeonwoo/icon/icon_silhouette.svg"
      />

      <Sec>
        <SectionLabel>1-1 나의 연애 유형</SectionLabel>
        <SectionTitle>
          <VarTag>{p.love_type}</VarTag>
        </SectionTitle>
        <CardYw
          label="일간 기준"
          value={
            <>
              <VarTag>{p.ilgan}</VarTag> · <VarTag>{p.ilju}</VarTag>
            </>
          }
          sub="물의 기운이 깊고 무거워. 속에서 다 끓는데 밖으로 잘 안 나와."
        />
        <AiBlock text={p.ai_opening} />

        <div className="flex items-start gap-3 my-3">
          <div className="relative w-[96px] h-[128px] flex-shrink-0">
            <Image
              src="/yeonwoo/sd_yw/yw_02.png"
              alt="강연우 — 진단"
              fill
              sizes="96px"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="flex-1">
            <YeonwooBubble text="네가 어떤 사람인지 내 눈엔 다 보여. 그러니까 거짓말은 하지 마." />
          </div>
        </div>
      </Sec>

      <Sec>
        <SectionLabel>1-2 사랑에 빠지는 방식</SectionLabel>
        <SectionTitle>트리거 셋. 이게 작동하면 너는 끝이야.</SectionTitle>
        <CardYw
          label="트리거 1"
          value={<VarTag>{p.trigger_1}</VarTag>}
          sub={p.trigger_desc_1}
        />
        <CardYw
          label="트리거 2"
          value={<VarTag>{p.trigger_2}</VarTag>}
          sub={p.trigger_desc_2}
        />
        <CardYw
          label="트리거 3"
          value={<VarTag>{p.trigger_3}</VarTag>}
          sub={p.trigger_desc_3}
        />
        <AiBlock text={p.ai_trigger} />
        <YeonwooBubble text="너는 한 번 빠지면 못 빠져나와. 그러니까 처음을 잘 봐야 해." />
      </Sec>

      <Sec>
        <SectionLabel>1-3 연애 중 감정 패턴</SectionLabel>
        <SectionTitle>초반엔 잔잔, 위기엔 폭발.</SectionTitle>
        <CandleChart rows={p.candle_rows} />
        <AiBlock text={p.ai_emotion} />
        <YeonwooBubble text={p.emotion_bubble} />
      </Sec>
    </section>
  );
}

interface CandleChartProps {
  rows: ReadonlyArray<{
    label: string;
    flames: ReadonlyArray<"weak" | "medium" | "strong">;
    desc: string;
    is_peak: boolean;
  }>;
}

function CandleChart({ rows }: CandleChartProps) {
  return (
    <div className="my-2.5 space-y-2">
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex items-center gap-3 px-4 py-3 rounded-[10px]"
          style={{
            background: r.is_peak ? "#1a1218" : "#141413",
            border: r.is_peak
              ? "0.5px solid rgba(212,83,126,0.35)"
              : "0.5px solid rgba(200,168,112,0.15)",
            boxShadow: r.is_peak ? "0 0 12px rgba(212,83,126,0.12)" : "none",
          }}
        >
          <span className="min-w-[44px] text-[14px] text-[#888] tracking-wide">
            {r.label}
          </span>
          <span className="flex items-end gap-1 min-w-[110px] h-12">
            {r.flames.map((s, i) => (
              <span
                key={i}
                aria-hidden
                className="inline-block w-7 h-12 bg-no-repeat bg-contain bg-bottom"
                style={{ backgroundImage: `url(/yeonwoo/candle/candle_${s}.svg)` }}
              />
            ))}
          </span>
          <span
            className="text-[14px] leading-[1.5] flex-1"
            style={{
              color: r.is_peak ? "#D4537E" : "#c8c5be",
              wordBreak: "keep-all",
            }}
          >
            {r.desc}
          </span>
        </div>
      ))}
    </div>
  );
}
