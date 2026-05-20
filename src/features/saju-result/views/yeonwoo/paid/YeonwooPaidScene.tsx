import type { PaidReport } from "../../../domain/paidReport";
import type { PaidUserProperties } from "../../../hooks/usePaidUserPropertiesSync";
import PaidShell from "../../shared/paid/PaidShell";
import { YEONWOO_BRANDING, YEONWOO_TOC_ITEMS } from "./yeonwooPaidConfig";
import ProloguePage from "./pages/ProloguePage";
import SelfPart1Page from "./pages/SelfPart1Page";
import SelfPart2Page from "./pages/SelfPart2Page";
import BlockingPart1Page from "./pages/BlockingPart1Page";
import BlockingPart2Page from "./pages/BlockingPart2Page";
import CharmPage from "./pages/CharmPage";
import DestinedPart1Page from "./pages/DestinedPart1Page";
import DestinedPart2Page from "./pages/DestinedPart2Page";
import TimingPage from "./pages/TimingPage";
import PracticePage from "./pages/PracticePage";
import LetterPage from "./pages/LetterPage";
import EpiloguePage from "./pages/EpiloguePage";

interface YeonwooPaidSceneProps {
  report: PaidReport;
  user?: PaidUserProperties | null;
}

export default function YeonwooPaidScene({ report, user }: YeonwooPaidSceneProps) {
  return (
    <main data-paid-scene="yeonwoo" className="bg-[#151513]">
      <PaidShell
        orderId={report.order_id}
        character="yeonwoo"
        branding={YEONWOO_BRANDING}
        tocItems={YEONWOO_TOC_ITEMS}
        user={user}
      >
        <ProloguePage data={report.chapters.p0} />
        <SelfPart1Page data={report.chapters.p1} />
        <SelfPart2Page data={report.chapters.p2} />
        <BlockingPart1Page data={report.chapters.p3} />
        <BlockingPart2Page data={report.chapters.p4} />
        <CharmPage data={report.chapters.p5} />
        <DestinedPart1Page data={report.chapters.p6} />
        <DestinedPart2Page data={report.chapters.p7} />
        <TimingPage data={report.chapters.p8} />
        <PracticePage data={report.chapters.p9} />
        <LetterPage data={report.chapters.p10} />
        <EpiloguePage />
      </PaidShell>
    </main>
  );
}
