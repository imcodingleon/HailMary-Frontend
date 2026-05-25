"use client";

import { DialogueBox } from "@/components/DialogueBox";
import type { PaidIntroStep } from "./paidIntroSteps";

interface Props {
  step: Extract<PaidIntroStep, { type: "dialogue" }>;
  displayedText: string;
  isComplete: boolean;
}

export function PaidIntroDialogueCut({ step, displayedText, isComplete }: Props) {
  const speaker = step.speaker ?? "나";
  return (
    <div className="relative z-10 mb-20 mt-auto px-4">
      <DialogueBox speaker={speaker} text={displayedText} isComplete={isComplete} />
    </div>
  );
}
