"use client";

import { useEffect, useState } from "react";
import { api, ApiError } from "@/shared/utils/api";
import type {
  PaidReportStatus,
  PaidReportStatusResponse,
} from "../domain/paidReport";

interface UsePaidResultPollingResult {
  status: PaidReportStatus | null;
  error: string | null;
}

const POLL_INTERVAL_MS = 2000;

export function usePaidResultPolling(
  orderId: string,
): UsePaidResultPollingResult {
  const [status, setStatus] = useState<PaidReportStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const poll = async () => {
      try {
        const res = await api.getStrict<PaidReportStatusResponse>(
          `/api/saju/paid/${encodeURIComponent(orderId)}/status`,
        );
        if (cancelled) return;
        setStatus(res.status);
        if (res.status === "pending") {
          timer = setTimeout(poll, POLL_INTERVAL_MS);
        }
      } catch (err: unknown) {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 410) {
          setStatus("expired");
          return;
        }
        const msg = err instanceof Error ? err.message : "상태 조회 실패";
        setError(msg);
        timer = setTimeout(poll, POLL_INTERVAL_MS);
      }
    };

    poll();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [orderId]);

  return { status, error };
}
