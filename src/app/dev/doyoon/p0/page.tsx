// dev 전용 도윤 P-0 디자인 미리보기 (Shell 포함 — 원본 도윤_final.html v1.7 동등 비교용).
// DoyoonProloguePage가 props 없이 호출되면 MOCK_P0 더미 사용. 백엔드 호출 없음.
// P-1~P-11은 stub (12 페이지 채워 "1/12" 진행바 정합성 확보).
import PaidShell from "@/features/saju-result/views/shared/PaidShell";
import { DOYOON_SHELL_CONFIG } from "@/features/saju-result/views/shared/paidShellConfig";
import DoyoonProloguePage from "@/features/saju-result/views/doyoon/paid/pages/DoyoonProloguePage";
import DoyoonStubPage from "@/features/saju-result/views/doyoon/paid/pages/DoyoonStubPage";

export default function DevDoyoonProloguePage() {
  return (
    <PaidShell
      config={DOYOON_SHELL_CONFIG}
      orderId="dev-fixture"
      character="doyoon"
    >
      <DoyoonProloguePage />
      <DoyoonStubPage chapter="Ch 1 · 1/2" title="당신이라는 사람 (1/2)" />
      <DoyoonStubPage chapter="Ch 1 · 2/2" title="당신이라는 사람 (2/2)" />
      <DoyoonStubPage chapter="Ch 2 · 1/2" title="지금 연애를 막는 것 (1/2)" />
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
