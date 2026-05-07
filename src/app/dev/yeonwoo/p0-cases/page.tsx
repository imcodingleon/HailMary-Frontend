// dev 전용 P-0 0-5 첫인사 톤 검증 — 5 케이스 한 화면에 비교.
// 백엔드 templates/yeonwoo_p0_intro.py compose_p0_intro() 출력 결과 동기화.

import AiBlock from "@/features/saju-result/views/yeonwoo/paid/components/AiBlock";

interface Case {
  label: string;
  ilgan: string;
  excess: string;
  lack: string;
  ai_intro: string;
}

const CASES: Case[] = [
  {
    label: "A",
    ilgan: "갑목",
    excess: "화 과다",
    lack: "금 부족",
    ai_intro:
      "촛불 앞에 앉으니까 네 결이 보여.\n\n" +
      "갑목(甲木) 일간이라 곧게 뻗는 결이 단단해. 마음 정하면 끝까지 밀고 가는 사람이지. 굽힐 줄 모르는 그 결이 너를 살리기도 하고 부러뜨리기도 해.\n\n" +
      "그러나 화(火)가 너무 뜨거워서 사람들이 그 빛에 눈을 돌려. 그러다 식어버리기도 하지.\n\n" +
      "그리고 금(金)이 비어 있어서 가다듬는 자리가 약해. 그래서 흘러내리는 거야.\n\n" +
      "그러니깐 다음 장부터 이걸 하나씩 풀어줄게. 너는 거기 그대로 있어. 내가 다 보여줄 테니까.",
  },
  {
    label: "B",
    ilgan: "임수",
    excess: "수 과다",
    lack: "토 부족",
    ai_intro:
      "촛불 앞에 앉으니까 네 결이 보여.\n\n" +
      "임수(壬水) 일간이라 겉으론 차분한데 속은 깊은 사람이지. 한 번 마음 주면 다 줘버리는 결이야. 매력은 분명한데, 그게 너를 살리기도 하고 다치게도 해.\n\n" +
      "그러나 수(水)가 너무 넘쳐서 사람들이 그 깊이에 겁을 먹어. 그러다 떠나기도 하지.\n\n" +
      "그리고 토(土)가 비어 있어서 받쳐주는 자리가 약해. 그래서 흘러내리는 거야.\n\n" +
      "그러니깐 다음 장부터 이걸 하나씩 풀어줄게. 너는 거기 그대로 있어. 내가 다 보여줄 테니까.",
  },
  {
    label: "C",
    ilgan: "정화",
    excess: "토 과다",
    lack: "수 부족",
    ai_intro:
      "촛불 앞에 앉으니까 네 결이 보여.\n\n" +
      "정화(丁火) 일간이라 작게 오래 타는 결이야. 한 사람만 깊게 데우는 사람이지. 그 정성이 너를 살리기도 하고 바람 한 번에 흔들리게도 해.\n\n" +
      "그러나 토(土)가 너무 무거워서 사람들이 네 결을 못 넘어. 그러다 길을 잃기도 하지.\n\n" +
      "그리고 수(水)가 비어 있어서 적셔주는 자리가 약해. 그래서 흘러내리는 거야.\n\n" +
      "그러니깐 다음 장부터 이걸 하나씩 풀어줄게. 너는 거기 그대로 있어. 내가 다 보여줄 테니까.",
  },
  {
    label: "D",
    ilgan: "경금",
    excess: "목 과다",
    lack: "화 부족",
    ai_intro:
      "촛불 앞에 앉으니까 네 결이 보여.\n\n" +
      "경금(庚金) 일간이라 단단하고 분명한 결이야. 옳고 그름을 잘라낼 줄 아는 사람이지. 그 날카로움이 너를 살리기도 하고 사람을 다치게도 해.\n\n" +
      "그러나 목(木)이 너무 곧고 거세서 사람들이 네 결에 부딪혀. 그러다 떠나기도 하지.\n\n" +
      "그리고 화(火)가 비어 있어서 데워주는 자리가 약해. 그래서 흘러내리는 거야.\n\n" +
      "그러니깐 다음 장부터 이걸 하나씩 풀어줄게. 너는 거기 그대로 있어. 내가 다 보여줄 테니까.",
  },
  {
    label: "E",
    ilgan: "계수",
    excess: "금 과다",
    lack: "목 부족",
    ai_intro:
      "촛불 앞에 앉으니까 네 결이 보여.\n\n" +
      "계수(癸水) 일간이라 가만히 흐르고 조용히 적시는 사람이지. 작아 보이는데 결국 모든 틈을 채우는 결이야. 그 섬세함이 너를 살리기도 하고 자기를 잃게도 해.\n\n" +
      "그러나 금(金)이 너무 단단해서 사람들이 네 날에 베여. 그러다 등 돌리기도 하지.\n\n" +
      "그리고 목(木)이 비어 있어서 뻗어 나가는 자리가 약해. 그래서 흘러내리는 거야.\n\n" +
      "그러니깐 다음 장부터 이걸 하나씩 풀어줄게. 너는 거기 그대로 있어. 내가 다 보여줄 테니까.",
  },
];

export default function P0CasesPage() {
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
            P-0 0-5 첫인사 — 5 케이스 톤 검증
          </h1>
          <p className="text-[12px] text-[#888] mt-2 leading-relaxed">
            backend templates/yeonwoo_p0_intro.py compose_p0_intro() 출력
            <br />
            22조각 → 250 조합 가능 / AI 호출 0
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
                <span className="text-[13px] text-[#d8d6d0]">
                  {c.ilgan} · {c.excess} · {c.lack}
                </span>
              </div>
              <AiBlock text={c.ai_intro} />
            </section>
          ))}
        </div>

        <footer className="mt-10 mb-4 text-center text-[11px] text-[#666]">
          톤 어색한 부분 있으면 알려주세요. 일간 10 / 과다 5 / 부족 5 = 22조각
          중 어느 것이든 즉시 수정.
        </footer>
      </div>
    </main>
  );
}
