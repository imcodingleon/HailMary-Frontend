"use client";

// app-level 컴포지션 지점 — charge(app 라우트)가 coin feature를 직접 import해 잔액을 표시한다.
// page.tsx는 metadata export가 있는 서버 컴포넌트라 훅을 못 쓰므로 이 client 컴포넌트로 분리했다.
// (패턴 미러: src/app/checkout/[character]/CheckoutPageClient.tsx)
// 코인 OFF(NEXT_PUBLIC_COIN_ENABLED!=true)면 아무것도 렌더하지 않는다 — 기존 화면 무변화.
import { isCoinEnabled, useCoinBalance } from "@/features/coin";

export function ChargeBalanceCard() {
  const { balance, loading } = useCoinBalance();

  if (!isCoinEnabled()) return null;

  return (
    <div className="card-surface rounded-card p-4">
      <div className="text-xs text-hwaseonji/70">보유 코인</div>
      <div
        className="mt-1 flex items-baseline gap-1.5 text-3xl font-bold text-dohwahong"
        style={{ fontFamily: "'Hahmlet', 'Noto Serif KR', serif" }}
      >
        {loading || balance === null ? "—" : balance.toLocaleString("ko-KR")}
        <span className="ml-1 text-sm font-normal text-hwaseonji">코인</span>
      </div>
    </div>
  );
}
