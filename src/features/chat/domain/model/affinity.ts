// [domain/model] 호감도 — 순수 타입, 외부 의존 0. (부록 B-1, 스펙 §7.7, DL-C03)
// ❗표시·연출만. 적립 가중치·일일 상한 수치는 여기 두지 않는다(H6). 보상은 비화폐 IP 자산(페이월 금지).

export interface AffinityState {
  characterId: string;
  level: number;
  score: number; // 표시용 0~100 (적립 로직 아님, H6)
  nextReward: string; // 다음 해금 보상 라벨
}

/** 레벨별 비화폐 IP 자산 보상 단계 (일러스트 컷 → 테마 → 세계관 TMI → 특별 컷·호칭). */
export interface RewardTier {
  tier: number;
  label: string; // 비화폐 자산 라벨 (가격·결제 없음)
  unlocked: boolean;
}

/** 캐릭터별 호감도 + 보상 트랙. */
export interface AffinityProfile {
  state: AffinityState;
  rewardTrack: RewardTier[];
}
