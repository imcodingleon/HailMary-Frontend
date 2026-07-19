"use client";

import { useEffect, useRef, useState } from "react";
import type { ContentCard as ContentCardData } from "../../domain/contentCards";
import { ContentCard } from "./ContentCard";
import { ComingSoonCard } from "./ComingSoonCard";
import { NavArrow } from "./NavArrow";

const STEP = 352; // 340px (card) + 12px (gap)

interface ContentCarouselProps {
  cards: ContentCardData[];
  onCardClick: (card: ContentCardData) => void;
}

export function ContentCarousel({ cards, onCardClick }: ContentCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateButtons = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 2);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  };

  useEffect(() => {
    updateButtons();
  }, [cards.length]);

  const scrollByStep = (delta: number) => {
    trackRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="relative">
      <header className="px-6 pb-3 pt-6">
        <h2 className="text-[15px] font-medium text-white/90">다른 콘텐츠</h2>
      </header>
      <div className="relative">
        <NavArrow
          direction="prev"
          onClick={() => scrollByStep(-STEP)}
          disabled={!canPrev}
        />
        <NavArrow
          direction="next"
          onClick={() => scrollByStep(STEP)}
          disabled={!canNext}
        />
        <div
          ref={trackRef}
          onScroll={updateButtons}
          className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth px-6 pb-2 scroll-px-6"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {cards.map((card) =>
            card.variant === "coming-soon" ? (
              <ComingSoonCard key={card.id} />
            ) : (
              <ContentCard key={card.id} card={card} onClick={onCardClick} />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
