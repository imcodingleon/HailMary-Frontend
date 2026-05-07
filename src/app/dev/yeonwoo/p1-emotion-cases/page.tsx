// dev 전용 P-1 1-3 감정 차트 톤 검증 — 일간 10 케이스 한 화면 비교.
// 백엔드 templates/yeonwoo_p1_emotion.py compose_p1_emotion() + CANDLE_PATTERN_BY_ILGAN 동기화.

import AiBlock from "@/features/saju-result/views/yeonwoo/paid/components/AiBlock";

type Strength = "weak" | "medium" | "strong";

interface CandleRow {
  label: string;
  flames: ReadonlyArray<Strength>;
  desc: string;
  is_peak: boolean;
}

interface Case {
  label: string;
  ilgan: string;
  rows: ReadonlyArray<CandleRow>;
  ai_emotion: string;
  bubble: string;
}

const CASES: Case[] = [
  {
    label: "A",
    ilgan: "갑목(甲木)",
    rows: [
      { label: "초반", flames: ["weak", "medium"], desc: "망설임 없이 표현해. 원하는 거 분명히 말해.", is_peak: false },
      { label: "중반", flames: ["weak", "medium", "strong"], desc: "점점 더 단단하게 가. 흔들림 없이.", is_peak: false },
      { label: "후반", flames: ["weak"], desc: "안 맞다 싶으면 단호하게 끊어. 미련 없어.", is_peak: true },
    ],
    ai_emotion:
      "초에 불을 붙이면 갑목은 처음부터 환해. 망설임 없이 직진해. 그게 매력이지만 위험해.\n\n" +
      "갑목(甲木) 일간은 분명한 사람이야. 좋다는 표현도 빠르고 아니라는 표현도 빠르지. 근데 그 직진이 상대를 짓누를 때가 와.\n\n" +
      "한 번쯤은 휘어줘. 곧음만으론 사람이 못 견뎌. 너의 감정도 가끔은 천천히 가.",
    bubble: "네 직진이 너무 빨라서 상대가 따라오기 전에 부담돼.",
  },
  {
    label: "B",
    ilgan: "을목(乙木)",
    rows: [
      { label: "초반", flames: ["weak"], desc: "살살 감기기 시작해. 자신도 모르게.", is_peak: false },
      { label: "중반", flames: ["weak", "medium"], desc: "점점 깊이 들어가. 빠져나오기 어려워져.", is_peak: false },
      { label: "후반", flames: ["weak", "medium", "medium"], desc: "떠나고도 오래 끌어. 회복이 느려.", is_peak: true },
    ],
    ai_emotion:
      "초에 불을 붙여도 을목은 천천히 타. 감김이 느린데, 한 번 감기면 풀기 어려워.\n\n" +
      "을목(乙木) 일간은 깊이 빠지는 결이야. 한 사람한테 다 줘버려. 너 자신이 먼저 닳을 만큼.\n\n" +
      "감기다 너부터 챙겨. 끝까지 갈 수 있는 결이니까 자신을 믿어.",
    bubble: "너만 깊어지고 상대는 아직 미적지근해.",
  },
  {
    label: "C",
    ilgan: "병화(丙火)",
    rows: [
      { label: "초반", flames: ["strong", "strong", "strong"], desc: "한 번에 환하게 비춰. 거리낌 없어.", is_peak: true },
      { label: "중반", flames: ["weak", "medium"], desc: "조금씩 식어가. 익숙해진 듯.", is_peak: false },
      { label: "후반", flames: ["weak"], desc: "한꺼번에 사라져. 차가워져.", is_peak: false },
    ],
    ai_emotion:
      "초에 불을 붙이면 병화는 한낮의 해처럼 환해. 처음이 가장 뜨거워. 근데 식으면 한꺼번에 사라져.\n\n" +
      "병화(丙火) 일간은 표현이 빠르고 숨김없어. 빛나는 결인데, 식는 순간 차가워져. 그게 약점이야.\n\n" +
      "그늘도 같이 줘야 사람이 머물러. 빛만 너무 세면 상대가 눈을 돌려.",
    bubble: "네 빛이 한꺼번에 식으면, 상대는 이유도 모르고 차가워졌다고 느껴.",
  },
  {
    label: "D",
    ilgan: "정화(丁火)",
    rows: [
      { label: "초반", flames: ["weak"], desc: "작은 불꽃이지만 깊어. 한 사람만 봐.", is_peak: false },
      { label: "중반", flames: ["weak", "weak"], desc: "그 사람만 데우는 결. 흔들림 없어.", is_peak: false },
      { label: "후반", flames: ["weak", "weak", "weak"], desc: "한 사람한테 집중. 안 바꿔.", is_peak: false },
    ],
    ai_emotion:
      "초에 작은 불꽃을 켜면 정화는 한 사람만 데워. 안 흔들리고, 안 꺼져.\n\n" +
      "정화(丁火) 일간은 집중형이야. 한 사람한테 정성을 끝까지 쏟아. 바람 한 번에 흔들리는 예민함도 있어.\n\n" +
      "네 불꽃을 알아주는 사람한테만 가. 거센 바람은 너를 꺼버려.",
    bubble: "네 작은 불꽃을 알아주는 사람한테만 가. 흔들리는 바람한테 데이지 마.",
  },
  {
    label: "E",
    ilgan: "무토(戊土)",
    rows: [
      { label: "초반", flames: ["medium"], desc: "묵묵히 자리 잡아. 변동 없어.", is_peak: false },
      { label: "중반", flames: ["medium", "medium"], desc: "한결같이 곁에 있어. 행동으로 증명해.", is_peak: false },
      { label: "후반", flames: ["medium", "medium", "medium"], desc: "한 번 결정하면 안 흔들려. 묵직하게.", is_peak: false },
    ],
    ai_emotion:
      "초에 불을 붙여도 무토는 한결같아. 변동 없이, 묵직하게.\n\n" +
      "무토(戊土) 일간은 다 받아주는 결이야. 표현은 적은데 행동으로 증명해. 흔들림 없는 산처럼.\n\n" +
      "다 받아주다 네가 무너지지 마. 산도 가끔은 비를 흘려보내야 해.",
    bubble: "표현 적은 게 너의 결인데, 상대는 그걸 무관심으로 오해해.",
  },
  {
    label: "F",
    ilgan: "기토(己土)",
    rows: [
      { label: "초반", flames: ["weak"], desc: "살살 챙겨주기 시작해.", is_peak: false },
      { label: "중반", flames: ["weak", "medium"], desc: "점점 더 깊이 키워줘. 진심이 쌓여.", is_peak: false },
      { label: "후반", flames: ["strong", "strong", "strong"], desc: "너 자신을 잊을 만큼 줘. 그러다 무너져.", is_peak: true },
    ],
    ai_emotion:
      "초에 불을 붙이면 기토는 옆 사람을 키우려 해. 진심을 쌓아가는 결이야.\n\n" +
      "기토(己土) 일간은 받기보다 주는 데 익숙해. 그러다 자기를 잊는 게 약점이야.\n\n" +
      "네가 키운 마음에 네 자리도 꼭 남겨둬. 너부터 챙겨야 오래 가.",
    bubble: "너 자신부터 챙겨야 오래 가. 다 줘버리고 무너지지 마.",
  },
  {
    label: "G",
    ilgan: "경금(庚金)",
    rows: [
      { label: "초반", flames: ["strong"], desc: "강하게 다가가. 분명하게.", is_peak: false },
      { label: "중반", flames: ["strong", "medium"], desc: "단단하게 가. 흔들림 없어.", is_peak: false },
      { label: "후반", flames: ["strong"], desc: "단호하게 끊어내. 미련 없어.", is_peak: true },
    ],
    ai_emotion:
      "초에 불을 붙이면 경금은 단단해. 옳고 그름이 분명한 결이야.\n\n" +
      "경금(庚金) 일간은 결단력 있어. 아닌 관계는 잘라내. 그러다 사람을 다치게 하기도 해.\n\n" +
      "갈고 다듬어서 써. 날카로움이 사람을 다치게 해.",
    bubble: "끊어낼 땐 상대 마음도 같이 끊어진다는 걸 잊지 마.",
  },
  {
    label: "H",
    ilgan: "신금(辛金)",
    rows: [
      { label: "초반", flames: ["weak"], desc: "거리를 두고 살펴. 단정하게.", is_peak: false },
      { label: "중반", flames: ["weak", "medium"], desc: "점점 들이게 돼. 그래도 단단함 유지.", is_peak: false },
      { label: "후반", flames: ["weak"], desc: "자존심 상하면 한 번에 끊어. 깊이 새겨.", is_peak: true },
    ],
    ai_emotion:
      "초에 불을 붙이면 신금은 거리를 둬. 단정하게 살피는 결이야.\n\n" +
      "신금(辛金) 일간은 은근한 자존감이 매력이야. 감정을 들키지 않으려는 단정함도 있어.\n\n" +
      "네 빛을 알아보는 사람한테만 곁을 줘. 험하게 다루는 손은 끊어내.",
    bubble: "자존심에 한 번 상처 입으면 너는 다시 안 돌아봐. 그러니까 처음부터 잘 보여.",
  },
  {
    label: "I",
    ilgan: "임수(壬水)",
    rows: [
      { label: "초반", flames: ["weak"], desc: "잔잔해. 아직 불꽃이 작아.", is_peak: false },
      { label: "중반", flames: ["weak", "medium"], desc: "타오르기 시작해. 걷잡기 어려워.", is_peak: false },
      { label: "후반", flames: ["weak", "medium", "strong"], desc: "걷잡을 수 없어. 한꺼번에 터져.", is_peak: true },
    ],
    ai_emotion:
      "초에 불을 붙여 놓고 가만히 있으면 처음엔 작아. 손바닥만 한 불꽃이야. 근데 어느 순간부터 멈출 수가 없어. 네 사랑이 그래.\n\n" +
      "임수(壬水) 일간은 표현이 늦어. 속에선 이미 활활 타고 있는데 밖에 안 보여. 그러다 위기가 오면 한꺼번에 터져. 네 자신도 놀랄 만큼.\n\n" +
      "그 전에 작은 불꽃이라도 보여줘. 한 줄, 한 마디면 돼. 안 그러면 상대는 영영 못 알아. 너는 또 혼자 끓다가 혼자 무너질 거야.",
    bubble: "속에서 다 끓는데 밖으로 안 내보내잖아. 상대는 네가 관심 없는 줄 알아.",
  },
  {
    label: "J",
    ilgan: "계수(癸水)",
    rows: [
      { label: "초반", flames: ["weak"], desc: "거의 없는 듯 시작해. 천천히.", is_peak: false },
      { label: "중반", flames: ["weak", "weak"], desc: "천천히 스며들어. 멈출 수 없어.", is_peak: false },
      { label: "후반", flames: ["weak", "medium", "medium"], desc: "깊이 들어가서 멈출 수 없어. 모든 틈을 채워.", is_peak: true },
    ],
    ai_emotion:
      "초에 불을 붙이면 계수는 거의 없는 듯 시작해. 그러다 천천히 스며들어.\n\n" +
      "계수(癸水) 일간은 분위기와 감정을 먼저 읽는 결이야. 느리게 자리잡아서 멈출 수 없게 돼.\n\n" +
      "흐른다고 다 받아들이지 마. 멈춰야 할 자리는 멈춰. 너부터 지켜야 해.",
    bubble: "천천히 스며들면서 너부터 잃지 마. 흐른다고 다 받아들이지 마.",
  },
];

function MiniCandleChart({ rows }: { rows: ReadonlyArray<CandleRow> }) {
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

export default function P1EmotionCasesPage() {
  return (
    <main
      className="bg-[#0a0a09] min-h-screen"
      data-paid-scene="yeonwoo"
      style={{ fontFamily: "var(--font-pretendard)" }}
    >
      <div className="max-w-[430px] mx-auto py-6 px-4">
        <header className="mb-6 text-center">
          <h1
            className="text-[20px] font-bold text-[#E8C9A0]"
            style={{ fontFamily: "var(--font-nanum-myeongjo)" }}
          >
            P-1 1-3 감정 차트 — 10 케이스 톤 검증
          </h1>
          <p className="text-[12px] text-[#888] mt-2 leading-relaxed">
            backend templates/yeonwoo_p1_emotion.py 풀 템플릿
            <br />
            일간 10 × 촛불 패턴 + row별 desc + AI 박스 / AI 호출 0
            <br />
            병화는 역행 패턴(초반 peak), 정화/무토는 일관(peak X)
          </p>
        </header>

        <div className="space-y-10">
          {CASES.map((c) => (
            <section key={c.label}>
              <div className="mb-2 flex items-center gap-2">
                <span
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[13px] font-bold text-[#0a0a09]"
                  style={{ background: "#E8C9A0" }}
                >
                  {c.label}
                </span>
                <span className="text-[13px] text-[#d8d6d0]">{c.ilgan}</span>
              </div>
              <MiniCandleChart rows={c.rows} />
              <AiBlock text={c.ai_emotion} />
              <div
                className="mt-3 px-4 py-3 rounded-[10px] text-[13px] leading-[1.6] italic"
                style={{
                  background: "#141413",
                  border: "0.5px solid rgba(200,168,112,0.18)",
                  color: "#c8c5be",
                }}
              >
                <span className="text-[11px] tracking-wider mr-2" style={{ color: "#E8C9A0" }}>
                  강연우
                </span>
                <span>“{c.bubble}”</span>
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-10 mb-4 text-center text-[11px] text-[#666]">
          일간별 감정 패턴 다름 — 직진/감김/빛 식음/은근/한결같음/키움/결단/자존/깊이/스며듦.
          <br />
          어색한 패턴/desc/ai_emotion 발견하면 알려주세요.
        </footer>
      </div>
    </main>
  );
}
