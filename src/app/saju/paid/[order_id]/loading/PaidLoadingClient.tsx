"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  PaidResultLoading,
  usePaidResultPolling,
} from "@/features/saju-result";

function PaidLoadingInner({ orderId }: { orderId: string }) {
  const router = useRouter();
  const { status } = usePaidResultPolling(orderId);

  useEffect(() => {
    if (!orderId) return;
    if (status === "ready") {
      router.replace(`/saju/paid/${encodeURIComponent(orderId)}`);
    }
  }, [orderId, router, status]);

  if (status === "expired") {
    return (
      <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-neutral-950 px-6 text-center text-neutral-100">
        <h1 className="text-xl font-semibold">결과지 조회 기한이 만료되었어요</h1>
        <p className="text-[13px] text-neutral-400">
          결제일로부터 30일이 지난 링크에요.
        </p>
      </main>
    );
  }

  return <PaidResultLoading />;
}

export default function PaidLoadingClient() {
  const params = useParams<{ order_id: string }>();
  const orderId = params?.order_id ?? "";
  return <PaidLoadingInner orderId={orderId} />;
}
