// 도윤 결제 직후 인트로 — 5컷.
// 톤: 분석가/전문가 — 차분, 단정, 미세한 자신감.

export type DoyoonPaidIntroStep =
  | { type: "dialogue"; bg: string; speaker?: string; lines: string[] }
  | { type: "cta"; bg: string; label: string };

export const DOYOON_PAID_INTRO_STEPS: DoyoonPaidIntroStep[] = [
  {
    type: "dialogue",
    bg: "/doyoon/paid-intro/paid-intro-1.png",
    speaker: "한도윤",
    lines: ["결제해 주셨군요. 현명한 선택입니다, 손님."],
  },
  {
    type: "dialogue",
    bg: "/doyoon/paid-intro/paid-intro-2.png",
    speaker: "한도윤",
    lines: ["이제부터가 진짜 분석입니다. 무료 버전은 말 그대로 예고편이었으니까요."],
  },
  {
    type: "dialogue",
    bg: "/doyoon/paid-intro/paid-intro-3.png",
    speaker: "한도윤",
    lines: ["손님의 데이터를 전부 불러왔습니다."],
  },
  {
    type: "dialogue",
    bg: "/doyoon/paid-intro/paid-intro-4.png",
    speaker: "한도윤",
    lines: ["연애 패턴, 타이밍, 숨겨진 변수까지. 제가 완벽하게 분석해드리겠습니다."],
  },
  {
    type: "dialogue",
    bg: "/doyoon/paid-intro/paid-intro-5.png",
    speaker: "한도윤",
    lines: ["준비되셨나요?"],
  },
  {
    type: "cta",
    bg: "/doyoon/paid-intro/paid-intro-5.png",
    label: "결과 보기",
  },
];

export const DOYOON_PAID_INTRO_CHAR_DELAY = 35;

// 모든 컷 전환을 살짝의 크로스페이드로 처리
export const DOYOON_PAID_INTRO_CROSSFADE_ENTER_STEPS = new Set<number>([1, 2, 3, 4, 5]);
