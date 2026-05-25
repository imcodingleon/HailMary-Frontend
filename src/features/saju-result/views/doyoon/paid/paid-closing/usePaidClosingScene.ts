"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePreloadImages } from "@/shared/hooks/usePreloadImages";
import {
  DOYOON_PAID_CLOSING_STEPS,
  DOYOON_PAID_CLOSING_CHAR_DELAY,
  DOYOON_PAID_CLOSING_DRAMATIC_STEPS,
} from "./paidClosingSteps";

// 연우 paid-closing과 동일 구조, 데이터만 도윤용.

export function usePaidClosingScene() {
  const [stepIndex, setStepIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [displayedCount, setDisplayedCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [crossFading, setCrossFading] = useState(false);
  const [flashWhite, setFlashWhite] = useState(false);
  const [flashRed, setFlashRed] = useState(false);
  // 진입 후 일정 시간 대사 박스 숨기고 탭 무시 (예: 핵심 이미지 응시 시간)
  const [holdingForDialogue, setHoldingForDialogue] = useState(false);
  // final-cta 컷에서 자막 다 본 후 탭하면 자막 사라지고 같은 자리에 CTA 노출
  const [ctaRevealed, setCtaRevealed] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const step = DOYOON_PAID_CLOSING_STEPS[stepIndex];

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const images = useMemo(() => DOYOON_PAID_CLOSING_STEPS.map((s) => s.bg), []);
  usePreloadImages(images);

  const hasDialogue = true; // 모든 step에 라인 있음

  const fullText = step.lines[lineIndex] ?? "";

  useEffect(() => {
    if (!hasDialogue) {
      setIsComplete(true);
      return;
    }
    if (holdingForDialogue) return; // hold 중에는 타이핑 시작 안 함
    if (displayedCount < fullText.length) {
      timerRef.current = setTimeout(() => {
        setDisplayedCount((c) => c + 1);
      }, DOYOON_PAID_CLOSING_CHAR_DELAY);
    } else {
      setIsComplete(true);
    }
    return clearTimer;
  }, [displayedCount, fullText, clearTimer, hasDialogue, holdingForDialogue]);

  // step 진입 시 dialogueDelayMs 처리 (hold + 자동 해제)
  useEffect(() => {
    const delayMs =
      step.type === "dramatic-dialogue" ? step.dialogueDelayMs ?? 0 : 0;
    if (delayMs > 0) {
      setHoldingForDialogue(true);
      const t = setTimeout(() => setHoldingForDialogue(false), delayMs);
      return () => clearTimeout(t);
    }
    setHoldingForDialogue(false);
  }, [stepIndex, step]);

  const goToStep = useCallback((next: number) => {
    if (next >= DOYOON_PAID_CLOSING_STEPS.length) return;
    const nextStep = DOYOON_PAID_CLOSING_STEPS[next];

    // 다음 step이 dramatic-dialogue면 전환 시작 시점에 플래시 발화 + 이전 컷
    // 대사 박스 즉시 숨김 (플래시 동안 남는 박스 어색함 방지).
    // hold는 stepIndex 갱신 후 step useEffect에서 다시 dialogueDelayMs 만큼 연장.
    if (nextStep && nextStep.type === "dramatic-dialogue") {
      setHoldingForDialogue(true);
      const color = nextStep.flashColor ?? "white";
      if (color === "red") {
        setFlashRed(true);
        setTimeout(() => setFlashRed(false), 600);
      } else {
        setFlashWhite(true);
        setTimeout(() => setFlashWhite(false), 550);
      }
    }

    const dramatic = DOYOON_PAID_CLOSING_DRAMATIC_STEPS.has(stepIndex);
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
    if (crossFading || holdingForDialogue) return;
    if (ctaRevealed) return; // CTA 노출 후엔 버튼 클릭만 받음 (탭으로 진행 X)

    const lines = step.lines;
    if (!isComplete) {
      clearTimer();
      setDisplayedCount(fullText.length);
      setIsComplete(true);
    } else if (lineIndex < lines.length - 1) {
      setLineIndex(lineIndex + 1);
      setDisplayedCount(0);
      setIsComplete(false);
    } else if (step.type === "final-cta") {
      // 마지막 컷: 자막 완료 + 탭 → 자막 사라지고 같은 자리에 CTA 등장
      setCtaRevealed(true);
    } else if (stepIndex < DOYOON_PAID_CLOSING_STEPS.length - 1) {
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
    flashRed,
    holdingForDialogue,
    ctaRevealed,
    handleTap,
  };
}
