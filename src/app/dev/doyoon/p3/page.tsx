// dev 전용 도윤 P-3 디자인 미리보기.
import PaidShell from "@/features/saju-result/views/shared/PaidShell";
import { DOYOON_SHELL_CONFIG } from "@/features/saju-result/views/shared/paidShellConfig";
import DoyoonBlockingPart1Page from "@/features/saju-result/views/doyoon/paid/pages/DoyoonBlockingPart1Page";
import DoyoonStubPage from "@/features/saju-result/views/doyoon/paid/pages/DoyoonStubPage";

export default function DevDoyoonP3Page() {
  return (
    <PaidShell
      config={DOYOON_SHELL_CONFIG}
      orderId="dev-fixture"
      character="doyoon"
    >
      <DoyoonBlockingPart1Page />
      <DoyoonStubPage chapter="Ch 2 · 2/2" title="지금 연애를 막는 것 (2/2)" />
      <DoyoonStubPage chapter="Ch 3" title="매력 분석" />
      <DoyoonStubPage chapter="Ch 4 · 1/2" title="운명의 짝 (1/2)" />
      <DoyoonStubPage chapter="Ch 4 · 2/2" title="운명의 짝 · 결말 (2/2)" />
      <DoyoonStubPage chapter="Ch 5" title="인연이 오는 시간" />
      <DoyoonStubPage chapter="Ch 6" title="실천 가이드" />
      <DoyoonStubPage chapter="Ch 7" title="도윤의 편지" />
      <DoyoonStubPage chapter="에필로그" title="도윤의 마지막 말" />
    </PaidShell>
  );
}
