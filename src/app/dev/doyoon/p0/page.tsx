// dev 전용 도윤 P-0 디자인 미리보기. DoyoonProloguePage가 props 없이 호출되면 MOCK_P0 더미 사용.
// 백엔드 호출 없이 시각 검증용. 도윤_final.html v1.7 P-0(0-1~0-5) 미러링 확인.
import DoyoonProloguePage from "@/features/saju-result/views/doyoon/paid/pages/DoyoonProloguePage";

export default function DevDoyoonProloguePage() {
  return (
    <main className="bg-[#0a0a09] min-h-[100dvh]">
      <div className="mx-auto max-w-[430px]">
        <DoyoonProloguePage />
      </div>
    </main>
  );
}
