// [ui] LockedCard — 미해금 슬롯 카드 (스펙 §7.2). Dumb: 탭 시 onLockedTap만.
// 실루엣(밝기 보정) + 공통 어둠 오버레이로 톤 통일 → 동일 잠금 아이콘 → 기본 카드와 평행한 ???·hint·상징 대사.
import type { CSSProperties } from 'react';
import type { UnlockSlot } from '@/features/chat/domain/model/character';
import SilhouetteSlot from './SilhouetteSlot';
import CharacterImage from './CharacterImage';
import IconImg from './IconImg';
import { iconAsset } from './iconAsset';

export interface LockedCardProps {
  slot: UnlockSlot;
  glow: string; // hover 글로우 색
  brightness: number; // 실루엣 밝기 보정(<1=더 어둡게)
  onLockedTap: (slot: UnlockSlot) => void;
  onPreview?: (slot: UnlockSlot) => void; // PROTOTYPE-ONLY: 더블클릭 미리보기. 미지정(플래그 off) 시 비활성
}

// 모든 잠금 카드 동일 아이콘(Lock). policy 차이는 hint 텍스트로만 구분(물음표 변형 제거).
function LockGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
      <path d="M12 14.5v2.5" />
    </svg>
  );
}

export default function LockedCard({ slot, glow, brightness, onLockedTap, onPreview }: LockedCardProps) {
  return (
    <button
      type="button"
      onClick={() => onLockedTap(slot)}
      // PROTOTYPE-ONLY: 잠금 더블클릭 미리보기, 출시 전 제거/false (단일 클릭은 토스트 유지)
      onDoubleClick={() => onPreview?.(slot)}
      style={{ '--glow': glow } as CSSProperties}
      className="card-hover relative block aspect-[3/4] w-full overflow-hidden rounded-card text-left"
    >
      {/* 실루엣(silhouette-{id}.png) + 밝기 보정. 실패 시 어두운 placeholder. */}
      <CharacterImage
        id={slot.characterId}
        kind="silhouette"
        alt="잠긴 캐릭터"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: `brightness(${brightness})` }}
        fallback={<SilhouetteSlot className="absolute inset-0 h-full w-full" />}
      />

      {/* 공통 어둠 오버레이 — 모든 잠금 카드 동일하게 깔아 바닥 톤 통일 */}
      <div className="pointer-events-none absolute inset-0 bg-meokheuk opacity-40" />

      {/* 하단 텍스트 가독용 그라데이션 (기본 카드와 동일) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-[45%] to-meokheuk" />

      {/* 잠금 아이콘 — 카드 중앙에서 20px 위, 선황금(골드) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <IconImg
          src={iconAsset.lock}
          alt=""
          className="h-10 w-10 -translate-y-5 object-contain drop-shadow"
          fallback={<LockGlyph className="h-10 w-10 -translate-y-5 text-seonhwanggeum drop-shadow" />}
        />
      </div>

      {/* 하단: ???(이름 자리) + hint + 상징 대사 (기본 카드와 평행 구조) */}
      <div className="absolute inset-x-0 bottom-0 p-3 [text-shadow:0_1px_3px_var(--color-meokheuk)]">
        <h3 className="font-title text-base font-semibold text-hwaseonji">???</h3>
        <p className="mt-0.5 font-body text-[10px] text-hwaseonji">{slot.hint}</p>
        <p className="mt-1 line-clamp-2 font-body text-[11px] leading-snug text-hwaseonji">
          {slot.signatureQuote}
        </p>
      </div>
    </button>
  );
}
