"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isValidEmail } from "@/shared/utils/validation";
import { trackEvent } from "@/shared/utils/analytics";
import { api } from "@/shared/utils/api";
import {
  PRODUCTS,
  type CheckoutCharacter,
  type CheckoutProduct,
} from "../domain/checkoutProducts";

export type ConsentDoc = "data-usage" | "payment";

interface RequestPaymentResponse {
  orderId: string;
  payurl: string;
}

interface DevBypassResponse {
  orderId: string;
}

/** staging/local 환경 감지 — prod 도메인이 아니면 결제 패스 버튼 노출. */
export function isDevBypassEnabled(): boolean {
  if (typeof window === "undefined") return false;
  const host = window.location.host;
  if (host === "dohwaseonsaju.com" || host === "www.dohwaseonsaju.com") return false;
  return true;
}

export interface UseCheckoutReturn {
  product: CheckoutProduct;
  email: string;
  setEmail: (v: string) => void;
  emailError: string | null;
  handleEmailBlur: () => void;
  coupon: string;
  setCoupon: (v: string) => void;
  handleCouponBlur: () => void;
  agreeDataUsage: boolean;
  handleAgreeDataUsage: (v: boolean) => void;
  agreePayment: boolean;
  handleAgreePayment: (v: boolean) => void;
  openConsent: ConsentDoc | null;
  setOpenConsent: (v: ConsentDoc | null) => void;
  handleConsentDetail: (doc: ConsentDoc) => void;
  isProcessing: boolean;
  applyCoupon: () => void;
  handleBack: () => void;
  /** 검증 → BE /request → payurl 리다이렉트 (모달 없음, 마찰 최소화). */
  handleSubmit: () => Promise<void>;
  /** staging/local 전용: 결제 단계 스킵 → BE bypass → success polling. */
  devBypassPay: () => Promise<void>;
}

function scrollToField(id: string): void {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  if (el instanceof HTMLElement) el.focus({ preventScroll: true });
}

export function useCheckout(character: CheckoutCharacter): UseCheckoutReturn {
  const router = useRouter();
  const product = PRODUCTS[character];

  const [email, setEmailState] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [coupon, setCoupon] = useState("");
  const [agreeDataUsage, setAgreeDataUsage] = useState(true);
  const [agreePayment, setAgreePayment] = useState(true);
  const [openConsent, setOpenConsent] = useState<ConsentDoc | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // PayApp 결제 페이지에서 뒤로가기 복귀 시 isProcessing reset.
  useEffect(() => {
    const reset = () => setIsProcessing(false);
    window.addEventListener("pageshow", reset);
    window.addEventListener("focus", reset);
    return () => {
      window.removeEventListener("pageshow", reset);
      window.removeEventListener("focus", reset);
    };
  }, []);

  const setEmail = useCallback((v: string) => {
    setEmailState(v);
    if (emailError) setEmailError(null);
  }, [emailError]);

  const handleEmailBlur = useCallback(() => {
    const trimmed = email.trim();
    if (!trimmed) return;
    trackEvent("checkout_email_input", {
      character_id: character,
      has_value: true,
      is_valid: isValidEmail(trimmed),
    });
  }, [email, character]);

  const handleCouponBlur = useCallback(() => {
    const trimmed = coupon.trim();
    if (!trimmed) return;
    trackEvent("checkout_coupon_input", {
      character_id: character,
      has_value: true,
    });
  }, [coupon, character]);

  const handleAgreeDataUsage = useCallback(
    (v: boolean) => {
      setAgreeDataUsage(v);
      trackEvent("checkout_consent_toggle", {
        character_id: character,
        consent_type: "data-usage",
        checked: v,
      });
    },
    [character],
  );

  const handleAgreePayment = useCallback(
    (v: boolean) => {
      setAgreePayment(v);
      trackEvent("checkout_consent_toggle", {
        character_id: character,
        consent_type: "payment",
        checked: v,
      });
    },
    [character],
  );

  const handleConsentDetail = useCallback(
    (doc: ConsentDoc) => {
      setOpenConsent(doc);
      trackEvent("checkout_consent_detail_click", {
        character_id: character,
        consent_type: doc,
      });
    },
    [character],
  );

  const handleBack = useCallback(() => {
    trackEvent("checkout_back_click", { character_id: character });
    router.push(`/saju/result?character=${character}`);
  }, [router, character]);

  const applyCoupon = useCallback(() => {
    const code = coupon.trim();
    trackEvent("checkout_coupon_apply_click", {
      character_id: character,
      has_value: code.length > 0,
    });
    if (!code) {
      alert("쿠폰 코드를 입력해 주세요.");
      return;
    }
    alert("쿠폰 적용은 정식 오픈 후 안내드릴게요.");
  }, [coupon, character]);

  /** 결제 버튼 클릭 — 검증 → BE /request → payurl 리다이렉트 (모달 없음). */
  const handleSubmit = useCallback(async () => {
    trackEvent("checkout_pay_button_click", {
      character_id: character,
      amount: product.priceKrw,
      email_filled: email.trim().length > 0,
      agree_data_usage: agreeDataUsage,
      agree_payment: agreePayment,
    });
    if (!isValidEmail(email)) {
      setEmailError("이메일 형식을 확인해 주세요.");
      scrollToField("checkout-email");
      trackEvent("checkout_validation_failed", {
        character_id: character,
        reason: "email_invalid",
      });
      return;
    }
    if (!agreeDataUsage || !agreePayment) {
      scrollToField(!agreeDataUsage ? "agree-data-usage" : "agree-payment");
      alert("결제 진행에는 두 가지 동의가 모두 필요합니다.");
      trackEvent("checkout_validation_failed", {
        character_id: character,
        reason: "consent_missing",
      });
      return;
    }
    if (isProcessing) return;
    setIsProcessing(true);

    const sajuRequestId =
      typeof window !== "undefined"
        ? localStorage.getItem(`${character}SajuRequestId`)
        : null;
    const sessionToken = sajuRequestId;

    trackEvent("payment_initiated", {
      character_id: character,
      saju_request_id: sajuRequestId,
      amount: product.priceKrw,
    });

    try {
      const res = await api.post<RequestPaymentResponse>(
        "/api/payments/request",
        {
          sessionToken,
          character,
          customerEmail: email.trim(),
        },
      );

      try {
        sessionStorage.setItem(
          "checkoutPending",
          JSON.stringify({
            character,
            orderId: res.orderId,
            amount: product.priceKrw,
            email: email.trim(),
          }),
        );
      } catch {}

      window.location.href = res.payurl;
    } catch (err) {
      const message = err instanceof Error ? err.message : "결제를 시작하지 못했어요.";
      trackEvent("payment_failed", {
        character_id: character,
        error_message: message,
      });
      alert(`결제를 시작하지 못했어요: ${message}`);
      setIsProcessing(false);
    }
  }, [email, agreeDataUsage, agreePayment, character, product, isProcessing]);

  /** 결제 패스 (staging/local 전용) — BE bypass endpoint 호출 → success polling. */
  const devBypassPay = useCallback(async () => {
    if (isProcessing) return;
    if (!isValidEmail(email)) {
      setEmailError("이메일 형식을 확인해 주세요.");
      scrollToField("checkout-email");
      return;
    }
    setIsProcessing(true);
    const sessionToken =
      typeof window !== "undefined"
        ? localStorage.getItem(`${character}SajuRequestId`)
        : null;
    try {
      const res = await api.post<DevBypassResponse>(
        "/api/payments/dev/bypass",
        {
          sessionToken,
          character,
          customerEmail: email.trim(),
        },
      );
      try {
        sessionStorage.setItem(
          "checkoutPending",
          JSON.stringify({
            character,
            orderId: res.orderId,
            amount: product.priceKrw,
            email: email.trim(),
          }),
        );
      } catch {}
      trackEvent("payment_dev_bypass", { character_id: character, order_id: res.orderId });
      router.replace("/checkout/success");
    } catch (err) {
      const message = err instanceof Error ? err.message : "결제 패스 실패";
      alert(`결제 패스 실패: ${message}`);
      setIsProcessing(false);
    }
  }, [character, email, isProcessing, product, router]);

  return {
    product,
    email,
    setEmail,
    emailError,
    handleEmailBlur,
    coupon,
    setCoupon,
    handleCouponBlur,
    agreeDataUsage,
    handleAgreeDataUsage,
    agreePayment,
    handleAgreePayment,
    openConsent,
    setOpenConsent,
    handleConsentDetail,
    isProcessing,
    applyCoupon,
    handleBack,
    handleSubmit,
    devBypassPay,
  };
}
