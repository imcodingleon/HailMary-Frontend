// dev 전용 풀 셸 미리보기 — PaidShell + 12 페이지.
// P-0~P-9(6-1): 배성현(1996-05-29, 男, 병화 일간) DB 사주로 ComposePaidReportUseCase 결과를
//          fixture-baesh.json에 박아 동적 렌더 (스크립트로 한 번 추출, 백엔드 호출 X).
// P-9 6-2(매력살 활용)와 P-10~P-11: 백엔드 templates 미작성 → 각 Page 내부 MOCK fallback.
//
// fixture 재생성: backend 디렉토리에서 python 스크립트로 DB 조회 + compose → 이 파일 덮어쓰기.
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
import type { PaidChapters } from "@/features/saju-result/domain/paidReport";

import fixture from "./fixture-baesh.json";

// 백엔드 PaidChaptersResponse JSON과 frontend PaidChapters 타입은 snake_case 1:1.
// JSON import의 default 타입이 광범위해서 명시 cast.
const chapters = fixture as unknown as PaidChapters;

export default function DevFullPaidPage() {
  return (
    <main className="bg-[#151513]">
      <PaidShell>
        <ProloguePage data={chapters.p0} />
        <SelfPart1Page data={chapters.p1} />
        <SelfPart2Page data={chapters.p2} />
        <BlockingPart1Page data={chapters.p3} />
        <BlockingPart2Page data={chapters.p4} />
        <CharmPage data={chapters.p5} />
        <DestinedPart1Page data={chapters.p6} />
        <DestinedPart2Page data={chapters.p7} />
        <TimingPage data={chapters.p8} />
        <PracticePage data={chapters.p9} />
        <LetterPage data={chapters.p10} />
        {/* P-11: 백엔드 templates 미작성 — Page 내부 MOCK fallback */}
        <EpiloguePage />
      </PaidShell>
    </main>
  );
}
