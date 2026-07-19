// [application/selectors] 지갑 파생 상태. (부록 B-2)
// 의존성 방향: Application → Domain. walletAtom을 읽어 파생. UI를 import하지 않는다.
import { atom } from 'jotai';
import type { WalletTransaction } from '@/features/chat/domain/model/wallet';
import { walletAtom } from '@/features/chat/application/atoms/walletAtom';

/** 전체 내역 (최신 순). */
export const walletHistoryAtom = atom<WalletTransaction[]>((get) =>
  [...get(walletAtom).history].reverse(),
);

/** 충전 내역만. */
export const chargeHistoryAtom = atom<WalletTransaction[]>((get) =>
  get(walletAtom).history.filter((t) => t.type === 'charge'),
);

/** 소진 내역만 (사적/사주 mode 포함). */
export const spendHistoryAtom = atom<WalletTransaction[]>((get) =>
  get(walletAtom).history.filter((t) => t.type === 'spend'),
);
