"use client";

// 마이페이지 상단 보유 코인 박스 (페이지가 렌더하는 클라이언트 래퍼).
// 동작(잔액 조회)은 훅, 렌더는 CoinBalanceInline. coin OFF면 아무것도 안 그림.
// 탭하면 /charge/로 이동(고아 충전 페이지 동선 해소).
import Link from "next/link";
import { isCoinEnabled } from "../config";
import { useCoinBalance } from "../hooks/useCoinBalance";
import CoinBalanceInline from "./CoinBalanceInline";

export default function MyPageCoinBalance() {
  const { balance, loading } = useCoinBalance();
  if (!isCoinEnabled()) return null;
  return (
    <Link href="/charge/" className="block px-4 pt-4">
      <CoinBalanceInline balance={balance} loading={loading} />
    </Link>
  );
}
