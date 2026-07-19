import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import AmplitudeProvider from "./AmplitudeProvider";
import QaAuthGuard from "@/shared/components/QaAuthGuard";
import { BottomNav } from "@/shared/components/BottomNav";
import { WelcomeCoinModalHost } from "@/features/coin";

const SITE_URL = "https://dohwaseonsaju.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "도화선 — 스토리 기반 사주 해석",
    template: "%s | 도화선",
  },
  description:
    "운명을 태우고 너에게 닿을, 붉은 실. 강연우·한도윤 두 캐릭터가 각자의 시선으로 풀어주는 스토리 기반 연애 사주 해석, 도화선.",
  keywords: ["사주", "연애 사주", "도화살", "오늘의 운세", "무료 사주", "도화선"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "도화선",
    title: "도화선 — 스토리 기반 사주 해석",
    description: "운명을 태우고 너에게 닿을, 붉은 실. 스토리 기반 연애 사주 해석.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "도화선 — 운명을 태우고 너에게 닿을, 붉은 실",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "도화선 — 스토리 기반 사주 해석",
    description: "운명을 태우고 너에게 닿을, 붉은 실. 스토리 기반 연애 사주 해석.",
    images: ["/og-image.png"],
  },
  // naver-site-verification 메타는 서치어드바이저 등록 시 사용자가 받은 코드로 추가 (SEO_SSOT.md Phase 4)
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full antialiased" style={{ backgroundColor: "#F0EBE3" }}>
      <body className="mx-auto flex min-h-full max-w-md flex-col">
        <AmplitudeProvider />
        <QaAuthGuard>{children}</QaAuthGuard>
        {/* 홈·보관함에서만 노출되는 하단 네비 (컴포넌트 내부에서 경로 판별·자동 숨김) */}
        <BottomNav />
        {/* 신규 가입 시 웰컴 코인 팝업 (coin OFF면 무동작) */}
        <WelcomeCoinModalHost />
      </body>
    </html>
  );
}
