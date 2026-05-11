"use client";

import { useEffect } from "react";
import { LegalModal } from "@/shared/components/LegalModal";
import { SiteFooter } from "@/shared/components/SiteFooter";
import { trackEvent } from "@/shared/utils/analytics";
import type { CheckoutCharacter } from "../domain/checkoutProducts";
import { useCheckout } from "../hooks/useCheckout";
import { CheckoutHeader } from "./components/CheckoutHeader";
import { EmailField } from "./components/EmailField";
import { PriceSummary } from "./components/PriceSummary";
import { CouponField } from "./components/CouponField";
import { CheckoutCta } from "./components/CheckoutCta";
import { ConsentRow } from "./components/ConsentRow";

interface CheckoutViewProps {
  character: CheckoutCharacter;
}

export function CheckoutView({ character }: CheckoutViewProps) {
  const {
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
  } = useCheckout(character);

  useEffect(() => {
    const SENT_KEY = `hm_checkout_${character}_view_sent`;
    if (sessionStorage.getItem(SENT_KEY)) return;
    sessionStorage.setItem(SENT_KEY, "1");
    const sajuRequestId =
      localStorage.getItem(`${character}SajuRequestId`) ?? null;
    trackEvent("checkout_page_view", {
      character_id: character,
      saju_request_id: sajuRequestId,
      amount: product.priceKrw,
    });
  }, [character, product.priceKrw]);

  return (
    <div className="flex min-h-[100dvh] flex-1 flex-col bg-white text-neutral-900">
      <CheckoutHeader onBack={handleBack} />

      <main className="flex-1 space-y-6 px-6 py-8">
        <EmailField
          value={email}
          onChange={setEmail}
          onBlur={handleEmailBlur}
          error={emailError}
        />

        <hr className="border-white/[0.06]" />

        <PriceSummary product={product} />

        <CouponField
          value={coupon}
          onChange={setCoupon}
          onBlur={handleCouponBlur}
          onApply={applyCoupon}
        />

        <CheckoutCta onSubmit={handleSubmit} loading={isProcessing} />

        <div className="space-y-3 pt-2">
          <ConsentRow
            id="agree-data-usage"
            label="개인정보 이용 동의"
            checked={agreeDataUsage}
            onChange={handleAgreeDataUsage}
            onDetail={() => handleConsentDetail("data-usage")}
          />
          <ConsentRow
            id="agree-payment"
            label="결제진행 동의"
            checked={agreePayment}
            onChange={handleAgreePayment}
            onDetail={() => handleConsentDetail("payment")}
          />
        </div>
      </main>

      <SiteFooter variant="light" />

      <LegalModal doc={openConsent} onClose={() => setOpenConsent(null)} />
    </div>
  );
}
