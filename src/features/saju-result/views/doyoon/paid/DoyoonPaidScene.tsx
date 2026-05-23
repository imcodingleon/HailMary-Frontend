import type { PaidReport } from "../../../domain/paidReport";
import PaidShell from "../../shared/PaidShell";
import { DOYOON_SHELL_CONFIG } from "../../shared/paidShellConfig";
import DoyoonBlockingPart1Page from "./pages/DoyoonBlockingPart1Page";
import DoyoonBlockingPart2Page from "./pages/DoyoonBlockingPart2Page";
import DoyoonCharmPage from "./pages/DoyoonCharmPage";
import DoyoonDestinedPart1Page from "./pages/DoyoonDestinedPart1Page";
import DoyoonDestinedPart2Page from "./pages/DoyoonDestinedPart2Page";
import DoyoonEpiloguePage from "./pages/DoyoonEpiloguePage";
import DoyoonLetterPage from "./pages/DoyoonLetterPage";
import DoyoonOpportunityPage from "./pages/DoyoonOpportunityPage";
import DoyoonOptimizationPage from "./pages/DoyoonOptimizationPage";
import DoyoonProloguePage from "./pages/DoyoonProloguePage";
import DoyoonSelfPart1Page from "./pages/DoyoonSelfPart1Page";
import DoyoonSelfPart2Page from "./pages/DoyoonSelfPart2Page";

interface DoyoonPaidSceneProps {
  report: PaidReport;
}

// 12 페이지 셸. P-0~P-11 모두 본격 구현 완료.
export default function DoyoonPaidScene({ report }: DoyoonPaidSceneProps) {
  return (
    <main
      data-paid-scene="doyoon"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR", system-ui, sans-serif',
      }}
    >
      <PaidShell
        config={DOYOON_SHELL_CONFIG}
        orderId={report.order_id}
        character="doyoon"
        user={report.user}
      >
        <DoyoonProloguePage data={report.chapters.p0_doyoon} />
        <DoyoonSelfPart1Page data={report.chapters.p1_doyoon} />
        <DoyoonSelfPart2Page data={report.chapters.p2_doyoon} />
        <DoyoonBlockingPart1Page data={report.chapters.p3_doyoon} />
        <DoyoonBlockingPart2Page data={report.chapters.p4_doyoon} />
        <DoyoonCharmPage data={report.chapters.p5_doyoon} />
        <DoyoonDestinedPart1Page data={report.chapters.p6_doyoon} />
        <DoyoonDestinedPart2Page data={report.chapters.p7_doyoon} />
        <DoyoonOpportunityPage data={report.chapters.p8_doyoon} />
        <DoyoonOptimizationPage data={report.chapters.p9_doyoon} />
        <DoyoonLetterPage
          data={report.chapters.p10}
          userName={report.user?.user_nickname ?? report.user?.user_name_initial}
        />
        <DoyoonEpiloguePage
          data={report.chapters.p11_doyoon}
          userName={report.user?.user_nickname ?? report.user?.user_name_initial}
        />
      </PaidShell>
    </main>
  );
}
