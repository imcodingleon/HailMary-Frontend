import PaidResultClient from "./PaidResultClient";

export function generateStaticParams() {
  // Static Export 호환을 위한 placeholder. 실제 order_id는 CloudFront SPA fallback으로 라우팅.
  // dev 환경 검증을 위해 test-order-id 포함.
  return [{ order_id: "_placeholder" }, { order_id: "test-order-id" }];
}

export default function PaidResultPage() {
  return <PaidResultClient />;
}
