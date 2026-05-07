// dev 전용 P-2 1-4 상처받는 순간 — v3 직관 버전.
// v1: 정형 4단락 / v2: 자유 톤 (메타포 과다) / v3: 직관 행동 표현 ("결" 최소화).
//
// 시나리오 카드 = 일상 언어 (누구나 한 번에 알아들음).
// AI 박스 = 명리 비유 살짝만 (도입/마무리에 한 번씩).

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

const CASES: Case[] = [
  {
    label: "A",
    ilgan: "갑목(甲木)",
    scenarios: [
      {
        when: "내가 결정한 일에 누가 끼어들 때",
        desc: "혼자 정해서 끌고 가는 사람한텐 간섭이 가장 큰 상처야.",
      },
      {
        when: "내 노력을 가볍게 보는 한 마디",
        desc: "혼자 올라온 자리를 '운 좋았네' 한 마디로 깎아내릴 때.",
      },
    ],
    ai_hurt:
      "너 단단해 보이지. 근데 그건 부러지기 직전까지 안 휘는 거야. 한 번 부러지면 거기서 끝이고.\n\n" +
      "가장 다치는 자리는 두 군데야. 하나는 네가 결정한 일에 누가 끼어들 때. '내가 도와줄게' 같은 말도 너한텐 들이는 거야. 너는 혼자 가는 게 익숙한 사람이거든.\n\n" +
      "다른 하나는 네 노력을 가볍게 볼 때. 너는 누구 말 안 듣고 여기까지 온 사람이야. 그걸 '운 좋았네' 한 마디로 깎아내리면 너는 한 달을 못 자.\n\n" +
      "다친 사람한테 두 번째 기회 안 줘도 돼. 갑목(甲木)은 그래서 외로워 보이는 거고, 그래서 깊은 거야.",
    bubble: "굵게 자랐으면 굵게 끊어. 한 번 부러진 자리에 새 잎 안 나.",
  },
  {
    label: "B",
    ilgan: "을목(乙木)",
    scenarios: [
      {
        when: "내가 보낸 정성을 못 알아줄 때",
        desc: "작게 챙긴 정성을 못 본 척하면 마음이 식어.",
      },
      {
        when: "혼자 두고 가버릴 때",
        desc: "잠깐 자리 비웠을 뿐인데도 너한텐 큰 흔들림이야.",
      },
    ],
    ai_hurt:
      "너는 혼자 있을 때 가장 약해. 누가 옆에 있어줘야 너다워지거든.\n\n" +
      "다치는 자리 하나는 네가 보낸 정성을 못 알아줄 때야. 너는 큰 거 안 줘. 작은 거 자주 줘. 챙긴 게 작아서 사람들이 놓쳐. 그게 너한텐 가장 깊은 상처야.\n\n" +
      "다른 하나는 누가 너를 혼자 두고 갈 때야. 잠깐 자리 비웠을 뿐인데도 너한텐 큰일이지. '나 잠깐 일 좀' 한 마디면 충분한데, 그 한 마디 안 해주면 너는 그 시간 내내 안에서 흔들려.\n\n" +
      "자주 사라지는 사람은 너한텐 안 맞아. 옆에 있어주는 사람만 옆에 둬. 을목(乙木)은 그 한 사람만 있으면 다시 자라.",
    bubble: "혼자 두지 마. 너는 누가 옆에 있을 때 가장 너다워.",
  },
  {
    label: "C",
    ilgan: "병화(丙火)",
    scenarios: [
      {
        when: "내가 가장 좋을 때 아무도 공감 안 해줄 때",
        desc: "기뻐서 들떠 있는데 차갑게 받으면 그 자리에서 무너져.",
      },
      {
        when: "내가 100을 줬는데 50도 안 오는 답",
        desc: "큰 사랑을 줄 수 있는 사람이라 그 차이가 다 거절처럼 느껴져.",
      },
    ],
    ai_hurt:
      "너는 빛이야. 근데 빛은 비춰주는 사람이 있어야 의미가 있어.\n\n" +
      "가장 다치는 건 네가 가장 좋을 때 아무도 공감 안 해줄 때야. 기뻐서 들떠 있는데 옆에서 차갑게 받으면, 그 한 번에 며칠을 어둡게 살아. 사람들 앞에선 또 환한 척하지만 안에선 이미 꺼졌어.\n\n" +
      "또 하나는 네가 100을 보냈는데 50도 안 오는 답이야. 너는 큰 사랑을 줄 수 있는 사람이라 그 차이가 다 거절로 느껴져. 그건 네 잘못이 아니야. 그냥 너는 빛이라서 그래.\n\n" +
      "비추기 전에 한 번만 봐. 받을 사람인지. 받을 준비가 됐는지. 그거 한 가지만 챙기면 너 안 다쳐.",
    bubble: "꺼지기 전에 신호를 줘. 너 혼자 타다 사그라들지 마.",
  },
  {
    label: "D",
    ilgan: "정화(丁火)",
    scenarios: [
      {
        when: "조용히 챙긴 정성을 못 알아줄 때",
        desc: "표 안 내고 챙긴 걸 못 보면 마음이 흔들려.",
      },
      {
        when: "다른 데로 시선이 옮겨갈 때",
        desc: "한 사람만 보고 있었는데 시선이 돌면 다 꺼져.",
      },
    ],
    ai_hurt:
      "너는 촛불이야. 화려하지 않고 조용해. 근데 촛불은 봐주는 사람이 있어야 켜져 있는 의미가 있어.\n\n" +
      "가장 약한 자리는 네가 조용히 챙긴 정성을 못 알아줄 때야. 너는 표 안 내고 챙겨. 그게 너의 사랑법이거든. 근데 그게 너무 작아서 사람들이 자주 놓쳐. 그럴 때 너는 한 달을 끌어. '내가 너무 작게 줬나'부터 시작해서.\n\n" +
      "또 하나는 한 사람만 비추던 시선이 다른 데로 옮겨갈 때야. 네 불은 작아. 그래서 한 사람만 따뜻하게 해. 그 한 사람이 다른 데를 보면 너는 그날부터 점점 꺼져.\n\n" +
      "못 알아주는 사람한텐 더 켜지 마. 정화(丁火)는 심지가 닳는 게 제일 위험해.",
    bubble: "조용한 사람도 다쳐. 작은 거 한 번 알아줘. 그게 너한텐 큰 빛이야.",
  },
  {
    label: "E",
    ilgan: "무토(戊土)",
    scenarios: [
      {
        when: "어제와 오늘 말이 다를 때",
        desc: "너한텐 변덕이 가장 큰 흔들림이야.",
      },
      {
        when: "내 속도를 못 기다려줄 때",
        desc: "천천히 가는 사람을 재촉하면 멈춰버려.",
      },
    ],
    ai_hurt:
      "너는 산이야. 옮길 수도 없고 흔들리지도 않아. 근데 그래서 변덕에 약해.\n\n" +
      "다치는 자리 하나는 어제 좋다고 하고 오늘 다른 말 하는 사람이야. 너한텐 그게 진짜 큰일이거든. 산은 한 번 자리 잡으면 안 움직이는데 옆 사람이 자꾸 움직이면 너는 그 흔들림을 다 받아. 그게 안에서 갈라져.\n\n" +
      "또 하나는 네 속도를 못 기다리는 사람이야. 너는 빨리 못 가. 빨리 갈 이유도 없고. 근데 자꾸 재촉하면 너는 멈춰서 안 가게 돼. 그게 네 방어야.\n\n" +
      "한 자리 지켜주는 사람한테만 마음 줘. 무토(戊土)는 그 한 사람이면 충분해.",
    bubble: "넌 흔들리는 게 제일 무섭잖아. 한 자리만 지켜주면 돼.",
  },
  {
    label: "F",
    ilgan: "기토(己土)",
    scenarios: [
      {
        when: "다 줬는데 못 알아줄 때",
        desc: "비워서 빈 흙이 됐는데 그게 안 보이면 무너져.",
      },
      {
        when: "혼자 자라가는 옆 사람",
        desc: "키워주는 동안 같이 안 자라면 외로워져.",
      },
    ],
    ai_hurt:
      "너는 밭이야. 누군가를 키우는 게 너의 사랑법이거든. 그래서 너는 사랑할 때 너를 비워.\n\n" +
      "가장 다치는 건 네가 다 줬는데 그게 안 보이는 거야. 빈 흙이 된 다음에 '내가 뭐 했지' 하는 거. 너는 그 한 번에 마음을 통째로 비워. 다음에 줄 게 없어지는 게 아니라, 줄 마음 자체가 사라져.\n\n" +
      "또 하나는 키워주는 동안 옆 사람이 점점 멀어질 때야. 너는 같이 자라고 싶거든. 너만 자라는 건 의미가 없어. 그래서 너만 자라고 있다고 느끼면 너는 그 자리에서 멈춰.\n\n" +
      "줄 때 다 주지 마. 너한테도 좀 남겨. 기토(己土)가 너 자신을 지키는 유일한 방법이야.",
    bubble: "다 주고 빈 흙이 되지 마. 너한테도 좀 남겨.",
  },
  {
    label: "G",
    ilgan: "경금(庚金)",
    scenarios: [
      {
        when: "결정 못 내리고 우물쭈물할 때",
        desc: "단호한 너한테 흐릿한 사람은 가장 답답함이야.",
      },
      {
        when: "돌려서 말하는 거리감",
        desc: "솔직한 사람한텐 빙빙 도는 말이 가장 큰 상처야.",
      },
    ],
    ai_hurt:
      "너는 쇠야. 굵고 단단하고 차가워. 그래서 흐릿한 사람을 못 견뎌.\n\n" +
      "가장 약한 자리는 결정 못 내리고 우물쭈물하는 사람이야. 너는 그 흐림 안에서 가장 빨리 식어. '뭐 먹을까' 같은 작은 것도 못 정하는 사람한테는 정 안 가. 너는 답을 가진 사람을 좋아하거든.\n\n" +
      "또 하나는 솔직하지 않은 거리감이야. 빙빙 돌려서 말하면 너는 한 번에 알아채. 그리고 한 번 의심이 박히면 너는 그 사람을 다시 못 봐. 그게 네 무서운 점이야.\n\n" +
      "못 미더운 사람한테 두 번 손 안 내밀어도 돼. 경금(庚金)은 한 번 깨지면 그 자리에 다시 안 붙으니까.",
    bubble: "단호한 만큼 부서지기도 쉬워. 한 번은 풀어 둬.",
  },
  {
    label: "H",
    ilgan: "신금(辛金)",
    scenarios: [
      {
        when: "작은 약속을 가볍게 어길 때",
        desc: "작은 약속 하나도 너한텐 큰 흠집이야.",
      },
      {
        when: "내 마음을 함부로 다룰 때",
        desc: "섬세한 사람을 거칠게 만지면 닫혀.",
      },
    ],
    ai_hurt:
      "너는 보석이야. 작지만 빛나. 근데 빛나려면 잘 다뤄야 해. 함부로 만지면 그 자리에서 흠집이 나.\n\n" +
      "다치는 자리 하나는 작은 약속을 어기는 사람이야. '5분만 늦을게' 같은 작은 거. 너한테는 큰일이거든. 약속은 신뢰의 기본이라고 생각하니까. 그게 한 번 깨지면 너는 다른 모든 걸 의심하기 시작해.\n\n" +
      "또 하나는 네 마음을 함부로 다루는 사람이야. 너는 섬세해. 큰 소리로 말하면 다쳐. 거친 손길에 닿으면 닫혀. 그게 너 약한 게 아니라 너는 원래 보석이라서 그래.\n\n" +
      "함부로 다루는 사람한테는 처음부터 안 닿는 게 약이야. 신금(辛金)은 한 번 흠집 나면 똑같이 안 빛나거든.",
    bubble: "보석은 잘 다룰수록 빛나. 함부로 다루는 사람한텐 절대 닿지 마.",
  },
  {
    label: "I",
    ilgan: "임수(壬水)",
    scenarios: [
      {
        when: "무시당했다고 느끼는 그 순간",
        desc: "물은 무시당하면 깊어지다 못해 갇혀버려.",
      },
      {
        when: "속마음을 못 읽어줄 때",
        desc: "말 안 했는데 알아주길 바라는 게 너의 기본 값이야.",
      },
    ],
    ai_hurt:
      "너는 물이야. 깊어. 근데 그 깊이가 안 보여서 사람들이 자주 놓쳐.\n\n" +
      "다치는 자리 하나는 무시당했다고 느낄 때야. 너는 무시당하면 화내는 사람이 아니야. 안에서 더 깊이 가라앉아. 흐르질 못하니까 갇혀. 한 달, 두 달 끌고 가는데 상대는 자기가 뭘 했는지도 몰라.\n\n" +
      "또 하나는 말 안 했는데 알아주길 바라는데 못 알아줄 때. 너의 기본값이 그래. 근데 사람은 그렇게 안 살아. 네 깊이를 읽을 수 있는 사람이 흔하지 않다는 걸 인정해야 해.\n\n" +
      "상처받기 전에 먼저 말로 꺼내. 입 밖으로 내야 흐름이 풀려. 임수(壬水)는 그래야 살아.",
    bubble: "네가 말 안 하면 누가 알아. 깊은 게 죄는 아닌데, 안 꺼내면 죄가 돼.",
  },
  {
    label: "J",
    ilgan: "계수(癸水)",
    scenarios: [
      {
        when: "내 속도를 무시하고 빠르게 다가올 때",
        desc: "천천히 들어가는 사람한텐 급한 발걸음이 가장 큰 상처야.",
      },
      {
        when: "내 분위기를 못 읽고 들어올 때",
        desc: "안개 같은 사람한텐 갑작스런 등장이 무서워.",
      },
    ],
    ai_hurt:
      "너는 안개야. 보일 듯 안 보이고, 잡으려 하면 흩어져.\n\n" +
      "가장 약한 자리는 네 속도를 무시하고 빠르게 다가오는 사람이야. 너는 천천히 들어가는 사람이거든. 누가 빠르게 다가오면 너는 그 자리에서 흩어져. 화나지도 않고 슬프지도 않은데, 그냥 사라져.\n\n" +
      "또 하나는 네 분위기를 못 읽고 들어오는 사람이야. 너는 스며들어. 한 번에 안 가. 천천히, 안에서부터. 근데 자꾸 빠르게 끌면 너는 잘려. 그 사람도 너를 못 알아보게 되는 거지.\n\n" +
      "네 속도를 지켜주는 사람한테만 가까이 가. 계수(癸水)는 안개를 안개답게 봐주는 사람만 너를 안아줄 수 있어.",
    bubble: "안개처럼 살짝 다가오는 사람한테만 마음 줘. 빠른 발걸음에 너는 다쳐.",
  },
];

export default function P2HurtCasesV3Page() {
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
            P-2 1-4 상처받는 순간 — v3 직관 톤
          </h1>
          <p className="text-[12px] text-[#888] mt-2 leading-relaxed">
            시나리오 카드 = 일상 행동 표현 (&ldquo;결&rdquo; 최소화).
            <br />
            AI 박스 = 명리 비유 살짝만 (도입/마무리에 한 번씩).
          </p>
          <div className="mt-3 flex justify-center gap-3 text-[12px]">
            <a href="/dev/yeonwoo/p2-hurt-cases" className="underline text-[#888]">
              v1 정형
            </a>
            <a href="/dev/yeonwoo/p2-hurt-cases-v2" className="underline text-[#888]">
              v2 자유
            </a>
            <span className="text-[#E8C9A0] font-bold">v3 직관 (현재)</span>
          </div>
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

              {/* 시나리오 카드 (card-warn 풍) */}
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
          v1 vs v2 vs v3 — 어느 톤이 가장 자연스러운지 비교해주세요.
        </footer>
      </div>
    </main>
  );
}
