"use client";

import { useEffect, useState } from "react";
import { api, ApiError } from "@/shared/utils/api";
import type { PaidReport } from "../domain/paidReport";

export type PaidReportFetchState =
  | { kind: "loading" }
  | { kind: "ready"; report: PaidReport }
  | { kind: "expired" }
  | { kind: "error"; message: string };

export function usePaidReport(orderId: string): PaidReportFetchState {
  const [state, setState] = useState<PaidReportFetchState>({ kind: "loading" });

  useEffect(() => {
    if (!orderId) return;
    let cancelled = false;

    api
      .getStrict<PaidReport>(`/api/saju/paid/${encodeURIComponent(orderId)}`)
      .then((report) => {
        if (cancelled) return;
        setState({ kind: "ready", report });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 410) {
          setState({ kind: "expired" });
          return;
        }
        const message = err instanceof Error ? err.message : "결과 조회 실패";
        setState({ kind: "error", message });
      });

    return () => {
      cancelled = true;
    };
  }, [orderId]);

  return state;
}
