import { PaidClosingScene } from "@/features/saju-result/views/yeonwoo/paid/paid-closing/PaidClosingScene";

export function generateStaticParams() {
  return [{ order_id: "_placeholder" }, { order_id: "test-order-id" }];
}

export default function PaidClosingPage() {
  return <PaidClosingScene />;
}
