// dev 전용 P-2 1-5 이별 후 회복 — v5 하이브리드.
//
// v1(시적) / v2(혼합) / v3(1인칭 직관) / v4(설명) → v5(title 설명 + desc 연우톤)
//
// 사용자 결정 2026-05-11:
// - title = v4 그대로 (객관 라벨 — 정보)
// - desc만 연우 톤 살짝 (반말 어미 "...야/해/어")
// - 카드 안에서 정보(상단) → 캐릭터 한 마디(하단) 흐름

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
      { time: "직후", title: "미련 없이 정리", desc: "이별을 결정한 순간부터 너는 이미 정리 들어가." },
      { time: "3일 후", title: "본인 일에 몰입", desc: "옛 관계에 마음 안 둬. 너는 네 일에 다시 빠져 있어." },
      { time: "2주 후", title: "기억이 빠르게 흐려짐", desc: "옛 사람 떠올리는 일이 거의 없어졌어." },
    ],
  },
  {
    label: "G",
    ilgan: "경금(庚金)",
    speed: "FAST",
    timeline: [
      { time: "직후", title: "결단력 있게 정리", desc: "한 번 끝낸 사람한텐 마음 다시 안 줘." },
      { time: "3일 후", title: "일에 깊이 빠짐", desc: "옛 관계 떠올릴 시간조차 안 둬." },
      { time: "2주 후", title: "연락이 와도 무덤덤", desc: "이미 다음 단계로 넘어가 있어." },
    ],
  },
  {
    label: "C",
    ilgan: "병화(丙火)",
    speed: "FAST",
    timeline: [
      { time: "직후", title: "겉은 환하지만 속은 무너짐", desc: "사람들 앞에선 평소처럼 환한데, 혼자 있을 때 무너져." },
      { time: "3일 후", title: "관심이 다른 데로 이동 시작", desc: "옛 생각 줄고 새 관심사가 생기기 시작해." },
      { time: "2주 후", title: "이미 누군가에게 들떠 있음", desc: "옛 사람 흔적이 빠르게 흐려져." },
    ],
  },
  // ── MEDIUM 🌱 ─────────────────────────────────────
  {
    label: "B",
    ilgan: "을목(乙木)",
    speed: "MEDIUM",
    timeline: [
      { time: "직후", title: "혼자 시간을 견디기 어려움", desc: "옆에 누가 있어주길 가장 바라는 시기야." },
      { time: "1개월 후", title: "친구·지인 자주 만남", desc: "혼자 시간을 줄이려고 자꾸 약속을 잡아." },
      { time: "3개월 후", title: "새로운 사람과 가까워짐", desc: "이제야 옛 사람 생각이 줄어들었어." },
    ],
  },
  {
    label: "E",
    ilgan: "무토(戊土)",
    speed: "MEDIUM",
    timeline: [
      { time: "직후", title: "방향을 잃고 멍한 상태", desc: "뭘 해야 할지 판단이 안 서는 시기야." },
      { time: "1개월 후", title: "일상 루틴 회복", desc: "원래 하던 일과 습관으로 천천히 돌아가고 있어." },
      { time: "3개월 후", title: "다시 안정적인 상태", desc: "흔들렸던 감정이 잦아들었어." },
    ],
  },
  {
    label: "F",
    ilgan: "기토(己土)",
    speed: "MEDIUM",
    timeline: [
      { time: "직후", title: "마음이 비어버린 상태", desc: "줄 정이 남아있지 않다고 느껴." },
      { time: "1개월 후", title: "누군가를 챙기고 싶은 마음 회복", desc: "친구나 가족한테 자연스럽게 신경 쓰게 돼." },
      { time: "3개월 후", title: "새 사람에게 정이 옮겨감", desc: "다시 누군가한테 마음을 쏟고 있어." },
    ],
  },
  {
    label: "J",
    ilgan: "계수(癸水)",
    speed: "MEDIUM",
    timeline: [
      { time: "직후", title: "자존감 급격 하락", desc: "내가 뭐가 부족했나 끊임없이 자책해." },
      { time: "1개월 후", title: "자기 가치 회복 시작", desc: "이별 원인이 내 탓만은 아니었구나 깨닫기 시작해." },
      { time: "3개월 후", title: "새 만남에 대한 자신감 회복", desc: "이제 다시 누군가를 받아들일 준비가 됐어." },
    ],
  },
  // ── SLOW 🕯️ ──────────────────────────────────────
  {
    label: "D",
    ilgan: "정화(丁火)",
    speed: "SLOW",
    timeline: [
      { time: "직후", title: "겉으론 평소대로, 속은 계속 끓음", desc: "잠 들기 전이 가장 힘든 시기야." },
      { time: "3개월 후", title: "표면적으론 잊은 척", desc: "내면엔 여전히 옛 사람이 남아있어." },
      { time: "6개월 후", title: "새 사람에게 마음 열 수 있음", desc: "옛 자리 옆에 새 자리가 만들어졌어." },
    ],
  },
  {
    label: "H",
    ilgan: "신금(辛金)",
    speed: "SLOW",
    timeline: [
      { time: "직후", title: "자존심에 큰 상처", desc: "겉으론 평소대로 행동하지만 내면이 무너져 있어." },
      { time: "3개월 후", title: "표면적 회복 완료", desc: "주변엔 멀쩡해 보이지만 그 일이 자주 떠올라." },
      { time: "6개월 후", title: "기억을 안고 살기로 함", desc: "지워지지 않는 자국이지만 같이 가기로 받아들였어." },
    ],
  },
  {
    label: "I",
    ilgan: "임수(壬水)",
    speed: "SLOW",
    timeline: [
      { time: "직후", title: "어디서나 옛 사람이 떠오름", desc: "일상 모든 곳에서 흔적이 보이는 시기야." },
      { time: "3개월 후", title: "겉으론 잊은 척", desc: "내면에선 여전히 자주 떠올리고 있어." },
      { time: "6개월 후", title: "새 시작이 가능한 시점", desc: "옛 사람이 마음 한쪽에 남아있지만 다른 곳으로도 시선이 가." },
    ],
  },
];

const SPEED_META: Record<Case["speed"], { color: string; icon: string; label: string }> = {
  FAST: { color: "#5DCAA5", icon: "⚡", label: "FAST" },
  MEDIUM: { color: "#E8C9A0", icon: "🌱", label: "MEDIUM" },
  SLOW: { color: "#D4537E", icon: "🕯️", label: "SLOW" },
};

export default function P2RecoveryCasesV5Page() {
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
            P-2 1-5 이별 후 회복 — v5 하이브리드
          </h1>
          <p className="text-[12px] text-[#888] mt-2 leading-relaxed">
            title = 객관 라벨 (정보) / desc = 연우 톤 살짝 (반말 어미)
            <br />
            카드 안에서 &ldquo;정보 → 캐릭터 한 마디&rdquo; 흐름
          </p>
          <div className="mt-3 flex justify-center gap-3 text-[12px]">
            <a href="/dev/yeonwoo/p2-recovery-cases" className="underline text-[#888]">
              v1
            </a>
            <a href="/dev/yeonwoo/p2-recovery-cases-v2" className="underline text-[#888]">
              v2
            </a>
            <a href="/dev/yeonwoo/p2-recovery-cases-v3" className="underline text-[#888]">
              v3
            </a>
            <a href="/dev/yeonwoo/p2-recovery-cases-v4" className="underline text-[#888]">
              v4
            </a>
            <span className="text-[#E8C9A0] font-bold">v5 (현재)</span>
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
          v5 — title 객관 / desc 연우 톤. 카드 안에서 정보 → 한 마디 흐름.
        </footer>
      </div>
    </main>
  );
}
