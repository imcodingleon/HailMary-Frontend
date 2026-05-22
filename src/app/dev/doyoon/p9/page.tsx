// dev 전용 도윤 P-9 디자인 미리보기.
import PaidShell from "@/features/saju-result/views/shared/PaidShell";
import { DOYOON_SHELL_CONFIG } from "@/features/saju-result/views/shared/paidShellConfig";
import DoyoonOptimizationPage from "@/features/saju-result/views/doyoon/paid/pages/DoyoonOptimizationPage";
import DoyoonStubPage from "@/features/saju-result/views/doyoon/paid/pages/DoyoonStubPage";

export default function DevDoyoonP9Page() {
  return (
    <PaidShell
      config={DOYOON_SHELL_CONFIG}
      orderId="dev-fixture"
      character="doyoon"
    >
      <DoyoonOptimizationPage />
      <DoyoonStubPage chapter="Ch 7" title="도윤의 편지" />
      <DoyoonStubPage chapter="에필로그" title="도윤의 마지막 말" />
    </PaidShell>
  );
}
