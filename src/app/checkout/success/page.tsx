"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/shared/utils/analytics";
import { api, ApiError } from "@/shared/utils/api";
import { PaidIntroScene as YeonwooPaidIntroScene } from "@/features/saju-result/views/yeonwoo/paid/paid-intro/PaidIntroScene";
import { PaidIntroScene as DoyoonPaidIntroScene } from "@/features/saju-result/views/doyoon/paid/paid-intro/PaidIntroScene";

/**
 * PayApp 결제 페이지에서 returnurl 도착 시 진입.
 *
 * 처리 흐름:
 * 1. sessionStorage `checkoutPending` 에서 orderId/character 복원
 * 2. BE `GET /api/payments/status` 폴링 (1초 간격, 최대 60초)
 *    — PayApp이 webhook(`/feedback`)으로 BE에 결제완료 통지하면 status=DONE
 * 3. status=DONE → 캐릭터별 인트로 씬 → CTA → /saju/paid/{orderId}/loading
 * 4. status=CANCELED/ABORTED → 결제 실패 UI
 * 5. 60초 타임아웃 → 처리 지연 안내
 *
 * PayApp는 returnurl 도달 시점이 webhook 도달보다 빠를 수 있어 polling 필수.
 */

type ScreenStatus =
  | "polling"          // BE 폴링 중 (PayApp webhook 대기)
  | "intro_play"       // status=DONE → 인트로 씬
  | "cancelled"        // 결제 취소/중단
  | "timeout"          // 폴링 60초 초과
  | "error";           // 검증 실패 (orderId 누락 등)

interface PaymentStatusResponse {
  orderId: string;
  status: string;     // READY / DONE / CANCELED / ABORTED / WAITING_FOR_DEPOSIT / PARTIAL_CANCELED
  character: string;  // "yeonwoo" | "doyoon"
}

interface PendingCheckout {
  character: string;
  orderId: string;
  amount?: number;
  email?: string;
}

const POLL_INTERVAL_MS = 1500;
const POLL_TIMEOUT_MS = 60_000;

function SuccessBody() {
  const router = useRouter();
  const [screen, setScreen] = useState<ScreenStatus>("polling");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatusResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const viewSentRef = useRef(false);
  const redirectSentRef = useRef(false);

  // 진입 트래킹
  useEffect(() => {
    if (viewSentRef.current) return;
    viewSentRef.current = true;
    let character: string | null = null;
    let orderId: string | null = null;
    try {
      const raw = sessionStorage.getItem("checkoutPending");
      if (raw) {
        const p = JSON.parse(raw) as PendingCheckout;
        character = p?.character ?? null;
        orderId = p?.orderId ?? null;
      }
    } catch {}
    trackEvent("checkout_success_view", { character_id: character, order_id: orderId });
  }, []);

  // 폴링 루프
  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    let pending: PendingCheckout | null = null;
    try {
      const raw = sessionStorage.getItem("checkoutPending");
      if (raw) pending = JSON.parse(raw) as PendingCheckout;
    } catch {}

    if (!pending?.orderId) {
      setScreen("error");
      setErrorMsg("결제 세션 정보가 없어요. 처음부터 다시 시도해 주세요.");
      return;
    }
    const orderId = pending.orderId;

    const startedAt = Date.now();

    const poll = async () => {
      if (cancelled) return;
      try {
        const res = await api.get<PaymentStatusResponse>(
          `/api/payments/status?order_id=${encodeURIComponent(orderId)}`,
        );
        if (cancelled) return;

        if (res.status === "DONE") {
          setPaymentStatus(res);
          setScreen("intro_play");
          return;
        }
        if (res.status === "CANCELED" || res.status === "ABORTED") {
          setScreen("cancelled");
          return;
        }
        // READY / WAITING_FOR_DEPOSIT / PARTIAL_CANCELED → 계속 폴링
      } catch (err) {
        // 404 (payment 없음) — webhook이 아직 record 만들지 않은 케이스는 없지만,
        // 만약 BE에 record 없다면 에러 표시
        if (err instanceof ApiError && err.status === 404) {
          setScreen("error");
          setErrorMsg("결제 정보를 찾을 수 없어요.");
          return;
        }
        // 기타 네트워크 에러는 재시도
      }

      if (Date.now() - startedAt >= POLL_TIMEOUT_MS) {
        if (!cancelled) setScreen("timeout");
        return;
      }
      timer = setTimeout(poll, POLL_INTERVAL_MS);
    };

    poll();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

  // 인트로 씬 CTA → loading 페이지로
  const handleIntroCta = () => {
    if (redirectSentRef.current || !paymentStatus) return;
    redirectSentRef.current = true;
    trackEvent("paid_result_redirect", {
      order_id: paymentStatus.orderId,
      character_id: paymentStatus.character,
    });
    try { sessionStorage.removeItem("checkoutPending"); } catch {}
    router.replace(`/saju/paid/${encodeURIComponent(paymentStatus.orderId)}/loading`);
  };

  if (screen === "intro_play" && paymentStatus) {
    return paymentStatus.character === "doyoon" ? (
      <DoyoonPaidIntroScene onCta={handleIntroCta} />
    ) : (
      <YeonwooPaidIntroScene onCta={handleIntroCta} />
    );
  }

  return (
    <main className="flex min-h-[100dvh] flex-1 flex-col items-center justify-center gap-6 bg-white px-6 py-10 text-neutral-900">
      {screen === "polling" && (
        <>
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-900" aria-hidden />
          <p className="text-[14px] text-neutral-700">결제 결과 확인 중…</p>
          <p className="text-[12px] text-neutral-500">잠시만 기다려 주세요.</p>
        </>
      )}

      {screen === "cancelled" && (
        <>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold">결제가 취소되었어요</h1>
          <p className="max-w-md text-center text-[13px] text-neutral-600">
            결제가 취소되었거나 진행되지 않았습니다. 다시 시도하시려면 처음부터 진행해 주세요.
          </p>
          <Link
            href="/"
            className="rounded-full border border-neutral-300 px-5 py-2 text-[13px] text-neutral-700 hover:bg-neutral-100"
          >
            메인으로
          </Link>
        </>
      )}

      {screen === "timeout" && (
        <>
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-900" aria-hidden />
          <h1 className="text-xl font-semibold">결제 처리가 지연되고 있어요</h1>
          <p className="max-w-md text-center text-[13px] text-neutral-600">
            잠시 후 새로고침해 주세요. 결제가 정상 완료되었다면 결과가 표시됩니다.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-full border border-neutral-300 px-5 py-2 text-[13px] text-neutral-700 hover:bg-neutral-100"
          >
            새로고침
          </button>
        </>
      )}

      {screen === "error" && (
        <>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold">결제 정보 확인 실패</h1>
          <p className="max-w-md text-center text-[13px] text-neutral-600">
            {errorMsg ?? "결제 정보 확인 중 오류가 발생했어요."}
          </p>
          <Link
            href="/"
            className="rounded-full border border-neutral-300 px-5 py-2 text-[13px] text-neutral-700 hover:bg-neutral-100"
          >
            메인으로
          </Link>
        </>
      )}
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessBody />
    </Suspense>
  );
}
