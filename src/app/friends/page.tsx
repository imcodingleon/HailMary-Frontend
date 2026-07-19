import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "연락처",
  robots: { index: false, follow: false },
};

// 2.0 채팅앱 셸 P2 — 연락처 탭 플레이스홀더. 실제 구현은 후속 단계.
// SOURCE 미러("7. 도화선 채팅 서비스 Test" app/(inapp)/friends/page.tsx): app-bg 먹흑 운문 배경 +
// sticky app-surface/app-header 타이틀(Hahmlet 계열 선황금). 데이터는 아직 없어 "준비중"만 노출.
export default function FriendsPage() {
  return (
    <section className="app-bg flex min-h-[100dvh] flex-1 flex-col">
      <header className="app-surface app-header sticky top-0 z-10 px-5 pb-3 pt-5">
        <h1
          className="text-2xl font-semibold text-seonhwanggeum"
          style={{ fontFamily: "'Hahmlet', 'Noto Serif KR', serif" }}
        >
          연락처
        </h1>
        <p className="mt-1 text-xs text-hwaseonji">대화할 상대를 골라보세요</p>
      </header>
      <main className="flex flex-1 items-center justify-center">
        <p className="font-medium text-hwaseonji/60">연락처 · 준비중</p>
      </main>
    </section>
  );
}
