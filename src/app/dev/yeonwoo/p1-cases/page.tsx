// dev 전용 P-1 1-1 챕터 오프닝 톤 검증 — 5 케이스 한 화면 비교.
// 백엔드 templates/yeonwoo_p1_chapter_opening.py compose_p1_chapter_opening() 출력 동기화.
// 풀 템플릿: 1·2단락 = 일간 10 / 3단락 = 일주 60갑자 / 4단락 = LOVE_TYPE 10. AI 호출 0.

import AiBlock from "@/features/saju-result/views/yeonwoo/paid/components/AiBlock";

interface Case {
  label: string;
  ilgan: string;
  ilju: string;
  loveType: string;
  ai_intro: string;
}

const CASES: Case[] = [
  {
    label: "A",
    ilgan: "갑목(甲木)",
    ilju: "갑자(甲子)",
    loveType: "직진 단단형",
    ai_intro:
      "촛불 앞에 앉으니 네 명줄이 보여. 곧게 뻗는 나무처럼 결이 단단해. 흔들리지 않아.\n\n" +
      "갑목(甲木) 일간이 그래. 곧게 뻗는 결이라 굽힐 줄을 몰라. 정한 사람한테 끝까지 가는데, 그 곧음이 상대를 짓누를 때도 있어.\n\n" +
      "갑자(甲子) 일주는 거기에 한 겹 더 얹은 결이야. 곧은 나무에 새벽 물기가 깃든 모양이지. 그래서 속을 깊이 감춘 학자 같은 사람이야.\n\n" +
      "직진 단단형이라는 게 그래서 나와. 한 번 정하면 안 돌아봐. 그러나 한 번쯤은 휘어줘. 곧음만으론 사람이 못 견뎌.",
  },
  {
    label: "B",
    ilgan: "임수(壬水)",
    ilju: "임술(壬戌)",
    loveType: "깊고 잔잔한 결",
    ai_intro:
      "촛불 앞에 앉으니 네 명줄이 보여. 깊은 물처럼 흐르는데 표면은 잔잔해. 안에서 돌고 있어. 밖에선 안 보일 뿐이야.\n\n" +
      "임수(壬水) 일간이 그래. 속이 너무 깊어서 사람들이 네 진짜 마음을 못 읽어. 너는 이미 다 줬는데 상대는 아직도 모르고 있어.\n\n" +
      "임술(壬戌) 일주는 거기에 한 겹 더 얹은 결이야. 깊은 물 위에 또 안개가 낀 모양이지. 그래서 너는 누가 다가와도 한 번에 못 알아봐.\n\n" +
      "깊고 잔잔한 결이라는 게 그래서 나와. 한 번쯤은 네가 먼저 말해. 침묵으로 사랑을 증명하려 들지 마. 그건 네 방식일 뿐 상대의 언어가 아니야.",
  },
  {
    label: "C",
    ilgan: "정화(丁火)",
    ilju: "정묘(丁卯)",
    loveType: "은근한 정성형",
    ai_intro:
      "촛불 앞에 앉으니 네 명줄이 보여. 작은 불꽃인데 밤새 꺼지지 않아. 한 곳만 깊게 데워.\n\n" +
      "정화(丁火) 일간이 그래. 한 사람만 깊게 데우는 집중형이야. 바람 한 번에 흔들리는 예민함도 같이 와.\n\n" +
      "정묘(丁卯) 일주는 거기에 한 겹 더 얹은 결이야. 작은 촛불에 풀 한 줄기가 곁들인 모양이지. 그래서 직관이 뛰어난 영감형 사람이야.\n\n" +
      "은근한 정성형이라는 게 그래서 나와. 한 사람만 깊게 데워. 그러니까 네 불꽃을 알아주는 사람한테만 가.",
  },
  {
    label: "D",
    ilgan: "경금(庚金)",
    ilju: "경오(庚午)",
    loveType: "단호한 결단형",
    ai_intro:
      "촛불 앞에 앉으니 네 명줄이 보여. 단단하고 거친 쇠처럼 결이 분명해. 잘라낼 줄 알아.\n\n" +
      "경금(庚金) 일간이 그래. 옳고 그름이 분명해서 아닌 관계는 잘라내. 그러다 사람을 다치게 하기도 해.\n\n" +
      "경오(庚午) 일주는 거기에 한 겹 더 얹은 결이야. 단단한 쇠가 한낮의 해에 녹는 모양이지. 그래서 카리스마로 책임지는 사람이야.\n\n" +
      "단호한 결단형이라는 게 그래서 나와. 옳고 그름이 분명해. 그런데 갈고 다듬어서 써. 날카로움이 사람을 다치게 해.",
  },
  {
    label: "E",
    ilgan: "계수(癸水)",
    ilju: "계해(癸亥)",
    loveType: "스며드는 섬세형",
    ai_intro:
      "촛불 앞에 앉으니 네 명줄이 보여. 가만히 흐르고 조용히 적시는 결이야. 작은데 결국 모든 틈을 채워.\n\n" +
      "계수(癸水) 일간이 그래. 분위기와 감정을 먼저 읽는 섬세함이 있어. 느리게 스며들어 깊게 자리잡는 결이야.\n\n" +
      "계해(癸亥) 일주는 거기에 한 겹 더 얹은 결이야. 작은 물 두 갈래가 모인 모양이지. 그래서 가장 섬세하게 스며드는 계수야.\n\n" +
      "스며드는 섬세형이라는 게 그래서 나와. 그런데 흐른다고 다 받아들이지 마. 멈춰야 할 자리는 멈춰.",
  },
];

export default function P1CasesPage() {
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
            P-1 1-1 챕터 오프닝 — 5 케이스 톤 검증
          </h1>
          <p className="text-[12px] text-[#888] mt-2 leading-relaxed">
            backend templates/yeonwoo_p1_chapter_opening.py 풀 템플릿
            <br />
            1·2단락 = 일간 10 / 3단락 = 일주 60갑자 / 4단락 = LOVE_TYPE 10
            <br />
            합계 90 조각 → 600 조합 / AI 호출 0
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
                  {c.ilgan} · {c.ilju} · {c.loveType}
                </span>
              </div>
              <AiBlock text={c.ai_intro} />
            </section>
          ))}
        </div>

        <footer className="mt-10 mb-4 text-center text-[11px] text-[#666]">
          1·2·4단락 톤은 일간 10 템플릿 (AI 비용 0).
          <br />
          3단락은 일주 + LOVE_TYPE 결합 = AI 호출 1회 (~$0.005/챕터).
          <br />
          톤 어색한 부분 있으면 알려주세요.
        </footer>
      </div>
    </main>
  );
}
