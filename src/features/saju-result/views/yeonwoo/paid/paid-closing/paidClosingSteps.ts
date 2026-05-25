// 유료 결과 후 스토리 클로징 씬 — 10컷.
// 흐름: 강연우 마무리(1~5) → 무대 전환(6) → 도윤 등장 + 결제 유도(7~10).
// 컷 6은 대사 없는 화면 전환. 컷 7은 도윤 등장 — 진한 크로스페이드.
// 컷 9는 극적 전환 (화이트 플래시).

export type PaidClosingStep =
  | {
      type: "dialogue";
      bg: string;
      speaker: string;
      lines: string[];
      ui?: "save-share-cta";   // 컷 2 — 저장/공유 버튼 동봉
    }
  | {
      type: "silent";
      bg: string;              // 컷 6 — 문 열리는 시점 (대사 없음, 자동 진행 X — 탭으로 진행)
    }
  | {
      type: "dramatic-dialogue";
      bg: string;
      speaker: string;
      lines: string[];
    }
  | {
      type: "final-cta";       // 컷 10 — 도윤 free 결과로 라우팅 CTA 포함
      bg: string;
      speaker: string;
      lines: string[];
      ctaLabel: string;
    };

export const PAID_CLOSING_STEPS: PaidClosingStep[] = [
  // 컷 1 — 강연우 정리 도입
  {
    type: "dialogue",
    bg: "/yeonwoo/closing-cuts/cut-01.jpeg",
    speaker: "강연우",
    lines: [
      "명식 다 읽었지? 네 사주에 들러붙은 찌꺼기들, 내가 깔끔하게 다 날려버렸으니까 이제 쫄지 마.",
    ],
  },
  // 컷 2 — 격려 (저장/공유 UI는 추후 구현 예정)
  {
    type: "dialogue",
    bg: "/yeonwoo/closing-cuts/cut-02.jpeg",
    speaker: "강연우",
    lines: ["네 명줄, 생각보다 질기고 예쁘니까 어깨 펴고 다니라고."],
  },
  // 컷 3 — 동 트는 창
  {
    type: "dialogue",
    bg: "/yeonwoo/closing-cuts/cut-03.png",
    speaker: "강연우",
    lines: ["...벌써 동 트네."],
  },
  // 컷 4 — 정면 응시 + 배웅 유도
  {
    type: "dialogue",
    bg: "/yeonwoo/closing-cuts/cut-04.png",
    speaker: "강연우",
    lines: ["갈 시간이야. 오래 있으면 내 기운 더 깎아먹어."],
  },
  // 컷 5 — 복도 / 배웅
  {
    type: "dialogue",
    bg: "/yeonwoo/closing-cuts/cut-05.png",
    speaker: "강연우",
    lines: ["뭐해. 가자."],
  },
  // 컷 6 — 문 여는 시점 (대사 없음, 화면 전환만)
  {
    type: "silent",
    bg: "/yeonwoo/closing-cuts/cut-06.png",
  },
  // 컷 7 — 도윤 등장 (진한 전환)
  {
    type: "dramatic-dialogue",
    bg: "/yeonwoo/closing-cuts/cut-07.png",
    speaker: "한도윤",
    lines: [
      "깔끔하게 처리했네, 연우야.",
      "어때요? 저희 선생님 실력이 꽤 듬직하죠?",
    ],
  },
  // 컷 8 — 도윤 여유 / 유지 보수 멘트
  {
    type: "dialogue",
    bg: "/yeonwoo/closing-cuts/cut-08.png",
    speaker: "한도윤",
    lines: [
      "이제 그 길을 이탈하지 않도록 '유지 보수'를 해야겠죠. 통계적으로 인간의 의지는 3일을 넘기기 힘드니까요.",
    ],
  },
  // 컷 9 — 연우 반박 (극적 전환)
  {
    type: "dramatic-dialogue",
    bg: "/yeonwoo/closing-cuts/cut-09.png",
    speaker: "강연우",
    lines: ["야, 재수 없는 소리 하지 마. 내 처방이 고작 3일짜리인 줄 알아?"],
  },
  // 컷 10 — 도윤 결제 유도 + CTA
  {
    type: "final-cta",
    bg: "/yeonwoo/closing-cuts/cut-10.png",
    speaker: "한도윤",
    lines: [
      "그럼 이렇게 하죠. 손님의 지인들 연애를 통해 확인시켜 드릴 테니, 주변 친구들에게 제 명함을 전해주세요.",
    ],
    ctaLabel: "한도윤의 데이터 사주 보러가기",
  },
];

export const PAID_CLOSING_CHAR_DELAY = 35;

// 진한 크로스페이드(약 700ms)를 쓸 스텝 — 도윤 등장 컷(7), 극적 전환 컷(9)
export const PAID_CLOSING_DRAMATIC_STEPS = new Set<number>([6, 8]);
