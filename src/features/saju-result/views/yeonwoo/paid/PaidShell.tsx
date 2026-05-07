"use client";

import {
  Children,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePaidShellNav } from "../../../hooks/usePaidShellNav";
import TocModal from "./components/TocModal";

interface PaidShellProps {
  children: ReactNode;
}

// 12 페이지 슬라이드 컨테이너. top-header / pages-track / bottom-nav / TocModal 일체.
// 디자인 원본: 연우_final.html line 1457~1473 (header), 2796~2891 (nav+toc), 2898~2960 (slide JS).

export default function PaidShell({ children }: PaidShellProps) {
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

  return (
    <div
      className="relative mx-auto max-w-[430px] min-h-[100dvh] bg-[#0a0a09] z-[1]"
      style={{
        paddingBottom: 100,
        boxShadow:
          "0 0 60px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(255,255,255,0.04)",
      }}
    >
      {/* 상단 헤더 */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between bg-[#111110] px-3.5 py-2.5"
        style={{ borderBottom: "0.5px solid rgba(200,168,112,0.15)" }}
      >
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block w-[42px] h-[42px] bg-no-repeat bg-center bg-contain"
            style={{
              backgroundImage: "url(/yeonwoo/motif/motif_seal_myeong.svg)",
              filter: "drop-shadow(0 0 10px rgba(200,168,112,0.5))",
            }}
          />
          <div>
            <div
              className="text-[15px] font-semibold text-[#E8C9A0]"
              style={{ letterSpacing: "0.05em" }}
            >
              강연우
            </div>
            <div
              className="text-[12px] text-[#888780]"
              style={{ letterSpacing: "0.1em" }}
            >
              직관 풀이
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setTocOpen(true)}
          className="bg-[#1a1a18] text-[#E8C9A0] rounded-md px-[13px] py-[7px] text-[14px] font-medium"
          style={{ border: "0.5px solid rgba(200,168,112,0.3)" }}
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
            background: "rgba(15,15,13,0.95)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderTop: "0.5px solid rgba(200,168,112,0.15)",
          }}
        >
          <div className="flex items-center gap-2.5 mb-2">
            <div
              className="flex-1 h-1 rounded-[2px] overflow-hidden"
              style={{ background: "rgba(200,168,112,0.12)" }}
            >
              <div
                className="h-full rounded-[2px] bg-[#E8C9A0]"
                style={{
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
              className="h-[38px] min-w-[38px] bg-[#1a1a18] text-[#E8C9A0] rounded-lg text-[17px] font-medium flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ border: "0.5px solid rgba(200,168,112,0.3)" }}
            >
              ←
            </button>
            <button
              type="button"
              onClick={nav.goNext}
              disabled={nav.isLast}
              className="flex-1 h-[38px] rounded-lg text-[16px] font-semibold flex items-center justify-center"
              style={{
                background: nav.isLast ? "#1a1a18" : "#E8C9A0",
                color: nav.isLast ? "#888780" : "#2c1a08",
                border: nav.isLast
                  ? "0.5px solid rgba(200,168,112,0.3)"
                  : "none",
                letterSpacing: "0.02em",
              }}
            >
              {nav.nextLabel}
            </button>
          </div>
        </div>
      </div>

      <TocModal
        open={tocOpen}
        currentIdx={nav.currentIdx}
        onClose={() => setTocOpen(false)}
        onJump={(idx) => {
          nav.jumpTo(idx);
          setTocOpen(false);
        }}
      />
    </div>
  );
}
