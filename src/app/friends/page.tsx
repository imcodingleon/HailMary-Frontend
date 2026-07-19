import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "연락처",
  robots: { index: false, follow: false },
};

// 2.0 채팅앱 셸 P2 — 연락처 탭 플레이스홀더. 실제 구현은 후속 단계.
export default function FriendsPage() {
  return (
    <main className="flex min-h-[60vh] flex-1 items-center justify-center bg-meokheuk">
      <p className="font-medium text-seonhwanggeum">연락처 · 준비중</p>
    </main>
  );
}
