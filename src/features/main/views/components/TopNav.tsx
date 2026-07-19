"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/shared/utils/analytics";

interface TopNavProps {
  /** 코인 플래그 ON일 때만 잔액 칩 노출. app-level에서 isCoinEnabled()로 주입(coin feature import 금지). */
  coinEnabled?: boolean;
  /** 보유 코인. null = 조회 전/실패. */
  coinBalance?: number | null;
}

export function TopNav({ coinEnabled = false, coinBalance = null }: TopNavProps) {
  const router = useRouter();
  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between border-b border-white/[0.06] px-5 py-3 backdrop-blur-xl"
      style={{ background: "rgba(5,2,12,0.92)" }}
    >
      <Image
        src="/dohwaseon-logo.png"
        alt="도화선"
        height={35}
        width={98}
        priority
        className="h-[35px] w-auto"
      />
      <div className="flex items-center gap-2">
        {coinEnabled && (
          <button
            type="button"
            aria-label="보유 코인 · 충전하기"
            onClick={() => {
              trackEvent("topnav_coin_charge_click", {});
              router.push("/charge/");
            }}
            className="flex h-9 items-center gap-1.5 rounded-full px-3 transition-colors hover:bg-white/10"
            style={{
              background: "rgba(200,168,112,0.08)",
              border: "0.5px solid rgba(200,168,112,0.28)",
            }}
          >
            <span aria-hidden style={{ color: "var(--color-yeonwoo-gold)" }}>
              <CoinIcon />
            </span>
            <span
              className="text-[13px] font-medium"
              style={{ color: "var(--color-yeonwoo-gold)" }}
            >
              {coinBalance === null ? "—" : coinBalance.toLocaleString()}
            </span>
            <span className="text-[11px] text-white/40">충전</span>
          </button>
        )}
        {/* 마이페이지 (계정 정보·보관함·약관·로그아웃·회원탈퇴) */}
        <button
          type="button"
          aria-label="마이페이지"
          onClick={() => {
            trackEvent("topnav_mypage_click", {});
            router.push("/mypage/");
          }}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

function CoinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 15.5c.5.7 1.4 1 2.5 1 1.7 0 3-.8 3-2s-1.3-1.6-3-2-3-.8-3-2 1.3-2 3-2c1.1 0 2 .3 2.5 1" strokeLinecap="round" />
    </svg>
  );
}
