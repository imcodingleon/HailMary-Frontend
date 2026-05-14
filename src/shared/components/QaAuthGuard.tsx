"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { qaToken } from "@/shared/utils/api";

/**
 * QA 인증 가드 (Phase 1.5).
 *
 * NEXT_PUBLIC_QA_GATE_ENABLED=1 환경변수가 있을 때만 작동.
 * 운영 환경(env 미설정)에선 그대로 children 렌더 — 실사용자 영향 X.
 *
 * 동작:
 *   - /qa/login 경로 → 가드 X (로그인 페이지 자체)
 *   - 토큰 없음 → /qa/login으로 리다이렉트
 *   - 토큰 있음 → children 렌더
 *
 * Static Export 모드 호환 (Next.js middleware.ts 사용 X).
 */
export default function QaAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const enabled = process.env.NEXT_PUBLIC_QA_GATE_ENABLED === "1";
  const [checked, setChecked] = useState<boolean>(!enabled);

  useEffect(() => {
    if (!enabled) {
      setChecked(true);
      return;
    }
    // 로그인 페이지 자체는 가드 X
    if (pathname?.startsWith("/qa/login")) {
      setChecked(true);
      return;
    }
    const token = qaToken.get();
    if (!token) {
      router.replace("/qa/login");
      return;
    }
    setChecked(true);
  }, [enabled, pathname, router]);

  // 가드 완료 전엔 빈 화면 (flicker 방지)
  if (!checked) return null;

  return <>{children}</>;
}
