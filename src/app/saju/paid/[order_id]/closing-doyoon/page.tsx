import { PaidClosingScene } from "@/features/saju-result/views/doyoon/paid/paid-closing/PaidClosingScene";

export function generateStaticParams() {
  return [{ order_id: "_placeholder" }, { order_id: "test-order-id" }];
}

export default function PaidClosingDoyoonPage() {
  return <PaidClosingScene />;
}
