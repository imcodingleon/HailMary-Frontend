// dev 전용 P-2 1-4 상처받는 순간 톤 검증 — 10 케이스 한 화면 비교.
// 백엔드 templates/yeonwoo_p2_hurt.py compose_p2_hurt() 출력 동기화.

import AiBlock from "@/features/saju-result/views/yeonwoo/paid/components/AiBlock";
import { YeonwooBubble } from "@/features/saju-result/views/yeonwoo/paid/components/Section";

interface Case {
  label: string;
  ilgan: string;
  scenarios: [
    { when: string; desc: string },
    { when: string; desc: string },
  ];
  ai_hurt: string;
  bubble: string;
}

// 백엔드 yeonwoo_p2_hurt.py 출력 (한자 자동 치환 적용 후) 그대로 동기화.
const CASES: Case[] = [
  {
    label: "A",
    ilgan: "갑목(甲木)",
    scenarios: [
      { when: "내 결정에 누가 끼어들 때", desc: "곧게 자란 나무는 가지를 잡히면 부러져." },
      { when: "내 노력이 흐려졌다고 느낄 때", desc: "혼자 뻗어 올라온 자리를 인정 안 해주면 무너져." },
    ],
    ai_hurt:
      "네 명줄이 가장 약해지는 자리가 두 군데 보여.\n\n" +
      "첫 번째는 내 결정에 누가 끼어들 때야. 곧게 자란 나무는 가지를 잡히면 부러져. 너는 그 순간 안 흔들리는 척하지만 속에선 이미 갈라져 있어.\n\n" +
      "두 번째는 네 노력이 흐려졌다고 느낄 때야. 혼자 뻗어 올라온 자리를 인정 안 해주면 다 무너져. 너는 그 한 마디에 한 달을 못 자.\n\n" +
      "이 두 자리에서 다치면 회복이 오래 걸려. 갑목(甲木) 일간은 원래 그래. 한 번 부러진 가지는 그 자리에 똑같이 안 자라. 그러니까 너를 다친 사람한테 두 번째 기회는 주지 마.",
    bubble: "굵게 자랐으면 굵게 끊어. 부러진 가지에 새 잎 안 나.",
  },
  {
    label: "B",
    ilgan: "을목(乙木)",
    scenarios: [
      { when: "혼자 두고 갈 때", desc: "옆에 감을 결이 사라지면 풀이 쓰러져." },
      { when: "내 작은 결을 못 알아줄 때", desc: "작게 챙겨준 손길을 못 본 척하면 다 시들어." },
    ],
    ai_hurt:
      "네 명줄이 가장 약해지는 자리가 두 군데 보여.\n\n" +
      "첫 번째는 혼자 두고 갈 때야. 옆에 감을 결이 사라지면 풀이 쓰러져. 너는 누가 옆에 있을 때 가장 너답고, 없을 때 제일 약해.\n\n" +
      "두 번째는 네 작은 결을 못 알아줄 때야. 작게 챙겨준 손길을 못 본 척하면 다 시들어. 너는 그 작은 신호 하나에 마음이 흐려져.\n\n" +
      "이 두 자리에서 다치면 회복이 오래 걸려. 을목(乙木) 일간은 원래 그래. 풀은 한 번 꺾이면 한참을 못 일어나. 그러니까 옆에 둘 사람만 옆에 둬. 자주 사라지는 사람은 너한테 안 어울려.",
    bubble: "혼자 두지 마. 너는 누가 옆에 있을 때 가장 너다워.",
  },
  {
    label: "C",
    ilgan: "병화(丙火)",
    scenarios: [
      { when: "내 빛을 못 본 척할 때", desc: "환하게 비추는데 그늘로 돌리면 다 꺼져." },
      { when: "차가운 반응이 돌아올 때", desc: "들떠 다가갔는데 식은 채로 받으면 무너져." },
    ],
    ai_hurt:
      "네 명줄이 가장 약해지는 자리가 두 군데 보여.\n\n" +
      "첫 번째는 네 빛을 못 본 척할 때야. 환하게 비추는데 그늘로 돌리면 다 꺼져. 너는 그 한 번에 며칠을 어둡게 살아.\n\n" +
      "두 번째는 차가운 반응이 돌아올 때야. 들떠 다가갔는데 식은 채로 받으면 무너져. 너는 빠르게 타는 만큼 빠르게 식고, 그래서 아픔도 더 빨라.\n\n" +
      "이 두 자리에서 다치면 회복이 오래 걸려. 병화(丙火) 일간은 원래 그래. 한 번 꺼진 자리에 다시 불 붙이려면 두 배의 산소가 필요해. 그러니까 다음에 비추기 전에 상대가 받을 준비가 됐는지 먼저 봐.",
    bubble: "꺼지기 전에 신호를 줘. 너 혼자 타다 사그라들지 마.",
  },
  {
    label: "D",
    ilgan: "정화(丁火)",
    scenarios: [
      { when: "내가 챙긴 디테일을 모를 때", desc: "조용히 켜둔 등잔을 못 보면 심지가 흔들려." },
      { when: "다른 데로 시선이 돌아갈 때", desc: "한 사람만 비춰왔는데 시선이 돌면 다 꺼져." },
    ],
    ai_hurt:
      "네 명줄이 가장 약해지는 자리가 두 군데 보여.\n\n" +
      "첫 번째는 네가 챙긴 디테일을 모를 때야. 조용히 켜둔 등잔을 못 보면 심지가 흔들려. 너는 그 작은 정성 하나에 한 달을 끌어.\n\n" +
      "두 번째는 다른 데로 시선이 돌아갈 때야. 한 사람만 비춰왔는데 시선이 돌면 다 꺼져. 네 불은 작아서 한 사람만 따뜻하게 해.\n\n" +
      "이 두 자리에서 다치면 회복이 오래 걸려. 정화(丁火) 일간은 원래 그래. 작은 불은 다시 켜는 데 시간이 걸려. 그러니까 못 알아주는 사람한텐 더 켜지 마. 네 심지가 닳아.",
    bubble: "조용한 사람도 다쳐. 작은 거 한 번 알아줘. 그게 너한텐 큰 빛이야.",
  },
  {
    label: "E",
    ilgan: "무토(戊土)",
    scenarios: [
      { when: "어제와 오늘이 다를 때", desc: "산 같은 사람한텐 변덕이 가장 큰 흔들림이야." },
      { when: "기다림을 못 견뎌줄 때", desc: "천천히 가는 결인데 재촉받으면 무너져." },
    ],
    ai_hurt:
      "네 명줄이 가장 약해지는 자리가 두 군데 보여.\n\n" +
      "첫 번째는 어제와 오늘이 다를 때야. 산 같은 사람한텐 변덕이 가장 큰 흔들림이야. 너는 그 한 번에 안에서 깊게 갈라져.\n\n" +
      "두 번째는 기다림을 못 견뎌줄 때야. 천천히 가는 결인데 재촉받으면 무너져. 너는 네 속도로 갈 때 가장 단단해.\n\n" +
      "이 두 자리에서 다치면 회복이 오래 걸려. 무토(戊土) 일간은 원래 그래. 산은 한 번 깎이면 그 자리에 다시 못 차. 그러니까 한 자리만 지켜주는 사람한테만 마음을 줘.",
    bubble: "넌 흔들리는 게 제일 무섭잖아. 한 자리만 지켜주면 돼.",
  },
  {
    label: "F",
    ilgan: "기토(己土)",
    scenarios: [
      { when: "내 진심이 무시될 때", desc: "다 줘서 빈 흙이 됐는데 못 알아주면 무너져." },
      { when: "함께 안 자라줄 때", desc: "키워주는 동안 옆이 멀어지면 마음이 식어." },
    ],
    ai_hurt:
      "네 명줄이 가장 약해지는 자리가 두 군데 보여.\n\n" +
      "첫 번째는 네 진심이 무시될 때야. 다 줘서 빈 흙이 됐는데 못 알아주면 무너져. 너는 그 한 번에 마음을 통째 비워.\n\n" +
      "두 번째는 함께 안 자라줄 때야. 키워주는 동안 옆이 멀어지면 마음이 식어. 너는 같이 가는 결을 가장 사랑해.\n\n" +
      "이 두 자리에서 다치면 회복이 오래 걸려. 기토(己土) 일간은 원래 그래. 빈 흙은 다시 차는 데 시간이 걸려. 그러니까 줄 때 다 주지 마. 너한테도 좀 남겨.",
    bubble: "다 주고 빈 흙이 되지 마. 너한테도 좀 남겨.",
  },
  {
    label: "G",
    ilgan: "경금(庚金)",
    scenarios: [
      { when: "결정 못 내리는 모습 볼 때", desc: "단호한 결인데 우유부단을 만나면 흐려져." },
      { when: "돌려서 말하는 결을 느낄 때", desc: "솔직한 사람한텐 빙빙 도는 말이 가장 큰 상처야." },
    ],
    ai_hurt:
      "네 명줄이 가장 약해지는 자리가 두 군데 보여.\n\n" +
      "첫 번째는 결정 못 내리는 모습 볼 때야. 단호한 결인데 우유부단을 만나면 흐려져. 너는 그 흐림 안에서 가장 빨리 식어.\n\n" +
      "두 번째는 돌려서 말하는 결을 느낄 때야. 솔직한 사람한텐 빙빙 도는 말이 가장 큰 상처야. 너는 한 번 의심이 박히면 못 빼.\n\n" +
      "이 두 자리에서 다치면 회복이 오래 걸려. 경금(庚金) 일간은 원래 그래. 한 번 깨진 쇠는 그 자리에 그대로 안 붙어. 그러니까 못 미더운 사람한텐 두 번 손 안 내밀어도 돼.",
    bubble: "단호한 만큼 부서지기도 쉬워. 한 번은 풀어 둬.",
  },
  {
    label: "H",
    ilgan: "신금(辛金)",
    scenarios: [
      { when: "약속을 안 지킬 때", desc: "작은 약속 하나도 보석한텐 큰 흠집이야." },
      { when: "네 결을 함부로 다룰 때", desc: "섬세한 결을 거칠게 만지면 광택이 사라져." },
    ],
    ai_hurt:
      "네 명줄이 가장 약해지는 자리가 두 군데 보여.\n\n" +
      "첫 번째는 약속을 안 지킬 때야. 작은 약속 하나도 보석한텐 큰 흠집이야. 너는 그 한 번에 신뢰가 통째 흐려져.\n\n" +
      "두 번째는 네 결을 함부로 다룰 때야. 섬세한 결을 거칠게 만지면 광택이 사라져. 너는 그 거친 손 한 번에 마음을 닫아.\n\n" +
      "이 두 자리에서 다치면 회복이 오래 걸려. 신금(辛金) 일간은 원래 그래. 한 번 흠집 난 보석은 똑같이 안 빛나. 그러니까 함부로 다루는 사람한테는 처음부터 안 닿는 게 약이야.",
    bubble: "보석은 잘 다룰수록 빛나. 함부로 다루는 사람한텐 절대 닿지 마.",
  },
  {
    label: "I",
    ilgan: "임수(壬水)",
    scenarios: [
      { when: "무시당했다고 느낄 때", desc: "물은 무시당하면 깊어지다 못해 갇혀버려." },
      { when: "속마음을 못 읽어줄 때", desc: "말 안 했는데 알아주길 바라는 게 너의 기본 값이야." },
    ],
    ai_hurt:
      "네 명줄이 가장 약해지는 자리가 두 군데 보여.\n\n" +
      "첫 번째는 무시당했다고 느낄 때야. 물은 무시당하면 깊어지다 못해 갇혀버려. 흐르질 못하니까 안에서 썩어. 너는 그걸 한 달, 두 달 끌고 가. 상대는 자기가 뭘 했는지도 몰라.\n\n" +
      "두 번째는 속마음을 못 읽어줄 때야. 말 안 했는데 알아주길 바라는 게 너의 기본 값이야. 근데 사람은 그렇게 안 살아. 네 깊이를 읽을 수 있는 사람이 흔하지 않다는 걸 인정해.\n\n" +
      "이 두 자리에서 다치면 회복이 오래 걸려. 임수(壬水) 일간은 원래 그래. 한 번 패이면 그 자리가 안 닫혀. 그러니까 상처받기 전에 먼저 말로 꺼내. 입 밖으로 내야 흐름이 풀려.",
    bubble: "네가 말 안 하면 누가 알아. 깊은 게 죄는 아닌데, 안 꺼내면 죄가 돼.",
  },
  {
    label: "J",
    ilgan: "계수(癸水)",
    scenarios: [
      { when: "내 분위기를 못 읽을 때", desc: "안개 같은 결인데 빠르게 다가오면 흩어져." },
      { when: "내 속도를 무시할 때", desc: "천천히 스며드는 결인데 급하게 끌면 다 잘려." },
    ],
    ai_hurt:
      "네 명줄이 가장 약해지는 자리가 두 군데 보여.\n\n" +
      "첫 번째는 네 분위기를 못 읽을 때야. 안개 같은 결인데 빠르게 다가오면 흩어져. 너는 그 한 번에 기운을 다 잃어.\n\n" +
      "두 번째는 네 속도를 무시할 때야. 천천히 스며드는 결인데 급하게 끌면 다 잘려. 너는 네 속도가 깨지면 마음도 같이 깨져.\n\n" +
      "이 두 자리에서 다치면 회복이 오래 걸려. 계수(癸水) 일간은 원래 그래. 안개는 한 번 흩어지면 다시 모이는 데 오래 걸려. 그러니까 네 속도를 지켜주는 사람한테만 가까이 가.",
    bubble: "안개처럼 살짝 다가오는 사람한테만 마음 줘. 빠른 발걸음에 너는 다쳐.",
  },
];

export default function P2HurtCasesPage() {
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
            P-2 1-4 상처받는 순간 — 10 케이스 톤 검증
          </h1>
          <p className="text-[12px] text-[#888] mt-2 leading-relaxed">
            backend templates/yeonwoo_p2_hurt.py 풀 템플릿
            <br />
            일간 10 × 시나리오 2(when+desc) + AI 10 + 강연우 버블 10 / AI 호출 0
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

              {/* 시나리오 카드 2 (card-warn 풍, full 화면 패턴) */}
              <div
                className="my-[7px]"
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: "6px",
                }}
              >
                {c.scenarios.map((s, i) => (
                  <div
                    key={i}
                    className="rounded-[8px] px-[11px] py-[10px]"
                    style={{
                      background: "rgba(220,60,60,0.08)",
                      border: "0.5px solid rgba(220,80,80,0.2)",
                    }}
                  >
                    <div
                      className="text-[12px] font-semibold uppercase mb-[14px]"
                      style={{ color: "#E24B4A", letterSpacing: "0.08em" }}
                    >
                      시나리오 {i + 1}
                    </div>
                    <div
                      className="text-[14px] font-semibold leading-[1.45] mb-[8px]"
                      style={{ color: "#f0c0c0", wordBreak: "keep-all" }}
                    >
                      {s.when}
                    </div>
                    <div
                      className="text-[13px] leading-[1.7]"
                      style={{
                        color: "rgba(240,180,180,0.85)",
                        wordBreak: "keep-all",
                      }}
                    >
                      {s.desc}
                    </div>
                  </div>
                ))}
              </div>

              <AiBlock text={c.ai_hurt} />
              <YeonwooBubble text={c.bubble} />
            </section>
          ))}
        </div>

        <footer className="mt-10 mb-4 text-center text-[11px] text-[#666]">
          상처 = 그 일간이 가장 약해지는 두 장면 (외부 자극).
          <br />
          톤 어색한 시나리오/AI/버블 발견하면 알려주세요.
        </footer>
      </div>
    </main>
  );
}
