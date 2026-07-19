// HANDOFF(H3): 계정·생년월일시 더미 → 메인 로그인·계정 데이터 주입. 시그니처/인터페이스 유지.
// [infrastructure] userProfileMock = 더미(교체 대상). 주입 지점(seam)만 마련 — 화면 표시 연결은 추후(§7.1).
import type { UserProfile } from '@/features/chat/domain/model/userProfile';

export const userProfileMock: UserProfile = {
  nickname: '도화선 손님',
  ilgan: '丙火(병화)',
  ohaeng: '화(火)',
  birth: '1996-05-12 14:30 (더미)',
};
