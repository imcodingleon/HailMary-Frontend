// dev 전용 P-3 2-2 반복 패턴 + 2-2-1 역이용 — 일간 10 케이스 비교.
//
// 사용자 결정 2026-05-11:
// [2-2 반복 패턴]
//   - stitle "사람은 바뀌어도 매듭 모양은 똑같아." → 고정
//   - sbody (3단계 패턴: 처음/중반/끝) → 일간 10 변형
//   - AI 박스 (250~300자, 표준 진단) → 일간 10 변형
//   - 강연우 버블 "사람은 바뀌었는데 매듭 모양이 똑같아." → 고정
//
// [2-2-1 역이용]
//   - stitle "독을 약으로 바꾸는 법." → 고정
//   - card-good × 2 (역이용 포인트 + 실전 방법) → 일간 10 변형
//   - 강연우 버블 "이게 독인지 약인지..." → 고정

import AiBlock from "@/features/saju-result/views/yeonwoo/paid/components/AiBlock";
import {
  YeonwooBubble,
  SectionLabel,
  SectionTitle,
  SectionBody,
} from "@/features/saju-result/views/yeonwoo/paid/components/Section";

interface Case {
  label: string;
  ilgan: string;          // "갑목(甲木)"
  pattern_body: string;   // sbody — 3단계 패턴 (처음/중반/끝)
  ai_pattern: string;     // AI 박스 250~300자
  reverse_card_1: { value: string; sub: string };
  reverse_card_2: { value: string; sub: string };
}

const CASES: Case[] = [
  {
    label: "A",
    ilgan: "갑목(甲木)",
    pattern_body:
      "처음엔 늦게 시작하고, 중반엔 고집하고, 끝엔 굽히지 않아.",
    ai_pattern:
      "매듭 모양이 매번 똑같이 묶여. 사람은 바뀌었는데 패턴은 그대로야. 너는 매번 같은 자리에서 넘어져.\n\n" +
      "처음엔 일에 빠져서 시작이 늦어. 한 번 빠지면 너무 단단하게 들어가. 중반엔 네 방향만 보여서 상대 의견을 못 받아. 끝엔 '내가 맞아'를 끝까지 굽히지 않고 헤어져.\n\n" +
      "갑목(甲木) 일간이 빠지기 쉬운 함정이야. 다음번엔 처음 한 달은 네 방향을 잠시 내려놓고 상대 결을 봐. 그게 너의 가장 약한 구간이야.",
    reverse_card_1: {
      value: "단단함을 안정감으로 바꿔",
      sub: "곧게 자란 결을 무기로 써. 흔들리는 사람한텐 네 단단함이 가장 큰 매력이야. 한 번 정하면 안 흔들린다는 신뢰, 그게 너만의 강점이야.",
    },
    reverse_card_2: {
      value: "방향 한 가지 양보하기",
      sub: "다 양보하지 마. 단 한 가지, 사소한 거 하나만 상대 방향에 맞춰. 그것만으로 상대는 '이 사람 나를 보고 있구나' 느껴.",
    },
  },
  {
    label: "B",
    ilgan: "을목(乙木)",
    pattern_body:
      "처음엔 빨리 빠지고, 중반엔 너무 의지하고, 끝엔 못 잡고 시들어.",
    ai_pattern:
      "매듭 모양이 매번 똑같이 묶여. 사람은 바뀌었는데 패턴은 그대로야. 너는 매번 같은 자리에서 넘어져.\n\n" +
      "처음엔 옆에 있어주는 사람한테 빨리 빠져. 외로움이 컸기 때문이야. 중반엔 너무 의지해. 매일 연락, 매일 만남. 상대는 처음엔 좋아하다 점점 지쳐. 끝엔 떠나는 상대를 못 잡고 너 혼자 시들어 있어.\n\n" +
      "을목(乙木) 일간이 빠지기 쉬운 함정이야. 다음번엔 처음 한 달은 너 혼자 있는 시간도 만들어. 그게 너의 가장 약한 구간이야.",
    reverse_card_1: {
      value: "다정함을 매력으로 바꿔",
      sub: "작게 챙겨주는 결을 무기로 써. 너의 다정함은 흔하지 않아. 단, 한 번에 다 쏟지 말고 천천히 풀어. 그래야 상대도 그 결을 알아봐.",
    },
    reverse_card_2: {
      value: "혼자 시간 일부러 만들기",
      sub: "매일 연락하고 매일 만나지 마. 일주일에 하루는 일부러 혼자 시간을 만들어. 그게 상대를 끌어당겨.",
    },
  },
  {
    label: "C",
    ilgan: "병화(丙火)",
    pattern_body:
      "처음엔 다 보여주고, 중반엔 빠르게 식고, 끝엔 한꺼번에 폭발해.",
    ai_pattern:
      "매듭 모양이 매번 똑같이 묶여. 사람은 바뀌었는데 패턴은 그대로야. 너는 매번 같은 자리에서 넘어져.\n\n" +
      "처음엔 한 번에 다 보여줘. 100을 한 번에 쏟아. 상대는 처음엔 끌려. 중반엔 너의 열기가 빠르게 식어. 상대는 혼란해져. '저번엔 그랬는데 지금은 왜?' 끝엔 감정이 한꺼번에 폭발해 떠나.\n\n" +
      "병화(丙火) 일간이 빠지기 쉬운 함정이야. 다음번엔 처음 한 달은 70만 줘. 30은 남겨. 그게 너의 가장 약한 구간이야.",
    reverse_card_1: {
      value: "빛을 매력으로 바꿔",
      sub: "환한 결을 무기로 써. 너의 빛은 사람들을 끌어당겨. 단, 한 번에 100을 다 비추지 마. 50씩 천천히 풀어줘야 상대가 따라와.",
    },
    reverse_card_2: {
      value: "감정 일기 5분",
      sub: "감정이 한 번에 터지는 걸 막으려면 매일 짧은 일기를 써. 그날 감정을 풀어내야 폭발이 안 일어나. 5분이면 충분해.",
    },
  },
  {
    label: "D",
    ilgan: "정화(丁火)",
    pattern_body:
      "처음엔 못 알아채고, 중반엔 상처가 쌓이고, 끝엔 조용히 떠나.",
    ai_pattern:
      "매듭 모양이 매번 똑같이 묶여. 사람은 바뀌었는데 패턴은 그대로야. 너는 매번 같은 자리에서 넘어져.\n\n" +
      "처음엔 조용히 챙겨. 표 안 내고 작게 챙긴다. 상대는 못 알아채. 중반엔 너의 작은 정성을 못 받아서 상처가 쌓여. '내가 이만큼 했는데' 안에서만 끓어. 끝엔 말도 안 하고 조용히 떠나.\n\n" +
      "정화(丁火) 일간이 빠지기 쉬운 함정이야. 다음번엔 처음 한 달은 챙긴 거 한 번씩 말로도 풀어. 그게 너의 가장 약한 구간이야.",
    reverse_card_1: {
      value: "은근함을 매력으로 바꿔",
      sub: "조용한 결을 무기로 써. 너의 은근한 정성은 시끄러운 시대에 가장 귀해. 단, 가끔은 말로도 표현해줘야 상대가 그 결을 알아봐.",
    },
    reverse_card_2: {
      value: "하루 한 번 말로 표현",
      sub: "다 말하지 않아도 돼. 하루에 한 가지만 챙긴 걸 말로 풀어. '이거 너 좋아할까 봐.' 그 한마디가 너의 결을 보여줘.",
    },
  },
  {
    label: "E",
    ilgan: "무토(戊土)",
    pattern_body:
      "처음엔 천천히 좋다가, 중반엔 답답해지고, 끝엔 자리만 지키다 떠나.",
    ai_pattern:
      "매듭 모양이 매번 똑같이 묶여. 사람은 바뀌었는데 패턴은 그대로야. 너는 매번 같은 자리에서 넘어져.\n\n" +
      "처음엔 천천히 다가가. 신중하고 안정적이라 상대가 안심해. 중반엔 너의 한결같음이 답답함으로 바뀌어. 같은 데이트, 같은 패턴. 상대는 변화를 원해. 끝엔 너의 자리만 지키다 상대가 떠나.\n\n" +
      "무토(戊土) 일간이 빠지기 쉬운 함정이야. 다음번엔 처음 한 달에 한 번씩은 새로운 시도를 해. 그게 너의 가장 약한 구간이야.",
    reverse_card_1: {
      value: "한결같음을 매력으로 바꿔",
      sub: "안정된 결을 무기로 써. 흔들리는 시대에 한결같은 사람은 가장 큰 매력이야. 단, 그 안정 안에 가끔 작은 변화도 넣어줘야 살아있어.",
    },
    reverse_card_2: {
      value: "월 1회 새 시도",
      sub: "매달 한 번씩 너의 패턴을 깨. 새 카페, 새 여행지, 새 영화 장르. 그 작은 변화가 상대를 머물게 해.",
    },
  },
  {
    label: "F",
    ilgan: "기토(己土)",
    pattern_body:
      "처음엔 다 챙기고, 중반엔 다 비워지고, 끝엔 한꺼번에 무너져.",
    ai_pattern:
      "매듭 모양이 매번 똑같이 묶여. 사람은 바뀌었는데 패턴은 그대로야. 너는 매번 같은 자리에서 넘어져.\n\n" +
      "처음엔 다 챙겨줘. 상대 일도 너 일처럼 신경 써. 중반엔 줄 게 다 떨어져. 빈 흙이 되어. 끝엔 상대가 '왜 변했어?' 묻고 너는 '나도 한 번은 받고 싶었어'라고 답하고 끝나.\n\n" +
      "기토(己土) 일간이 빠지기 쉬운 함정이야. 다음번엔 처음 한 달은 너한테도 좀 남겨. 그게 너의 가장 약한 구간이야.",
    reverse_card_1: {
      value: "챙기는 결을 매력으로 바꿔",
      sub: "키워주는 결을 무기로 써. 다정한 사람을 찾는 사람은 너를 알아봐. 단, 다 주지 말고 한 가지만 빛나게 챙겨. 그게 더 빛나.",
    },
    reverse_card_2: {
      value: "주기 전에 50:50 체크",
      sub: "주기 전에 한 번만 생각해. '내가 50 주면 상대도 50 줄 사람인가?' 그 체크 한 번이 너를 안 무너지게 해.",
    },
  },
  {
    label: "G",
    ilgan: "경금(庚金)",
    pattern_body:
      "처음엔 단호함이 끌리고, 중반엔 의심이 쌓이고, 끝엔 단번에 끊어.",
    ai_pattern:
      "매듭 모양이 매번 똑같이 묶여. 사람은 바뀌었는데 패턴은 그대로야. 너는 매번 같은 자리에서 넘어져.\n\n" +
      "처음엔 너의 단호함이 매력이야. 결정 잘 하고 솔직해. 중반엔 의심이 시작돼. 작은 거 하나 안 맞으면 '이 사람 진짜야?' 물어. 상대는 지쳐. 끝엔 흠 하나 발견하면 단번에 끊고 안 돌아봐.\n\n" +
      "경금(庚金) 일간이 빠지기 쉬운 함정이야. 다음번엔 처음 한 달은 의심을 두 번 검증하고 말해. 그게 너의 가장 약한 구간이야.",
    reverse_card_1: {
      value: "단호함을 신뢰로 바꿔",
      sub: "결단의 결을 무기로 써. 우유부단한 시대에 단호한 사람은 큰 신뢰를 줘. 단, 그 단호함이 의심 쪽으로 가지 않도록 조심해.",
    },
    reverse_card_2: {
      value: "의심 24시간 보류",
      sub: "의심 들면 바로 말하지 마. 24시간 보류하고 검증해. 진짜 흠인지 아니면 네 안의 패턴인지. 그 시간이 관계를 살려.",
    },
  },
  {
    label: "H",
    ilgan: "신금(辛金)",
    pattern_body:
      "처음엔 단정함이 끌리고, 중반엔 흠집이 쌓이고, 끝엔 마음을 닫아.",
    ai_pattern:
      "매듭 모양이 매번 똑같이 묶여. 사람은 바뀌었는데 패턴은 그대로야. 너는 매번 같은 자리에서 넘어져.\n\n" +
      "처음엔 너의 단정함이 매력이야. 약속 잘 지키고 깔끔해. 중반엔 작은 약속이 안 지켜질 때마다 흠집이 새겨져. 5분 늦은 거, 잊은 기념일. 끝엔 흠집 하나가 너무 커져서 마음을 닫고 떠나.\n\n" +
      "신금(辛金) 일간이 빠지기 쉬운 함정이야. 다음번엔 처음 한 달은 작은 흠집과 큰 흠집을 구분하는 연습을 해. 그게 너의 가장 약한 구간이야.",
    reverse_card_1: {
      value: "섬세함을 매력으로 바꿔",
      sub: "디테일을 알아주는 결을 무기로 써. 거친 시대에 섬세한 사람은 귀해. 단, 그 섬세함이 자기 자신을 베지 않도록 조심해.",
    },
    reverse_card_2: {
      value: "흠집 등급 매기기",
      sub: "흠집이 생길 때마다 '큰지 작은지' 등급 매겨. 작은 건 잊고, 큰 것만 말로 풀어. 그 분류가 관계를 살려.",
    },
  },
  {
    label: "I",
    ilgan: "임수(壬水)",
    pattern_body:
      "처음엔 빨리 빠지고, 중반엔 말 안 해서 멀어지고, 끝엔 한꺼번에 무너져.",
    ai_pattern:
      "매듭 모양이 매번 똑같이 묶여. 사람은 바뀌었는데 패턴은 그대로야. 너는 매번 같은 자리에서 넘어져.\n\n" +
      "처음엔 너무 빨리 마음을 줘. 상대가 손만 내밀어도 다 줘버려. 중반엔 말없이 기다려. 받은 만큼 돌아오기를 기다리는데, 그 신호가 너무 조용해서 상대는 못 읽어. 끝엔 한꺼번에 폭발해. 너는 무너지고 상대는 도망가.\n\n" +
      "임수(壬水) 일간이 빠지기 쉬운 함정이야. 다음번엔 처음 한 달은 천천히 가. 그게 너의 가장 약한 구간이야.",
    reverse_card_1: {
      value: "깊이를 천천히 보여줘",
      sub: "한 번에 다 주지 말고 조금씩 풀어. 깊은 사람은 한 번에 보여주면 부담이 되고, 천천히 보여주면 빠져들어.",
    },
    reverse_card_2: {
      value: "침묵의 타이밍 활용",
      sub: "네 침묵은 약점이 아니야. 잘 쓰면 가장 큰 무기야. 다들 말이 많을 때 너 하나만 조용하면, 그게 사람을 끌어당겨.",
    },
  },
  {
    label: "J",
    ilgan: "계수(癸水)",
    pattern_body:
      "처음엔 분위기로 끌고, 중반엔 속도 안 맞으면 흩어지고, 끝엔 말없이 사라져.",
    ai_pattern:
      "매듭 모양이 매번 똑같이 묶여. 사람은 바뀌었는데 패턴은 그대로야. 너는 매번 같은 자리에서 넘어져.\n\n" +
      "처음엔 너의 분위기가 끌어. 잡힐 듯 안 잡히는 결. 중반엔 상대가 너의 천천히 가는 속도를 못 견뎌. 빠르게 다가오면 너는 흩어져. 끝엔 말 없이 사라져. 상대는 '왜?' 모른 채 남아.\n\n" +
      "계수(癸水) 일간이 빠지기 쉬운 함정이야. 다음번엔 처음 한 달은 사라지기 전에 한 줄이라도 말로 남겨. 그게 너의 가장 약한 구간이야.",
    reverse_card_1: {
      value: "분위기를 매력으로 바꿔",
      sub: "잡힐 듯 안 잡히는 결을 무기로 써. 모두가 직진하는 시대에 너의 천천히 스며드는 결은 귀해. 단, 너무 사라지진 마.",
    },
    reverse_card_2: {
      value: "사라지기 전 한 줄 메시지",
      sub: "거리 두고 싶을 때 그냥 사라지지 마. '나 잠깐 시간이 필요해' 한 줄이면 충분해. 그 한 줄이 관계를 지켜.",
    },
  },
];

export default function P3PatternCasesPage() {
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
            P-3 2-2 반복 패턴 + 2-2-1 역이용 — 일간 10
          </h1>
          <p className="text-[12px] text-[#888] mt-2 leading-relaxed">
            2-2 sbody/AI 일간 10 변형 + 2-2-1 card-good × 2 일간 10 변형
            <br />
            (stitle/버블은 모두 고정)
          </p>
        </header>

        <div className="space-y-16">
          {CASES.map((c) => (
            <section key={c.label}>
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[13px] font-bold text-[#0a0a09]"
                  style={{ background: "#E8C9A0" }}
                >
                  {c.label}
                </span>
                <span className="text-[13px] text-[#d8d6d0]">{c.ilgan}</span>
              </div>

              {/* ── 2-2 반복 패턴 ── */}
              <SectionLabel>2-2 반복되는 실수 패턴</SectionLabel>
              <SectionTitle>사람은 바뀌어도 매듭 모양은 똑같아.</SectionTitle>
              <SectionBody>{c.pattern_body}</SectionBody>
              <AiBlock text={c.ai_pattern} />
              <YeonwooBubble text="사람은 바뀌었는데 매듭 모양이 똑같아." />

              {/* ── 2-2-1 역이용 ── */}
              <div className="mt-8">
                <SectionLabel>2-2-1 근데 이거 역이용 가능해</SectionLabel>
                <SectionTitle>독을 약으로 바꾸는 법.</SectionTitle>
              </div>

              <div
                className="my-[7px]"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: "6px",
                }}
              >
                {[c.reverse_card_1, c.reverse_card_2].map((card, i) => (
                  <div
                    key={i}
                    className="rounded-[8px] px-[11px] py-[10px]"
                    style={{
                      background: "rgba(29,158,117,0.07)",
                      border: "0.5px solid rgba(29,158,117,0.2)",
                    }}
                  >
                    <div
                      className="text-[12px] font-semibold uppercase mb-[14px]"
                      style={{ color: "#5DCAA5", letterSpacing: "0.08em" }}
                    >
                      {i === 0 ? "역이용 포인트" : "실전 방법"}
                    </div>
                    <div
                      className="text-[14px] font-semibold leading-[1.45] mb-[8px]"
                      style={{ color: "#a0e8d0", wordBreak: "keep-all" }}
                    >
                      {card.value}
                    </div>
                    <div
                      className="text-[14px] leading-[1.7]"
                      style={{
                        color: "rgba(160,220,200,0.8)",
                        wordBreak: "keep-all",
                      }}
                    >
                      {card.sub}
                    </div>
                  </div>
                ))}
              </div>

              <YeonwooBubble text="이게 독인지 약인지는 네가 어떻게 쓰냐에 달려있어." />
            </section>
          ))}
        </div>

        <footer className="mt-10 mb-4 text-center text-[11px] text-[#666]">
          일간 10 케이스 — 어색한 패턴 묘사/역이용 카드 발견하면 알려주세요.
          <br />
          stitle 2개 + 강연우 버블 3개 모두 고정 (HTML 원본 답습).
        </footer>
      </div>
    </main>
  );
}
