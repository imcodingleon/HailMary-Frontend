"use client";

import Image from "next/image";
import { usePaidIntroScene } from "./usePaidIntroScene";
import { PAID_INTRO_STEPS } from "./paidIntroSteps";
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
        const nextStep = PAID_INTRO_STEPS[stepIndex + 1];
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

      {/* 대사 박스는 크로스페이드 중에도 unmount하지 않음 — 박스 자체 깜빡임 방지.
          stepIndex가 갱신될 때 텍스트만 새 라인으로 교체되며 타이핑 시작. */}
      {step.type === "dialogue" && (
        <PaidIntroDialogueCut step={step} displayedText={displayedText} isComplete={isComplete} />
      )}
      {!crossFading && step.type === "cta" && (
        <PaidIntroCtaCut step={step} onClick={onCta} />
      )}
    </div>
  );
}
