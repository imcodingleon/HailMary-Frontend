import ProloguePage from "@/features/saju-result/views/yeonwoo/paid/pages/ProloguePage";

// dev/디자인 미리보기 전용. ProloguePage가 props 없이 렌더되면 내부 mock 데이터를 사용한다.
// 운영 사용자 플로(checkout success → /saju/paid/[order_id]/loading → /saju/paid/[order_id])와는 별개.
export default function PaidPreviewPage() {
  return (
    <main className="bg-[#151513] min-h-[100dvh]">
      <ProloguePage />
    </main>
  );
}
