"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PaidResultLoading,
  YeonwooPaidScene,
  usePaidReport,
} from "@/features/saju-result";

// CloudFront dynamic-route fallback에서 useParams가 "_placeholder"를 반환할 수
// 있어 브라우저 URL을 직접 파싱.
function extractOrderIdFromUrl(): string {
  if (typeof window === "undefined") return "";
  const m = window.location.pathname.match(/\/saju\/paid\/([^/]+)/);
  const id = m?.[1] ?? "";
  return id === "_placeholder" ? "" : id;
}

function PaidPageInner({ orderId }: { orderId: string }) {
  const router = useRouter();
  const state = usePaidReport(orderId);

  useEffect(() => {
    if (!orderId) return;
    if (state.kind === "ready" && state.report.status === "pending") {
      router.replace(`/saju/paid/${encodeURIComponent(orderId)}/loading`);
    }
  }, [orderId, router, state]);

  if (state.kind === "loading") {
    return <PaidResultLoading message="결과지를 불러오는 중..." />;
  }

  if (state.kind === "expired") {
    return (
      <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-neutral-950 px-6 text-center text-neutral-100">
        <h1 className="text-xl font-semibold">결과지 조회 기한이 만료되었어요</h1>
        <p className="text-[13px] text-neutral-400">
          결제일로부터 30일이 지난 링크에요. 다시 보고 싶다면 새로 결제해 주세요.
        </p>
      </main>
    );
  }

  if (state.kind === "error") {
    return (
      <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-neutral-950 px-6 text-center text-neutral-100">
        <h1 className="text-xl font-semibold">결과지를 불러오지 못했어요</h1>
        <p className="text-[13px] text-neutral-400">{state.message}</p>
      </main>
    );
  }

  if (state.report.status === "expired") {
    return (
      <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-neutral-950 px-6 text-center text-neutral-100">
        <h1 className="text-xl font-semibold">결과지 조회 기한이 만료되었어요</h1>
      </main>
    );
  }

  if (state.report.status === "pending") {
    return <PaidResultLoading />;
  }

  return <YeonwooPaidScene report={state.report} />;
}

export default function PaidResultClient() {
  const [orderId, setOrderId] = useState<string>("");
  useEffect(() => {
    setOrderId(extractOrderIdFromUrl());
  }, []);
  return <PaidPageInner orderId={orderId} />;
}
