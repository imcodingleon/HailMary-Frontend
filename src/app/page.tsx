import type { Metadata } from "next";
import { HomeClient } from "./HomeClient";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// 검색엔진용 구조화 데이터 (schema.org) — 사이트/운영 주체 식별
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "도화선",
      url: "https://dohwaseonsaju.com/",
      description: "스토리 기반의 사주 해석 서비스",
      inLanguage: "ko",
    },
    {
      "@type": "Organization",
      name: "슈퍼빌더즈",
      url: "https://dohwaseonsaju.com/",
      logo: "https://dohwaseonsaju.com/dohwaseon-logo.png",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* PG 심사: 사업자정보 + 약관/환불 링크 상시 노출(크롤러 감지용 실제 링크)은 MainView의
          통합 SiteFooter(legalLinksVariant="pages")가 담당 — AppLegalFooter 중복 스택 제거. */}
      <HomeClient />
    </>
  );
}
