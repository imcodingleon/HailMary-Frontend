import PaidLoadingClient from "./PaidLoadingClient";

export function generateStaticParams() {
  return [{ order_id: "_placeholder" }, { order_id: "test-order-id" }];
}

export default function PaidLoadingPage() {
  return <PaidLoadingClient />;
}
