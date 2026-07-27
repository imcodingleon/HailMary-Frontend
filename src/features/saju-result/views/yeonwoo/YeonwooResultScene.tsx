"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/shared/utils/analytics";
import { LoginPromptModal, useLoginGate } from "@/features/auth";
import { isCoinEnabled } from "@/features/coin";
import { useYeonwooSajuData } from "../../hooks/useYeonwooSajuData";
import { HeroSection } from "./sections/HeroSection";
import { SceneOpeningSection } from "./sections/SceneOpeningSection";
import { DialogueBubbleSection } from "./sections/DialogueBubbleSection";
import { HandsOnBookSection } from "./sections/HandsOnBookSection";
import { BlackSpacer } from "./sections/BlackSpacer";
import { SajuChartSection } from "./sections/SajuChartSection";
import { YeonwooPortraitSection } from "./sections/YeonwooPortraitSection";
import { WuxingChartSection } from "./sections/WuxingChartSection";
import { KijilSection } from "./sections/KijilSection";
import { CharmCardsSection } from "./sections/CharmCardsSection";
import { ClosingPromptSection } from "./sections/ClosingPromptSection";
import { ClosingPortraitSection } from "./sections/ClosingPortraitSection";
import { BlockingSection } from "./sections/BlockingSection";
import { AvoidPartnerSection } from "./sections/AvoidPartnerSection";
import { BubblesDaBoYeoSection } from "./sections/BubblesDaBoYeoSection";
import { YeonwooBookSection } from "./sections/YeonwooBookSection";
import { ClosingDialogueSection } from "./sections/ClosingDialogueSection";
import { RomanceChaptersSection } from "./sections/RomanceChaptersSection";
import { FinalCtaSection } from "./sections/FinalCtaSection";
import { FullResultIndexSection } from "./sections/FullResultIndexSection";
import { DestinedPartnerSection } from "./sections/DestinedPartnerSection";
import { RomanceTimingSection } from "./sections/RomanceTimingSection";
import { RealReviewsSection } from "./sections/RealReviewsSection";
import { StickyCheckoutCta } from "./sections/StickyCheckoutCta";

const SURFACE = "#141311";

export default function YeonwooResultScene() {
  const router = useRouter();
  const data = useYeonwooSajuData();

  // 결제하기 진입 시 로그인 필수 게이트(코인 모드 ON일 때만). X → 무료 결과 화면에 그대로 머무름.
  // returnTo=/checkout/yeonwoo/ — 로그인 후에도 자동결제 없이 체크아웃에서 다시 탭해야 진행.
  const checkoutLoginGate = useLoginGate("yeonwoo_result_checkout", "/checkout/yeonwoo/", {
    required: true,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [showCta, setShowCta] = useState(false);
  const maxScrollRef = useRef(0);
  const sajuRequestIdRef = useRef(data.sajuRequestId);
  useEffect(() => {
    sajuRequestIdRef.current = data.sajuRequestId;
  }, [data.sajuRequestId]);

  useEffect(() => {
    const SCROLL_KEY = "hm_yeonwoo_max_scroll";
    const VIEW_SENT_KEY = "hm_yeonwoo_view_sent";
    const FALLBACK_ID = "mock_yeonwoo";

    const id = data.sajuRequestId;
    if (!id || id === FALLBACK_ID) return;
    if (sessionStorage.getItem(VIEW_SENT_KEY)) return;

    sessionStorage.setItem(VIEW_SENT_KEY, "1");
    trackEvent("result_page_view", {
      character_id: "yeonwoo",
      saju_request_id: id,
    });

    const stored = Number(sessionStorage.getItem(SCROLL_KEY) ?? 0);
    if (stored > maxScrollRef.current) maxScrollRef.current = stored;
  }, [data.sajuRequestId]);

  useEffect(() => {
    const el = containerRef.current;
    const SCROLL_KEY = "hm_yeonwoo_max_scroll";

    const stored = Number(sessionStorage.getItem(SCROLL_KEY) ?? 0);
    if (stored > maxScrollRef.current) maxScrollRef.current = stored;

    const measureProgress = (): number => {
      if (el && el.scrollHeight > el.clientHeight) {
        const max = el.scrollHeight - el.clientHeight;
        return max > 0 ? el.scrollTop / max : 0;
      }
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop || 0;
      const max =
        (document.documentElement.scrollHeight ||
          document.body.scrollHeight) - window.innerHeight;
      return max > 0 ? scrollTop / max : 0;
    };

    const handleScroll = () => {
      const p = measureProgress();
      if (p > maxScrollRef.current) {
        maxScrollRef.current = p;
        sessionStorage.setItem(SCROLL_KEY, String(p));
      }
      setShowCta(p >= 0.4);
    };

    let sent = false;
    const sendExit = () => {
      if (sent) return;
      const id = sajuRequestIdRef.current;
      if (!id || id === "mock_yeonwoo") return;
      sent = true;
      trackEvent("result_page_exit", {
        character_id: "yeonwoo",
        saju_request_id: id,
        max_scroll: Math.round(maxScrollRef.current * 100),
      });
    };

    el?.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pagehide", sendExit);
    handleScroll();

    return () => {
      el?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pagehide", sendExit);
      sendExit();
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="flex-1 w-full overflow-y-auto"
        style={{ background: SURFACE, paddingBottom: "120px", fontFamily: "var(--font-pretendard)" }}
      >
        <HeroSection />
        <SceneOpeningSection />
        <DialogueBubbleSection />
        <HandsOnBookSection />
        <BlackSpacer />
        <SajuChartSection pillars={data.pillars} />
        <BlackSpacer height={100} color="#050404" />
        <YeonwooPortraitSection pillars={data.pillars} />
        <WuxingChartSection
          wuxing={data.wuxing}
          dayMaster={data.dayMaster}
          pillars={data.pillars}
        />
        <KijilSection />
        <CharmCardsSection charm={data.charm} sajuRequestId={data.sajuRequestId} />
        <ClosingPromptSection />
        <BlackSpacer color="#080806" />
        <ClosingPortraitSection />
        <BlockingSection blocking={data.blocking} sajuRequestId={data.sajuRequestId} />
        <AvoidPartnerSection spouseAvoid={data.spouseAvoid} />
        <BubblesDaBoYeoSection pillars={data.pillars} />
        <YeonwooBookSection />
        <ClosingDialogueSection />
        <RomanceChaptersSection pillars={data.pillars} />
        <FinalCtaSection />
        <FullResultIndexSection />
        <DestinedPartnerSection spouseMatch={data.spouseMatch} />
        <RomanceTimingSection flow={data.monthlyRomanceFlow} />
        <RealReviewsSection />
      </div>
      {/* 2026-06-05 세션 유실 hotfix(?order_id= 3중 복구) prod 검증 후 CTA 재개방 */}
      <StickyCheckoutCta
        visible={showCta}
        disabled={false}
        onCheckout={() => {
          trackEvent("pay_cta_click", { character_id: "yeonwoo" });
          // 코인 모드 OFF(1.0 무영향) — 기존과 동일하게 바로 체크아웃(익명 원화 결제 유지).
          if (!isCoinEnabled()) {
            router.push("/checkout/yeonwoo");
            return;
          }
          checkoutLoginGate.run(() => router.push("/checkout/yeonwoo"));
        }}
      />
      <LoginPromptModal {...checkoutLoginGate.modal} />
    </>
  );
}
