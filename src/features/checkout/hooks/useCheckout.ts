"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { ANONYMOUS, loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { isValidEmail } from "@/shared/utils/validation";
import { trackEvent } from "@/shared/utils/analytics";
import {
  PRODUCTS,
  type CheckoutCharacter,
  type CheckoutProduct,
} from "../domain/checkoutProducts";

export type ConsentDoc = "data-usage" | "payment";

export type CheckoutMethod = "GENERAL" | "KAKAOPAY" | "NAVERPAY";

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
  handleSubmit: (method: CheckoutMethod) => void;
}

function generateOrderId(character: CheckoutCharacter): string {
  const uuid =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return `dohwa-${character}-${uuid}`;
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

  const handleSubmit = useCallback(
    async (method: CheckoutMethod) => {
      trackEvent("checkout_pay_button_click", {
        character_id: character,
        payment_method: method,
        amount: product.priceKrw,
        email_filled: email.trim().length > 0,
        agree_data_usage: agreeDataUsage,
        agree_payment: agreePayment,
      });
      if (!isValidEmail(email)) {
        setEmailError("이메일 형식을 확인해 주세요.");
        trackEvent("checkout_validation_failed", {
          character_id: character,
          reason: "email_invalid",
        });
        return;
      }
      if (!agreeDataUsage || !agreePayment) {
        alert("결제 진행에는 두 가지 동의가 모두 필요합니다.");
        trackEvent("checkout_validation_failed", {
          character_id: character,
          reason: "consent_missing",
        });
        return;
      }
      const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
      if (!clientKey) {
        alert("결제 키 설정이 누락되었어요. 관리자에게 문의해 주세요.");
        return;
      }
      if (isProcessing) return;
      setIsProcessing(true);
      const sajuRequestId =
        typeof window !== "undefined"
          ? localStorage.getItem(`${character}SajuRequestId`)
          : null;
      let orderId: string | null = null;
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const payment = tossPayments.payment({ customerKey: ANONYMOUS });
        orderId = generateOrderId(character);
        try {
          sessionStorage.setItem(
            "checkoutPending",
            JSON.stringify({
              character,
              orderId,
              amount: product.priceKrw,
              email: email.trim(),
            }),
          );
        } catch {}

        trackEvent("payment_method_selected", {
          character_id: character,
          saju_request_id: sajuRequestId,
          payment_method: method,
          amount: product.priceKrw,
          order_id: orderId,
        });

        // 결제 수단별 분기:
        //   GENERAL  → 통합결제창 (flowMode DEFAULT) — 카드·간편결제·계좌이체 등 종합
        //   KAKAOPAY → 카카오페이 자체창 (flowMode DIRECT)
        //   NAVERPAY → 네이버페이 자체창 (flowMode DIRECT)
        // 계약 전 키에서는 NAVERPAY는 가능, KAKAOPAY는 일부 제한이 있을 수 있음.
        const cardConfig =
          method === "GENERAL"
            ? {
                useEscrow: false,
                flowMode: "DEFAULT" as const,
                useCardPoint: false,
                useAppCardOnly: false,
              }
            : {
                useEscrow: false,
                flowMode: "DIRECT" as const,
                easyPay: method === "KAKAOPAY" ? "카카오페이" : "네이버페이",
                useCardPoint: false,
                useAppCardOnly: false,
              };

        trackEvent("payment_initiated", {
          character_id: character,
          saju_request_id: sajuRequestId,
          payment_method: method,
          amount: product.priceKrw,
          order_id: orderId,
        });

        await payment.requestPayment({
          method: "CARD",
          amount: { currency: "KRW", value: product.priceKrw },
          orderId,
          orderName: product.productLabel,
          successUrl: `${window.location.origin}/checkout/success`,
          failUrl: `${window.location.origin}/checkout/fail`,
          customerEmail: email.trim(),
          card: cardConfig,
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : "결제를 시작하지 못했어요.";
        const errorCode =
          err && typeof err === "object" && "code" in err
            ? String((err as { code: unknown }).code)
            : "UNKNOWN";
        trackEvent("payment_failed", {
          character_id: character,
          order_id: orderId,
          error_code: errorCode,
          error_message: message,
        });
        if (!message.includes("USER_CANCEL") && !message.includes("취소")) {
          alert(`결제를 시작하지 못했어요: ${message}`);
        }
        setIsProcessing(false);
      }
    },
    [email, agreeDataUsage, agreePayment, character, product, isProcessing],
  );

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
  };
}
