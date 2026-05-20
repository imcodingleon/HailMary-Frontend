"use client";

import type { TocItem } from "./types";

interface TocModalProps {
  open: boolean;
  currentIdx: number;
  onClose: () => void;
  onJump: (idx: number) => void;
  title: string;          // 헤더 우측 캐릭터 식별 텍스트 (예: "강연우 · 직관 풀이")
  items: ReadonlyArray<TocItem>;
}

export default function TocModal({
  open,
  currentIdx,
  onClose,
  onJump,
  title,
  items,
}: TocModalProps) {
  if (!open) return null;

  // 현재 페이지가 속한 챕터 항목 찾기 (시작 인덱스 ≤ currentIdx 중 가장 큰 값)
  let belongTo = 0;
  for (const item of items) {
    if (item.jumpTo <= currentIdx) belongTo = item.jumpTo;
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center"
      style={{
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-[430px] bg-[#111110] px-4 pt-[18px] pb-[22px] max-h-[80vh] overflow-y-auto"
        style={{
          borderTop: "1px solid rgba(200,168,112,0.3)",
          borderRadius: "18px 18px 0 0",
          animation: "tocSlideUp .25s cubic-bezier(.22,.94,.26,1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between mb-3.5 pb-2.5"
          style={{ borderBottom: "0.5px solid rgba(200,168,112,0.3)" }}
        >
          <div className="text-[16px] font-semibold text-[#d8d6d0] tracking-[0.05em]">
            목차 · {title}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="목차 닫기"
            className="bg-transparent text-[#888780] rounded-full w-[26px] h-[26px] text-[17px] flex items-center justify-center"
            style={{ border: "0.5px solid rgba(200,168,112,0.3)" }}
          >
            ×
          </button>
        </div>

        {items.map((item) => {
          const isCurrent = item.jumpTo === belongTo;
          return (
            <button
              key={item.jumpTo}
              type="button"
              onClick={() => onJump(item.jumpTo)}
              className="w-full flex items-start gap-2.5 px-2 py-[11px] rounded-lg mb-1 text-left"
              style={{
                border: isCurrent
                  ? "0.5px solid rgba(200,168,112,0.3)"
                  : "0.5px solid transparent",
                background: isCurrent ? "#1a1a18" : "transparent",
                transition: "background .15s",
              }}
            >
              <span
                className="text-[12px] font-semibold text-[#E8C9A0] min-w-[36px] pt-px"
                style={{ letterSpacing: "0.08em" }}
              >
                {item.num}
              </span>
              <div className="flex-1">
                <div className="text-[16px] font-medium text-[#d8d6d0] mb-0.5">
                  {item.title}
                </div>
                {item.sub && (
                  <div className="text-[12px] text-[#888780] leading-[1.4]">
                    {item.sub}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <style>{`
        @keyframes tocSlideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
