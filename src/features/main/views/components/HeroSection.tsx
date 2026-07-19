"use client";

import Image from "next/image";
import type { ContentCard } from "../../domain/contentCards";

// AI 연애운 정밀 리포트 코인 비용 — BE settings.love_report_coin_cost(490)와 동기화.
// 힌트 칩 표기용 상수. 실 결제 비용 판단은 checkout feature 소관(여기선 표시만).
const LOVE_REPORT_COIN_HINT = 490;

interface HeroSectionProps {
  card: ContentCard;
  onClick: (card: ContentCard) => void;
  /** 코인 플래그 ON일 때 코인 비용 힌트 칩 노출. */
  coinEnabled?: boolean;
}

export function HeroSection({ card, onClick, coinEnabled = false }: HeroSectionProps) {
  if (!card.poster) return null;
  return (
    <section className="px-6 pt-4">
      <button
        type="button"
        onClick={() => onClick(card)}
        className="group relative block aspect-[904/1620] w-full cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08] bg-black text-left"
      >
        {/* 포스터 하단 검은 여백을 crop(object-top) → 히어로가 짧아져 아래 섹션이 살짝 보임(스크롤 유도) */}
        <Image
          src={card.poster}
          alt={`${card.title} 포스터`}
          fill
          priority
          sizes="448px"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        {/* 상단 페이드 — 캐릭터 정수리에 검은 여백 자연스럽게 연결 */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[100px]"
          style={{
            background:
              "linear-gradient(180deg, #000 0%, #000 30%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0) 100%)",
          }}
        />
        {/* 태그 */}
        <span
          className="absolute left-5 top-5 z-20 inline-block rounded-lg border px-3 py-1 text-[11px] font-medium tracking-wide"
          style={{
            background: "rgba(15,8,30,0.65)",
            borderColor: "rgba(216,90,128,0.45)",
            color: "var(--color-dohwaseon-light)",
            backdropFilter: "blur(12px)",
          }}
        >
          {card.tag}
        </span>
        {/* 코인 비용 힌트 — coin ON에서만, 태그와 대칭되는 우측 상단 */}
        {coinEnabled && (
          <span
            className="absolute right-5 top-5 z-20 inline-block rounded-lg border px-3 py-1 text-[11px] font-medium tracking-wide"
            style={{
              background: "rgba(15,8,30,0.65)",
              borderColor: "rgba(232,201,160,0.4)",
              color: "var(--color-yeonwoo-gold)",
              backdropFilter: "blur(12px)",
            }}
          >
            {LOVE_REPORT_COIN_HINT}코인
          </span>
        )}
      </button>
    </section>
  );
}
