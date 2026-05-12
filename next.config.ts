import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // S3 + CloudFront 정적 호스팅 — 정적 산출물(/out) 생성 위해 필수.
  // 동적 라우트(/saju/paid/[order_id])는 generateStaticParams 로 빌드 시점 prerender.
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // ngrok 등 임시 외부 URL로 dev 서버 노출 시 host 헤더 검증 우회.
  allowedDevOrigins: [
    "*.ngrok-free.app",
    "*.ngrok.io",
    "*.ngrok.app",
    "*.ngrok.dev",
  ],
};

export default nextConfig;
