// HANDOFF(H6): 호감도 표시 더미 → 적립 로직(가중치·일일 상한). 시그니처/인터페이스 유지.
// [infrastructure] affinityMock = 더미(교체 대상). 적립 수치 로직 없음(표시·연출만).
// ❗보상은 비화폐 IP 자산 라벨만(결제·가격 없음, 페이월 금지 DL-C03).
import type { AffinityProfile, RewardTier } from '@/features/chat/domain/model/affinity';

// 비화폐 보상 트랙 (스펙 §7.7): 일러스트 컷 → 채팅방 테마 → 세계관 TMI → 특별 컷·호칭. 단계 수는 [TBD].
const TIER_LABELS = ['일러스트 컷', '채팅방 테마', '세계관 TMI', '특별 컷·호칭'];

function buildTrack(level: number): RewardTier[] {
  return TIER_LABELS.map((label, i) => ({ tier: i + 1, label, unlocked: i < level }));
}
function nextRewardOf(level: number): string {
  return TIER_LABELS[level] ?? '최고 단계 도달';
}
function profile(characterId: string, level: number, score: number): AffinityProfile {
  return {
    state: { characterId, level, score, nextReward: nextRewardOf(level) },
    rewardTrack: buildTrack(level),
  };
}

// level/score는 표시용 더미(H6). 적립으로 증가하지 않음.
export const affinityMock: Record<string, AffinityProfile> = {
  yeonu: profile('yeonu', 2, 45),
  doyoon: profile('doyoon', 1, 30),
  kkebi: profile('kkebi', 3, 70),
};
