"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePreloadImages } from "@/shared/hooks/usePreloadImages";
import {
  PAID_INTRO_STEPS,
  PAID_INTRO_CHAR_DELAY,
  PAID_INTRO_CROSSFADE_ENTER_STEPS,
} from "./paidIntroSteps";

export function usePaidIntroScene() {
  const [stepIndex, setStepIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [displayedCount, setDisplayedCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [crossFading, setCrossFading] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const step = PAID_INTRO_STEPS[stepIndex];

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // 모든 bg 프리로드 — 크로스페이드 시 깜빡임 방지
  const images = useMemo(() => PAID_INTRO_STEPS.map((s) => s.bg), []);
  usePreloadImages(images);

  const hasDialogue = step.type === "dialogue";
  const fullText = hasDialogue ? step.lines[lineIndex] ?? "" : "";

  useEffect(() => {
    if (!hasDialogue) return;
    if (displayedCount < fullText.length) {
      timerRef.current = setTimeout(() => {
        setDisplayedCount((c) => c + 1);
      }, PAID_INTRO_CHAR_DELAY);
    } else {
      setIsComplete(true);
    }
    return clearTimer;
  }, [displayedCount, fullText, clearTimer, hasDialogue]);

  const goToStep = useCallback((next: number) => {
    if (next >= PAID_INTRO_STEPS.length) return;

    if (PAID_INTRO_CROSSFADE_ENTER_STEPS.has(next)) {
      setCrossFading(true);
      setTimeout(() => {
        setStepIndex(next);
        setLineIndex(0);
        setDisplayedCount(0);
        setIsComplete(false);
        setCrossFading(false);
      }, 400);
      return;
    }

    setStepIndex(next);
    setLineIndex(0);
    setDisplayedCount(0);
    setIsComplete(false);
  }, []);

  const handleTap = () => {
    if (crossFading) return;
    if (!hasDialogue) return;

    const lines = step.lines;
    if (!isComplete) {
      clearTimer();
      setDisplayedCount(fullText.length);
      setIsComplete(true);
    } else if (lineIndex < lines.length - 1) {
      setLineIndex(lineIndex + 1);
      setDisplayedCount(0);
      setIsComplete(false);
    } else {
      goToStep(stepIndex + 1);
    }
  };

  return {
    step,
    stepIndex,
    bgImage: step.bg,
    displayedText: fullText.slice(0, displayedCount),
    isComplete,
    crossFading,
    handleTap,
  };
}
