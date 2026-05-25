"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { DialogueBox } from "@/components/DialogueBox";
import { FadeOverlay } from "@/components/FadeOverlay";
import { usePaidClosingScene } from "./usePaidClosingScene";
import { DOYOON_PAID_CLOSING_STEPS } from "./paidClosingSteps";

export function PaidClosingScene() {
  const router = useRouter();
  const {
    step,
    stepIndex,
    displayedText,
    isComplete,
    crossFading,
    flashWhite,
    flashRed,
    holdingForDialogue,
    ctaRevealed,
    handleTap,
  } = usePaidClosingScene();

  const handleFinalCta = () => {
    // 연우 무료 결과로 — 기존 세션 saju 데이터 그대로 사용
    router.push("/saju/yeonwoo");
  };

  const nextStep = DOYOON_PAID_CLOSING_STEPS[stepIndex + 1];

  return (
    <div
      className="relative flex flex-1 flex-col animate-[fadeIn_0.8s_ease-in]"
      style={{ fontFamily: "var(--font-pretendard)" }}
      onClick={handleTap}
    >
      <Image
        src={step.bg}
        alt=""
        fill
        priority
        className="object-cover object-center"
      />

      {crossFading && nextStep && (
        <Image
          src={nextStep.bg}
          alt=""
          fill
          priority
          className="absolute inset-0 object-cover object-center animate-[fadeIn_0.4s_ease-out]"
        />
      )}

      {/* 자막 박스 — final-cta 컷에서 ctaRevealed=true가 되면 같은 자리에 CTA로 교체.
          hold 중에는 박스 숨김 (핵심 이미지 시선 집중). */}
      {!holdingForDialogue && !ctaRevealed && (
        <div
          className="relative z-10 mt-auto px-4 animate-[fadeIn_0.4s_ease-in]"
          style={{
            marginBottom:
              step.type === "dramatic-dialogue" && step.dialogueBottomPx !== undefined
                ? `${step.dialogueBottomPx}px`
                : "80px",
          }}
        >
          <DialogueBox
            speaker={step.speaker}
            text={displayedText}
            isComplete={isComplete}
          />
        </div>
      )}

      {/* CTA — 자막 박스가 차지하던 자리에 그대로 등장 (mb-20 동일) */}
      {ctaRevealed && step.type === "final-cta" && (
        <div
          className="relative z-10 mt-auto mb-20 px-4 animate-[fadeIn_0.5s_ease-in]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={handleFinalCta}
            className="w-full rounded-md py-4 text-[15px] font-semibold tracking-[0.1em] text-[#1a1612] cursor-pointer transition-opacity hover:opacity-90 active:opacity-80"
            style={{
              background: "linear-gradient(180deg, #E6C58E 0%, #C9A56B 100%)",
              boxShadow: "0 4px 18px rgba(201,165,107,0.35)",
            }}
          >
            {step.ctaLabel} →
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="mt-3 w-full py-2 text-[13px] text-white/70 underline-offset-4 hover:underline cursor-pointer"
          >
            메인으로
          </button>
        </div>
      )}

      <FadeOverlay visible={flashWhite} color="white" durationMs={280} easing="ease-out" />
      {/* 붉은 플래시 — 연우 등장 컷 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-40"
        style={{
          background: "rgba(208,44,52,0.55)",
          opacity: flashRed ? 1 : 0,
          transition: "opacity 380ms ease-out",
        }}
      />
    </div>
  );
}
