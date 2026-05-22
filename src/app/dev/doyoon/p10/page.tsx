// dev 전용 도윤 P-10 디자인 미리보기.
import PaidShell from "@/features/saju-result/views/shared/PaidShell";
import { DOYOON_SHELL_CONFIG } from "@/features/saju-result/views/shared/paidShellConfig";
import DoyoonLetterPage from "@/features/saju-result/views/doyoon/paid/pages/DoyoonLetterPage";
import DoyoonStubPage from "@/features/saju-result/views/doyoon/paid/pages/DoyoonStubPage";

export default function DevDoyoonP10Page() {
  return (
    <PaidShell
      config={DOYOON_SHELL_CONFIG}
      orderId="dev-fixture"
      character="doyoon"
    >
      <DoyoonLetterPage userName="홍길동" />
      <DoyoonStubPage chapter="에필로그" title="도윤의 마지막 말" />
    </PaidShell>
  );
}
