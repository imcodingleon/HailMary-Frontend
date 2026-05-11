// dev 전용 P-2 1-5 이별 후 회복 — v2 직관 톤.
// v1(시적/명리 메타포) → v2(직관 행동/상태) 비교 버전.
//
// 원칙: title = 그 시점의 체감/상태 (직관 표현),
//       desc = 그 시점에서 일어나는 구체적 변화/행동.
//       명리 메타포는 백엔드 AI 박스에 양보, 카드는 일상 언어.

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
      { time: "직후", title: "이미 마음은 떠났어", desc: "결정한 순간 정리가 거의 끝났어." },
      { time: "3일 후", title: "옛 사람이 잘 안 떠올라", desc: "벌써 다른 거에 몰입하고 있어." },
      { time: "2주 후", title: "그 사람 누구였지 싶어", desc: "기억 자체가 흐릿해지기 시작해." },
    ],
  },
  {
    label: "G",
    ilgan: "경금(庚金)",
    speed: "FAST",
    timeline: [
      { time: "직후", title: "이미 끝낸 사람이야", desc: "결정 내린 순간 끝이야. 미련 없어." },
      { time: "3일 후", title: "다른 일에 몰두 중", desc: "옛날 일 생각할 시간도 아까워." },
      { time: "2주 후", title: "연락이 없어도 무덤덤해", desc: "이미 다음 챕터로 넘어갔어." },
    ],
  },
  {
    label: "C",
    ilgan: "병화(丙火)",
    speed: "FAST",
    timeline: [
      { time: "직후", title: "겉은 환한데 안은 어두워", desc: "사람들 앞에선 또 웃는데 혼자 있을 때 무너져." },
      { time: "3일 후", title: "새로운 데로 눈이 가", desc: "아직 옛 생각 나지만 다른 곳도 보여." },
      { time: "2주 후", title: "다시 들떠 있어", desc: "벌써 새 누군가한테 빛나고 있어." },
    ],
  },
  // ── MEDIUM 🌱 ─────────────────────────────────────
  {
    label: "B",
    ilgan: "을목(乙木)",
    speed: "MEDIUM",
    timeline: [
      { time: "직후", title: "혼자 있는 게 가장 힘들어", desc: "옆에 누가 없으면 불안해져." },
      { time: "1개월 후", title: "새 사람한테 조심스럽게 다가가", desc: "아직 옛 사람 흔적은 남아 있어." },
      { time: "3개월 후", title: "다시 누구 옆에 있어", desc: "이제야 옛 사람이 잘 안 떠올라." },
    ],
  },
  {
    label: "E",
    ilgan: "무토(戊土)",
    speed: "MEDIUM",
    timeline: [
      { time: "직후", title: "한 자리에서 멍하니 있어", desc: "어디로 움직여야 할지 모르겠어." },
      { time: "1개월 후", title: "일상 루틴이 돌아오는 중", desc: "천천히 묻혀가는 게 느껴져." },
      { time: "3개월 후", title: "다시 단단해졌어", desc: "흔들렸던 게 거짓말 같아." },
    ],
  },
  {
    label: "F",
    ilgan: "기토(己土)",
    speed: "MEDIUM",
    timeline: [
      { time: "직후", title: "다 비워진 느낌", desc: "줄 마음이 남아있지 않아." },
      { time: "1개월 후", title: "다시 챙길 사람 찾는 중", desc: "누구를 돌보고 싶은 마음이 살짝 돌아와." },
      { time: "3개월 후", title: "또 누구를 키우고 있어", desc: "내가 또 정성 쏟고 있더라." },
    ],
  },
  {
    label: "J",
    ilgan: "계수(癸水)",
    speed: "MEDIUM",
    timeline: [
      { time: "직후", title: "내가 어디 있는지 모르겠어", desc: "기운이 흩어져서 잡히질 않아." },
      { time: "1개월 후", title: "조금씩 내 결을 찾아가", desc: "옅게나마 내가 보이기 시작해." },
      { time: "3개월 후", title: "새 사람한테 다가갈 수 있어", desc: "이제야 천천히 가까이 가." },
    ],
  },
  // ── SLOW 🕯️ ──────────────────────────────────────
  {
    label: "D",
    ilgan: "정화(丁火)",
    speed: "SLOW",
    timeline: [
      { time: "직후", title: "겉은 멀쩡한데 안에서 계속 타", desc: "잠 들기 전이 가장 힘들어." },
      { time: "3개월 후", title: "겉으론 다 잊은 척해", desc: "근데 안엔 아직 그 사람이 있어." },
      { time: "6개월 후", title: "새 사람한테 마음 켤 수 있어", desc: "옛 자리 옆에 새 자리 만들었어." },
    ],
  },
  {
    label: "H",
    ilgan: "신금(辛金)",
    speed: "SLOW",
    timeline: [
      { time: "직후", title: "안에 자국이 깊게 박혔어", desc: "사람들 앞에선 멀쩡한 척해." },
      { time: "3개월 후", title: "표면은 다시 빛나", desc: "근데 자국은 그대로 남아있어." },
      { time: "6개월 후", title: "자국을 안고 살기로 했어", desc: "사라지진 않아. 같이 가는 거야." },
    ],
  },
  {
    label: "I",
    ilgan: "임수(壬水)",
    speed: "SLOW",
    timeline: [
      { time: "직후", title: "그 사람 흔적이 계속 보여", desc: "어딜 가도 마주칠 것 같아." },
      { time: "3개월 후", title: "겉은 잔잔한데 안에서 계속 돌아", desc: "꺼낸 적도 없는데 자꾸 떠올라." },
      { time: "6개월 후", title: "이제 새 흐름이 보여", desc: "여전히 깊이 남아있지만 다른 데도 눈이 가." },
    ],
  },
];

const SPEED_META: Record<Case["speed"], { color: string; icon: string; label: string }> = {
  FAST: { color: "#5DCAA5", icon: "⚡", label: "FAST" },
  MEDIUM: { color: "#E8C9A0", icon: "🌱", label: "MEDIUM" },
  SLOW: { color: "#D4537E", icon: "🕯️", label: "SLOW" },
};

export default function P2RecoveryCasesV2Page() {
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
            P-2 1-5 이별 후 회복 — v2 직관 톤
          </h1>
          <p className="text-[12px] text-[#888] mt-2 leading-relaxed">
            title = 그 시점의 체감/상태 (직관 표현)
            <br />
            desc = 구체적 변화/행동 (일상 언어)
          </p>
          <div className="mt-3 flex justify-center gap-3 text-[12px]">
            <a href="/dev/yeonwoo/p2-recovery-cases" className="underline text-[#888]">
              v1 시적
            </a>
            <span className="text-[#E8C9A0] font-bold">v2 직관 (현재)</span>
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
          v1(시적) vs v2(직관) 비교 — 어느 쪽이 자연스러운지 알려주세요.
        </footer>
      </div>
    </main>
  );
}
