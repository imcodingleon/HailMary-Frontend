import type { AvoidSlotKey } from "./types";

export interface AvoidPartnerFreeCopy {
  impression: string;
  ageGap: string;
  firstFeel: string;
}

export const AVOID_PARTNER_FREE_DIALOGUES: Record<AvoidSlotKey, AvoidPartnerFreeCopy> = {
  "f-wood-yang": {
    impression: "처음엔 활기차고 시원시원해 보여. 근데 그 에너지가 전부 자기 방향으로 흘러.",
    ageGap: "비슷한 나이나 약간 어릴 때 끌려. 동등하게 보이고 싶어하는 기운이 있거든.",
    firstFeel: "말이 잘 통하는 것 같아서 빠져드는데, 사실 혼자 신나있는 거야.",
  },
  "f-wood-yin": {
    impression: "조용하고 단아해 보여. 처음엔 차분하고 깊은 사람인 줄 알아.",
    ageGap: "나보다 한두 살 어리거나 비슷한 나이에서 주로 나타나.",
    firstFeel: "편안하고 안전한 느낌. 근데 그게 의존하게 만드는 시작이야.",
  },
  "f-fire-yang": {
    impression: "밝고 빛나 보여. 어디 있어도 눈에 들어오는 타입이야.",
    ageGap: "나보다 어리거나 비슷한 나이. 열기가 서로 맞아 떨어지는 것 같거든.",
    firstFeel: "설레고 뜨거운 느낌. 이게 진짜인 줄 알지만 오래 못 가.",
  },
  "f-fire-yin": {
    impression: "은은하게 따뜻해 보여. 강하지 않은데 자꾸 시선이 가.",
    ageGap: "연상이거나 비슷한 나이에서 주로 나타나. 성숙해 보이는 게 매력이거든.",
    firstFeel: "포근하고 안심되는 느낌. 이게 함정이야.",
  },
  "f-earth-yang": {
    impression: "든든하고 믿음직해 보여. 뭔가 기댈 수 있을 것 같은 타입이야.",
    ageGap: "나보다 나이가 좀 있거나 비슷할 때. 안정적으로 보이는 게 당기거든.",
    firstFeel: "안정감. 근데 그 안정감이 사실 움직임이 없다는 뜻이야.",
  },
  "f-earth-yin": {
    impression: "포근하고 친근해 보여. 처음부터 오래 알던 사람 같은 느낌이야.",
    ageGap: "나이 차가 크게 안 나. 편한 느낌이 나는 나이대에서 나타나.",
    firstFeel: "집처럼 편한 느낌. 근데 그게 관계가 흐릿해지는 이유가 돼.",
  },
  "f-metal-yang": {
    impression: "단단하고 정갈해 보여. 원칙이 있는 사람처럼 보이거든.",
    ageGap: "나보다 나이가 있는 편. 믿을 수 있어 보이는 연상이 끌려.",
    firstFeel: "명확하고 깔끔한 느낌. 근데 그 명확함이 차가움으로 바뀌어.",
  },
  "f-metal-yin": {
    impression: "차분하고 절제돼 보여. 말수가 적은데 왠지 신뢰가 가.",
    ageGap: "비슷한 나이나 약간 연상. 조용한데 존재감이 있는 타입이거든.",
    firstFeel: "정돈된 느낌. 근데 속을 전혀 안 보여줘서 나중에 낯설어져.",
  },
  "f-water-yang": {
    impression: "깊어 보이고 뭔가 있어 보여. 모르는 게 많은 사람처럼 느껴져.",
    ageGap: "나이 차 상관없이 나타나. 신비로운 분위기가 나이를 타지 않거든.",
    firstFeel: "궁금하고 끌리는 느낌. 근데 그 깊이가 나를 휘감아.",
  },
  "f-water-yin": {
    impression: "몽환적이고 감성적으로 보여. 특별한 세계를 가진 것 같아.",
    ageGap: "나보다 어리거나 비슷한 나이. 보호해주고 싶은 느낌을 줘.",
    firstFeel: "특별하고 다른 느낌. 근데 그 감성이 현실과 멀어.",
  },
  "m-wood-yang": {
    impression: "시원시원하고 에너지 넘쳐 보여. 주도적으로 이끌어줄 것 같은 타입이야.",
    ageGap: "나보다 나이가 있는 편이 많아. 든든한 연상이 끌리거든.",
    firstFeel: "믿음직하고 활기찬 느낌. 근데 그 주도력이 결국 내 의견을 지워.",
  },
  "m-wood-yin": {
    impression: "섬세하고 조용해 보여. 감수성 있는 사람인 줄 알아.",
    ageGap: "비슷한 나이나 약간 연상. 은근히 취향이 맞는 것 같아 끌려.",
    firstFeel: "감성적으로 통하는 느낌. 근데 그 감성이 우유부단함으로 이어져.",
  },
  "m-fire-yang": {
    impression: "태양 같아. 밝고 강렬하고 어디서든 눈에 띄어.",
    ageGap: "나보다 나이가 있는 경우가 많아. 카리스마 있는 연상이거든.",
    firstFeel: "압도적으로 설레는 느낌. 근데 그 열기가 나를 태워버려.",
  },
  "m-fire-yin": {
    impression: "은은하게 따뜻해 보여. 강하지 않은데 자꾸 시선이 가.",
    ageGap: "나이 차 크지 않아. 편하게 다가올 수 있는 나이대거든.",
    firstFeel: "따뜻하고 안심되는 느낌. 근데 그 온기가 식으면 남는 게 없어.",
  },
  "m-earth-yang": {
    impression: "듬직하고 믿음직해 보여. 진짜 기댈 수 있는 사람 같아.",
    ageGap: "나보다 나이 있는 편. 연상 특유의 안정감이 당기거든.",
    firstFeel: "편안하고 보호받는 느낌. 근데 그 틀 안에 갇히기 시작해.",
  },
  "m-earth-yin": {
    impression: "친근하고 포근해 보여. 처음부터 편한 사람 같은 느낌이야.",
    ageGap: "비슷한 나이. 어색함 없이 금방 친해지는 게 위험 신호야.",
    firstFeel: "자연스럽고 편한 느낌. 근데 그 편함이 설렘을 없애.",
  },
  "m-metal-yang": {
    impression: "단단하고 카리스마 있어 보여. 원칙 있는 사람처럼 느껴져.",
    ageGap: "나보다 나이가 좀 있어. 신뢰감 있는 연상이 끌리거든.",
    firstFeel: "명확하고 강한 느낌. 근데 그 강함이 나를 압박해.",
  },
  "m-metal-yin": {
    impression: "차분하고 정제돼 보여. 말수가 적은데 존재감이 있어.",
    ageGap: "비슷한 나이나 약간 연상. 조용하지만 눈에 들어오는 타입이야.",
    firstFeel: "안정적이고 신뢰 가는 느낌. 근데 그 차가움이 나중에 고립감을 줘.",
  },
  "m-water-yang": {
    impression: "깊고 신비롭게 보여. 뭔가 더 있는 사람 같아서 궁금해.",
    ageGap: "나이 차 다양하게 나타나. 신비로운 분위기가 나이를 타지 않아.",
    firstFeel: "강하게 끌리는 느낌. 근데 그 깊이가 날 가라앉혀.",
  },
  "m-water-yin": {
    impression: "몽환적이고 감성적으로 보여. 특별한 세계를 가진 것 같아.",
    ageGap: "비슷한 나이나 약간 연하. 보호해주고 싶은 느낌이 들거든.",
    firstFeel: "특별하고 예민한 느낌. 근데 그 예민함이 관계를 피곤하게 만들어.",
  },
  "f-neutral": {
    impression: "특별히 위험한 타입이 딱 정해지지 않아. 근데 그게 더 조심해야 한다는 뜻이야.",
    ageGap: "나이 패턴이 일정하지 않아. 상황에 따라 달라지거든.",
    firstFeel: "편하고 무난한 느낌. 근데 위험은 항상 편한 데서 시작해.",
  },
  "m-neutral": {
    impression: "특별히 위험한 타입이 딱 정해지지 않아. 근데 그게 더 조심해야 한다는 뜻이야.",
    ageGap: "나이 패턴이 일정하지 않아. 상황에 따라 달라지거든.",
    firstFeel: "편하고 무난한 느낌. 근데 위험은 항상 편한 데서 시작해.",
  },
};
