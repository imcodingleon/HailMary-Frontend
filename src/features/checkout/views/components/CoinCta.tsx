"use client";

import Link from "next/link";

interface CoinCtaProps {
  /** 필요 코인 — BE `settings.love_report_coin_cost`(490)와 동기화. */
  cost: number;
  /** 보유 코인. null = 아직 조회 전이거나 조회 실패(비로그인 등) — "모름"으로 취급. */
  balance: number | null;
  /** 잔액 조회 진행 중 — 결제 버튼을 "확인 중" 상태로 보여줌. */
  balanceLoading: boolean;
  /** 402(coin_short) 이후 true — 로컬 balance가 최신이 아니어도 부족 UI로 강제 전환. */
  insufficient: boolean;
  /** payWithCoins 진행 중(useCheckout의 공용 isProcessing). */
  loading: boolean;
  onPay: () => void;
  /** 비로그인이라 잔액을 모르는 상태(balance===null && !balanceLoading)에서 CTA 탭 시 호출 —
   *  로그인 필수 게이트를 연다. 로그인 후에도 자동결제는 안 함(사용자가 다시 탭). */
  onRequireLogin: () => void;
}

/** 코인 결제 CTA — 원화 CTA(CheckoutCta/KakaoPayButton)와 동일한 형태(h-12, rounded-md, shadow-sm)에
 *  코인 고유 브랜드 컬러(골드 #E8C9A0)만 다르게 입힌 형제 컴포넌트. 잔액 부족 시 "충전하기"로 전환. */
export function CoinCta({
  cost,
  balance,
  balanceLoading,
  insufficient,
  loading,
  onPay,
  onRequireLogin,
}: CoinCtaProps) {
  const known = balance !== null;
  // coinShort(402)이 켜지면 balance가 아직 갱신 전이어도 부족 UI 우선.
  const short = insufficient || (known && balance < cost);

  if (short) {
    return (
      <div className="space-y-2">
        <p className="text-center text-[12px]" style={{ color: "#96733B" }}>
          {known
            ? `보유 ${balance.toLocaleString()}코인 · 필요 ${cost.toLocaleString()}코인`
            : `보유 확인 중 · 필요 ${cost.toLocaleString()}코인`}
        </p>
        <Link
          href="/charge"
          className="flex h-12 w-full items-center justify-center rounded-md text-[15px] font-semibold shadow-sm transition-opacity hover:opacity-90 active:opacity-80"
          style={{ background: "#E8C9A0", color: "#1a1715" }}
        >
          코인이 부족해요 · 충전하기
        </Link>
      </div>
    );
  }

  // 잔액 미확인(비로그인 또는 조회 실패) & 조회 진행 중도 아님 — 코인 결제는 로그인 전제.
  // 탭하면 로그인 필수 게이트(LoginPromptModal mode="required")를 열어 실제로 로그인시킨다.
  if (!known && !balanceLoading) {
    return (
      <div className="space-y-2">
        <button
          type="button"
          onClick={onRequireLogin}
          className="flex h-12 w-full cursor-pointer items-center justify-center rounded-md text-[15px] font-semibold shadow-sm transition-opacity hover:opacity-90 active:opacity-80"
          style={{ background: "#E8C9A0", color: "#1a1715" }}
        >
          로그인하고 코인으로 보기
        </button>
      </div>
    );
  }

  const isDisabled = loading || balanceLoading;
  return (
    <div className="space-y-2">
      <button
        type="button"
        disabled={isDisabled}
        onClick={onPay}
        className="flex h-12 w-full cursor-pointer items-center justify-center rounded-md text-[15px] font-semibold shadow-sm transition-opacity hover:opacity-90 active:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
        style={{ background: "#E8C9A0", color: "#1a1715" }}
      >
        {loading
          ? "처리 중…"
          : balanceLoading
            ? "코인 잔액 확인 중…"
            : `코인 ${cost.toLocaleString()}개로 보기`}
      </button>
      {known && !loading && (
        <p className="text-center text-[12px]" style={{ color: "#96733B" }}>
          보유 {balance.toLocaleString()}코인
        </p>
      )}
    </div>
  );
}
