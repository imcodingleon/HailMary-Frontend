"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { DialogueBox } from "@/components/DialogueBox";
import { FadeOverlay } from "@/components/FadeOverlay";
import { usePaidClosingScene } from "./usePaidClosingScene";
import { PAID_CLOSING_STEPS } from "./paidClosingSteps";

export function PaidClosingScene() {
  const router = useRouter();
  const {
    step,
    stepIndex,
    displayedText,
    isComplete,
    crossFading,
    flashWhite,
    handleTap,
  } = usePaidClosingScene();

  const handleFinalCta = () => {
    // 도윤 무료 결과로 — 기존 세션 saju 데이터 그대로 사용
    router.push("/saju/doyoon");
  };

  // 다음 스텝 bg (크로스페이드 전환 중 위에 fadeIn)
  const nextStep = PAID_CLOSING_STEPS[stepIndex + 1];

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

      {/* 대사 영역 */}
      {!crossFading && step.type !== "silent" && (
        <div className="relative z-10 mb-20 mt-auto px-4">
          <DialogueBox
            speaker={step.speaker}
            text={displayedText}
            isComplete={isComplete}
          />
        </div>
      )}

{/* 컷 10 — 도윤 free 결과 라우팅 CTA */}
      {!crossFading && step.type === "final-cta" && isComplete && (
        <div
          className="relative z-10 mx-4 mb-6 animate-[fadeIn_0.5s_ease-in]"
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
        </div>
      )}

      <FadeOverlay visible={flashWhite} color="white" durationMs={280} easing="ease-out" />
    </div>
  );
}
