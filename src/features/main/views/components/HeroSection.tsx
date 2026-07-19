"use client";

import Image from "next/image";
import type { ContentCard } from "../../domain/contentCards";

interface HeroSectionProps {
  card: ContentCard;
  onClick: (card: ContentCard) => void;
}

export function HeroSection({ card, onClick }: HeroSectionProps) {
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
      </button>
    </section>
  );
}
