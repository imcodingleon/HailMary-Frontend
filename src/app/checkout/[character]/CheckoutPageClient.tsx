"use client";

// app-level 컴포지션 지점 — checkout feature가 coin feature를 직접 import하면 안 되므로
// (Feature 간 직접 import 금지), 여기서 coin 상태를 조회해 CheckoutView에 prop으로 내려준다.
// page.tsx는 async 서버 컴포넌트(generateStaticParams/notFound)라 훅을 못 쓰므로 이 client
// 컴포넌트로 분리했다.
//
// 로그인 필수 게이트(코인 모드 ON일 때) — 체크아웃 "진입 즉시" 발화 지점. CoinCta 탭이 아니라
// 이 페이지에 마운트되는 순간 비로그인이면 바로 모달을 띄운다. X → 무료 결과 화면(같은 캐릭터)으로
// 되돌린다(useCheckout.handleBack이 쓰는 것과 동일한 라우트) — 체크아웃에 남겨두면 로그인 없이도
// 화면을 계속 볼 수 있어 게이트 취지가 무력화됨.
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { CheckoutView } from "@/features/checkout";
import type { CheckoutCharacter } from "@/features/checkout/domain/checkoutProducts";
import { isCoinEnabled, useCoinBalance } from "@/features/coin";
import { LoginPromptModal, useAuth, useLoginGate } from "@/features/auth";

export function CheckoutPageClient({ character }: { character: CheckoutCharacter }) {
  const router = useRouter();
  const coinEnabled = isCoinEnabled();
  const { balance, loading } = useCoinBalance();
  const { isAuthenticated } = useAuth();

  // returnTo=현재 체크아웃 — 로그인 후에도 자동결제 없이 사용자가 다시 코인 CTA를 탭해야 진행.
  const entryLoginGate = useLoginGate(`checkout_entry_${character}`, `/checkout/${character}/`, {
    required: true,
    onCancel: () => router.replace(`/saju/result?character=${character}`),
  });

  // 마운트당 1회만 발화 — 다른 게이트들(설문/채팅 진입)과 동일한 ref 가드 패턴.
  const gatePromptedRef = useRef(false);
  useEffect(() => {
    // 코인 모드 OFF(1.0 무영향) — 게이트 자체를 건드리지 않는다. 이미 로그인 상태면 모달을 안 띄운다
    // (run() 내부에서도 동일하게 판정하지만, 여기서 먼저 걸러 불필요한 ref 소모/모달 오픈을 막는다).
    if (!coinEnabled || isAuthenticated || gatePromptedRef.current) return;
    gatePromptedRef.current = true;
    entryLoginGate.run(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinEnabled, isAuthenticated]);

  return (
    <>
      <CheckoutView
        character={character}
        coinEnabled={coinEnabled}
        coinBalance={balance}
        coinBalanceLoading={loading}
      />
      <LoginPromptModal {...entryLoginGate.modal} />
    </>
  );
}
