"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDoyoonSajuData } from "../../hooks/useDoyoonSajuData";
import { useFirstName } from "../../hooks/useFirstName";
import {
  CHARM_TYPE_COPIES,
  CHARM_MANIFESTATION_COPIES,
  DOHWA_COPIES,
  pickDohwaCopyKey,
} from "../../domain/charmDialogues-doyoon";
import {
  ELEMENT_BLOCKING_COPIES,
  TEN_GOD_BLOCKING_COPIES,
  FALLBACK_COPIES,
} from "../../domain/blockingDialogues-doyoon";
import type { CharmCopyPool } from "../../domain/types";

import HeroSection from "./sections/HeroSection";
import CharacterIntroSection from "./sections/CharacterIntroSection";
import TabletSection from "./sections/TabletSection";
import PortraitSection from "./sections/PortraitSection";
import PortraitArmsCrossedSection from "./sections/PortraitArmsCrossedSection";
import IncompatibleBannerSection from "./sections/IncompatibleBannerSection";
import BlockSection from "./sections/BlockSection";
import Section09Block from "./sections/Section09Block";
import BeigeBlockSection from "./sections/BeigeBlockSection";
import PortraitTabletSection from "./sections/PortraitTabletSection";
import PortraitNotebookSection from "./sections/PortraitNotebookSection";
import RomanceChaptersSection from "./sections/RomanceChaptersSection";
import AvoidPartnerInfoSection from "./sections/AvoidPartnerInfoSection";

import SajuChartSection from "../shared/SajuChartSection";
import WuxingChartSection from "../shared/WuxingChartSection";
import CharmCards from "../shared/CharmCards";
import BlockingSection from "../shared/BlockingSection";
import AvoidPartnerSection from "../shared/AvoidPartnerSection";
import DestinedPartnerSection from "../shared/DestinedPartnerSection";
import RomanceTimingSection from "../shared/RomanceTimingSection";
import RealReviewsSection from "../shared/RealReviewsSection";
import FullResultIndexSection from "../shared/FullResultIndexSection";
import StickyCheckoutCta from "../shared/StickyCheckoutCta";

import { DOYOON_REVIEWS } from "./reviews-doyoon";
import { trackEvent } from "@/shared/utils/analytics";
import { LoginPromptModal, useLoginGate } from "@/features/auth";
import { isCoinEnabled } from "@/features/coin";

const SURFACE = "#FDF5EA";

export default function DoyoonResultScene() {
  const router = useRouter();
  const data = useDoyoonSajuData();
  const firstName = useFirstName("doyoon");
  const displayName = firstName ?? "당신";

  // 결제하기 진입 시 로그인 필수 게이트(코인 모드 ON일 때만). X → 무료 결과 화면에 그대로 머무름.
  // returnTo=/checkout/doyoon/ — 로그인 후에도 자동결제 없이 체크아웃에서 다시 탭해야 진행.
  const checkoutLoginGate = useLoginGate("doyoon_result_checkout", "/checkout/doyoon/", {
    required: true,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [showCta, setShowCta] = useState(false);
  const maxScrollRef = useRef(0);
  const sajuRequestIdRef = useRef(data.sajuRequestId);
  useEffect(() => {
    sajuRequestIdRef.current = data.sajuRequestId;
  }, [data.sajuRequestId]);

  const charmCopies: CharmCopyPool = useMemo(
    () => ({
      charmType: CHARM_TYPE_COPIES,
      manifestation: CHARM_MANIFESTATION_COPIES,
      dohwa: DOHWA_COPIES,
      pickDohwaCopyKey,
    }),
    [],
  );

  const blockingDialogues = useMemo(
    () => ({
      elementCopies: ELEMENT_BLOCKING_COPIES,
      tenGodCopies: TEN_GOD_BLOCKING_COPIES,
      fallbackCopies: [...FALLBACK_COPIES],
    }),
    [],
  );

  useEffect(() => {
    const SCROLL_KEY = "hm_doyoon_max_scroll";
    const VIEW_SENT_KEY = "hm_doyoon_view_sent";
    const FALLBACK_ID = "mock_doyoon";

    const id = data.sajuRequestId;
    if (!id || id === FALLBACK_ID) return;
    if (sessionStorage.getItem(VIEW_SENT_KEY)) return;

    sessionStorage.setItem(VIEW_SENT_KEY, "1");
    trackEvent("result_page_view", {
      character_id: "doyoon",
      saju_request_id: id,
    });

    const stored = Number(sessionStorage.getItem(SCROLL_KEY) ?? 0);
    if (stored > maxScrollRef.current) maxScrollRef.current = stored;
  }, [data.sajuRequestId]);

  useEffect(() => {
    const el = containerRef.current;
    const SCROLL_KEY = "hm_doyoon_max_scroll";

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
      if (!id || id === "mock_doyoon") return;
      sent = true;
      trackEvent("result_page_exit", {
        character_id: "doyoon",
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
        className="flex-1 w-full overflow-y-auto [&::-webkit-scrollbar]:hidden"
        style={{
          background: SURFACE,
          scrollbarWidth: "none",
          paddingBottom: "120px",
          fontFamily: "var(--font-pretendard)",
        }}
      >
        <HeroSection />
        <CharacterIntroSection displayName={displayName} />
        <div
          aria-hidden="true"
          style={{
            height: "50px",
            background: "linear-gradient(to bottom, #F9E3C8 0%, #FDF5EA 100%)",
          }}
        />
        <TabletSection displayName={displayName} />
        <SajuChartSection pillars={data.pillars} displayName={displayName} />
        <PortraitSection displayName={displayName} />
        <WuxingChartSection
          pillars={data.pillars}
          dayMaster={data.dayMaster}
          wuxing={data.wuxing}
        />
        <CharmCards
          charm={data.charm}
          sajuRequestId={data.sajuRequestId}
          copies={charmCopies}
          theme="beige"
        />
        <BlockSection />
        <PortraitArmsCrossedSection />
        <BlockingSection
          blocking={data.blocking}
          sajuRequestId={data.sajuRequestId}
          dialogues={blockingDialogues}
        />
        <IncompatibleBannerSection />
        <AvoidPartnerSection
          slotId={data.spouseAvoid?.slotId ?? null}
          imageBasePath="/images/spouse/doyoon/free/avoid"
        />
        <AvoidPartnerInfoSection slotId={data.spouseAvoid?.slotId ?? null} />
        <Section09Block />
        <BeigeBlockSection />
        <PortraitTabletSection />
        <RomanceChaptersSection
          pillars={data.pillars}
          displayName={displayName}
        />
        <PortraitNotebookSection />
        <FullResultIndexSection displayName={displayName} />
        <DestinedPartnerSection
          spouseMatch={data.spouseMatch}
          displayName={displayName}
          imageBasePath="/images/spouse/doyoon/free/match"
        />
        <RomanceTimingSection
          monthlyRomanceFlow={data.monthlyRomanceFlow}
        />
        <RealReviewsSection
          reviews={DOYOON_REVIEWS}
          versionBadgeLabel="한도윤 버전"
        />
      </div>
      {/* 2026-06-05 세션 유실 hotfix(?order_id= 3중 복구) prod 검증 후 CTA 재개방 */}
      <StickyCheckoutCta
        ctaLabel="결제하고 도윤의 정밀 리포트 읽기"
        visible={showCta}
        disabled={false}
        characterId="doyoon"
        onCheckout={() => {
          trackEvent("pay_cta_click", { character_id: "doyoon" });
          // 코인 모드 OFF(1.0 무영향) — 기존과 동일하게 바로 체크아웃(익명 원화 결제 유지).
          if (!isCoinEnabled()) {
            router.push("/checkout/doyoon");
            return;
          }
          checkoutLoginGate.run(() => router.push("/checkout/doyoon"));
        }}
      />
      <LoginPromptModal {...checkoutLoginGate.modal} />
    </>
  );
}
