// [application/atoms] 토큰 지갑 전역 상태. (스펙 §10)
// 의존성 방향: Application → Domain. 충전은 8단계, 여기선 시드 잔량만.
import { atom } from 'jotai';
import type { TokenWallet } from '@/features/chat/domain/model/wallet';

// 무료 진입용 소량 토큰 시드. 추상 단위(원화·단가 비표시). 정확한 시드/단가는 [TBD](8단계·단가 확정 후).
export const SEED_BALANCE = 10;

export const walletAtom = atom<TokenWallet>({
  balance: SEED_BALANCE,
  history: [],
});
