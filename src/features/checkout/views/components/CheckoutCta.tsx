"use client";

interface CheckoutCtaProps {
  onSubmit: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function CheckoutCta({ onSubmit, loading, disabled }: CheckoutCtaProps) {
  const isDisabled = loading || disabled;
  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onSubmit}
      className="w-full rounded-md bg-neutral-900 px-6 py-3 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800 active:bg-neutral-950 cursor-pointer disabled:cursor-not-allowed disabled:bg-neutral-400"
    >
      {loading ? "결제창을 여는 중…" : "결제하기"}
    </button>
  );
}
