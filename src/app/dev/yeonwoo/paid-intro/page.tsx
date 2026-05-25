"use client";

import { PaidIntroScene } from "@/features/saju-result/views/yeonwoo/paid/paid-intro/PaidIntroScene";

export default function DevPaidIntroPage() {
  return (
    <PaidIntroScene
      onCta={() => {
        alert("CTA 클릭 — 실제 적용 시 /saju/paid/[order_id]로 이동");
      }}
    />
  );
}
