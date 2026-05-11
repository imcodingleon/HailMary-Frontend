// dev 전용 P-2 1-5 회복 AI 박스 — v2 (시적·명리 풍부 톤).
//
// v1(직관) → v2(시적·명리 비유 살짝 풍부)
//
// 사용자 결정 2026-05-11:
// - 카드는 v5 객관 톤 유지
// - AI 박스만 시적/명리 표현 섞임 OK
// - 도입에 일간 본질 비유 풀기, 본문에 비유 + 일상 처방 섞기, 마무리에 한자 + 따뜻한 권유

import AiBlock from "@/features/saju-result/views/yeonwoo/paid/components/AiBlock";

interface Case {
  label: string;
  ilgan: string;
  speed: "FAST" | "MEDIUM" | "SLOW";
  ai_recovery: string;
}

const CASES: Case[] = [
  // ── FAST ⚡ ────────────────────────────────────────
  {
    label: "A",
    ilgan: "갑목(甲木)",
    speed: "FAST",
    ai_recovery:
      "갑목은 큰 나무야. 곧게 자라서 한 번 결정하면 안 돌아보는 결. 이별도 그래.\n\n" +
      "직후엔 이미 정리에 들어간 사람이야. 3일이면 옛 사람 떠올리는 빈도가 거의 없어져. 너는 새 목표나 새 도전 거리에 자연스럽게 빠져들어. 운동을 시작하거나 새 일을 벌이는 게 가장 큰 회복 약이야.\n\n" +
      "2주가 지나면 '걔가 누구였더라' 싶을 정도로 흐려져. 너는 매정한 게 아니야. 큰 나무가 부러진 가지 자리를 안 채우는 것처럼, 옛 자리를 안 돌아보는 거야.\n\n" +
      "다만 너무 빨리 다음 사람을 들이지는 마. 갑목(甲木)은 한 번 뿌리내리면 깊게 들어가니까. 다음 자리는 신중하게 골라.",
  },
  {
    label: "G",
    ilgan: "경금(庚金)",
    speed: "FAST",
    ai_recovery:
      "경금은 큰 쇠야. 끊는 게 본업이고, 한 번 결정하면 뒤 안 봐. 그게 너 가장 큰 무기야.\n\n" +
      "3일이면 옛 관계 떠올릴 시간조차 안 둬. 일에 몰두하거나 운동을 시작하는 게 너한텐 가장 자연스러운 회복이야. 쇠는 두드릴수록 단단해지듯, 너도 움직일수록 빨리 풀려.\n\n" +
      "2주가 지나면 연락이 와도 무덤덤해. 다시 돌아갈 일 없다는 걸 너 자신이 가장 잘 알아.\n\n" +
      "다만 너무 깨끗하게 끊은 만큼 안에서 안 풀린 채로 남는 게 생겨. 경금(庚金)은 끊은 자리에 미세한 자국이 남는 일간이야. 한 번은 일기든 친구한테든 풀어내봐. 인정해줘야 진짜 사라져.",
  },
  {
    label: "C",
    ilgan: "병화(丙火)",
    speed: "FAST",
    ai_recovery:
      "병화는 태양이야. 큰 빛이라 한 번 환했던 만큼 한 번 깜깜해질 때 충격이 커. 근데 해는 매일 다시 떠.\n\n" +
      "직후엔 사람들 앞에선 평소처럼 환한 척하지만 혼자 있을 때 무너져. 그 시간 굳이 숨기지 마. 친한 사람한테 말하거나 사람 많은 모임에 나가는 게 가장 빠른 약이야. 너는 사람들 사이에서 빛을 되찾는 결이거든.\n\n" +
      "3일이면 다른 데로 관심이 옮겨가기 시작해. 2주 후엔 이미 새 누군가한테 들떠 있을 수도.\n\n" +
      "다만 새 사람을 너무 빨리 들이면 옛 자리의 어둠을 그 사람한테 투사할 수 있어. 병화(丙火)는 비추기 전에 한 번만 봐. 받을 준비가 된 사람인지.",
  },
  // ── MEDIUM 🌱 ─────────────────────────────────────
  {
    label: "B",
    ilgan: "을목(乙木)",
    speed: "MEDIUM",
    ai_recovery:
      "을목은 풀이야. 부드럽지만 끈질긴 결. 옆에 감을 데가 있어야 자라거든. 그래서 이별 직후가 가장 힘들어.\n\n" +
      "직후엔 옆에 누가 있어주길 가장 바라. 그 마음 부끄러워하지 마. 친구한테 자주 연락하고, 가벼운 여행을 잡는 게 너한텐 회복약이야. 풀은 옆에 다른 풀이 있을 때 더 빨리 자라.\n\n" +
      "1개월이 지나면 약속이 자연스럽게 늘어. 3개월쯤엔 새 사람한테 천천히 가까이 가게 돼.\n\n" +
      "다만 외로움 때문에 아무한테나 빨리 가지는 마. 을목(乙木)은 한 번 감기면 깊게 감겨. 옆에 있어줄 사람만 옆에 둬.",
  },
  {
    label: "E",
    ilgan: "무토(戊土)",
    speed: "MEDIUM",
    ai_recovery:
      "무토는 산이야. 옮길 수도 없고 흔들리지도 않는 결인데, 그래서 자리가 흔들리면 가장 큰 충격이 와.\n\n" +
      "직후엔 멍하니 시간만 흘러가. 뭘 해야 할지 판단이 안 서. 이 시기엔 큰 결정 하지 마. 그냥 원래 하던 일과 습관으로 천천히 돌아가는 게 가장 빠른 약이야. 산은 옮기지 않고 그 자리에 다시 단단해져.\n\n" +
      "1개월이 지나면 일상이 돌아와. 책상 정리, 새 일거리, 익숙한 루틴이 너를 다시 단단하게 만들어. 3개월쯤엔 흔들렸던 게 거짓말 같이 안정돼.\n\n" +
      "다만 새 사람 들이는 건 더 천천히 가도 돼. 무토(戊土)는 한 자리만 지켜주는 사람한테 마음 줘.",
  },
  {
    label: "F",
    ilgan: "기토(己土)",
    speed: "MEDIUM",
    ai_recovery:
      "기토는 밭이야. 누군가를 키우는 게 너의 사랑법이고, 그래서 사랑할 때 너를 비워. 이별 직후엔 다 비워진 느낌이 들어.\n\n" +
      "줄 정이 남아있지 않다고 느낄 거야. 이 시기엔 너 자신부터 챙겨봐. 친구나 가족한테 작은 신경을 다시 쓰기 시작하면 마음이 자연스럽게 돌아와. 흙은 한 번 갈아엎으면 새 씨앗을 받을 준비가 돼.\n\n" +
      "1개월이 지나면 누구를 챙기고 싶은 마음이 슬쩍 돌아와. 반려동물이나 작은 봉사도 도움돼. 3개월쯤엔 또 누군가한테 마음을 쏟고 있을 거야.\n\n" +
      "다만 줄 때 다 주지는 마. 기토(己土)는 너한테도 좀 남겨둬야 안 무너져.",
  },
  {
    label: "J",
    ilgan: "계수(癸水)",
    speed: "MEDIUM",
    ai_recovery:
      "계수는 안개야. 천천히 스며드는 결이라, 이별이 너 자신을 흔드는 경우가 많아.\n\n" +
      "직후엔 자존감이 급격히 떨어져. '내가 뭐가 부족했나' 끊임없이 자책해. 안개가 흩어지면 잡히질 않는 것처럼, 너도 너 자신을 잡지 못하는 시기야. 이 시기엔 자기 시간을 확보해. 글쓰기, 산책, 가까운 한 명과의 대화가 가장 빠른 약이야.\n\n" +
      "1개월이 지나면 이별 원인이 내 탓만은 아니었구나 깨닫기 시작해. 3개월쯤엔 다시 누군가 받아들일 자신이 생겨.\n\n" +
      "다만 자존감이 돌아오기 전에 새 사람한테 가지는 마. 계수(癸水)는 네 가치를 다시 알아야 다음 관계가 건강해.",
  },
  // ── SLOW 🕯️ ──────────────────────────────────────
  {
    label: "D",
    ilgan: "정화(丁火)",
    speed: "SLOW",
    ai_recovery:
      "정화는 촛불이야. 화려하지 않고 조용한 결인데, 한 번 켜진 마음이 안 꺼져. 잔잔하지만 안에서 오래 가.\n\n" +
      "직후엔 겉은 멀쩡한데 안에서 계속 그 사람이 떠올라. 잠 들기 전이 가장 힘들어. 촛불은 바람이 불면 더 흔들리듯, 너도 조용한 시간에 흔들려. 이 시기엔 너 자신을 다그치지 마. 작은 루틴과 새 취미를 한 가지씩 늘려가는 게 가장 빠른 약이야.\n\n" +
      "3개월이 지나도 표면적으로만 잊은 척이야. 6개월쯤엔 새 사람한테 마음을 줘볼 수 있어. 옛 자리 옆에 새 자리가 생겨.\n\n" +
      "다만 잊으려고 너무 노력하지는 마. 정화(丁火)는 천천히 가야 다음에 또 환하게 켜질 수 있어.",
  },
  {
    label: "H",
    ilgan: "신금(辛金)",
    speed: "SLOW",
    ai_recovery:
      "신금은 보석이야. 작지만 빛나는 결이라, 자존심 다친 자리가 가장 깊게 새겨져.\n\n" +
      "직후엔 사람들 앞에선 멀쩡한 척하지만 안에서 무너져 있어. 이 시기엔 외양부터 다시 정돈해봐. 미용, 새 옷, 외양 정리가 너한텐 회복 시작이야. 보석은 잘 닦을수록 빛나거든. 겉이 다시 빛나면 안이 따라와.\n\n" +
      "3개월이 지나면 표면은 다시 매끄러워. 6개월쯤엔 자국과 같이 살기로 받아들이게 돼.\n\n" +
      "다만 그 자국을 부끄러워하지 마. 신금(辛金)은 흠집까지 안고 살아도 여전히 빛나. 그게 너의 결이야.",
  },
  {
    label: "I",
    ilgan: "임수(壬水)",
    speed: "SLOW",
    ai_recovery:
      "임수는 깊은 물이야. 그 깊이가 안 보여서 사람들이 자주 놓치고, 너 자신도 안에서 끓는 흐름을 못 풀어.\n\n" +
      "직후엔 어딜 가도 그 사람 흔적이 보여. 자꾸 물건이 떠오르고 동선이 마주칠 것 같아. 이 시기엔 물건 정리, 사진 삭제, 동선 차단 — 물리적으로 끊는 게 너한텐 가장 빨라. 물이 고이면 썩지만 흐르게 두면 맑아져.\n\n" +
      "3개월이 지나도 겉은 잔잔한데 안에서 계속 돌아. 꺼낸 적도 없는데 자꾸 떠올라. 6개월쯤엔 다른 곳으로도 시선이 가기 시작해.\n\n" +
      "다만 안에서 끓이는 시간을 너무 끌지 마. 임수(壬水)는 입 밖으로 꺼내야 풀려. 친구든 일기든 한 줄이라도 적어봐.",
  },
];

const SPEED_META: Record<Case["speed"], { color: string; icon: string; label: string }> = {
  FAST: { color: "#5DCAA5", icon: "⚡", label: "FAST" },
  MEDIUM: { color: "#E8C9A0", icon: "🌱", label: "MEDIUM" },
  SLOW: { color: "#D4537E", icon: "🕯️", label: "SLOW" },
};

export default function P2RecoveryAiCasesV2Page() {
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
            P-2 1-5 회복 AI 박스 — v2 시적·명리 풍부
          </h1>
          <p className="text-[12px] text-[#888] mt-2 leading-relaxed">
            도입 = 일간 본질 비유 풀기 / 본문 = 비유 + 일상 처방 섞임
            <br />
            마무리 = 한자 + 따뜻한 권유 / 시적 표현 OK
          </p>
          <div className="mt-3 flex justify-center gap-3 text-[12px]">
            <a href="/dev/yeonwoo/p2-recovery-ai-cases" className="underline text-[#888]">
              v1 직관
            </a>
            <span className="text-[#E8C9A0] font-bold">v2 시적 (현재)</span>
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
                <AiBlock text={c.ai_recovery} />
              </section>
            );
          })}
        </div>

        <footer className="mt-10 mb-4 text-center text-[11px] text-[#666]">
          v1 직관 vs v2 시적 — 어느 톤이 1-5 AI 박스에 더 맞는지 비교해주세요.
        </footer>
      </div>
    </main>
  );
}
