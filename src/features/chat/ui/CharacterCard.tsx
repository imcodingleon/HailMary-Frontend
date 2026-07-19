// [ui] CharacterCard — 친구창(연락처) 카드 (스펙 §7.2). Dumb: 탭 시 onSelect만.
// 풀이미지 포트레이트(3:4): 카드 전체 = 이미지 영역(placeholder) → 하단으로 짙어지는 먹흑 그라데이션 → 그 위 이름·대사.
// 이미지 도착 시 CharacterSlot 자리에 캐릭터 컷만 끼우면 됨.
import type { Character } from '@/features/chat/domain/model/character';
import CharacterSlot from './CharacterSlot';
import CharacterImage from './CharacterImage';
import IconImg from './IconImg';
import { iconAsset } from './iconAsset';
import type { CSSProperties } from 'react';

// P3 이식: lucide-react 신규 의존성 회피 — lucide Heart와 동일한 stroke 기반 인라인 SVG로 대체.
function Heart({ className, fill }: { className?: string; fill?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={fill ?? 'none'}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
    </svg>
  );
}

export interface CharacterCardProps {
  character: Character;
  affinityLevel: number; // 호감도 레벨 (표시만, 적립 로직 없음 — H6)
  glow: string; // hover 글로우 색 (cardVisuals)
  onSelect: (id: string) => void;
}

export default function CharacterCard({ character, affinityLevel, glow, onSelect }: CharacterCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(character.id)}
      style={{ '--glow': glow } as CSSProperties}
      className="card-hover relative block aspect-[3/4] w-full overflow-hidden rounded-card text-left"
    >
      {/* a. 풀카드 이미지(card.png) — 실패 시 placeholder로 강등 */}
      <CharacterImage
        id={character.id}
        kind="card"
        alt={character.name}
        className="absolute inset-0 h-full w-full object-cover"
        fallback={
          <CharacterSlot label={character.name} accent={character.accent} className="absolute inset-0 h-full w-full" bordered={false} />
        }
      />

      {/* b. 검정 그라데이션 오버레이 — 상단 ~45% 투명 → 하단 짙은 먹흑 */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-[45%] to-meokheuk" />

      {/* d. 호감도 레벨 배지 (우상단, 어두운 pill + 하트). 표시만(H6). */}
      <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-pill bg-meokheuk px-2 py-0.5 font-body text-[10px] text-hwaseonji">
        <IconImg
          src={iconAsset.heart}
          alt=""
          className="h-3 w-3 object-contain"
          fallback={<Heart className="h-3 w-3 text-dohwahong" fill="currentColor" />}
        />
        Lv.{affinityLevel}
      </span>

      {/* c. 이름 + 대표 대사 2줄 클램프 (하단 오버레이) */}
      <div className="absolute inset-x-0 bottom-0 p-3">
        <h3 className="font-title text-base font-semibold text-hwaseonji">{character.name}</h3>
        <p className="mt-0.5 line-clamp-2 font-body text-[11px] leading-snug text-hwaseonji">
          {character.baseQuote}
        </p>
      </div>
    </button>
  );
}
