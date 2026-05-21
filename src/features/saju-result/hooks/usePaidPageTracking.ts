"use client";

// 유료 결과 페이지 진입/이탈 + 스크롤·체류 트래킹 훅.
// 페이지마다 호출 → `page{N}_entered` 1회, 이탈 시 `page{N}_exited` 1회 발화.
// 이탈 트리거 4종: page_change(셸 슬라이드 이동) | unmount | pagehide | visibility_hidden.
//
// 발화 1회 보장: firedRef 가드.
// active 가 true→false 로 전이될 때는 useLayoutEffect 로 page_change 를 먼저 발화시켜,
// 이어 실행될 main useEffect cleanup 의 unmount 발화가 무시되도록 한다.

import { useEffect, useLayoutEffect, useRef } from "react";
import { trackEvent } from "@/shared/utils/analytics";
import type { PaidPageMeta } from "../domain/paidPageMeta";

type ExitReason =
  | "page_change"
  | "unmount"
  | "pagehide"
  | "visibility_hidden";

interface UsePaidPageTrackingArgs {
  meta: PaidPageMeta;
  orderId: string;
  character: string;            // "yeonwoo" | "doyoon"
  active: boolean;              // PaidShell.currentIdx === 본 페이지 idx 일 때 true
}

function computeMaxScrollPct(): number {
  if (typeof window === "undefined") return 0;
  const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
  const viewport = window.innerHeight || 0;
  const total = document.documentElement.scrollHeight || 0;
  if (total <= 0) return 0;
  const pct = ((scrollTop + viewport) / total) * 100;
  return Math.min(100, Math.max(0, Math.round(pct)));
}

export function usePaidPageTracking({
  meta,
  orderId,
  character,
  active,
}: UsePaidPageTrackingArgs): void {
  const enteredAtRef = useRef<number | null>(null);
  const maxScrollRef = useRef<number>(0);
  const firedRef = useRef<boolean>(false);
  const prevActiveRef = useRef<boolean>(active);

  const fireExited = (reason: ExitReason) => {
    if (firedRef.current) return;
    firedRef.current = true;
    const enteredAt = enteredAtRef.current ?? performance.now();
    const dwellMs = Math.max(0, Math.round(performance.now() - enteredAt));
    trackEvent(`page${meta.pageNumber}_exited`, {
      page_key: meta.pageKey,
      page_number: meta.pageNumber,
      page_title: meta.pageTitle,
      order_id: orderId,
      character,
      max_scroll_pct: maxScrollRef.current,
      dwell_ms: dwellMs,
      exit_reason: reason,
    });
  };

  useLayoutEffect(() => {
    if (prevActiveRef.current && !active) {
      fireExited("page_change");
    }
    prevActiveRef.current = active;
  });

  useEffect(() => {
    if (!active) return;
    if (!orderId) return;

    enteredAtRef.current = performance.now();
    maxScrollRef.current = computeMaxScrollPct();
    firedRef.current = false;

    trackEvent(`page${meta.pageNumber}_entered`, {
      page_key: meta.pageKey,
      page_number: meta.pageNumber,
      page_title: meta.pageTitle,
      order_id: orderId,
      character,
    });

    let lastScrollAt = 0;
    const onScroll = () => {
      const now = performance.now();
      if (now - lastScrollAt < 200) return;
      lastScrollAt = now;
      const pct = computeMaxScrollPct();
      if (pct > maxScrollRef.current) maxScrollRef.current = pct;
    };
    const onPageHide = () => fireExited("pagehide");
    const onVisibility = () => {
      if (document.visibilityState === "hidden") fireExited("visibility_hidden");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", onPageHide);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", onPageHide);
      document.removeEventListener("visibilitychange", onVisibility);
      fireExited("unmount");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, orderId, character, meta.pageKey, meta.pageNumber, meta.pageTitle]);
}
