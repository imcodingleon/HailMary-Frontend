import type { Metadata } from "next";
import { MyPageView } from "@/features/mypage";
import { MyPageCoinBalance } from "@/features/coin";

export const metadata: Metadata = {
  title: "마이페이지",
  robots: { index: false, follow: false }, // 개인 페이지 검색 비노출
};

export default function MyPage() {
  return (
    <>
      {/* coin OFF면 null → 마이페이지 무변화 */}
      <MyPageCoinBalance />
      <MyPageView />
    </>
  );
}
