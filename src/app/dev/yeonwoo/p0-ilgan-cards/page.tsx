// dev 전용 P-0 0-3 너의 일간 카드 — 10 일간 한 화면 비교.
//
// 백엔드 value_object/ilgan_cards.py의 ILGAN_CARDS dict 동기화.
// HTML 명세 (line 1572~1596) .ilgan-card-yw 디자인 그대로.

interface IlganCardData {
  name_kor: string;
  name_han: string;
  subtitle: string;
  essence: string;
  in_love: ReadonlyArray<string>;
  caution: string;
}

const CARDS: ReadonlyArray<{ label: string; ilgan: string; card: IlganCardData }> = [
  {
    label: "A",
    ilgan: "갑목",
    card: {
      name_kor: "갑목",
      name_han: "甲木",
      subtitle: "큰 나무 · 곧게 뻗은 결",
      essence: "하늘로 곧게 뻗는 큰 나무. 굽히기보다 부러지는 결을 가진 사람.",
      in_love: [
        "한 번 정하면 끝까지 밀고 가는 직진형",
        "지키고 싶은 사람 앞에선 더 단단해짐",
        "굽히지 못해 사소한 데서 부딪히는 결",
      ],
      caution: "네 곧음이 상대를 짓누를 수 있어. 가끔은 휘어줘.",
    },
  },
  {
    label: "B",
    ilgan: "을목",
    card: {
      name_kor: "을목",
      name_han: "乙木",
      subtitle: "풀·덩굴 · 휘어 살아남는 결",
      essence: "바위 틈에서도 자라는 덩굴. 부드러운데 끝까지 살아남는 사람.",
      in_love: [
        "상대에 맞춰 결을 휘는 적응력",
        "기대고 싶은 사람한테 깊이 감기는 결",
        "버려질까 두려워 먼저 놓아버리는 경향",
      ],
      caution: "휘어주는 게 네 매력인데, 너무 감기면 네가 먼저 닳아.",
    },
  },
  {
    label: "C",
    ilgan: "병화",
    card: {
      name_kor: "병화",
      name_han: "丙火",
      subtitle: "태양 · 환하게 비추는 결",
      essence: "모두를 비추는 한낮의 해. 들어오는 사람마다 따뜻해지는 사람.",
      in_love: [
        "먼저 다가가 온도를 올리는 결",
        "표현이 빠르고 숨김없는 직관형",
        "관심이 식으면 빛이 한꺼번에 사라짐",
      ],
      caution: "네 빛이 너무 세면 상대가 눈을 돌려. 그늘도 같이 줘야 해.",
    },
  },
  {
    label: "D",
    ilgan: "정화",
    card: {
      name_kor: "정화",
      name_han: "丁火",
      subtitle: "촛불 · 작게 오래 타는 결",
      essence: "작은 불꽃인데 밤새 꺼지지 않는 촛불. 고요한 정성으로 사랑하는 사람.",
      in_love: [
        "조용히 곁을 지키는 은근한 결",
        "한 사람만 깊게 데우는 집중형",
        "바람 한 번에 흔들리는 예민함",
      ],
      caution: "네 불꽃을 알아주는 사람한테만 가. 거센 바람은 너를 꺼버려.",
    },
  },
  {
    label: "E",
    ilgan: "무토",
    card: {
      name_kor: "무토",
      name_han: "戊土",
      subtitle: "큰 산 · 흔들리지 않는 결",
      essence: "우뚝 선 산처럼 묵직한 사람. 누구라도 기댈 수 있는 자리를 가진 결.",
      in_love: [
        "상대를 다 받아주는 너른 품",
        "표현은 적어도 행동으로 증명하는 결",
        "한 번 등 돌리면 다시 오르기 어려움",
      ],
      caution: "다 받아주다 네가 무너져. 산도 가끔은 비를 흘려보내야 해.",
    },
  },
  {
    label: "F",
    ilgan: "기토",
    card: {
      name_kor: "기토",
      name_han: "己土",
      subtitle: "밭 · 묵묵히 키워내는 결",
      essence: "씨를 받아 가만히 길러내는 부드러운 흙. 옆 사람을 자라게 하는 따뜻한 사람.",
      in_love: [
        "상대의 결점까지 품어 키워주는 너른 결",
        "조심스럽고 세심해서 오래 가는 다정함",
        "받기보다 주는 데 익숙해 자기를 잊는 경향",
      ],
      caution: "네가 키운 마음에 네 자리도 꼭 남겨둬.",
    },
  },
  {
    label: "G",
    ilgan: "경금",
    card: {
      name_kor: "경금",
      name_han: "庚金",
      subtitle: "도끼·바위 · 베고 가는 결",
      essence: "단단하고 거친 쇠. 옳고 그름이 분명한, 잘라낼 줄 아는 사람.",
      in_love: [
        "할 말은 하는 직설적인 결",
        "결심이 서면 흔들리지 않는 단단함",
        "상처 줄까 봐 먼저 거리를 두는 습관",
      ],
      caution: "네 날카로움이 사람을 다치게 해. 갈고 다듬어서 써.",
    },
  },
  {
    label: "H",
    ilgan: "신금",
    card: {
      name_kor: "신금",
      name_han: "辛金",
      subtitle: "보석 · 다듬어진 결",
      essence: "잘 닦인 보석처럼 빛나는 사람. 눈에 띄는데 쉽게 잡히지 않는 결.",
      in_love: [
        "은근한 자존감이 매력으로 도는 결",
        "감정을 들키지 않으려는 단정함",
        "상처를 오래 마음에 새기는 예민함",
      ],
      caution: "네 빛을 알아보는 사람한테만 곁을 줘. 험하게 다루는 손은 끊어내.",
    },
  },
  {
    label: "I",
    ilgan: "임수",
    card: {
      name_kor: "임수",
      name_han: "壬水",
      subtitle: "큰 물 · 깊은 바다",
      essence: "깊고 잔잔한데 안에서 끊임없이 도는 물. 보이는 것보다 훨씬 큰 사람.",
      in_love: [
        "한 번 빠지면 끝까지 가는 결",
        "표현이 늦지만 한 번 하면 깊음",
        "침묵으로 사랑을 증명하려는 경향",
      ],
      caution: "네 깊이를 못 받는 사람한테 가지 마.",
    },
  },
  {
    label: "J",
    ilgan: "계수",
    card: {
      name_kor: "계수",
      name_han: "癸水",
      subtitle: "이슬·시냇물 · 스며드는 결",
      essence: "가만히 흐르고 조용히 적시는 물. 작아 보이는데 결국 모든 틈을 채우는 사람.",
      in_love: [
        "분위기와 감정을 먼저 읽는 섬세함",
        "느리게 스며들어 깊게 자리잡는 결",
        "상대 기분에 너무 맞추다 자기를 잃음",
      ],
      caution: "흐른다고 다 받아들이지 마. 멈춰야 할 자리는 멈춰.",
    },
  },
];

export default function P0IlganCardsPage() {
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
            P-0 0-3 너의 일간 — 10 케이스
          </h1>
          <p className="text-[12px] text-[#888] mt-2 leading-relaxed">
            backend value_object/ilgan_cards.py ILGAN_CARDS dict 동기화
            <br />
            정적 카드 풀 — 일간별 본질/연애/주의 (LLM 호출 0)
          </p>
        </header>

        <div className="space-y-8">
          {CARDS.map(({ label, ilgan, card }) => (
            <section key={ilgan}>
              <div className="mb-2 flex items-center gap-2">
                <span
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[13px] font-bold text-[#0a0a09]"
                  style={{ background: "#E8C9A0" }}
                >
                  {label}
                </span>
                <span className="text-[13px] text-[#d8d6d0]">
                  {card.name_kor}({card.name_han})
                </span>
              </div>

              {/* .ilgan-card-yw 디자인 답습 */}
              <div
                className="relative rounded-xl p-3.5 my-2.5"
                style={{
                  background: "linear-gradient(180deg,#1a1a18 0%,#161614 100%)",
                  border: "0.5px solid rgba(200,168,112,0.25)",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{
                    background:
                      "linear-gradient(90deg,transparent,#E8C9A0,transparent)",
                  }}
                />
                <div className="text-[16px] font-semibold text-[#E8C9A0] mb-0.5">
                  너의 일간 — {card.name_kor}({card.name_han})
                </div>
                <div className="text-[12px] text-[#888] mb-2.5 pb-2 border-b border-dashed border-[rgba(200,168,112,0.2)] tracking-[0.05em]">
                  {card.subtitle}
                </div>

                <IlganSec label="결">
                  <p>{card.essence}</p>
                </IlganSec>

                <IlganSec label="연애에서">
                  <ul className="list-none p-0 m-0">
                    {card.in_love.map((item, i) => (
                      <li
                        key={i}
                        className="relative pl-2.5 mb-[3px] text-[#d8d6d0]"
                      >
                        <span className="absolute left-[2px] text-[#E8C9A0]">
                          ·
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </IlganSec>

                <IlganSec label="주의">
                  <p>{card.caution}</p>
                </IlganSec>
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-10 mb-4 text-center text-[11px] text-[#666]">
          일간 10 정적 카드 풀 — 어색한 표현/문장 있으면 알려주세요.
        </footer>
      </div>
    </main>
  );
}

function IlganSec({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-2.5">
      <div className="text-[13px] text-[#E8C9A0] tracking-[0.15em] mb-1 uppercase">
        {label}
      </div>
      <div className="text-[13px] leading-[1.7] text-[#d8d6d0]">{children}</div>
    </div>
  );
}
