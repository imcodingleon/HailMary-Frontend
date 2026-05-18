"use client";

import {
  Children,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePaidShellNav } from "../../hooks/usePaidShellNav";
import PaidTocModal from "./PaidTocModal";
import type { PaidShellConfig } from "./paidShellConfig";

interface PaidShellProps {
  children: ReactNode;
  config: PaidShellConfig;
}

// 유료 12 페이지 슬라이드 셸 — 양 캐릭터 공용. 헤더 텍스트·골드 색·인장·TOC 라벨은 config로.
// 디자인 원본: 연우_final.html line 1457~1473 (header), 2796~2891 (nav+toc), 2898~2960 (slide JS).

export default function PaidShell({ children, config }: PaidShellProps) {
  const childArray = Children.toArray(children);
  const total = childArray.length;
  const nav = usePaidShellNav(total);

  const [tocOpen, setTocOpen] = useState(false);

  // 페이지 높이 동적 조정 — 현재 페이지 콘텐츠 높이로 wrap 높이 맞춤.
  const pageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const cur = pageRefs.current[nav.currentIdx];
    const wrap = wrapRef.current;
    if (!cur || !wrap) return;
    const apply = () => {
      wrap.style.height = `${cur.offsetHeight}px`;
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(cur);
    return () => ro.disconnect();
  }, [nav.currentIdx]);

  // 페이지 전환 시 상단으로 스크롤
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [nav.currentIdx]);

  const nextLabel = nav.isLast ? config.lastNavLabel : config.nextNavLabel;

  return (
    <div
      data-paid-scene={config.name === "한도윤" ? "doyoon" : "yeonwoo"}
      className="relative w-full min-h-[100dvh] z-[1] mx-auto"
      style={{
        // 연우 구조 미러 — 430px 컨테이너에 solid pageBg. 양쪽 사이드는 body의 outerBg.
        background: config.pageBg,
        paddingBottom: 100,
        maxWidth: 430,
      }}
    >
      {/* 상단 헤더 */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-3.5 py-2.5"
        style={{
          background: config.shellHeaderBg,
          borderBottom: `0.5px solid ${config.goldFaint}`,
        }}
      >
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block w-[42px] h-[42px] bg-no-repeat bg-center bg-contain"
            style={{
              backgroundImage: `url(${config.sealImage})`,
              filter: `drop-shadow(0 0 10px ${config.goldDim})`,
            }}
          />
          <div>
            <div
              className="text-[15px] font-semibold"
              style={{ letterSpacing: "0.05em", color: config.gold }}
            >
              {config.name}
            </div>
            <div
              className="text-[12px] text-[#888780]"
              style={{ letterSpacing: "0.1em" }}
            >
              {config.role}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setTocOpen(true)}
          className="rounded-md px-[13px] py-[7px] text-[14px] font-medium"
          style={{
            background: config.buttonBg,
            color: config.gold,
            border: `0.5px solid ${config.goldDim}`,
          }}
        >
          ≡ 목차
        </button>
      </div>

      {/* 페이지 컨테이너 */}
      <div
        ref={wrapRef}
        className="relative w-full overflow-hidden"
        style={{ transition: "height .35s cubic-bezier(.22,.94,.26,1)" }}
      >
        <div
          className="flex items-start"
          style={{
            transform: `translateX(-${nav.currentIdx * 100}%)`,
            transition: "transform .35s cubic-bezier(.22,.94,.26,1)",
            willChange: "transform",
          }}
        >
          {childArray.map((child, idx) => (
            <div
              key={idx}
              ref={(el) => {
                pageRefs.current[idx] = el;
              }}
              className="flex-shrink-0 px-3 pt-2 pb-3"
              style={{ flex: "0 0 100%", minWidth: "100%" }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* 하단 진행바 + 네비 */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] pointer-events-none">
        <div
          className="mx-auto max-w-[430px] px-3.5 pt-2.5 pb-3.5 pointer-events-auto"
          style={{
            background: config.shellNavBg,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderTop: `0.5px solid ${config.goldFaint}`,
          }}
        >
          <div className="flex items-center gap-2.5 mb-2">
            <div
              className="flex-1 h-1 rounded-[2px] overflow-hidden"
              style={{ background: `${config.goldFaint}` }}
            >
              <div
                className="h-full rounded-[2px]"
                style={{
                  background: config.gold,
                  width: `${nav.progressPct}%`,
                  transition: "width .35s ease",
                }}
              />
            </div>
            <div
              className="text-[13px] text-[#888780] font-medium min-w-[38px] text-right"
              style={{ letterSpacing: "0.05em" }}
            >
              {nav.currentIdx + 1} / {nav.total}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={nav.goPrev}
              disabled={nav.prevDisabled}
              aria-label="이전"
              className="h-[38px] min-w-[38px] rounded-lg text-[17px] font-medium flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: config.buttonBg,
                color: config.gold,
                border: `0.5px solid ${config.goldDim}`,
              }}
            >
              ←
            </button>
            <button
              type="button"
              onClick={nav.goNext}
              disabled={nav.isLast}
              className="flex-1 h-[38px] rounded-lg text-[16px] font-semibold flex items-center justify-center"
              style={{
                background: nav.isLast ? config.buttonBg : config.gold,
                color: nav.isLast ? config.gold : config.nextButtonTextColor,
                border: nav.isLast
                  ? `0.5px solid ${config.goldDim}`
                  : "none",
                letterSpacing: "0.02em",
                opacity: nav.isLast ? 0.7 : 1,
              }}
            >
              {nextLabel}
            </button>
          </div>
        </div>
      </div>

      <PaidTocModal
        open={tocOpen}
        currentIdx={nav.currentIdx}
        onClose={() => setTocOpen(false)}
        onJump={(idx) => {
          nav.jumpTo(idx);
          setTocOpen(false);
        }}
        config={config}
      />
    </div>
  );
}
