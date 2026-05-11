"use client";

import { useCallback, useEffect, useState } from "react";
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

type TossPaymentsInstance = Awaited<ReturnType<typeof loadTossPayments>>;
type WidgetsInstance = ReturnType<TossPaymentsInstance["widgets"]>;

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
  widgetsReady: boolean;
  applyCoupon: () => void;
  handleBack: () => void;
  handleSubmit: () => void;
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
  const [widgets, setWidgets] = useState<WidgetsInstance | null>(null);
  const [widgetsReady, setWidgetsReady] = useState(false);

  // 1단계: 결제위젯 인스턴스 생성 (마운트 시 1회)
  useEffect(() => {
    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
    if (!clientKey) return;
    let cancelled = false;
    (async () => {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        if (cancelled) return;
        const instance = tossPayments.widgets({ customerKey: ANONYMOUS });
        setWidgets(instance);
      } catch (err) {
        const message = err instanceof Error ? err.message : "결제 위젯 초기화 실패";
        trackEvent("payment_widget_init_failed", {
          character_id: character,
          error_message: message,
        });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [character]);

  // 2단계: 결제 금액 설정 + 결제수단/약관 위젯 렌더링
  useEffect(() => {
    if (widgets == null) return;
    let cancelled = false;
    (async () => {
      try {
        await widgets.setAmount({
          currency: "KRW",
          value: product.priceKrw,
        });
        await Promise.all([
          widgets.renderPaymentMethods({
            selector: "#payment-method",
            variantKey: "DEFAULT",
          }),
          widgets.renderAgreement({
            selector: "#agreement",
            variantKey: "AGREEMENT",
          }),
        ]);
        if (!cancelled) setWidgetsReady(true);
      } catch (err) {
        const message = err instanceof Error ? err.message : "결제 위젯 렌더링 실패";
        trackEvent("payment_widget_render_failed", {
          character_id: character,
          error_message: message,
        });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [widgets, product.priceKrw, character]);

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
    if (widgets == null || !widgetsReady) {
      alert("결제 위젯이 아직 준비되지 않았어요. 잠시 후 다시 시도해 주세요.");
      return;
    }
    if (isProcessing) return;
    setIsProcessing(true);
    const sajuRequestId =
      typeof window !== "undefined"
        ? localStorage.getItem(`${character}SajuRequestId`)
        : null;
    const orderId = generateOrderId(character);
    // sessionToken: 무료 플로에서 발급되어 localStorage에 저장된 값.
    // 백엔드 confirm 단계에서 user 식별에 사용된다. 누락이면 confirm 400.
    const sessionToken =
      typeof window !== "undefined"
        ? localStorage.getItem(`${character}SajuRequestId`)
        : null;
    try {
      sessionStorage.setItem(
        "checkoutPending",
        JSON.stringify({
          character,
          orderId,
          amount: product.priceKrw,
          email: email.trim(),
          sessionToken,
        }),
      );
    } catch {}

    trackEvent("payment_initiated", {
      character_id: character,
      saju_request_id: sajuRequestId,
      amount: product.priceKrw,
      order_id: orderId,
    });

    try {
      await widgets.requestPayment({
        orderId,
        orderName: product.productLabel,
        successUrl: `${window.location.origin}/checkout/success`,
        failUrl: `${window.location.origin}/checkout/fail`,
        customerEmail: email.trim(),
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
  }, [
    email,
    agreeDataUsage,
    agreePayment,
    character,
    product,
    isProcessing,
    widgets,
    widgetsReady,
  ]);

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
    widgetsReady,
    applyCoupon,
    handleBack,
    handleSubmit,
  };
}
