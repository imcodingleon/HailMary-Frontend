"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PaidResultLoading,
  usePaidResultPolling,
} from "@/features/saju-result";

// Next.js static export + CloudFront dynamic-route fallback에서는 useParams가
// 빌드된 placeholder path("_placeholder")를 반환할 수 있다. 브라우저 URL의
// 실제 order_id를 보장하기 위해 window.location.pathname을 직접 파싱.
function extractOrderIdFromUrl(): string {
  if (typeof window === "undefined") return "";
  const m = window.location.pathname.match(/\/saju\/paid\/([^/]+)/);
  const id = m?.[1] ?? "";
  return id === "_placeholder" ? "" : id;
}

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
  const [orderId, setOrderId] = useState<string>("");
  useEffect(() => {
    setOrderId(extractOrderIdFromUrl());
  }, []);
  return <PaidLoadingInner orderId={orderId} />;
}
