"use client";

import { useCallback, useEffect, useState } from "react";
import { getCoinBalance } from "../api";
import { isCoinEnabled } from "../config";

export interface UseCoinBalanceResult {
  balance: number | null;
  loading: boolean;
  reload: () => void;
}

/** 코인 잔액 조회. 코인 OFF면 조회하지 않고 null 유지. */
export function useCoinBalance(): UseCoinBalanceResult {
  const [balance, setBalance] = useState<number | null>(null);
  // 코인 ON이면 첫 조회가 끝날 때까지 loading. (effect 본문에서 동기 setState 하지 않으려고 초기값으로 둠)
  const [loading, setLoading] = useState<boolean>(() => isCoinEnabled());

  // 수동 새로고침 — 이벤트 콜백에서 쓰므로 동기 setState 허용.
  const reload = useCallback(() => {
    if (!isCoinEnabled()) return;
    setLoading(true);
    getCoinBalance()
      .then(setBalance)
      .catch(() => setBalance(null))
      .finally(() => setLoading(false));
  }, []);

  // 마운트 시 1회 조회 — setState는 전부 async 콜백에서만.
  useEffect(() => {
    if (!isCoinEnabled()) return;
    let alive = true;
    getCoinBalance()
      .then((b) => {
        if (alive) setBalance(b);
      })
      .catch(() => {
        if (alive) setBalance(null);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return { balance, loading, reload };
}
