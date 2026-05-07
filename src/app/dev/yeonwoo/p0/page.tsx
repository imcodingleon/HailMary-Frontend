// dev 전용 P-0 디자인 미리보기. ProloguePage가 props 없이 호출되면 MOCK_P0 더미를 사용.
// 백엔드 호출 없이 시각 검증용.
import ProloguePage from "@/features/saju-result/views/yeonwoo/paid/pages/ProloguePage";

export default function DevProloguePage() {
  return <ProloguePage />;
}
