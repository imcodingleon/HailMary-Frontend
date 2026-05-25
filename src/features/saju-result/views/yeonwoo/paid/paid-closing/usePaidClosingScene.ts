"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePreloadImages } from "@/shared/hooks/usePreloadImages";
import {
  PAID_CLOSING_STEPS,
  PAID_CLOSING_CHAR_DELAY,
  PAID_CLOSING_DRAMATIC_STEPS,
} from "./paidClosingSteps";

// paid-intro의 useIntroScene 패턴을 단순화한 버전.
// - 타이핑 → 탭으로 라인 진행 → 탭으로 다음 스텝
// - 진입이 'dramatic'인 스텝은 화이트 플래시 + 살짝 긴 페이드
// - silent 스텝은 대사 없이 탭으로 진행

export function usePaidClosingScene() {
  const [stepIndex, setStepIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [displayedCount, setDisplayedCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [crossFading, setCrossFading] = useState(false);
  const [flashWhite, setFlashWhite] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const step = PAID_CLOSING_STEPS[stepIndex];

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // 모든 bg 프리로드
  const images = useMemo(() => PAID_CLOSING_STEPS.map((s) => s.bg), []);
  usePreloadImages(images);

  const hasDialogue =
    step.type === "dialogue" ||
    step.type === "dramatic-dialogue" ||
    step.type === "final-cta";

  const fullText = hasDialogue ? step.lines[lineIndex] ?? "" : "";

  // 타이핑 효과
  useEffect(() => {
    if (!hasDialogue) {
      setIsComplete(true);
      return;
    }
    if (displayedCount < fullText.length) {
      timerRef.current = setTimeout(() => {
        setDisplayedCount((c) => c + 1);
      }, PAID_CLOSING_CHAR_DELAY);
    } else {
      setIsComplete(true);
    }
    return clearTimer;
  }, [displayedCount, fullText, clearTimer, hasDialogue]);

  // 극적 진입: 진입 시 화이트 플래시
  useEffect(() => {
    if (step.type === "dramatic-dialogue") {
      setFlashWhite(true);
      const t = setTimeout(() => setFlashWhite(false), 280);
      return () => clearTimeout(t);
    }
  }, [stepIndex, step.type]);

  const goToStep = useCallback((next: number) => {
    if (next >= PAID_CLOSING_STEPS.length) return;

    // 진한 크로스페이드 단계는 더 긴 페이드
    const dramatic = PAID_CLOSING_DRAMATIC_STEPS.has(stepIndex);
    const duration = dramatic ? 700 : 400;
    setCrossFading(true);
    setTimeout(() => {
      setStepIndex(next);
      setLineIndex(0);
      setDisplayedCount(0);
      setIsComplete(false);
      setCrossFading(false);
    }, duration);
  }, [stepIndex]);

  const handleTap = () => {
    if (crossFading) return;

    if (step.type === "silent") {
      goToStep(stepIndex + 1);
      return;
    }
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
    } else if (stepIndex < PAID_CLOSING_STEPS.length - 1 && step.type !== "final-cta") {
      // final-cta는 자동 진행 X — CTA 버튼으로 라우팅
      goToStep(stepIndex + 1);
    }
  };

  return {
    step,
    stepIndex,
    displayedText: fullText.slice(0, displayedCount),
    isComplete,
    crossFading,
    flashWhite,
    handleTap,
  };
}
