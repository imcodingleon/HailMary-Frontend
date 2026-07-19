"use client";

// 보유 코인 인라인 표시 (순수 뷰 — 마이페이지 등에서 재사용).
export default function CoinBalanceInline({
  balance,
  loading,
}: {
  balance: number | null;
  loading: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between rounded-[10px] px-4 py-3"
      style={{
        background: "rgba(200,168,112,0.06)",
        border: "0.5px solid rgba(200,168,112,0.22)",
      }}
    >
      <span
        className="text-[14px]"
        style={{ color: "rgba(232,201,160,0.72)" }}
      >
        보유 코인
      </span>
      <span
        className="text-[16px]"
        style={{
          fontFamily: "var(--font-nanum-myeongjo)",
          color: "#E8C9A0",
        }}
      >
        {loading || balance === null ? "—" : `${balance.toLocaleString()}개`}
      </span>
    </div>
  );
}
