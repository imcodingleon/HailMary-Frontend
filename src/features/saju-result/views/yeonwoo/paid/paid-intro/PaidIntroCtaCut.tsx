"use client";

import type { PaidIntroStep } from "./paidIntroSteps";

interface Props {
  step: Extract<PaidIntroStep, { type: "cta" }>;
  onClick: () => void;
}

export function PaidIntroCtaCut({ step, onClick }: Props) {
  return (
    <div className="relative z-10 mb-20 mt-auto px-8 animate-[fadeIn_0.5s_ease-in]">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="w-full rounded-full bg-[#D73F59] py-4 text-center text-lg font-semibold text-white shadow-lg shadow-red-900/40 transition-opacity hover:opacity-90 active:opacity-80"
      >
        {step.label}
      </button>
    </div>
  );
}
