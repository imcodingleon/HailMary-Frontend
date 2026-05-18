"use client";

import { useCallback, useMemo, useState } from "react";

// 유료 결과 12 페이지 슬라이드 셸의 네비게이션 상태 + 행동.
// 디자인 원본(연우_final.html line 2898~2960) JS slide engine 포팅.

export interface PaidShellNav {
  currentIdx: number;
  total: number;
  goPrev: () => void;
  goNext: () => void;
  jumpTo: (idx: number) => void;
  prevDisabled: boolean;
  isLast: boolean;
  progressPct: number;
}

export function usePaidShellNav(total: number): PaidShellNav {
  const [currentIdx, setCurrentIdx] = useState(0);

  const goPrev = useCallback(() => {
    setCurrentIdx((idx) => (idx > 0 ? idx - 1 : idx));
  }, []);

  const goNext = useCallback(() => {
    setCurrentIdx((idx) => (idx < total - 1 ? idx + 1 : idx));
  }, [total]);

  const jumpTo = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= total) return;
      setCurrentIdx(idx);
    },
    [total],
  );

  return useMemo<PaidShellNav>(() => {
    const isLast = currentIdx === total - 1;
    return {
      currentIdx,
      total,
      goPrev,
      goNext,
      jumpTo,
      prevDisabled: currentIdx === 0,
      isLast,
      progressPct: total > 0 ? ((currentIdx + 1) / total) * 100 : 0,
    };
  }, [currentIdx, total, goPrev, goNext, jumpTo]);
}
