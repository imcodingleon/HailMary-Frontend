"use client";

import Image from "next/image";
import { Epilogue } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/shared/utils/analytics";
import { shuffleLoadingTmis } from "../domain/tmis";
import type { LoadingCharacter } from "../domain/types";
import TipLine from "./components/TipLine";

const epilogue = Epilogue({ subsets: ["latin"], weight: "800", display: "swap" });

const SLOT_MS = 7000;
const LOADING_BAR_MS = 10000;
const CROSSFADE_MS = 800;

const COLOR = {
  surface: "#121414",
  primary: "#ffb68d",
  primaryContainer: "#ff8c42",
  goldPulse: "#ffe16d",
  onSurface: "#e2e2e2",
  onSurfaceVariant: "#ddc1b3",
  outlineVariant: "#564338",
};

type Props = {
  character: LoadingCharacter;
};

export default function SajuLoadingView({ character }: Props) {
  const router = useRouter();
  const tmis = useMemo(() => shuffleLoadingTmis(), []);
  const [slotIdx, setSlotIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(orientation: portrait) and (max-width: 768px)");
    setIsMobilePortrait(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobilePortrait(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const SENT_KEY = `hm_loading_enter_sent_${character}`;
    if (sessionStorage.getItem(SENT_KEY)) return;
    sessionStorage.setItem(SENT_KEY, "1");
    trackEvent("loading_enter", { character_id: character });
  }, [character]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setProgress(100));
    const cycleId = window.setInterval(() => {
      setSlotIdx((i) => (i + 1) % tmis.length);
    }, SLOT_MS);
    const doneTimer = window.setTimeout(() => {
      setDone(true);
      trackEvent("loading_done", { character_id: character });
    }, LOADING_BAR_MS);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(cycleId);
      window.clearTimeout(doneTimer);
    };
  }, [tmis.length, character]);

  useEffect(() => {
    const slug = tmis[slotIdx]?.bg.split("/").pop()?.replace(".png", "") ?? "";
    trackEvent("loading_slot_change", {
      character_id: character,
      slot_index: slotIdx,
      line_slug: slug,
    });
  }, [slotIdx, tmis, character]);

  const handleClick = () => {
    trackEvent("loading_result_clicked", { character_id: character });
    router.push(`/saju/result?character=${character}`);
  };

  const currentLine = tmis[slotIdx]?.line ?? "";

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{ background: COLOR.surface, fontFamily: "var(--font-pretendard)" }}
    >
      {/* Layer 0: 배경 사진 스택
          모바일 portrait: 패널 위 영역만 차지하는 컨테이너를 90도 회전.
          → 이미지 영역과 패널 영역이 완전히 분리됨.
          → 시계방향 90도 회전 시 컨테이너 left = 화면 하단(패널 방향).
          → object-position: left center → 이미지가 패널 위에 딱 붙음.
          데스크탑/landscape: 풀스크린 object-cover. */}
      {tmis.map((tmi, i) => (
        <div
          key={tmi.bg}
          style={
            isMobilePortrait
              ? {
                  // 회전 후 apparent size: 100vw × (100vh - 원래 패널 높이)
                  // 패널이 50px 더 커져서 이미지 하단을 자연스럽게 가림
                  position: "absolute",
                  top: "calc((100vh - max(28vh, 160px)) / 2)",
                  left: "50%",
                  width: "calc(100vh - max(28vh, 160px))",
                  height: "100vw",
                  transform: "translate(-50%, -50%) rotate(90deg)",
                  opacity: slotIdx === i ? 1 : 0,
                  transition: `opacity ${CROSSFADE_MS}ms ease`,
                }
              : {
                  position: "absolute",
                  inset: 0,
                  opacity: slotIdx === i ? 1 : 0,
                  transition: `opacity ${CROSSFADE_MS}ms ease`,
                }
          }
        >
          <Image
            src={tmi.bg}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={isMobilePortrait ? "object-contain" : "object-cover"}
            style={{
              // 시계방향 90도: 컨테이너 left(x=0) → 화면 하단
              // left center → 이미지 하단이 패널에 딱 붙음
              objectPosition: isMobilePortrait ? "left center" : "center calc(50% + 80px)",
            }}
          />
        </div>
      ))}

      {/* Layer 1: 하단 가독성용 그라디언트 베일 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(18,20,20,0.92) 0%, rgba(18,20,20,0.55) 35%, rgba(18,20,20,0) 70%)",
        }}
      />

      {/* 하단 글래스 패널 */}
      <div
        className="absolute bottom-0 left-0 w-full z-20 backdrop-blur-xl"
        style={{
          height: isMobilePortrait ? "calc(min(28vh, 180px) + 80px)" : "min(28vh, 180px)",
          minHeight: isMobilePortrait ? "240px" : "160px",
          background: "rgba(0,0,0,0.28)",
          borderTop: "1px solid rgba(255,140,66,0.5)",
          boxShadow: "0 -10px 20px rgba(255,140,66,0.15)",
        }}
      >
        {/* 프로그레스 레일 */}
        <div
          className="absolute left-0 w-full pointer-events-none"
          style={{
            top: "-1px",
            height: "4px",
            background: "rgba(255,140,66,0.12)",
          }}
        >
          <div
            className="relative h-full"
            style={{
              width: `${progress}%`,
              background: COLOR.primaryContainer,
              boxShadow: "0 0 15px rgba(255,140,66,0.8)",
              transition: `width ${LOADING_BAR_MS}ms linear`,
            }}
          >
            <div
              className="absolute right-0 top-0 bottom-0"
              style={{
                width: "2px",
                background: COLOR.goldPulse,
                boxShadow: `0 0 10px ${COLOR.goldPulse}`,
              }}
            />
          </div>
        </div>

        {/* 패널 내부 — 컨텐츠 하단 정렬 */}
        <div
          className="relative w-full h-full flex flex-col items-center justify-end px-4 sm:px-6 text-center"
          style={{ paddingBottom: isMobilePortrait ? "calc(1rem + 15px)" : "1rem" }}
        >
          {/* Filigree 4 모서리 */}
          {[
            "top-3 left-3 border-t-2 border-l-2",
            "top-3 right-3 border-t-2 border-r-2",
            "bottom-3 left-3 border-b-2 border-l-2",
            "bottom-3 right-3 border-b-2 border-r-2",
          ].map((cls) => (
            <div
              key={cls}
              className={`absolute w-5 h-5 sm:w-6 sm:h-6 ${cls}`}
              style={{ borderColor: COLOR.outlineVariant }}
            />
          ))}

          {/* LOADING... → "결과 보기 →" 토글 */}
          <div
            className="flex items-center justify-center"
            style={{
              height: "44px",
              marginBottom: isMobilePortrait ? "calc(0.625rem + 15px)" : "0.625rem",
            }}
          >
            {done ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
                className={`${epilogue.className} uppercase animate-[fadeIn_0.4s_ease-out] cursor-pointer inline-flex items-center justify-center`}
                style={{
                  fontSize: "16px",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  fontWeight: 800,
                  color: COLOR.primaryContainer,
                  background: "transparent",
                  border: `1px solid ${COLOR.goldPulse}`,
                  borderRadius: "8px",
                  padding: "0.65rem 1.25rem 0.55rem",
                  filter: "drop-shadow(0 0 8px rgba(255,140,66,0.4))",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(255,140,66,0.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                결과 보기 →
              </button>
            ) : (
              <h1
                className={`${epilogue.className} uppercase`}
                style={{
                  fontSize: "clamp(20px, 3.2vw, 30px)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.04em",
                  fontWeight: 800,
                  color: COLOR.onSurface,
                  filter: "drop-shadow(0 0 6px rgba(255,140,66,0.28))",
                }}
              >
                LOADING...
              </h1>
            )}
          </div>

          {/* TMI 블록 — 상하 골드 디바이더 */}
          <div
            className="flex flex-col items-center gap-1 w-full mt-1"
            style={{
              padding: isMobilePortrait ? "calc(0.75rem * 2.5) 0" : "0.75rem 0",
              borderTop: "1px solid rgba(164,140,127,0.3)",
              borderBottom: "1px solid rgba(164,140,127,0.3)",
            }}
          >
            <p
              className="uppercase font-extrabold"
              style={{
                fontSize: isMobilePortrait ? "calc(12px * 1.2)" : "12px",
                color: COLOR.primary,
                letterSpacing: "0.15em",
                lineHeight: 1.5,
              }}
            >
              TMI
            </p>
            <TipLine key={slotIdx} line={currentLine} />
          </div>
        </div>
      </div>
    </div>
  );
}
