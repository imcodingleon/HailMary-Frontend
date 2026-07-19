"use client";

// app-level 컴포지션 지점 — checkout feature가 coin feature를 직접 import하면 안 되므로
// (Feature 간 직접 import 금지), 여기서 coin 상태를 조회해 CheckoutView에 prop으로 내려준다.
// page.tsx는 async 서버 컴포넌트(generateStaticParams/notFound)라 훅을 못 쓰므로 이 client
// 컴포넌트로 분리했다.
import { CheckoutView } from "@/features/checkout";
import type { CheckoutCharacter } from "@/features/checkout/domain/checkoutProducts";
import { isCoinEnabled, useCoinBalance } from "@/features/coin";

export function CheckoutPageClient({ character }: { character: CheckoutCharacter }) {
  const coinEnabled = isCoinEnabled();
  const { balance, loading } = useCoinBalance();

  return (
    <CheckoutView
      character={character}
      coinEnabled={coinEnabled}
      coinBalance={balance}
      coinBalanceLoading={loading}
    />
  );
}
