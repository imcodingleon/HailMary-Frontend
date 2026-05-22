// dev 전용 풀 셸 미리보기 — PaidShell + 도윤 12 페이지.
// 각 Page는 fixture 없을 시 내부 MOCK fallback 사용.
// 실제 사용자 흐름: chapters 데이터를 백엔드에서 받아 data prop으로 주입.

import PaidShell from "@/features/saju-result/views/shared/PaidShell";
import { DOYOON_SHELL_CONFIG } from "@/features/saju-result/views/shared/paidShellConfig";
import DoyoonBlockingPart1Page from "@/features/saju-result/views/doyoon/paid/pages/DoyoonBlockingPart1Page";
import DoyoonBlockingPart2Page from "@/features/saju-result/views/doyoon/paid/pages/DoyoonBlockingPart2Page";
import DoyoonCharmPage from "@/features/saju-result/views/doyoon/paid/pages/DoyoonCharmPage";
import DoyoonDestinedPart1Page from "@/features/saju-result/views/doyoon/paid/pages/DoyoonDestinedPart1Page";
import DoyoonDestinedPart2Page from "@/features/saju-result/views/doyoon/paid/pages/DoyoonDestinedPart2Page";
import DoyoonEpiloguePage from "@/features/saju-result/views/doyoon/paid/pages/DoyoonEpiloguePage";
import DoyoonLetterPage from "@/features/saju-result/views/doyoon/paid/pages/DoyoonLetterPage";
import DoyoonOpportunityPage from "@/features/saju-result/views/doyoon/paid/pages/DoyoonOpportunityPage";
import DoyoonOptimizationPage from "@/features/saju-result/views/doyoon/paid/pages/DoyoonOptimizationPage";
import DoyoonProloguePage from "@/features/saju-result/views/doyoon/paid/pages/DoyoonProloguePage";
import DoyoonSelfPart1Page from "@/features/saju-result/views/doyoon/paid/pages/DoyoonSelfPart1Page";
import DoyoonSelfPart2Page from "@/features/saju-result/views/doyoon/paid/pages/DoyoonSelfPart2Page";

export default function DevDoyoonFullPage() {
  return (
    <main className="bg-[#fffdf7]">
      <PaidShell
        config={DOYOON_SHELL_CONFIG}
        orderId="dev-fixture"
        character="doyoon"
      >
        <DoyoonProloguePage />
        <DoyoonSelfPart1Page />
        <DoyoonSelfPart2Page />
        <DoyoonBlockingPart1Page />
        <DoyoonBlockingPart2Page />
        <DoyoonCharmPage />
        <DoyoonDestinedPart1Page />
        <DoyoonDestinedPart2Page />
        <DoyoonOpportunityPage />
        <DoyoonOptimizationPage />
        <DoyoonLetterPage userName="홍길동" />
        <DoyoonEpiloguePage userName="홍길동" />
      </PaidShell>
    </main>
  );
}
