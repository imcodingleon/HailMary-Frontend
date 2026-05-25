// 도윤 유료 결과 후 스토리 클로징 씬 — 10컷.
// 흐름: 도윤 마무리(1~6) → 연우 등장 + 붉은 플래시(7) → 연우 멘트(8) → 도윤 응수(9) → 연우 도발 + CTA(10)
// 컷 7: 연우 등장 — 붉은 화면 플래시
// 컷 10: 도윤 분석 거부하는 사용자에게 연우가 던지는 도발 + 연우 free 결과로 CTA

export type DoyoonPaidClosingStep =
  | {
      type: "dialogue";
      bg: string;
      speaker: string;
      lines: string[];
    }
  | {
      type: "dramatic-dialogue";
      bg: string;
      speaker: string;
      lines: string[];
      flashColor?: "white" | "red";
      dialogueDelayMs?: number; // 진입 후 대사 띄우기 전 hold (그동안 탭 무시 + 박스 숨김)
      dialogueBottomPx?: number; // 박스 하단 여백 (기본 80px). 작을수록 박스가 아래로 내려감.
    }
  | {
      type: "final-cta";       // 컷 10 — 연우 free 결과로 라우팅 CTA 포함
      bg: string;
      speaker: string;
      lines: string[];
      ctaLabel: string;
    };

export const DOYOON_PAID_CLOSING_STEPS: DoyoonPaidClosingStep[] = [
  // 컷 1 — 도윤 정리 도입
  {
    type: "dialogue",
    bg: "/doyoon/closing-cuts/cut-01.png",
    speaker: "한도윤",
    lines: [
      "리포트는 다 읽으셨나요? 당신의 연애를 망치던 변수들, 제 알고리즘으로 완벽하게 차단해 두었습니다.",
    ],
  },
  // 컷 2 — 안전한 길 안내
  {
    type: "dialogue",
    bg: "/doyoon/closing-cuts/cut-02.png",
    speaker: "한도윤",
    lines: ["이제 험한 길 갈 필요 없어요. 제가 짜놓은 이 안전하고 예쁜 길로만 걸으시면 됩니다."],
  },
  // 컷 3 — 결과지 나침반
  {
    type: "dialogue",
    bg: "/doyoon/closing-cuts/cut-03.png",
    speaker: "한도윤",
    lines: [
      "불안할 때마다 엉뚱한 사람 찾지 말고, 오늘의 결과지를 나침반처럼 꼭 쥐고 계세요.",
    ],
  },
  // 컷 4 — 시간 지남, 배웅 유도
  {
    type: "dialogue",
    bg: "/doyoon/closing-cuts/cut-04.png",
    speaker: "한도윤",
    lines: [
      "당신과 이야기하느라 시간 가는 줄도 몰랐네요. 벌써 밖이 꽤 어두워졌어요. 슬슬 일어날까요?",
    ],
  },
  // 컷 5 — 배웅
  {
    type: "dialogue",
    bg: "/doyoon/closing-cuts/cut-05.png",
    speaker: "한도윤",
    lines: ["배웅해드릴게요."],
  },
  // 컷 6 — 문 여는 도윤 손
  {
    type: "dialogue",
    bg: "/doyoon/closing-cuts/cut-06.png",
    speaker: "한도윤",
    lines: ["가실까요?"],
  },
  // 컷 7 — 연우 등장 (흰 플래시 + 슬로 크로스페이드로 극적 등장)
  {
    type: "dramatic-dialogue",
    bg: "/doyoon/closing-cuts/cut-07.png",
    speaker: "강연우",
    lines: [
      "쯧-, 데이터 쪼가리만 믿다가 잡귀 꼬일지 모르니까, 내 기운도 하나 얹어둔다.",
    ],
    flashColor: "white",
  },
  // 컷 8 — 손바닥 위 붉은 실 (붉은 플래시 + 2초 hold + 박스 아래로 내림)
  {
    type: "dramatic-dialogue",
    bg: "/doyoon/closing-cuts/cut-08.png",
    speaker: "강연우",
    lines: ["나중에 나한테 징징대지 말고. 받아."],
    flashColor: "red",
    dialogueDelayMs: 2000,
    dialogueBottomPx: 40, // 80px 기본값에서 40px로 ↓ — 손 위 실에 시선 집중
  },
  // 컷 9 — 도윤 응수
  {
    type: "dialogue",
    bg: "/doyoon/closing-cuts/cut-09.png",
    speaker: "한도윤",
    lines: [
      "질투가 심하신 분이라 어쩔 수 없네요. 그래도 당신을 보호해 주겠다는 결론은 저와 같으니 안심하세요.",
    ],
  },
  // 컷 10 — 연우 도발 + CTA
  {
    type: "final-cta",
    bg: "/doyoon/closing-cuts/cut-10.png",
    speaker: "강연우",
    lines: [
      "뭐, 네가 그 헛소리에 혼자 숨어 있겠다면 안 말려. 근데 네 주변에 똥차들, 한심한 인간들 널렸잖아? 진짜 이유를 알고 싶지 않아?",
    ],
    ctaLabel: "강연우의 정통사주 보러가기",
  },
];

export const DOYOON_PAID_CLOSING_CHAR_DELAY = 35;

// 진한 크로스페이드 단계 — 컷 6→7(연우 등장), 컷 7→8(붉은 실 등장)
export const DOYOON_PAID_CLOSING_DRAMATIC_STEPS = new Set<number>([5, 6]);
