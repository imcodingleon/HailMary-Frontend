// =============================================================================
// QA 템플릿 비교 링크 — 섹션 라벨 옆에 작은 버튼으로 표시.
// 클릭하면 해당 섹션의 dev cases 페이지(10 일간 변형 등)가 새 탭으로 열림.
//
// ⚠️ 실배포 시 제외 필수!
//
// 활성 방법:
//   기본값: process.env.NODE_ENV !== "production" 일 때만 표시
//
// 강제 OFF (실배포 빌드 직전 안전장치):
//   환경변수 NEXT_PUBLIC_DISABLE_QA_LINKS=1 설정하면 dev 빌드에서도 숨김
//
// 강제 ON (스테이징에서 QA 검증용):
//   환경변수 NEXT_PUBLIC_ENABLE_QA_LINKS=1 설정하면 production 빌드에서도 표시
//
// 영구 제거 (실배포 단계 도달 시):
//   1. 이 파일 + components/QaTemplateLink.tsx 삭제
//   2. components/Section.tsx의 SectionLabel에서 qaSectionId prop 제거
//   3. 각 *Page.tsx에서 qaSectionId={...} props 제거
//   4. src/app/dev/yeonwoo/ 폴더 전체 삭제 (선택 — 본 빌드에서 자동 export 안 됨)
// =============================================================================

/**
 * dev 빌드 또는 스테이징 QA 모드에서만 true.
 * 실배포 빌드(NODE_ENV=production, NEXT_PUBLIC_ENABLE_QA_LINKS 미설정)에서 자동 false.
 */
export const SHOW_QA_LINKS: boolean = (() => {
  if (process.env.NEXT_PUBLIC_DISABLE_QA_LINKS === "1") return false;
  if (process.env.NEXT_PUBLIC_ENABLE_QA_LINKS === "1") return true;
  return process.env.NODE_ENV !== "production";
})();

/**
 * 섹션 식별자 → dev cases 페이지 경로 매핑.
 * 운영 결과지 페이지의 SectionLabel 옆에서 클릭하면 새 탭으로 열림.
 *
 * 채택된 톤 버전:
 *   1-4 hurt:     v3 (직관)
 *   1-5 timeline: v5 (객관 라벨 + 연우 sub)
 *   1-5 AI:       v3 (full 양식 기반)
 */
export const QA_TEMPLATE_MAP: Readonly<Record<string, string>> = {
  // P-0 — 0-1~0-4는 차트/표/사주 원국 (템플릿 변형 없음, 룰 placeholder만).
  //        0-5만 일간별 톤 변형 있어 QA 비교 필요.
  "0-5": "/dev/yeonwoo/p0-cases",
  // P-1
  "1-1": "/dev/yeonwoo/p1-cases",
  "1-2": "/dev/yeonwoo/p1-trigger-cases",
  "1-3": "/dev/yeonwoo/p1-emotion-cases",
  // P-2
  "1-4": "/dev/yeonwoo/p2-hurt-cases-v3",
  "1-5": "/dev/yeonwoo/p2-recovery-cases-v5",
  "1-5-accel": "/dev/yeonwoo/p2-recovery-accel-cases",
  "1-5-ai": "/dev/yeonwoo/p2-recovery-ai-cases-v3",
  // P-3
  "2-1": "/dev/yeonwoo/p3-blockade-cases",
  "2-2": "/dev/yeonwoo/p3-pattern-cases",
  "2-2-1": "/dev/yeonwoo/p3-pattern-cases",
};

export function getQaTemplateUrl(sectionId: string): string | undefined {
  return QA_TEMPLATE_MAP[sectionId];
}
