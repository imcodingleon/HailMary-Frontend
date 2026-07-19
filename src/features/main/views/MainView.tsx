"use client";

import { SiteFooter } from "@/shared/components/SiteFooter";
import { HERO_CARD, SECONDARY_CARDS } from "../domain/contentCards";
import { useMain } from "../hooks/useMain";
import { TopNav } from "./components/TopNav";
import { HeroSection } from "./components/HeroSection";
import { ContentCarousel } from "./components/ContentCarousel";

interface MainViewProps {
  /** 코인 플래그 ON일 때만 코인 표면(TopNav 잔액 칩·히어로 비용 힌트) 노출. app-level 주입, main feature는 coin import 금지. */
  coinEnabled?: boolean;
  /** 보유 코인. null = 조회 전/실패. */
  coinBalance?: number | null;
}

export function MainView({ coinEnabled = false, coinBalance = null }: MainViewProps) {
  const { handleCardClick } = useMain();
  return (
    <div
      className="flex min-h-[100dvh] flex-1 flex-col"
      style={{
        background: "linear-gradient(180deg, #1a1530 0%, #0f0a22 100%)",
        fontFamily: "var(--font-pretendard)",
        // 하단 네비 바(h-[67px])에 콘텐츠가 가리지 않도록 여유 패딩
        paddingBottom: "calc(67px + env(safe-area-inset-bottom))",
      }}
    >
      <TopNav coinEnabled={coinEnabled} coinBalance={coinBalance} />
      <main className="flex-1 pb-8">
        <HeroSection card={HERO_CARD} onClick={handleCardClick} coinEnabled={coinEnabled} />
        <ContentCarousel cards={SECONDARY_CARDS} onCardClick={handleCardClick} />
      </main>
      {/* 통합 푸터 — 사업자정보 상시 노출 + 실 법적 페이지 링크 + 코인 충전 진입(flag 무관). 홈 전용 구성. */}
      <SiteFooter variant="dark" legalLinksVariant="pages" showChargeLink />
    </div>
  );
}
