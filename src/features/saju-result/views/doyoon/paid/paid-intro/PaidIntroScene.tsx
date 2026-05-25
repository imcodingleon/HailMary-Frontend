"use client";

import Image from "next/image";
import { usePaidIntroScene } from "./usePaidIntroScene";
import { DOYOON_PAID_INTRO_STEPS } from "./paidIntroSteps";
import { PaidIntroDialogueCut } from "./PaidIntroDialogueCut";
import { PaidIntroCtaCut } from "./PaidIntroCtaCut";

interface PaidIntroSceneProps {
  onCta: () => void;
}

export function PaidIntroScene({ onCta }: PaidIntroSceneProps) {
  const { step, stepIndex, bgImage, displayedText, isComplete, crossFading, handleTap } =
    usePaidIntroScene();

  return (
    <div
      className="relative flex flex-1 flex-col animate-[fadeIn_0.8s_ease-in]"
      style={{ fontFamily: "var(--font-pretendard)" }}
      onClick={handleTap}
    >
      <Image src={bgImage} alt="" fill priority className="object-cover object-center" />

      {crossFading && (() => {
        const nextStep = DOYOON_PAID_INTRO_STEPS[stepIndex + 1];
        if (!nextStep) return null;
        return (
          <Image
            src={nextStep.bg}
            alt=""
            fill
            priority
            className="absolute inset-0 object-cover object-center animate-[fadeIn_0.4s_ease-out]"
          />
        );
      })()}

      {!crossFading && step.type === "dialogue" && (
        <PaidIntroDialogueCut step={step} displayedText={displayedText} isComplete={isComplete} />
      )}
      {!crossFading && step.type === "cta" && (
        <PaidIntroCtaCut step={step} onClick={onCta} />
      )}
    </div>
  );
}
