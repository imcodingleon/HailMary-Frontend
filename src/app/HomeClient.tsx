"use client";

// app-level 컴포지션 지점 — main feature가 coin feature를 직접 import하면 안 되므로
// (Feature 간 직접 import 금지), 여기서 coin 상태를 조회해 MainView에 prop으로 내려준다.
// page.tsx는 metadata export + JSON-LD가 있는 서버 컴포넌트라 훅을 못 쓰므로 이 client
// 컴포넌트로 분리했다. (Unit B의 CheckoutPageClient와 동일한 패턴)
import { MainView } from "@/features/main";
import { isCoinEnabled, useCoinBalance } from "@/features/coin";

export function HomeClient() {
  const coinEnabled = isCoinEnabled();
  const { balance } = useCoinBalance();

  return <MainView coinEnabled={coinEnabled} coinBalance={balance} />;
}
