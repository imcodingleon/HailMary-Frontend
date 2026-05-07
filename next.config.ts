import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
