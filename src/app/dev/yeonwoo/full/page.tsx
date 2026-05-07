// dev 전용 풀 셸 미리보기 — PaidShell + 12 페이지 MOCK 통합.
// 슬라이드/네비/진행도/목차 UX 검증용. 백엔드 호출 X.
import PaidShell from "@/features/saju-result/views/yeonwoo/paid/PaidShell";
import ProloguePage from "@/features/saju-result/views/yeonwoo/paid/pages/ProloguePage";
import SelfPart1Page from "@/features/saju-result/views/yeonwoo/paid/pages/SelfPart1Page";
import SelfPart2Page from "@/features/saju-result/views/yeonwoo/paid/pages/SelfPart2Page";
import BlockingPart1Page from "@/features/saju-result/views/yeonwoo/paid/pages/BlockingPart1Page";
import BlockingPart2Page from "@/features/saju-result/views/yeonwoo/paid/pages/BlockingPart2Page";
import CharmPage from "@/features/saju-result/views/yeonwoo/paid/pages/CharmPage";
import DestinedPart1Page from "@/features/saju-result/views/yeonwoo/paid/pages/DestinedPart1Page";
import DestinedPart2Page from "@/features/saju-result/views/yeonwoo/paid/pages/DestinedPart2Page";
import TimingPage from "@/features/saju-result/views/yeonwoo/paid/pages/TimingPage";
import PracticePage from "@/features/saju-result/views/yeonwoo/paid/pages/PracticePage";
import LetterPage from "@/features/saju-result/views/yeonwoo/paid/pages/LetterPage";
import EpiloguePage from "@/features/saju-result/views/yeonwoo/paid/pages/EpiloguePage";

export default function DevFullPaidPage() {
  return (
    <main className="bg-[#151513]">
      <PaidShell>
        <ProloguePage />
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
