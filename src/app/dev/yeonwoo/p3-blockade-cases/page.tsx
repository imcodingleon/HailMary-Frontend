// dev 전용 P-3 2-1 명줄에 걸린 것 (과다 오행) — 5 케이스 × 일간 한 줄 변형.
//
// 구조:
// - 5 오행 본문 (도입 + 차단 메커니즘 + 비움 처방) — 오행별 변형
// - 두 번째 문단 아래 일간 한 줄 단락 (부사로 연결) — 일간별 변형
//
// 사용자 결정 2026-05-11:
// - 섹션 제목이 "과다 오행" → 오행 5분기 유지
// - HTML 원본 톤 답습 — "{ILGAN} 일간이 원래도 ~한데 거기에 ~"
// - 두 번째 문단 아래에 일간 특징 한 줄 (부사 활용)
// - 합성: 5 오행 × 10 일간 = 50 조합 가능 (오행 본문 + 일간 한 줄 = 15 piece)

import AiBlock from "@/features/saju-result/views/yeonwoo/paid/components/AiBlock";
import { YeonwooBubble, VarTag } from "@/features/saju-result/views/yeonwoo/paid/components/Section";

interface OhangCase {
  label: string;
  ohang: string;
  ohang_hanja: string;
  blockade_sub: string;
  para_1_intro: string;       // 도입 (1단락)
  para_2_blockade: string;    // 차단 메커니즘 (2단락)
  para_4_remedy: string;      // 비움 처방 (4단락, 마지막)
}

// 5 오행 본문 (도입 + 차단 + 처방).
const OHANG_CASES: OhangCase[] = [
  {
    label: "A",
    ohang: "수",
    ohang_hanja: "수(水)",
    blockade_sub: "이 기운이 너무 깊어서 다른 인연이 안 들어와. 흐름이 막혔어.",
    para_1_intro:
      "네 명줄에 매듭이 보여. 한 곳에 너무 오래 묶여 있어서 색이 진해졌어. 풀려고 한 흔적도 안 보여. 그냥 끌어안고 살아왔지.",
    para_2_blockade:
      "수(水) 기운이 너무 무거워. 이게 새 인연이 들어올 자리를 막고 있어. 깊은 감정이 안에서만 돌고, 한 번 들어온 사람은 못 보내. 물 위에 또 물을 부은 격이야. 흐름이 안 돌아.",
    para_4_remedy:
      "비워. 사람이든 일이든 미련이든. 자리가 비어야 새 실이 들어와. 지금처럼 꽉 차 있으면 누가 와도 못 머물러. 너 혼자 다 쥐고 있는 거야. 인연이 안 오는 게 아니라 들어올 틈이 없는 거야.",
  },
  {
    label: "B",
    ohang: "목",
    ohang_hanja: "목(木)",
    blockade_sub: "자기 일에 뻗어 올라가느라 옆을 못 봐. 인연 들어올 자리가 없어.",
    para_1_intro:
      "네 명줄에 가지가 너무 많아. 자기 일이든 목표든 한 방향으로만 뻗어 올라왔지. 멈춰서 둘러본 적이 없어.",
    para_2_blockade:
      "목(木) 기운이 너무 무거워. 이게 새 인연이 들어올 자리를 막고 있어. 네 시야가 늘 앞으로만 향해 있어서 옆에 누가 와도 못 보고 지나쳐. 숲이 너무 무성하면 햇볕이 안 들어와.",
    para_4_remedy:
      "가지를 좀 쳐내. 일도 목표도 좀 내려놔봐. 한 발만 멈춰서 옆을 봐. 인연은 직진하는 사람을 따라가지 못해. 너는 너무 빨라서 인연이 못 따라잡는 거야.",
  },
  {
    label: "C",
    ohang: "화",
    ohang_hanja: "화(火)",
    blockade_sub: "한 번에 다 줘버려서 상대가 부담을 느껴. 빨리 식고 빨리 떠나.",
    para_1_intro:
      "네 명줄에 불이 너무 많아. 한 번에 뜨겁게 타올랐다가 한 번에 식어버렸지. 그 자리에 잿더미만 남았어.",
    para_2_blockade:
      "화(火) 기운이 너무 무거워. 이게 새 인연이 들어올 자리를 막고 있어. 너는 한 번 좋으면 100을 다 줘. 근데 그 강도가 상대한텐 부담이 돼. 빨리 식고 빨리 떠나. 불이 너무 세면 다 태워.",
    para_4_remedy:
      "세기를 좀 줄여. 처음부터 100 주지 마. 50만 줘도 충분해. 천천히 데우는 게 너는 어렵겠지만, 그래야 사람이 곁에 머물러. 잿불도 곁에 두면 따뜻해.",
  },
  {
    label: "D",
    ohang: "토",
    ohang_hanja: "토(土)",
    blockade_sub: "자기 자리에 너무 깊게 자리 잡아서 변화를 안 받아들여.",
    para_1_intro:
      "네 명줄에 흙이 너무 많아. 자기 자리에 너무 깊게 자리 잡아서 옆 사람이 다가올 길이 없어졌어.",
    para_2_blockade:
      "토(土) 기운이 너무 무거워. 이게 새 인연이 들어올 자리를 막고 있어. 너는 안정이 좋아서 변화를 안 받아들여. 새 사람은 새로운 결인데, 너는 익숙한 자리만 지키니까 인연이 못 들어와.",
    para_4_remedy:
      "자리를 좀 비워. 익숙한 일상에 한 가지만 새 걸 넣어봐. 새 카페, 새 동선, 새 사람. 너는 한 번 자리 잡으면 안 움직이는 결인데, 가끔은 흙을 갈아엎어줘야 새 씨앗이 들어와.",
  },
  {
    label: "E",
    ohang: "금",
    ohang_hanja: "금(金)",
    blockade_sub: "너무 빨리 자르고 너무 빨리 끊어. 시작도 못 한 인연이 잘려 있어.",
    para_1_intro:
      "네 명줄에 쇠가 너무 많아. 너무 빨리 자르고 너무 빨리 끊어. 그 자리에 시작도 못 한 인연이 잘려 있어.",
    para_2_blockade:
      "금(金) 기운이 너무 무거워. 이게 새 인연이 들어올 자리를 막고 있어. 너는 의심이 많아서 시작 전부터 끝을 봐. 한 번 마음에 안 들면 바로 잘라. 칼이 너무 날카로우면 사람이 못 다가와.",
    para_4_remedy:
      "날을 좀 무디게 해. 첫 마음에 안 드는 것 하나로 끊지 마. 두 번째 세 번째 기회를 줘. 너는 끊는 데 강한 만큼 키우는 데 약해. 한 번은 끊지 말고 그냥 둬봐. 의외로 거기서 인연이 자라.",
  },
];

// 일간별 한 줄 단락 (두 번째 문단 아래 추가) — 부사 자연 연결.
// HTML 원본 답습: "{ILGAN} 일간이 원래도 깊은데 거기에 같은 기운이 더 쌓였어."
// 부사: "거기에" / "더구나" / "게다가" / "특히" 등
const ILGAN_TRAIT_FOR_BLOCKADE: Record<string, string> = {
  갑목: "거기에 갑목(甲木) 일간이 원래도 자기 일에 한 방향으로만 뻗는 결이라, 옆을 돌아볼 시간이 더 없어졌어.",
  을목: "거기에 을목(乙木) 일간이 원래도 옆에 감을 데가 있어야 자라는 결이라, 혼자 남으면 더 시들어.",
  병화: "거기에 병화(丙火) 일간이 원래도 한 번에 100을 주는 결이라, 그 강도가 더 부담스러워져.",
  정화: "거기에 정화(丁火) 일간이 원래도 한 번 켜진 마음이 안 꺼지는 결이라, 잔불이 더 오래 남아.",
  무토: "거기에 무토(戊土) 일간이 원래도 한 자리만 지키는 결이라, 그 자리가 더 굳어버려.",
  기토: "거기에 기토(己土) 일간이 원래도 다 줘서 자기를 비우는 결이라, 빈 자리가 더 커져.",
  경금: "거기에 경금(庚金) 일간이 원래도 단호하게 끊는 결이라, 끊은 자리가 더 날카로워져.",
  신금: "거기에 신금(辛金) 일간이 원래도 흠집을 영원히 기억하는 결이라, 그 자국이 더 깊어져.",
  임수: "거기에 임수(壬水) 일간이 원래도 깊게 흐르는 결이라, 같은 기운이 더 쌓여 흐름이 더 막혔어.",
  계수: "거기에 계수(癸水) 일간이 원래도 천천히 스며드는 결이라, 흩어진 자리가 더 잡히지 않아.",
};

const OHANG_META: Record<string, { color: string; icon: string }> = {
  수: { color: "#5DA8E8", icon: "🌊" },
  목: { color: "#7CC97A", icon: "🌳" },
  화: { color: "#E8736A", icon: "🔥" },
  토: { color: "#D4A86A", icon: "⛰️" },
  금: { color: "#C8C8D0", icon: "⚔️" },
};

/** AI 박스 합성 — 오행 본문 + 일간 한 줄을 두 번째 문단 아래에 끼움. */
function composeAi(ohang: OhangCase, ilgan: string): string {
  const trait = ILGAN_TRAIT_FOR_BLOCKADE[ilgan];
  return [
    ohang.para_1_intro,
    ohang.para_2_blockade,
    trait,                  // ← 두 번째 문단 아래 일간 한 줄 단락
    ohang.para_4_remedy,
  ].join("\n\n");
}

// 사용자가 일간 토글로 톤 비교 가능하게 — 임수 + 갑목 두 일간 보여주기 (대비 명확).
const ILGAN_PREVIEW: string[] = ["임수", "갑목"];

export default function P3BlockadeCasesPage() {
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
            P-3 2-1 명줄에 걸린 것 — 5 오행 × 일간 한 줄
          </h1>
          <p className="text-[12px] text-[#888] mt-2 leading-relaxed">
            오행 5 본문 + 두 번째 문단 아래 일간 한 줄 단락 (부사 연결)
            <br />
            아래는 임수 / 갑목 두 일간으로 미리보기. 다른 일간 8종 한 줄 변형은 페이지 끝.
          </p>
        </header>

        <div className="space-y-12">
          {OHANG_CASES.map((c) => {
            const meta = OHANG_META[c.ohang];
            return (
              <section key={c.label}>
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[13px] font-bold text-[#0a0a09]"
                    style={{ background: "#E8C9A0" }}
                  >
                    {c.label}
                  </span>
                  <span className="text-[13px] text-[#d8d6d0]">{c.ohang_hanja} 과다</span>
                  <span
                    className="ml-auto text-[11px] px-2 py-0.5 rounded-full"
                    style={{
                      background: `${meta.color}22`,
                      color: meta.color,
                      border: `0.5px solid ${meta.color}55`,
                    }}
                  >
                    {meta.icon} {c.ohang}
                  </span>
                </div>

                {/* card-warn 과다 구조 카드 */}
                <div
                  className="rounded-[8px] px-[11px] py-[10px] my-[7px]"
                  style={{
                    background: "rgba(220,60,60,0.08)",
                    border: "0.5px solid rgba(220,80,80,0.2)",
                  }}
                >
                  <div
                    className="text-[12px] font-semibold uppercase mb-[14px]"
                    style={{ color: "#E24B4A", letterSpacing: "0.08em" }}
                  >
                    과다 구조
                  </div>
                  <div
                    className="text-[14px] font-semibold leading-[1.45] mb-[8px]"
                    style={{ color: "#f0c0c0", wordBreak: "keep-all" }}
                  >
                    <VarTag>{c.ohang_hanja}</VarTag> 과다
                  </div>
                  <div
                    className="text-[13px] leading-[1.7]"
                    style={{
                      color: "rgba(240,180,180,0.85)",
                      wordBreak: "keep-all",
                    }}
                  >
                    {c.blockade_sub}
                  </div>
                </div>

                {/* 일간 2개로 AI 박스 미리보기 */}
                {ILGAN_PREVIEW.map((ilgan) => (
                  <div key={ilgan} className="mb-4">
                    <div
                      className="text-[11px] mb-1 ml-1"
                      style={{ color: "#888" }}
                    >
                      일간: <span style={{ color: "#E8C9A0", fontWeight: 700 }}>{ilgan}</span>
                    </div>
                    <AiBlock text={composeAi(c, ilgan)} />
                  </div>
                ))}

                <YeonwooBubble text="내 눈엔 보여. 네 명줄에 뭔가 걸려 있어." />
              </section>
            );
          })}
        </div>

        {/* 일간 10 한 줄 변형 비교 박스 (페이지 끝) */}
        <section className="mt-16">
          <h2
            className="text-[16px] font-bold text-[#E8C9A0] mb-4 text-center"
            style={{ fontFamily: "var(--font-nanum-myeongjo)" }}
          >
            일간 10 한 줄 변형 — 두 번째 문단 아래 들어가는 단락
          </h2>
          <div className="space-y-2">
            {Object.entries(ILGAN_TRAIT_FOR_BLOCKADE).map(([ilgan, trait]) => (
              <div
                key={ilgan}
                className="rounded-[6px] px-3 py-2.5"
                style={{
                  background: "#141413",
                  border: "0.5px solid rgba(200,168,112,0.15)",
                }}
              >
                <div
                  className="text-[11px] mb-1"
                  style={{ color: "#E8C9A0", letterSpacing: "0.05em" }}
                >
                  {ilgan}
                </div>
                <div
                  className="text-[13px] leading-[1.7]"
                  style={{ color: "#b0aea4", wordBreak: "keep-all" }}
                >
                  {trait}
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-10 mb-4 text-center text-[11px] text-[#666]">
          5 오행 본문은 고정 / 일간 한 줄만 사용자에 따라 자동 치환
          <br />
          어색한 일간 표현이나 부사 연결 발견하면 알려주세요.
        </footer>
      </div>
    </main>
  );
}
