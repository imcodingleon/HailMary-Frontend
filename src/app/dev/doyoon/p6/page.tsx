// dev 전용 도윤 P-6 디자인 미리보기.
import PaidShell from "@/features/saju-result/views/shared/PaidShell";
import { DOYOON_SHELL_CONFIG } from "@/features/saju-result/views/shared/paidShellConfig";
import DoyoonDestinedPart1Page from "@/features/saju-result/views/doyoon/paid/pages/DoyoonDestinedPart1Page";
import DoyoonStubPage from "@/features/saju-result/views/doyoon/paid/pages/DoyoonStubPage";

export default function DevDoyoonP6Page() {
  return (
    <PaidShell
      config={DOYOON_SHELL_CONFIG}
      orderId="dev-fixture"
      character="doyoon"
    >
      <DoyoonDestinedPart1Page />
      <DoyoonStubPage chapter="Ch 4 · 2/2" title="운명의 짝 · 결말 (2/2)" />
      <DoyoonStubPage chapter="Ch 5" title="인연이 오는 시간" />
      <DoyoonStubPage chapter="Ch 6" title="실천 가이드" />
      <DoyoonStubPage chapter="Ch 7" title="도윤의 편지" />
      <DoyoonStubPage chapter="에필로그" title="도윤의 마지막 말" />
    </PaidShell>
  );
}
