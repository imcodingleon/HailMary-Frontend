// ⚠️ QA 전용 컴포넌트 — 실배포 시 제거 대상.
// 자세한 가이드: ../qa.ts 상단 주석 참조.

import { SHOW_QA_LINKS, getQaTemplateUrl } from "../qa";

interface QaTemplateLinkProps {
  sectionId: string;
}

/**
 * 섹션 라벨 옆에 표시되는 작은 "QA 템플릿" 외부 링크.
 * - 클릭 시 새 탭으로 해당 dev cases 페이지 열림
 * - SHOW_QA_LINKS=false 또는 sectionId가 매핑에 없으면 아무것도 렌더 X
 */
export default function QaTemplateLink({ sectionId }: QaTemplateLinkProps) {
  if (!SHOW_QA_LINKS) return null;
  const url = getQaTemplateUrl(sectionId);
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`섹션 ${sectionId} 템플릿 변형 비교 (QA용)`}
      title="QA: 일간/오행별 템플릿 변형 비교 (새 탭)"
      className="ml-2 inline-flex items-center gap-1 align-middle"
      style={{
        fontSize: "10px",
        padding: "2px 6px",
        borderRadius: "10px",
        background: "rgba(232,201,160,0.10)",
        border: "0.5px dashed rgba(232,201,160,0.45)",
        color: "#E8C9A0",
        letterSpacing: "0.04em",
        lineHeight: 1.3,
        textDecoration: "none",
        cursor: "pointer",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <span aria-hidden>📋</span>
      <span>QA</span>
    </a>
  );
}
