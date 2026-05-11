// dev 전용 P-2 1-5 이별 후 회복 — v3 진짜 직관 톤.
//
// v1(시적 메타포) / v2(직관이라 했으나 명리 잔존) / v3(메타포 0, 실제 심리/행동만)
//
// 원칙:
// - title = 그 시점 실제 심리 상태 (1인칭 직관)
// - desc = 구체적 행동/감정 ("자존감 떨어져", "잠 못 자", "친구 자주 만나")
// - 명리 메타포(가지/쇠/안개/흙)는 백엔드 AI 박스에 전부 양보
// - 일간 본질은 카드 *내용*(어떤 행동/감정인지)으로 표현, *비유*가 아니라.

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
      { time: "직후", title: "이미 마음 정리됐어", desc: "헤어진 순간 그걸로 끝이라고 봐." },
      { time: "3일 후", title: "옛 사람 생각 거의 안 해", desc: "다른 거에 집중하고 있어." },
      { time: "2주 후", title: "벌써 새 사람한테 관심 가", desc: "걘 그냥 지나간 사람이야." },
    ],
  },
  {
    label: "G",
    ilgan: "경금(庚金)",
    speed: "FAST",
    timeline: [
      { time: "직후", title: "이미 끝낸 사람이야", desc: "정 떨어진 순간 그걸로 끝이야." },
      { time: "3일 후", title: "일에 빠져있어", desc: "그 사람 떠올릴 시간도 없어." },
      { time: "2주 후", title: "연락 와도 안 받을 거야", desc: "다시 돌아갈 일 없어." },
    ],
  },
  {
    label: "C",
    ilgan: "병화(丙火)",
    speed: "FAST",
    timeline: [
      { time: "직후", title: "혼자 있을 때 무너져", desc: "사람들 앞에선 또 웃고 있어." },
      { time: "3일 후", title: "다른 데로 눈 가기 시작해", desc: "아직 옛 생각 나지만 새 관심사도 생겼어." },
      { time: "2주 후", title: "이미 누군가한테 들떠 있어", desc: "옛 사람 빠르게 흐려져." },
    ],
  },
  // ── MEDIUM 🌱 ─────────────────────────────────────
  {
    label: "B",
    ilgan: "을목(乙木)",
    speed: "MEDIUM",
    timeline: [
      { time: "직후", title: "혼자 있는 게 가장 무서워", desc: "옆에 누구라도 있었으면 싶어." },
      { time: "1개월 후", title: "친구들 자주 만나", desc: "혼자 시간을 못 견디겠어." },
      { time: "3개월 후", title: "다시 누구 옆에 있어", desc: "그 사람 생각이 줄어들었어." },
    ],
  },
  {
    label: "E",
    ilgan: "무토(戊土)",
    speed: "MEDIUM",
    timeline: [
      { time: "직후", title: "멍하니 시간만 흘려보내", desc: "뭘 해야 할지 모르겠어." },
      { time: "1개월 후", title: "원래 하던 거 다시 시작했어", desc: "일상이 돌아오는 중이야." },
      { time: "3개월 후", title: "다시 안정됐어", desc: "흔들렸던 게 거짓말 같아." },
    ],
  },
  {
    label: "F",
    ilgan: "기토(己土)",
    speed: "MEDIUM",
    timeline: [
      { time: "직후", title: "다 쓴 느낌이야", desc: "줄 정이 남아있지 않아." },
      { time: "1개월 후", title: "누구 챙기고 싶은 마음이 슬쩍 돌아와", desc: "친구 한 명한테 자꾸 신경 쓰여." },
      { time: "3개월 후", title: "또 정 쏟을 사람이 생겼어", desc: "내가 다시 누구한테 푹 빠져있더라." },
    ],
  },
  {
    label: "J",
    ilgan: "계수(癸水)",
    speed: "MEDIUM",
    timeline: [
      { time: "직후", title: "내가 한심해 보여", desc: "내가 뭐가 부족했나 자꾸 따져봐." },
      { time: "1개월 후", title: "조금씩 나를 다시 좋아해", desc: "내 잘못만은 아니었구나 싶어져." },
      { time: "3개월 후", title: "이제 새 사람 만날 자신 생겼어", desc: "내 가치를 다시 알겠어." },
    ],
  },
  // ── SLOW 🕯️ ──────────────────────────────────────
  {
    label: "D",
    ilgan: "정화(丁火)",
    speed: "SLOW",
    timeline: [
      { time: "직후", title: "겉은 멀쩡한데 안에서 계속 생각나", desc: "잠 들기 전이 가장 힘들어." },
      { time: "3개월 후", title: "겉으론 다 잊은 척해", desc: "근데 안엔 아직 그 사람이 남아있어." },
      { time: "6개월 후", title: "새 사람한테 마음 줘볼 수 있어", desc: "옛 자리 옆에 새 자리 만들었어." },
    ],
  },
  {
    label: "H",
    ilgan: "신금(辛金)",
    speed: "SLOW",
    timeline: [
      { time: "직후", title: "자존심이 박살났어", desc: "사람들 앞에선 멀쩡한 척해." },
      { time: "3개월 후", title: "겉으론 다시 멀쩡해", desc: "근데 그 일이 자꾸 떠올라." },
      { time: "6개월 후", title: "그 기억은 안 사라져", desc: "그래도 그냥 안고 살기로 했어." },
    ],
  },
  {
    label: "I",
    ilgan: "임수(壬水)",
    speed: "SLOW",
    timeline: [
      { time: "직후", title: "그 사람 흔적이 계속 보여", desc: "어딜 가도 마주칠 것 같아." },
      { time: "3개월 후", title: "겉으론 다 잊은 척 살아", desc: "근데 안에선 자꾸 떠올라." },
      { time: "6개월 후", title: "이제 새로 시작할 수 있어", desc: "여전히 마음 한쪽에 남아있지만 다른 데도 눈 가." },
    ],
  },
];

const SPEED_META: Record<Case["speed"], { color: string; icon: string; label: string }> = {
  FAST: { color: "#5DCAA5", icon: "⚡", label: "FAST" },
  MEDIUM: { color: "#E8C9A0", icon: "🌱", label: "MEDIUM" },
  SLOW: { color: "#D4537E", icon: "🕯️", label: "SLOW" },
};

export default function P2RecoveryCasesV3Page() {
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
            P-2 1-5 이별 후 회복 — v3 진짜 직관 톤
          </h1>
          <p className="text-[12px] text-[#888] mt-2 leading-relaxed">
            카드 = 실제 심리/행동만 (메타포 0)
            <br />
            명리 메타포는 백엔드 AI 박스에서만 사용
          </p>
          <div className="mt-3 flex justify-center gap-3 text-[12px]">
            <a href="/dev/yeonwoo/p2-recovery-cases" className="underline text-[#888]">
              v1 시적
            </a>
            <a href="/dev/yeonwoo/p2-recovery-cases-v2" className="underline text-[#888]">
              v2 (혼합)
            </a>
            <span className="text-[#E8C9A0] font-bold">v3 직관 (현재)</span>
          </div>
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
          v3 진짜 직관 — 실제 심리/행동만, 명리 메타포는 0.
          <br />
          어색하거나 일간 본질과 안 맞는 카드 있으면 알려주세요.
        </footer>
      </div>
    </main>
  );
}
