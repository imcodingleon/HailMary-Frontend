import type { ReactNode } from "react";
import QaTemplateLink from "./QaTemplateLink";

// 섹션 공통 헤더 + 본문 + 변수 태그 (var-tag).
// 디자인 원본의 .slabel / .stitle.st-yw / .var-tag 매핑.

// `qaSectionId` prop은 ⚠️ 실배포 시 제거 대상 (qa.ts 상단 가이드 참조).
// 매핑된 sectionId면 라벨 옆에 작은 [QA] 링크가 dev 빌드에서만 표시됨.
export function SectionLabel({
  children,
  qaSectionId,
}: {
  children: ReactNode;
  qaSectionId?: string;
}) {
  return (
    <div
      className="text-[13px] font-medium uppercase mb-[5px]"
      style={{ letterSpacing: "0.05em", color: "#888" }}
    >
      {children}
      {qaSectionId ? <QaTemplateLink sectionId={qaSectionId} /> : null}
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div
      className="text-[17px] font-semibold leading-[1.5] mb-2 text-[#d8d6d0]"
      style={{ wordBreak: "keep-all" }}
    >
      {children}
    </div>
  );
}

export function SectionBody({ children }: { children: ReactNode }) {
  return (
    <div
      className="text-[15px] leading-[1.75] mb-2 text-[#b0aea4]"
      style={{ wordBreak: "keep-all", letterSpacing: "-0.01em" }}
    >
      {children}
    </div>
  );
}

// 사용자 데이터 변수(예: ILGAN, ILJU, LOVE_TYPE, TRIGGER) 강조 — 박스 제거 + bold 메인 골드.
// P-0 ProloguePage의 VarTag와 동일 패턴 (전체 paid 페이지 일관).
export function VarTag({ children }: { children: ReactNode }) {
  return <span className="font-bold text-[#E8C9A0]">{children}</span>;
}

// HTML 디자인의 .sec-yw 컨테이너 (페이지 내 섹션 박스).
export function Sec({ children }: { children: ReactNode }) {
  return <section className="px-1 py-4">{children}</section>;
}

// HTML 디자인의 .card-yw (라벨/값/서브설명 카드).
export function CardYw({
  label,
  value,
  sub,
}: {
  label: string;
  value: ReactNode;
  sub?: string;
}) {
  return (
    <div
      className="rounded-[8px] px-3 py-2.5 my-2"
      style={{
        background: "#1a1a18",
        border: "0.5px solid rgba(200,168,112,0.2)",
      }}
    >
      <div className="text-[12px] text-[#888] mb-1 tracking-[0.05em] uppercase">
        {label}
      </div>
      <div className="text-[15px] font-semibold text-[#d8d6d0] mb-1">
        {value}
      </div>
      {sub && (
        <div
          className="text-[13px] text-[#a8a6a0] leading-[1.6]"
          style={{ wordBreak: "keep-all" }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

// 강연우 대사 버블 (.bubble.bub-yw).
export function YeonwooBubble({ text }: { text: string }) {
  return (
    <div
      className="rounded-[10px] px-3 py-2.5 my-2 text-[15px] leading-[1.85] italic text-[#d8d4cc] bg-[#1e1e1c]"
      style={{ border: "0.5px solid #333", wordBreak: "keep-all" }}
    >
      <div className="not-italic text-[12px] mb-1 tracking-[0.05em] text-[#E8C9A0]">
        강연우
      </div>
      &ldquo;{text}&rdquo;
    </div>
  );
}
