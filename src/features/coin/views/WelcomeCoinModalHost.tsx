"use client";

// 레이아웃에 전역 마운트. 신규 가입 신호를 구독해 웰컴 코인 팝업을 띄운다.
// 동작은 useWelcomeCoin 훅에, 렌더는 WelcomeCoinModal에 위임(얇은 컨테이너).
import { useWelcomeCoin } from "../hooks/useWelcomeCoin";
import WelcomeCoinModal from "./WelcomeCoinModal";

export default function WelcomeCoinModalHost() {
  const { open, balance, close } = useWelcomeCoin();
  if (!open) return null;
  return <WelcomeCoinModal balance={balance} onClose={close} />;
}
