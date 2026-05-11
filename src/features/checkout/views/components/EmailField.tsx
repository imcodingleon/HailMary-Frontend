"use client";

interface EmailFieldProps {
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error: string | null;
}

export function EmailField({ value, onChange, onBlur, error }: EmailFieldProps) {
  return (
    <section className="space-y-2">
      <label htmlFor="checkout-email" className="block">
        <span className="text-[15px] font-semibold text-neutral-900">이메일</span>
        <span className="ml-2 text-[12px] text-neutral-500">
          사주 · 운세 결과 확인 및 안내메시지 발송에 이용됩니다
        </span>
      </label>
      <input
        id="checkout-email"
        type="email"
        inputMode="email"
        autoComplete="email"
        spellCheck={false}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder="you@example.com"
        className="block w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none"
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? "checkout-email-error" : undefined}
      />
      {error && (
        <p
          id="checkout-email-error"
          className="text-[12px] text-rose-500"
          role="alert"
        >
          {error}
        </p>
      )}
    </section>
  );
}
