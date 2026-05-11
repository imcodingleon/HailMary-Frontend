// dev 전용 P-2 1-5 이별 후 회복 톤 검증 — 10 케이스 비교.
// 3그룹 (FAST/MEDIUM/SLOW)별 시간 라벨 패턴 + 일간별 카드 본문 (title+desc).
//
// FAST   ⚡ 직후/3일/2주    — 갑목, 경금, 병화 (단호·직진·재점화)
// MEDIUM 🌱 직후/1개월/3개월 — 을목, 무토, 기토, 계수 (천천히 묻기·다시 모임)
// SLOW   🕯️ 직후/3개월/6개월 — 정화, 신금, 임수 (잔불·흠집·가라앉음)

interface Case {
  label: string;
  ilgan: string;
  speed: "FAST" | "MEDIUM" | "SLOW";
  timeline: [
    { time: string; title: string; desc: string },
    { time: string; title: string; desc: string },
    { time: string; title: string; desc: string },
  ];
}

const CASES: Case[] = [
  // ── FAST ⚡ ────────────────────────────────────────
  {
    label: "A",
    ilgan: "갑목(甲木)",
    speed: "FAST",
    timeline: [
      { time: "직후", title: "가지가 부러진 자리", desc: "그 자리 자체는 안 채워져." },
      { time: "3일 후", title: "이미 새 줄기로 눈 돌렸어", desc: "옛 자리 다시 안 봐." },
      { time: "2주 후", title: "다른 길에 발 들였어", desc: "그 사람 생각이 안 나기 시작해." },
    ],
  },
  {
    label: "G",
    ilgan: "경금(庚金)",
    speed: "FAST",
    timeline: [
      { time: "직후", title: "쇠를 깬 자리", desc: "결정한 순간 이미 끝났어." },
      { time: "3일 후", title: "새 칼날을 벼리는 중", desc: "옛 사람 자체가 안 떠올라." },
      { time: "2주 후", title: "그 사람이 누구였더라", desc: "기억이 빠르게 흐려져." },
    ],
  },
  {
    label: "C",
    ilgan: "병화(丙火)",
    speed: "FAST",
    timeline: [
      { time: "직후", title: "꺼진 자리에 재만 남아", desc: "환했던 만큼 깜깜해." },
      { time: "3일 후", title: "새 불씨가 보여", desc: "아직 약하지만 다시 타려고 해." },
      { time: "2주 후", title: "다시 환해지기 시작해", desc: "사람들 앞에서 또 빛나고 있어." },
    ],
  },
  // ── MEDIUM 🌱 ─────────────────────────────────────
  {
    label: "B",
    ilgan: "을목(乙木)",
    speed: "MEDIUM",
    timeline: [
      { time: "직후", title: "감을 데가 사라졌어", desc: "혼자 서 있는 게 가장 힘들어." },
      { time: "1개월 후", title: "새 줄기 옆에 가까이 가", desc: "조심스럽게 다시 감기려 해." },
      { time: "3개월 후", title: "다시 곁이 생겼어", desc: "이제야 옛 자리가 안 보여." },
    ],
  },
  {
    label: "E",
    ilgan: "무토(戊土)",
    speed: "MEDIUM",
    timeline: [
      { time: "직후", title: "산이 한 조각 깎였어", desc: "그 자리는 안 채워져." },
      { time: "1개월 후", title: "흙이 새로 쌓이는 중", desc: "천천히 묻혀가는 게 느껴져." },
      { time: "3개월 후", title: "다시 묵직해졌어", desc: "흔들리던 자리가 단단해졌어." },
    ],
  },
  {
    label: "F",
    ilgan: "기토(己土)",
    speed: "MEDIUM",
    timeline: [
      { time: "직후", title: "밭이 빈 흙이 됐어", desc: "다 비워진 자리에 바람이 불어." },
      { time: "1개월 후", title: "흙을 다시 갈고 있어", desc: "새 씨앗 뿌릴 준비 중이야." },
      { time: "3개월 후", title: "새싹이 올라와", desc: "내가 또 누구를 키우고 있어." },
    ],
  },
  {
    label: "J",
    ilgan: "계수(癸水)",
    speed: "MEDIUM",
    timeline: [
      { time: "직후", title: "안개가 흩어졌어", desc: "내가 어디 있는지도 모를 만큼." },
      { time: "1개월 후", title: "조금씩 다시 모여", desc: "옅게나마 내 결을 되찾고 있어." },
      { time: "3개월 후", title: "다시 짙어졌어", desc: "새 사람한테도 천천히 스며들 수 있어." },
    ],
  },
  // ── SLOW 🕯️ ──────────────────────────────────────
  {
    label: "D",
    ilgan: "정화(丁火)",
    speed: "SLOW",
    timeline: [
      { time: "직후", title: "촛불이 흔들리지만 안 꺼져", desc: "겉은 잔잔한데 안에서 계속 타." },
      { time: "3개월 후", title: "심지가 짧아졌어", desc: "잔불은 남았는데 빛이 줄어들었어." },
      { time: "6개월 후", title: "새 등잔에 옮길 수 있어", desc: "옛 자리 그리워하면서도 새 자리에 켜져." },
    ],
  },
  {
    label: "H",
    ilgan: "신금(辛金)",
    speed: "SLOW",
    timeline: [
      { time: "직후", title: "흠집 자국이 깊어", desc: "겉은 매끄러운데 안에 자국이 박혔어." },
      { time: "3개월 후", title: "표면은 닦였어", desc: "다시 빛나는데 자국은 그대로야." },
      { time: "6개월 후", title: "흠집을 안고 살기로 했어", desc: "사라지진 않아. 같이 가는 거야." },
    ],
  },
  {
    label: "I",
    ilgan: "임수(壬水)",
    speed: "SLOW",
    timeline: [
      { time: "직후", title: "실이 잘려도 매듭은 남아", desc: "한동안은 그 사람 흔적이 계속 보여." },
      { time: "3개월 후", title: "물밑에 가라앉아 있어", desc: "겉은 잔잔한데 안에서 계속 도는 게 있어." },
      { time: "6개월 후", title: "물길이 풀리기 시작해", desc: "이제 새 흐름이 보여." },
    ],
  },
];

const SPEED_META: Record<Case["speed"], { color: string; icon: string; label: string }> = {
  FAST: { color: "#5DCAA5", icon: "⚡", label: "FAST" },
  MEDIUM: { color: "#E8C9A0", icon: "🌱", label: "MEDIUM" },
  SLOW: { color: "#D4537E", icon: "🕯️", label: "SLOW" },
};

export default function P2RecoveryCasesPage() {
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
            P-2 1-5 이별 후 회복 — 시간 라벨 + 본문 v1
          </h1>
          <p className="text-[12px] text-[#888] mt-2 leading-relaxed">
            10 일간 × 3 시간 카드 × (title + desc) + 끊어진 실 슬롯
            <br />
            3그룹 (FAST/MEDIUM/SLOW) 시간 라벨 + 일간별 본문
          </p>
        </header>

        <div className="space-y-10">
          {CASES.map((c) => {
            const meta = SPEED_META[c.speed];
            return (
              <section key={c.label}>
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[13px] font-bold text-[#0a0a09]"
                    style={{ background: "#E8C9A0" }}
                  >
                    {c.label}
                  </span>
                  <span className="text-[13px] text-[#d8d6d0]">{c.ilgan}</span>
                  <span
                    className="ml-auto text-[11px] px-2 py-0.5 rounded-full"
                    style={{
                      background: `${meta.color}22`,
                      color: meta.color,
                      border: `0.5px solid ${meta.color}55`,
                    }}
                  >
                    {meta.icon} {meta.label}
                  </span>
                </div>

                {/* 회복 단계 카드 4슬롯 (3 라벨 + 끊어진 실 그림) */}
                <div
                  className="my-[7px]"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                    gap: "6px",
                  }}
                >
                  {c.timeline.map((t, i) => (
                    <div
                      key={i}
                      className="rounded-[8px] px-[11px] py-[10px]"
                      style={{
                        background: "#1a1a18",
                        border: "0.5px solid #2a2a28",
                      }}
                    >
                      <div
                        className="text-[12px] font-semibold uppercase mb-[14px]"
                        style={{ color: "#E8C9A0", letterSpacing: "0.08em" }}
                      >
                        {t.time}
                      </div>
                      <div
                        className="text-[14px] font-semibold leading-[1.45] mb-[8px]"
                        style={{ color: "#f0ede8", wordBreak: "keep-all" }}
                      >
                        {t.title}
                      </div>
                      <div
                        className="text-[14px] leading-[1.7]"
                        style={{
                          color: "#b0aea4",
                          wordBreak: "keep-all",
                        }}
                      >
                        {t.desc}
                      </div>
                    </div>
                  ))}

                  {/* 끊어진 실 슬롯 (4번째) */}
                  <div
                    aria-hidden
                    className="rounded-[8px]"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundImage: "url(/yeonwoo/thread/thread_broken.png)",
                      backgroundSize: "75% auto",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundColor: "rgba(212,83,126,0.04)",
                      border: "0.5px dashed rgba(212,83,126,0.22)",
                      minHeight: "90px",
                      opacity: 0.95,
                    }}
                  />
                </div>
              </section>
            );
          })}
        </div>

        <footer className="mt-10 mb-4 text-center text-[11px] text-[#666]">
          시간 라벨 + 본문 톤 검증 후 → 회복 가속(card-good) + AI 박스 + 강연우 버블 추가 단계.
          <br />
          어색한 일간/시점 발견하면 알려주세요.
        </footer>
      </div>
    </main>
  );
}
