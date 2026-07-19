'use client';

// [application/hooks] useWallet — 충전 화면 Application Service. UI는 이것만 본다(Dumb). (부록 B-2·B-3)
// 의존성 방향: Application → Domain/atoms/selectors/commands/infra(패키지 시드). UI를 import하지 않는다.
import { useAtomValue, useSetAtom } from 'jotai';
import { tokenBalanceAtom } from '@/features/chat/application/selectors/chatSelectors';
import { walletHistoryAtom } from '@/features/chat/application/selectors/walletSelectors';
import { dispatchChatAtom } from '@/features/chat/application/commands/chatCommands';
import { chargePackages } from '@/features/chat/infrastructure/paymentApi';

export function useWallet() {
  const balance = useAtomValue(tokenBalanceAtom);
  const history = useAtomValue(walletHistoryAtom);
  const dispatch = useSetAtom(dispatchChatAtom);

  const charge = (packageId: string) => {
    void dispatch({ intent: { type: 'CHARGE_TOKEN', packageId } });
  };

  return { balance, packages: chargePackages, history, charge };
}
