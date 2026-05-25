"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getDeviceId, getSessionId, trackEvent } from "@/shared/utils/analytics";
import EmailConfirmModal from "@/features/checkout/views/components/EmailConfirmModal";
import { PaidIntroScene } from "@/features/saju-result/views/yeonwoo/paid/paid-intro/PaidIntroScene";

type ConfirmStatus = "pending" | "success" | "error";

interface ConfirmedPayment {
  paymentKey: string;
  orderId: string;
  character: string;
  amount: number;
  status: string;
  approvedAt: string;
  expiresAt: string;
}

interface PendingCheckout {
  character: string;
  email: string;
  amount?: number;
  sessionToken?: string | null;
}

function SuccessBody() {
  const params = useSearchParams();
  const router = useRouter();
  const paymentKey = params.get("paymentKey") ?? "";
  const orderId = params.get("orderId") ?? "";
  const amount = params.get("amount") ?? "";

  // status: "verifying" 진입 검증 → "awaiting_confirm" 모달 노출 → "confirming" confirm 호출 중 → "success"/"error"
  const [status, setStatus] = useState<ConfirmStatus | "awaiting_confirm" | "confirming" | "verifying" | "intro_play">("verifying");
  const [pending, setPending] = useState<PendingCheckout | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [data, setData] = useState<ConfirmedPayment | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const viewSentRef = useRef(false);
  const redirectSentRef = useRef(false);

  useEffect(() => {
    if (viewSentRef.current) return;
    viewSentRef.current = true;
    let character: string | null = null;
    try {
      const raw = sessionStorage.getItem("checkoutPending");
      if (raw) character = (JSON.parse(raw)?.character as string) ?? null;
    } catch {}
    trackEvent("checkout_success_view", {
      character_id: character,
      order_id: orderId || null,
    });
  }, [orderId]);

  // 진입 시 결제 세션 검증만 — confirm 호출은 모달 확인 후
  useEffect(() => {
    if (!paymentKey || !orderId || !amount) {
      setStatus("error");
      setErrorMsg("결제 식별 정보가 누락되었어요.");
      return;
    }
    let p: PendingCheckout | null = null;
    try {
      const raw = sessionStorage.getItem("checkoutPending");
      if (raw) p = JSON.parse(raw);
    } catch {}

    if (!p?.character || !p?.email) {
      setStatus("error");
      setErrorMsg("결제 세션이 만료되었어요. 처음부터 다시 시도해 주세요.");
      return;
    }
    if (!p.sessionToken) {
      setStatus("error");
      setErrorMsg("사용자 세션 정보가 없어요. 처음부터 다시 시도해 주세요.");
      return;
    }
    if (typeof p.amount === "number" && p.amount !== Number(amount)) {
      trackEvent("payment_amount_mismatch", {
        character_id: p.character,
        order_id: orderId,
        intended_amount: p.amount,
        received_amount: Number(amount),
      });
      setStatus("error");
      setErrorMsg("결제 금액이 일치하지 않아요. 결제를 취소하고 고객센터로 문의해 주세요.");
      return;
    }

    setPending(p);
    setStatus("awaiting_confirm");
    setShowModal(true);
    trackEvent("email_confirm_modal_open", { character_id: p.character });
  }, [paymentKey, orderId, amount]);

  const runConfirm = useCallback((confirmedEmail: string) => {
    if (!pending) return;
    setShowModal(false);
    setStatus("confirming");
    const emailChanged = confirmedEmail !== pending.email;
    trackEvent("email_confirm_modal_confirm", {
      character_id: pending.character,
      email_changed: emailChanged,
    });

    const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "";
    const url = `${apiBase}/api/payments/confirm`;
    const deviceId = getDeviceId() || null;
    const sessionIdRaw = getSessionId();
    const sessionIdNum = sessionIdRaw ? Number(sessionIdRaw) : NaN;
    const sessionId = Number.isFinite(sessionIdNum) ? sessionIdNum : null;
    const body = {
      paymentKey,
      orderId,
      amount: Number(amount),
      character: pending.character,
      customerEmail: confirmedEmail,
      sessionToken: pending.sessionToken,
      deviceId,
      sessionId,
    };

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(async (r) => {
        const json = await r.json().catch(() => null);
        if (!r.ok) {
          const detail =
            (json?.detail?.message as string | undefined) ??
            (typeof json?.detail === "string" ? json.detail : null) ??
            (Array.isArray(json?.detail)
              ? (json.detail as Array<{ loc?: unknown[]; msg?: string }>)
                  .map((d) => {
                    const field = Array.isArray(d.loc)
                      ? d.loc.filter((p) => p !== "body").join(".")
                      : "";
                    return field ? `${field}: ${d.msg ?? ""}` : (d.msg ?? "");
                  })
                  .filter(Boolean)
                  .join(", ")
              : null) ??
            `HTTP ${r.status}`;
          throw new Error(detail);
        }
        return json as ConfirmedPayment;
      })
      .then((d) => {
        setData(d);
        try { sessionStorage.removeItem("checkoutPending"); } catch {}
        // 연우는 인트로 씬 → CTA 클릭 시 로딩으로. 도윤은 바로 로딩.
        if (d.character === "yeonwoo") {
          setStatus("intro_play");
        } else {
          setStatus("success");
          if (!redirectSentRef.current) {
            redirectSentRef.current = true;
            trackEvent("paid_result_redirect", { order_id: d.orderId, character_id: d.character });
            router.replace(`/saju/paid/${encodeURIComponent(d.orderId)}/loading`);
          }
        }
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : "결제 승인에 실패했어요.";
        setErrorMsg(msg);
        setStatus("error");
        trackEvent("payment_confirm_failed", {
          character_id: pending.character,
          order_id: orderId,
          payment_key: paymentKey,
          amount: Number(amount),
          error_message: msg,
        });
      });
  }, [pending, paymentKey, orderId, amount, router]);


  if (status === "intro_play" && data) {
    return (
      <PaidIntroScene
        onCta={() => {
          if (redirectSentRef.current) return;
          redirectSentRef.current = true;
          trackEvent("paid_result_redirect", { order_id: data.orderId, character_id: data.character });
          router.replace(`/saju/paid/${encodeURIComponent(data.orderId)}/loading`);
        }}
      />
    );
  }

  return (
    <main className="flex min-h-[100dvh] flex-1 flex-col items-center justify-center gap-6 bg-white px-6 py-10 text-neutral-900">
      {(status === "verifying" || status === "awaiting_confirm") && (
        <>
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-900" aria-hidden />
          <p className="text-[14px] text-neutral-700">결제 정보 확인 중…</p>
        </>
      )}

      {status === "confirming" && (
        <>
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-900" aria-hidden />
          <p className="text-[14px] text-neutral-700">결제 승인 처리 중…</p>
        </>
      )}

      <EmailConfirmModal
        open={showModal}
        email={pending?.email ?? ""}
        onConfirm={runConfirm}
      />

      {status === "pending" && (
        <>
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-900" aria-hidden />
          <p className="text-[14px] text-neutral-700">결제 승인 처리 중…</p>
        </>
      )}

      {status === "success" && (
        <>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold">결제 완료</h1>
          <p className="text-center text-[13px] text-neutral-500">
            결과지 조회 링크를 입력하신 이메일로 보내드릴게요.
          </p>
          <dl className="w-full max-w-md select-text space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-5 text-[12.5px]">
            <Row label="paymentKey" value={data?.paymentKey ?? paymentKey} />
            <Row label="orderId" value={data?.orderId ?? orderId} />
            <Row
              label="amount"
              value={`${(data?.amount ?? Number(amount)).toLocaleString("ko-KR")}원`}
            />
            {data?.expiresAt && (
              <Row
                label="조회 가능 기한"
                value={new Date(data.expiresAt).toLocaleString("ko-KR")}
              />
            )}
          </dl>
          <Link
            href="/"
            className="rounded-full border border-neutral-300 px-5 py-2 text-[13px] text-neutral-700 hover:bg-neutral-100"
          >
            메인으로 돌아가기
          </Link>
        </>
      )}

      {status === "error" && (
        <>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold">결제 승인 실패</h1>
          <p className="max-w-md text-center text-[13px] text-neutral-600">
            {errorMsg ?? "결제 승인 처리 중 오류가 발생했어요."}
          </p>
          <p className="text-[12px] text-neutral-500">
            카드는 결제되지 않았어요. 다시 시도하거나 고객센터로 문의해 주세요.
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-medium text-neutral-700">{label}</dt>
      <dd className="mt-1 break-all text-neutral-900">{value || "(없음)"}</dd>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessBody />
    </Suspense>
  );
}
