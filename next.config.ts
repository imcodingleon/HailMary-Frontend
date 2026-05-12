import type { NextConfig } from "next";

// dev에서는 output: export를 풀어준다. prod 빌드는 그대로 정적 export.
// 이유: Next.js 16부터 dev 서버도 generateStaticParams에 없는 dynamic 경로 접근을 차단한다.
// 결제 후 redirect되는 `/saju/paid/{실제UUID}/loading` 같은 런타임 동적 URL은 빌드 시점에
// 알 수 없으므로, dev에서 막히면 결제 흐름 검증이 불가능해진다.
// prod는 S3+CloudFront SPA fallback으로 unknown URL을 index.html로 라우팅한다.
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // S3 + CloudFront 정적 호스팅 — 정적 산출물(/out) 생성 위해 필수.
  // 동적 라우트(/saju/paid/[order_id])는 generateStaticParams 로 빌드 시점 prerender.
  ...(isProd ? { output: "export" as const } : {}),
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
