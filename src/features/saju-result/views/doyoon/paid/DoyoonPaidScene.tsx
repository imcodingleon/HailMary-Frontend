import type { PaidReport } from "../../../domain/paidReport";
import PaidShell from "../../shared/PaidShell";
import { DOYOON_SHELL_CONFIG } from "../../shared/paidShellConfig";
import DoyoonBlockingPart1Page from "./pages/DoyoonBlockingPart1Page";
import DoyoonBlockingPart2Page from "./pages/DoyoonBlockingPart2Page";
import DoyoonCharmPage from "./pages/DoyoonCharmPage";
import DoyoonDestinedPart1Page from "./pages/DoyoonDestinedPart1Page";
import DoyoonProloguePage from "./pages/DoyoonProloguePage";
import DoyoonSelfPart1Page from "./pages/DoyoonSelfPart1Page";
import DoyoonSelfPart2Page from "./pages/DoyoonSelfPart2Page";
import DoyoonStubPage from "./pages/DoyoonStubPage";

interface DoyoonPaidSceneProps {
  report: PaidReport;
}

// 12 페이지 셸. P-0/P-1 본격 구현, P-2~P-11은 stub (해당 페이즈 진입 시 교체).
export default function DoyoonPaidScene({ report }: DoyoonPaidSceneProps) {
  return (
    <main data-paid-scene="doyoon">
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
        <DoyoonStubPage chapter="Ch 4 · 2/2" title="운명의 짝 · 결말 (2/2)" />
        <DoyoonStubPage chapter="Ch 5" title="인연이 오는 시간" />
        <DoyoonStubPage chapter="Ch 6" title="실천 가이드" />
        <DoyoonStubPage chapter="Ch 7" title="도윤의 편지" />
        <DoyoonStubPage chapter="에필로그" title="도윤의 마지막 말" />
      </PaidShell>
    </main>
  );
}
