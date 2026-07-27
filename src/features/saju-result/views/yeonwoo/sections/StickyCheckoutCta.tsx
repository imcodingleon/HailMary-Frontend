"use client";

import { useRouter } from "next/navigation";
import { trackEvent } from "@/shared/utils/analytics";

type Props = {
  visible?: boolean;
  // HM-FE-91: true일 때 CTA 비활성("6월 초 오픈 예정") + onClick 차단.
  // 6월 초 유료 결제 라이브 시 disabled={false} 한 줄 토글로 복원.
  disabled?: boolean;
  /** 지정 시 내부 trackEvent+router.push 대신 이 콜백을 호출 (로그인 필수 게이트 등 부모가 흐름을 가로챌 때). */
  onCheckout?: () => void;
};

export function StickyCheckoutCta({ visible = true, disabled = false, onCheckout }: Props = {}) {
  const router = useRouter();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 mx-auto z-50 px-4 pb-3 pt-3"
      style={{
        maxWidth: "28rem",
        background:
          "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0) 100%)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      <p
        className="text-center mb-2"
        style={{
          color: "#ECECEC",
          textShadow: "0 4px 4px rgba(0,0,0,0.25)",
          fontFamily: "Pretendard, sans-serif",
          fontSize: "16px",
          fontWeight: 500,
          letterSpacing: "-0.64px",
        }}
      >
        {disabled ? "정밀 리포트는 곧 만나요" : "6월 오픈 기념 할인 이벤트 진행중"}
      </p>
      <button
        type="button"
        className="w-full flex items-center justify-center"
        style={{
          height: "55px",
          borderRadius: "11px",
          background: "#D73F59",
          color: "#FFF",
          fontFamily: "Pretendard, sans-serif",
          fontSize: "16px",
          fontWeight: 700,
          gap: "10px",
          opacity: disabled ? 0.55 : 1,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
        onClick={() => {
          if (disabled) {
            trackEvent("pay_cta_blocked", { character_id: "yeonwoo" });
            return;
          }
          if (onCheckout) {
            onCheckout();
            return;
          }
          trackEvent("pay_cta_click", { character_id: "yeonwoo" });
          router.push("/checkout/yeonwoo");
        }}
        aria-disabled={disabled}
      >
        {disabled ? "6월 초 오픈 예정" : "결제하고 연우의 정밀 리포트 읽기"}
      </button>
    </div>
  );
}
