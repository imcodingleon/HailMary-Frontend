// dev 전용 P-1 1-2 트리거 톤 검증 — 5 케이스 한 화면 비교.
// 백엔드 templates/yeonwoo_p1_trigger.py compose_p1_trigger() 출력 동기화.

import AiBlock from "@/features/saju-result/views/yeonwoo/paid/components/AiBlock";

interface Case {
  label: string;
  ilgan: string;
  triggers: [string, string, string];
  descriptions: [string, string, string];
  ai_trigger: string;
}

const CASES: Case[] = [
  {
    label: "A",
    ilgan: "갑목(甲木)",
    triggers: ["분명한 자기 의견", "도전하는 눈빛", "한결같이 곁에 머무는 결"],
    descriptions: [
      "분명한 의견 한 마디로 마음이 흔들려.",
      "도전 받는 그 순간 눈을 못 떼.",
      "곁을 지키는 사람한테 결국 마음이 가.",
    ],
    ai_trigger:
      "불 앞에 실이 흔들려. 네 마음의 매듭은 세 개야. 분명한 자기 의견, 도전하는 눈빛, 그리고 한결같이 곁에 머무는 결. 이 셋이 한꺼번에 걸리면 네가 막을 수 없어.\n\n" +
      "갑목(甲木) 일간은 한번 마음 정하면 안 돌아봐. 그러니까 처음에 잘 봐. 이 세 개 중 하나라도 어색하면 그건 네 인연이 아니야. 들어가지 마. 한번 들어가면 너는 또 다 줄 거야.",
  },
  {
    label: "B",
    ilgan: "임수(壬水)",
    triggers: ["첫 눈빛", "반복된 마주침", "한순간의 빗장"],
    descriptions: [
      "처음 마주친 그 순간의 눈빛 하나로 시작돼.",
      "반복해서 보는 것만으로 마음이 묶여.",
      "한 번 빗장이 열리면 전부 다 줘버려.",
    ],
    ai_trigger:
      "불 앞에 실이 흔들려. 네 마음의 매듭은 세 개야. 첫 눈빛, 반복된 마주침, 그리고 한순간의 빗장. 이 셋이 한꺼번에 걸리면 네가 막을 수 없어.\n\n" +
      "임수(壬水) 일간은 한번 빠지면 못 빠져나와. 그러니까 처음에 잘 봐. 이 세 개 중 하나라도 어색하면 그건 네 인연이 아니야. 들어가지 마. 한번 들어가면 너는 또 다 줄 거야.",
  },
  {
    label: "C",
    ilgan: "정화(丁火)",
    triggers: [
      "차분히 들어주는 결",
      "작은 디테일을 알아주는 손길",
      "한 사람만 보는 깊은 눈",
    ],
    descriptions: [
      "조용히 들어주는 결에 깊이 데워져.",
      "내 작은 결을 알아채는 순간 빠져.",
      "한 사람만 보는 눈에 마음이 묶여.",
    ],
    ai_trigger:
      "불 앞에 실이 흔들려. 네 마음의 매듭은 세 개야. 차분히 들어주는 결, 작은 디테일을 알아주는 손길, 그리고 한 사람만 보는 깊은 눈. 이 셋이 한꺼번에 걸리면 네가 막을 수 없어.\n\n" +
      "정화(丁火) 일간은 한번 켜지면 안 꺼져. 그러니까 처음에 잘 봐. 이 세 개 중 하나라도 어색하면 그건 네 인연이 아니야. 들어가지 마. 한번 들어가면 너는 또 다 줄 거야.",
  },
  {
    label: "D",
    ilgan: "경금(庚金)",
    triggers: [
      "자기 일에 단단한 결",
      "솔직하게 말하는 입",
      "결단력 있는 한 걸음",
    ],
    descriptions: [
      "자기 일에 단단한 사람을 본 순간 끌려.",
      "솔직한 한 마디가 마음에 박혀.",
      "결단력 있는 한 걸음에 따라가게 돼.",
    ],
    ai_trigger:
      "불 앞에 실이 흔들려. 네 마음의 매듭은 세 개야. 자기 일에 단단한 결, 솔직하게 말하는 입, 그리고 결단력 있는 한 걸음. 이 셋이 한꺼번에 걸리면 네가 막을 수 없어.\n\n" +
      "경금(庚金) 일간은 한번 정하면 단단해져. 그러니까 처음에 잘 봐. 이 세 개 중 하나라도 어색하면 그건 네 인연이 아니야. 들어가지 마. 한번 들어가면 너는 또 다 줄 거야.",
  },
  {
    label: "E",
    ilgan: "계수(癸水)",
    triggers: [
      "분위기를 읽어주는 결",
      "천천히 다가오는 발걸음",
      "디테일을 알아주는 손길",
    ],
    descriptions: [
      "내 분위기를 읽어주는 결에 천천히 스며들어.",
      "한 걸음씩 다가오는 발걸음에 빠져.",
      "내 디테일을 알아채는 손길에 마음이 풀려.",
    ],
    ai_trigger:
      "불 앞에 실이 흔들려. 네 마음의 매듭은 세 개야. 분위기를 읽어주는 결, 천천히 다가오는 발걸음, 그리고 디테일을 알아주는 손길. 이 셋이 한꺼번에 걸리면 네가 막을 수 없어.\n\n" +
      "계수(癸水) 일간은 한번 적시면 멈출 수 없어. 그러니까 처음에 잘 봐. 이 세 개 중 하나라도 어색하면 그건 네 인연이 아니야. 들어가지 마. 한번 들어가면 너는 또 다 줄 거야.",
  },
];

export default function P1TriggerCasesPage() {
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
            P-1 1-2 트리거 — 5 케이스 톤 검증
          </h1>
          <p className="text-[12px] text-[#888] mt-2 leading-relaxed">
            backend templates/yeonwoo_p1_trigger.py 풀 템플릿
            <br />
            일간 10 × 트리거 3 = 30 키워드 / 일간별 클로징 / AI 호출 0
          </p>
        </header>

        <div className="space-y-8">
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
              {/* 트리거 카드 3개 (full 화면 패턴) */}
              <div className="mb-3 space-y-2">
                {c.triggers.map((t, i) => (
                  <div
                    key={i}
                    className="bg-[#141413] rounded-md px-3 py-2.5"
                    style={{ border: "0.5px solid rgba(200,168,112,0.15)" }}
                  >
                    <div
                      className="text-[10px] mb-1"
                      style={{ color: "#856C51" }}
                    >
                      트리거 {i + 1}
                    </div>
                    <div className="font-bold text-[14px] text-[#E8C9A0] mb-1">
                      {t}
                    </div>
                    <div className="text-[12px] text-[#aaa] leading-[1.5]">
                      {c.descriptions[i]}
                    </div>
                  </div>
                ))}
              </div>
              <AiBlock text={c.ai_trigger} />
            </section>
          ))}
        </div>

        <footer className="mt-10 mb-4 text-center text-[11px] text-[#666]">
          트리거 = 그 일간이 사랑에 빠지는 외부 자극 (일간 특성 X).
          <br />
          톤 어색한 트리거/일간 발견하면 알려주세요.
        </footer>
      </div>
    </main>
  );
}
