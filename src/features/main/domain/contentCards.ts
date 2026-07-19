// 메인 페이지 콘텐츠 카드 메타데이터.
// 도메인 레이어: 순수 데이터, React/Next 의존 없음.

export type ContentVariant = "dohwaseon" | "kkebi" | "coming-soon";

export interface ContentCard {
  id: string;
  variant: ContentVariant;
  title: string;
  tag: string;
  microCopy?: string;
  poster?: string;
  route?: string;
}

export const SECONDARY_CARDS: ContentCard[] = [
  {
    id: "kkebi-daily",
    variant: "kkebi",
    title: "깨비의 일일운세",
    tag: "매일",
    microCopy: "오늘의 운명, 깨비가 알려줄게!",
    poster: "/kkebi-card-poster.png",
    route: "/fortune/daily",
  },
  {
    id: "coming-soon-1",
    variant: "coming-soon",
    title: "사주 총운 컨텐츠 준비중",
    tag: "준비 중",
  },
];

export const HERO_CARD: ContentCard = {
  id: "dohwaseon-hero",
  variant: "dohwaseon",
  title: "연애 사주",
  tag: "대표 콘텐츠",
  poster: "/poster-love-saju-main.png",
  route: "/landing",
};
