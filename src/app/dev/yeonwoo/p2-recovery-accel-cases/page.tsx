// dev 전용 P-2 1-5 회복 가속 (card-good) — 10 케이스 v5 톤.
//
// v5 룰: value = 객관 처방 (행동 리스트, 점·중점 구분),
//        sub = 연우 톤 한 줄 (반말 어미, 캐릭터 약간).
//
// 명리 도메인 기반 처방:
// - 일간 본질이 회복에 도움되는 행동 선택
// - 갑목 = 새 목표, 경금 = 단호 단절, 병화 = 사람·외부, 을목 = 옆에 누구
//   무토 = 일상 회귀, 기토 = 누구 챙기기, 계수 = 자기 시간, 정화 = 천천히
//   신금 = 외양 정리, 임수 = 물리적 끊기 (HTML 원본)

interface Case {
  label: string;
  ilgan: string;
  speed: "FAST" | "MEDIUM" | "SLOW";
  accel: {
    value: string;  // 객관 처방 행동 리스트
    sub: string;    // 연우 톤 한 줄
  };
}

const CASES: Case[] = [
  // ── FAST ⚡ ────────────────────────────────────────
  {
    label: "A",
    ilgan: "갑목(甲木)",
    speed: "FAST",
    accel: {
      value: "새 목표 · 운동 · 도전 거리",
      sub: "다음 방향이 정해지면 너는 안 돌아봐.",
    },
  },
  {
    label: "G",
    ilgan: "경금(庚金)",
    speed: "FAST",
    accel: {
      value: "확실한 단절 · 운동 · 새 일거리",
      sub: "한 번에 깨끗하게 끊어. 너 잘하는 거잖아.",
    },
  },
  {
    label: "C",
    ilgan: "병화(丙火)",
    speed: "FAST",
    accel: {
      value: "사람 많은 모임 · 외부 활동 · 햇볕",
      sub: "사람들 사이에 있을 때 너는 가장 빨리 빛을 되찾아.",
    },
  },
  // ── MEDIUM 🌱 ─────────────────────────────────────
  {
    label: "B",
    ilgan: "을목(乙木)",
    speed: "MEDIUM",
    accel: {
      value: "친구 자주 만나기 · 가벼운 여행 · 새 환경",
      sub: "혼자 두지 마. 너는 옆에 누가 있어야 살아.",
    },
  },
  {
    label: "E",
    ilgan: "무토(戊土)",
    speed: "MEDIUM",
    accel: {
      value: "일상 루틴 · 책상 정리 · 새 일거리",
      sub: "익숙한 자리로 돌아가. 거기서부터 다시 단단해져.",
    },
  },
  {
    label: "F",
    ilgan: "기토(己土)",
    speed: "MEDIUM",
    accel: {
      value: "친구·가족 챙기기 · 반려동물 · 작은 봉사",
      sub: "누구를 챙기는 게 너의 회복 방법이야.",
    },
  },
  {
    label: "J",
    ilgan: "계수(癸水)",
    speed: "MEDIUM",
    accel: {
      value: "자기 시간 확보 · 글쓰기 · 가까운 한 명",
      sub: "조용히 너 자신을 들여다봐. 그 시간에 가장 풀려.",
    },
  },
  // ── SLOW 🕯️ ──────────────────────────────────────
  {
    label: "D",
    ilgan: "정화(丁火)",
    speed: "SLOW",
    accel: {
      value: "작은 루틴 · 새 취미 · 조용한 시간",
      sub: "너 자신을 다그치지 마. 천천히 가도 괜찮아.",
    },
  },
  {
    label: "H",
    ilgan: "신금(辛金)",
    speed: "SLOW",
    accel: {
      value: "외양 정리 · 미용 · 새 옷",
      sub: "겉부터 다시 빛나봐. 그게 너한텐 회복 시작이야.",
    },
  },
  {
    label: "I",
    ilgan: "임수(壬水)",
    speed: "SLOW",
    accel: {
      value: "물건 정리 · 사진 삭제 · 동선 차단",
      sub: "흔적을 물리적으로 끊어. 그게 너한텐 가장 빨라.",
    },
  },
];

const SPEED_META: Record<Case["speed"], { color: string; icon: string; label: string }> = {
  FAST: { color: "#5DCAA5", icon: "⚡", label: "FAST" },
  MEDIUM: { color: "#E8C9A0", icon: "🌱", label: "MEDIUM" },
  SLOW: { color: "#D4537E", icon: "🕯️", label: "SLOW" },
};

export default function P2RecoveryAccelCasesPage() {
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
            P-2 1-5 회복 가속 — 10 케이스 v5 톤
          </h1>
          <p className="text-[12px] text-[#888] mt-2 leading-relaxed">
            label = &ldquo;회복 가속&rdquo; 고정 / value = 처방 행동 리스트 / sub = 연우 톤 한 줄
            <br />
            card-good (청록 톤) 스타일
          </p>
        </header>

        <div className="space-y-6">
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

                {/* card-good 회복 가속 카드 (SelfPart2Page의 CardGood 컴포넌트와 동일 스타일) */}
                <div
                  className="rounded-[8px] px-[11px] py-[10px]"
                  style={{
                    background: "rgba(29,158,117,0.07)",
                    border: "0.5px solid rgba(29,158,117,0.2)",
                  }}
                >
                  <div
                    className="text-[12px] font-semibold uppercase mb-[14px]"
                    style={{ color: "#5DCAA5", letterSpacing: "0.08em" }}
                  >
                    회복 가속
                  </div>
                  <div
                    className="text-[14px] font-semibold leading-[1.45] mb-[8px]"
                    style={{ color: "#a0e8d0", wordBreak: "keep-all" }}
                  >
                    {c.accel.value}
                  </div>
                  <div
                    className="text-[14px] leading-[1.7]"
                    style={{
                      color: "rgba(160,220,200,0.8)",
                      wordBreak: "keep-all",
                    }}
                  >
                    {c.accel.sub}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <footer className="mt-10 mb-4 text-center text-[11px] text-[#666]">
          명리 도메인 기반 일간별 회복 처방 (FAST/MEDIUM/SLOW와 별개)
          <br />
          어색한 일간/처방 발견하면 알려주세요.
        </footer>
      </div>
    </main>
  );
}
