"use client";

import { useEffect } from "react";
import { LegalModal } from "@/shared/components/LegalModal";
import { SiteFooter } from "@/shared/components/SiteFooter";
import { trackEvent } from "@/shared/utils/analytics";
import type { CheckoutCharacter } from "../domain/checkoutProducts";
import { isDevBypassEnabled, useCheckout } from "../hooks/useCheckout";
import { CheckoutHeader } from "./components/CheckoutHeader";
import { EmailField } from "./components/EmailField";
import { PriceSummary } from "./components/PriceSummary";
import { CouponField } from "./components/CouponField";
import { CheckoutCta } from "./components/CheckoutCta";
import { ConsentRow } from "./components/ConsentRow";
import EmailConfirmModal from "./components/EmailConfirmModal";

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
    emailConfirmOpen,
    applyCoupon,
    handleBack,
    handleSubmit,
    confirmEmailAndPay,
    devBypassPay,
  } = useCheckout(character);

  const devBypass = isDevBypassEnabled();

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

        {/* PayApp 결제: 인페이지 위젯 없음. 결제수단·약관은 PayApp 페이지가 처리.
            우리 페이지의 동의(ConsentRow)는 우리 서비스의 개인정보·결제진행 동의 별도. */}

        <CheckoutCta
          onSubmit={handleSubmit}
          loading={isProcessing}
          disabled={false}
        />

        {/* ⚠️ staging/local 전용 — 운영 도메인에서는 노출 X (isDevBypassEnabled). */}
        {devBypass && (
          <button
            type="button"
            onClick={devBypassPay}
            disabled={isProcessing}
            className="w-full rounded-md border border-dashed border-rose-400 bg-rose-50 px-4 py-2 text-[12px] font-medium text-rose-600 hover:bg-rose-100 disabled:opacity-40 cursor-pointer"
          >
            🛠 결제 패스 (테스트용 · staging/local 전용)
          </button>
        )}

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

      {/* PayApp request 직전 이메일 재확인 — 확인 시 BE /request → payurl 리다이렉트 */}
      <EmailConfirmModal
        email={email.trim()}
        open={emailConfirmOpen}
        onConfirm={confirmEmailAndPay}
      />
    </div>
  );
}
