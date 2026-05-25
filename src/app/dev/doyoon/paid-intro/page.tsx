"use client";

import { PaidIntroScene } from "@/features/saju-result/views/doyoon/paid/paid-intro/PaidIntroScene";

export default function DevDoyoonPaidIntroPage() {
  return (
    <PaidIntroScene
      onCta={() => {
        alert("CTA 클릭 — 실제 적용 시 /saju/paid/[order_id]/loading 로 이동");
      }}
    />
  );
}
