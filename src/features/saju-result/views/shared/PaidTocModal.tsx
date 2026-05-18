"use client";

import type { PaidShellConfig } from "./paidShellConfig";

interface PaidTocModalProps {
  open: boolean;
  currentIdx: number;
  onClose: () => void;
  onJump: (idx: number) => void;
  config: PaidShellConfig;
}

// 12 페이지 목차 모달. 캐릭터별 헤더 라벨·골드색·페이지 목록은 config로 받는다.
// 디자인 원본: 연우_final.html line 2796~2891.

export default function PaidTocModal({
  open,
  currentIdx,
  onClose,
  onJump,
  config,
}: PaidTocModalProps) {
  if (!open) return null;

  // 현재 페이지가 속한 챕터 항목 찾기 (시작 인덱스 ≤ currentIdx 중 가장 큰 값)
  let belongTo = 0;
  for (const item of config.tocItems) {
    if (item.jumpTo <= currentIdx) belongTo = item.jumpTo;
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center"
      style={{
        background: config.modalOverlay,
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-[430px] px-4 pt-[18px] pb-[22px] max-h-[80vh] overflow-y-auto"
        style={{
          background: config.modalInnerBg,
          borderTop: `1px solid ${config.goldDim}`,
          borderRadius: "18px 18px 0 0",
          animation: "tocSlideUp .25s cubic-bezier(.22,.94,.26,1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between mb-3.5 pb-2.5"
          style={{ borderBottom: `0.5px solid ${config.goldDim}` }}
        >
          <div
            className="text-[16px] font-bold tracking-[0.05em]"
            style={{ color: config.modalTextColor }}
          >
            {config.tocHeaderLabel}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="목차 닫기"
            className="bg-transparent rounded-full w-[26px] h-[26px] text-[17px] flex items-center justify-center"
            style={{
              color: config.modalSubTextColor,
              border: `0.5px solid ${config.goldDim}`,
            }}
          >
            ×
          </button>
        </div>

        {config.tocItems.map((item) => {
          const isCurrent = item.jumpTo === belongTo;
          return (
            <button
              key={item.jumpTo}
              type="button"
              onClick={() => onJump(item.jumpTo)}
              className="w-full flex items-start gap-2.5 px-2 py-[11px] rounded-lg mb-1 text-left"
              style={{
                border: isCurrent
                  ? `0.5px solid ${config.goldDim}`
                  : "0.5px solid transparent",
                background: isCurrent ? config.modalCurrentBg : "transparent",
                transition: "background .15s",
              }}
            >
              <span
                className="text-[12px] font-bold min-w-[46px] pt-px"
                style={{ letterSpacing: "0.08em", color: config.gold }}
              >
                {item.num}
              </span>
              <div className="flex-1">
                <div
                  className="text-[16px] font-semibold mb-0.5"
                  style={{ color: config.modalTextColor }}
                >
                  {item.title}
                </div>
                {item.sub && (
                  <div
                    className="text-[12px] leading-[1.4]"
                    style={{ color: config.modalSubTextColor }}
                  >
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
