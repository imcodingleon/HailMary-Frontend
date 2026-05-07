import type { PaidReport } from "../../../domain/paidReport";
import PaidShell from "./PaidShell";
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
}

export default function YeonwooPaidScene({ report }: YeonwooPaidSceneProps) {
  return (
    <main data-paid-scene="yeonwoo" className="bg-[#151513]">
      <PaidShell>
        <ProloguePage data={report.chapters.p0} />
        <SelfPart1Page />
        <SelfPart2Page />
        <BlockingPart1Page />
        <BlockingPart2Page />
        <CharmPage />
        <DestinedPart1Page />
        <DestinedPart2Page />
        <TimingPage />
        <PracticePage />
        <LetterPage />
        <EpiloguePage />
      </PaidShell>
    </main>
  );
}
