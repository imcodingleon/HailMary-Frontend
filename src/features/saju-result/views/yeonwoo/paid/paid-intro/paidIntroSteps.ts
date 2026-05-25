export type PaidIntroStep =
  | { type: "dialogue"; bg: string; speaker?: string; lines: string[] }
  | { type: "cta"; bg: string; label: string };

export const PAID_INTRO_STEPS: PaidIntroStep[] = [
  {
    type: "dialogue",
    bg: "/yeonwoo/paid-intro/paid-intro-1.png",
    speaker: "강연우",
    lines: ["...결제까지 했네. 뭐, 어차피 네 명줄 제대로 보려면 이 정도는 필요했어."],
  },
  {
    type: "dialogue",
    bg: "/yeonwoo/paid-intro/paid-intro-2.png",
    speaker: "강연우",
    lines: ["이제 진짜 시작이야. 아까 건 맛보기였고."],
  },
  {
    type: "dialogue",
    bg: "/yeonwoo/paid-intro/paid-intro-3.png",
    speaker: "강연우",
    lines: ["...기대해도 돼."],
  },
  {
    type: "cta",
    bg: "/yeonwoo/paid-intro/paid-intro-3.png",
    label: "결과 보기",
  },
];

export const PAID_INTRO_CHAR_DELAY = 35;

// 모든 컷 전환을 살짝의 크로스페이드로 처리 (블랙 페이드 없음)
export const PAID_INTRO_CROSSFADE_ENTER_STEPS = new Set<number>([1, 2, 3]);
