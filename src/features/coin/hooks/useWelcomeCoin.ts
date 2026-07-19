"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { signupSignal } from "@/lib/signupSignal";
import { getCoinBalance } from "../api";
import { isCoinEnabled } from "../config";

export interface UseWelcomeCoinResult {
  open: boolean;
  balance: number | null;
  close: () => void;
}

/**
 * 신규 가입(signupSignal) + 코인 ON → 웰컴 코인 팝업을 띄우고, 표시할 지급 잔액을 조회.
 * close 시 신호를 소비해 다시 뜨지 않게 한다.
 */
export function useWelcomeCoin(): UseWelcomeCoinResult {
  const pending = useSyncExternalStore(
    signupSignal.subscribe,
    signupSignal.get,
    () => false,
  );
  const open = pending && isCoinEnabled();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!open) return;
    let alive = true;
    getCoinBalance()
      .then((b) => {
        if (alive) setBalance(b);
      })
      .catch(() => {
        if (alive) setBalance(null);
      });
    return () => {
      alive = false;
    };
  }, [open]);

  return {
    open,
    balance,
    close: () => signupSignal.consume(),
  };
}
