import type { Metadata } from "next";
import { MyPageView } from "@/features/mypage";
import { isCoinEnabled, MyPageCoinBalance } from "@/features/coin";

export const metadata: Metadata = {
  title: "마이페이지",
  robots: { index: false, follow: false }, // 개인 페이지 검색 비노출
};

export default function MyPage() {
  // app-level 조합 — mypage feature가 coin feature를 직접 import하면 안 되므로
  // (Feature 간 직접 import 금지) 여기서 플래그를 읽어 prop으로 내려준다.
  const coinEnabled = isCoinEnabled();
  return (
    <>
      {/* coin OFF면 null → 마이페이지 무변화 */}
      <MyPageCoinBalance />
      <MyPageView coinEnabled={coinEnabled} />
    </>
  );
}
