// dev 전용 도윤 P-11 (에필로그) 미리보기.
import PaidShell from "@/features/saju-result/views/shared/PaidShell";
import { DOYOON_SHELL_CONFIG } from "@/features/saju-result/views/shared/paidShellConfig";
import DoyoonEpiloguePage from "@/features/saju-result/views/doyoon/paid/pages/DoyoonEpiloguePage";

export default function DevDoyoonP11Page() {
  return (
    <PaidShell
      config={DOYOON_SHELL_CONFIG}
      orderId="dev-fixture"
      character="doyoon"
    >
      <DoyoonEpiloguePage userName="홍길동" />
    </PaidShell>
  );
}
