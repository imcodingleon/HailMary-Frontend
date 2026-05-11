"use client";

interface CouponFieldProps {
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  onApply: () => void;
}

export function CouponField({ value, onChange, onBlur, onApply }: CouponFieldProps) {
  return (
    <section className="space-y-2">
      <label htmlFor="checkout-coupon" className="block text-[14px] font-medium text-neutral-900">
        쿠폰 입력
      </label>
      <div className="flex gap-2">
        <input
          id="checkout-coupon"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder="쿠폰 코드를 입력하세요"
          className="flex-1 rounded-xl border border-neutral-300 bg-white px-4 py-3 text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none"
        />
        <button
          type="button"
          onClick={onApply}
          className="cursor-pointer rounded-xl border border-neutral-300 bg-white px-4 py-3 text-[13px] font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
        >
          적용
        </button>
      </div>
    </section>
  );
}
