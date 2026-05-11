// dev 전용 P-4 2-4 운명인 줄 알았는데 — 일간 10 케이스 비교.
//
// 사용자 결정 2026-05-11:
// - stitle / card-warn × 3 / card-good 결정적 차이 / AI 박스 모두 일간 10 변형
// - "실 색" 메타포 X — "운명/착각 인연 식별" 본주제 초점
// - sbody 고정, 강연우 버블 고정

import AiBlock from "@/features/saju-result/views/yeonwoo/paid/components/AiBlock";
import {
  YeonwooBubble,
  SectionLabel,
  SectionTitle,
  SectionBody,
} from "@/features/saju-result/views/yeonwoo/paid/components/Section";

interface Case {
  label: string;
  ilgan: string;
  stitle: string;
  signals: ReadonlyArray<{ value: string; sub: string }>;
  good_card: { value: string; sub: string };
  ai_illusion: string;
}

const SBODY_FIXED =
  "진짜 인연이랑 착각 인연은 처음엔 구별이 안 돼. 둘 다 강하게 끌리거든. 차이는 두 번째, 세 번째 마주칠 때 드러나. 실 색이 그대로면 진짜고, 색이 흐려지거나 결이 어긋나면 착각이야.";

const SIGNAL_LABELS = ["첫 번째", "두 번째", "세 번째"] as const;

const CASES: ReadonlyArray<Case> = [
  {
    label: "A",
    ilgan: "갑목(甲木)",
    stitle: "처음에 받는 느낌, 한 번 더 의심해봐.",
    signals: [
      {
        value: "도전 욕구가 끌어당겨",
        sub: "어렵게 얻을 사람한테 끌리는 너의 결을 자극해. 그게 진심인지 도전인지 헷갈려.",
      },
      {
        value: "방향이 어긋나기 시작",
        sub: "두 번째 만남에서 같은 목표를 안 봐. 너만 끌고 가는 느낌이 생겨.",
      },
      {
        value: "쉽게 흔들리는 모습",
        sub: "단호한 모습에 끌렸는데 세 번째엔 그게 사라져. 너의 첫 인상이 환영이었어.",
      },
    ],
    good_card: {
      value: "같은 방향을 보고 있어?",
      sub: "운명은 같은 곳을 보는 사람이야. 처음 끌림이 도전 욕구였는지 진심이었는지, 세 번째에 같은 방향을 보고 있으면 진짜야.",
    },
    ai_illusion:
      "너 같은 갑목(甲木) 일간이 가장 잘 속는 게 이거야. 어렵게 얻을 사람한테 한 번 정하면 끝까지 밀어. 도전 욕구가 진심이라고 단정해. 거기서 잘못 시작하면 끝까지 가.\n\n" +
      "처음 강하게 끌리는 게 운명이 아니야. 너의 자존심이 자극된 것일 수도 있어. 일주일만 멈춰봐. 두 번째 만남에서 같은 방향을 보면 진짜야. 세 번째에 더 또렷해지면 그게 너의 사람이야.\n\n" +
      "흐려졌으면 미련 두지 마. 그건 네가 정복하고 싶었던 사람이지, 함께 갈 사람이 아니야.",
  },
  {
    label: "B",
    ilgan: "을목(乙木)",
    stitle: "외로움이 만든 끌림인지 한 번 봐.",
    signals: [
      {
        value: "옆에 있어줘서 끌려",
        sub: "외로운 시기에 곁에 있어주는 사람한테 빨리 감겨. 그게 운명인지 외로움인지 헷갈려.",
      },
      {
        value: "두 번째엔 거리감",
        sub: "처음엔 챙겨주더니 두 번째엔 거리 둬. 너만 다가가는 느낌.",
      },
      {
        value: "끌림이 약해져",
        sub: "분명 같은 사람인데 처음 그 다정한 결이 사라져. 그게 답이야.",
      },
    ],
    good_card: {
      value: "내가 외로워서 좋아한 거야?",
      sub: "운명은 외로움과 무관해. 너 혼자 충분한 상태에서도 끌리는 사람이 진짜야. 세 번째에 그게 분명해져.",
    },
    ai_illusion:
      "너 같은 을목(乙木) 일간이 가장 잘 속는 게 이거야. 옆에 있어주는 사람한테 빨리 감겨. 외로움이 클수록 그래. 한 번 감기면 다 끝났다고 믿어.\n\n" +
      "근데 외로움이 만든 끌림은 운명이 아니야. 일주일만 혼자 있어봐. 그래도 그 사람이 떠오르면 진짜야. 두 번째에 거리감이 보이면 그건 외로움이 만든 환영이야.\n\n" +
      "흐려졌으면 미련 두지 마. 너 혼자 충분한 상태에서 다시 보면 인연이 보여.",
  },
  {
    label: "C",
    ilgan: "병화(丙火)",
    stitle: "한 번에 끓는 그 감정, 의심해봐.",
    signals: [
      {
        value: "첫날부터 100을 줘",
        sub: "강한 끌림에 한 번에 모든 걸 쏟아부어. 운명이라고 단정해.",
      },
      {
        value: "두 번째에 식어",
        sub: "처음의 그 열기가 빠르게 식어. 너만 같은 온도로 남아 있어.",
      },
      {
        value: "끌림이 사라져",
        sub: "세 번째엔 처음 그 빛이 안 보여. 너 혼자 환영을 좇고 있어.",
      },
    ],
    good_card: {
      value: "이 감정이 일주일 후에도 같아?",
      sub: "운명은 강도가 아니라 지속이야. 첫날의 100 대신 일주일 후의 70을 봐. 그게 진짜야.",
    },
    ai_illusion:
      "너 같은 병화(丙火) 일간이 가장 잘 속는 게 이거야. 처음 강하게 끓어오르면 운명이라 단정해. 빛이 큰 만큼 한 번에 100을 다 쏟아.\n\n" +
      "근데 빛은 빠르게 타는 만큼 빠르게 식어. 일주일만 멈춰봐. 그 사람이 여전히 떠오르면 진짜야. 두 번째에 식었으면 그건 너의 강도가 만든 환영이야.\n\n" +
      "흐려졌으면 미련 두지 마. 너의 빛은 너의 것이지, 그 사람이 끌어낸 게 아니야.",
  },
  {
    label: "D",
    ilgan: "정화(丁火)",
    stitle: "한 번 켜진 마음, 진짜인지 천천히 봐.",
    signals: [
      {
        value: "조용히 와닿는 결",
        sub: "은근한 끌림에 한 번 켜지면 안 꺼져. 그게 운명이라 단정해.",
      },
      {
        value: "두 번째에 못 알아채",
        sub: "너의 작은 정성을 그 사람이 못 봐. 너 혼자 켜져 있어.",
      },
      {
        value: "한쪽만 타고 있어",
        sub: "세 번째엔 그 사람의 결이 너랑 같지 않아. 너만 잔불로 남아.",
      },
    ],
    good_card: {
      value: "내 정성을 알아봐?",
      sub: "운명은 양쪽이 같이 켜져 있어. 너만 조용히 타고 있으면 그건 운명이 아니야. 세 번째에 그 사람이 너를 알아봐주면 진짜야.",
    },
    ai_illusion:
      "너 같은 정화(丁火) 일간이 가장 잘 속는 게 이거야. 한 번 마음 켜지면 안 꺼져. 그래서 처음 끌린 사람을 끝까지 안 놓아. 잔불이 진짜 불이라 착각해.\n\n" +
      "근데 잔불은 너 혼자 타고 있는 거야. 운명은 양쪽이 같이 켜져 있어. 일주일만 멈춰봐. 두 번째에 그 사람도 너를 알아봐주면 진짜야.\n\n" +
      "흐려졌으면 미련 두지 마. 너의 정성은 알아봐줄 사람한테만 줘.",
  },
  {
    label: "E",
    ilgan: "무토(戊土)",
    stitle: "안정감 때문에 끌린 건 아닌지 봐.",
    signals: [
      {
        value: "한 자리에 있어줘서 끌려",
        sub: "흔들리지 않는 모습에 한 번 자리 잡으면 안 옮겨. 그게 운명이라 단정해.",
      },
      {
        value: "두 번째엔 변덕",
        sub: "처음의 그 안정감이 두 번째에 흔들려. 너만 자리 잡고 있어.",
      },
      {
        value: "기대고 싶지가 않아",
        sub: "세 번째엔 처음의 그 든든함이 안 느껴져. 너 혼자 산처럼 서 있어.",
      },
    ],
    good_card: {
      value: "변덕 없이 한결같아?",
      sub: "운명은 너만큼 한결같은 사람이야. 첫 만남의 안정감이 일주일 후에도 같으면 진짜야. 흔들리면 그건 환영이야.",
    },
    ai_illusion:
      "너 같은 무토(戊土) 일간이 가장 잘 속는 게 이거야. 안정감 주는 사람한테 한 번 자리 잡으면 안 옮겨. 처음 든든했던 모습을 운명이라 단정해.\n\n" +
      "근데 처음의 안정감은 누구나 만들 수 있어. 일주일만 멈춰봐. 두 번째에 그 한결같음이 보이면 진짜야. 변덕이 시작되면 그건 환영이야.\n\n" +
      "흐려졌으면 미련 두지 마. 한 번 자리 잡으면 옮기기 어려운 너의 결을 함부로 쓰지 마.",
  },
  {
    label: "F",
    ilgan: "기토(己土)",
    stitle: "내가 챙겨주고 싶어진 마음인지 봐.",
    signals: [
      {
        value: "도와주고 싶어서 끌려",
        sub: "기댄 모습에 한 번 마음 가면 다 챙겨. 그게 운명이라 단정해.",
      },
      {
        value: "두 번째엔 받기만 해",
        sub: "처음엔 너의 정성을 알아주더니 두 번째엔 당연하게 받기만 해.",
      },
      {
        value: "주고만 있어",
        sub: "세 번째엔 너 혼자 비워지고 있어. 그 사람은 채워지는데.",
      },
    ],
    good_card: {
      value: "주고받는 결이 있어?",
      sub: "운명은 너만 주는 사이가 아니야. 한쪽으로만 흐르면 그건 운명이 아니야. 세 번째에 그 사람도 너를 챙겨주면 진짜야.",
    },
    ai_illusion:
      "너 같은 기토(己土) 일간이 가장 잘 속는 게 이거야. 누구를 챙기는 게 사랑법이라, 처음에 기댄 사람을 끝까지 챙겨. 챙기는 마음이 운명이라고 믿어.\n\n" +
      "근데 그건 너의 정성이 만든 환영이야. 일주일만 멈춰봐. 두 번째에 그 사람도 너를 챙겨주면 진짜야. 받기만 하면 그건 운명이 아니야.\n\n" +
      "흐려졌으면 미련 두지 마. 너의 정성은 받아줄 사람한테만 줘. 빈 흙이 되도록 다 주지 마.",
  },
  {
    label: "G",
    ilgan: "경금(庚金)",
    stitle: "한 번 정한 답, 다시 검증해봐.",
    signals: [
      {
        value: "결정 빨라서 끌려",
        sub: "단호한 끌림에 한 번 정하면 안 뒤집어. 그게 운명이라 못 박아.",
      },
      {
        value: "두 번째엔 흐릿함",
        sub: "처음의 단호함이 두 번째엔 흐려져. 너만 결정 내린 상태.",
      },
      {
        value: "맞춰지지가 않아",
        sub: "세 번째엔 결이 안 맞는 게 보여. 그래도 정했으니까 끌고 가야 하나 고민해.",
      },
    ],
    good_card: {
      value: "검증 두 번 했어?",
      sub: "운명은 한 번 정한다고 확정되는 게 아니야. 세 번째 만남까지 같은 답이 나오면 진짜야. 그 전엔 보류해.",
    },
    ai_illusion:
      "너 같은 경금(庚金) 일간이 가장 잘 속는 게 이거야. 단호하게 결정하는 사람이라, 처음에 끌렸으면 그걸 진짜라고 못 박아. 의심도 안 해. 한 번 정한 답을 뒤집기 싫어서.\n\n" +
      "근데 첫 결정이 항상 옳은 건 아니야. 일주일만 검증해봐. 두 번째에 같은 답이 나오면 진짜야. 세 번째에도 또렷하면 그게 너의 사람이야.\n\n" +
      "흐려졌으면 미련 두지 마. 너의 단호함을 너 자신한테도 써. 잘못된 결정을 끝까지 끌고 갈 필요 없어.",
  },
  {
    label: "H",
    ilgan: "신금(辛金)",
    stitle: "한 번 빛난 그 사람, 진짜로 빛난 건지 봐.",
    signals: [
      {
        value: "단정함에 끌려",
        sub: "잘 정돈된 첫인상에 한 번 빛났으면 영원히 기억해. 그게 운명이라 단정해.",
      },
      {
        value: "두 번째엔 흠집",
        sub: "처음의 그 빛에 작은 흠집이 보여. 너는 그걸 안 보려고 해.",
      },
      {
        value: "기억과 다른 모습",
        sub: "세 번째엔 처음 그 빛이 진짜였는지 의심돼. 너 혼자 기억을 붙잡고 있어.",
      },
    ],
    good_card: {
      value: "기억이 만든 환영 아니야?",
      sub: "운명은 기억이 아니라 현재야. 첫 빛에 빠지지 말고 세 번째에 또 빛나는지 봐. 그게 진짜야.",
    },
    ai_illusion:
      "너 같은 신금(辛金) 일간이 가장 잘 속는 게 이거야. 한 번 빛난 사람을 영원히 기억해. 처음 끌림이 너무 선명해서 그게 진짜라고 믿어. 빛은 흐려져도 기억은 안 흐려져.\n\n" +
      "근데 기억은 환영을 만들어. 일주일만 멈춰봐. 두 번째에도 같은 빛이 보이면 진짜야. 흠집이 보이는데 안 보려고 하면 그건 환영이야.\n\n" +
      "흐려졌으면 미련 두지 마. 너의 기억력이 너를 가두지 않게 해.",
  },
  {
    label: "I",
    ilgan: "임수(壬水)",
    stitle: "한 번 빠진 깊이, 운명인지 환영인지 봐.",
    signals: [
      {
        value: "깊이 통하는 결",
        sub: "강한 끌림에 한 번 빠지면 못 빠져나와. 그게 운명이라 단정해.",
      },
      {
        value: "두 번째엔 멀어짐",
        sub: "처음의 그 통함이 두 번째엔 흐려져. 너만 깊이 빠진 상태.",
      },
      {
        value: "혼자만의 깊이",
        sub: "세 번째엔 너만 그 깊이에 있어. 그 사람은 표면에 있어.",
      },
    ],
    good_card: {
      value: "둘 다 같이 깊어졌어?",
      sub: "운명은 양쪽이 같이 깊어지는 거야. 너만 빠지고 있으면 그건 환영이야. 세 번째에 그 사람도 깊어지면 진짜야.",
    },
    ai_illusion:
      "너 같은 임수(壬水) 일간이 가장 잘 속는 게 이거야. 처음에 강하게 끌리는 사람을 운명이라 단정해. 깊은 사람일수록 그래. 한 번 빠지면 다 끝났다고 믿어.\n\n" +
      "근데 매듭은 한 번에 안 묶여. 진짜는 천천히 당겨지는 거야. 첫날 운명 같다고 느껴지면 일주일만 멈춰봐. 가만히 두고 봐. 두 번째 마주칠 때 같은 끌림이 보이면 그건 진짜야. 세 번째에도 더 또렷해지면 그게 너의 사람이야.\n\n" +
      "흐려졌으면 미련 두지 마. 그건 네가 보고 싶었던 환영이야. 너 마음이 만들어낸 그림자일 뿐이야. 그림자랑은 살 수 없어.",
  },
  {
    label: "J",
    ilgan: "계수(癸水)",
    stitle: "분위기 때문에 끌린 건 아닌지 봐.",
    signals: [
      {
        value: "그날의 결에 스며",
        sub: "분위기에 천천히 빠져들어. 그날의 흐름을 운명이라 단정해.",
      },
      {
        value: "두 번째엔 다른 결",
        sub: "처음의 그 분위기가 두 번째엔 안 느껴져. 너만 첫 결에 남아 있어.",
      },
      {
        value: "그 사람이 안 보여",
        sub: "세 번째엔 분위기가 사라지고 사람만 남아. 근데 그 사람은 네 결이 아니야.",
      },
    ],
    good_card: {
      value: "분위기 빠지면 그 사람이 남아?",
      sub: "운명은 분위기와 무관해. 그날의 흐름이 아니라 그 사람 자체에 끌리는지 봐. 세 번째에 그게 분명해져.",
    },
    ai_illusion:
      "너 같은 계수(癸水) 일간이 가장 잘 속는 게 이거야. 분위기에 천천히 스며드는 사람이라, 처음 끌린 분위기를 운명이라 단정해. 사실 분위기는 그날의 흐름일 뿐인데.\n\n" +
      "근데 분위기는 환경이 만들어. 일주일만 멈춰봐. 다른 결에서 만나도 같은 끌림이 있으면 진짜야. 분위기 빠지면 끌림도 사라지면 그건 환영이야.\n\n" +
      "흐려졌으면 미련 두지 마. 너의 섬세함은 분위기가 아니라 사람을 봐줘.",
  },
];

export default function P4IllusionCasesPage() {
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
            P-4 2-4 착각 인연 식별 — 일간 10
          </h1>
          <p className="text-[12px] text-[#888] mt-2 leading-relaxed">
            stitle / 착각 신호 3 / 결정적 차이 / AI 박스 모두 일간 10 변형
            <br />
            sbody / 라벨 형식("착각 신호 N · 첫/두/세 번째") / 강연우 버블은 고정
          </p>
        </header>

        <div className="space-y-12">
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

              <SectionLabel>2-4 운명인 줄 알았는데 — 착각 인연 식별</SectionLabel>
              <SectionTitle>{c.stitle}</SectionTitle>
              <SectionBody>{SBODY_FIXED}</SectionBody>

              <div
                className="my-[7px]"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: "6px",
                }}
              >
                {c.signals.map((s, i) => (
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
                      착각 신호 {i + 1} · {SIGNAL_LABELS[i]}
                    </div>
                    <div
                      className="text-[14px] font-semibold leading-[1.45] mb-[8px]"
                      style={{ color: "#f0c0c0", wordBreak: "keep-all" }}
                    >
                      {s.value}
                    </div>
                    <div
                      className="text-[13px] leading-[1.7]"
                      style={{
                        color: "rgba(240,180,180,0.85)",
                        wordBreak: "keep-all",
                      }}
                    >
                      {s.sub}
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="rounded-[8px] px-[11px] py-[10px]"
                style={{
                  background: "rgba(29,158,117,0.07)",
                  border: "0.5px solid rgba(29,158,117,0.2)",
                  marginTop: "8px",
                }}
              >
                <div
                  className="text-[12px] font-semibold uppercase mb-[14px]"
                  style={{ color: "#5DCAA5", letterSpacing: "0.08em" }}
                >
                  진짜 인연 vs 착각 인연 — 결정적 차이
                </div>
                <div
                  className="text-[14px] font-semibold leading-[1.45] mb-[8px]"
                  style={{ color: "#a0e8d0", wordBreak: "keep-all" }}
                >
                  {c.good_card.value}
                </div>
                <div
                  className="text-[14px] leading-[1.7]"
                  style={{
                    color: "rgba(160,220,200,0.8)",
                    wordBreak: "keep-all",
                  }}
                >
                  {c.good_card.sub}
                </div>
              </div>

              <AiBlock text={c.ai_illusion} />
              <YeonwooBubble text="처음에 강하게 끌리는 게 다 운명은 아니야. 세 번째를 봐." />
            </section>
          ))}
        </div>

        <footer className="mt-10 mb-4 text-center text-[11px] text-[#666]">
          일간 10 케이스 — &ldquo;실 색&rdquo; 메타포 X, &ldquo;운명/착각&rdquo; 본주제 초점.
          <br />
          어색한 stitle/신호/결정적 차이/AI 발견하면 알려주세요.
        </footer>
      </div>
    </main>
  );
}
