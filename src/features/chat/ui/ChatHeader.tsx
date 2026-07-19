// [ui] ChatHeader — 채팅방 헤더 (스펙 §7.5). Dumb: 데이터·핸들러는 props로만.
// 좌측 뒤로가기 / 아바타 / 이름 / 우측 호감도 진입(스텁) + 토큰 잔량(도화홍 강조).
import type { AccentToken } from '@/features/chat/domain/model/character';
import CharacterSlot from './CharacterSlot';
import CharacterImage from './CharacterImage';

export interface ChatHeaderProps {
  characterId: string;
  characterName: string;
  accent: AccentToken;
  balance: number;
  sajuMode: boolean; // 사주 ON 시 도화홍 신호
  onBack: () => void;
  onOpenAffinity: () => void; // 위치②: 호감도 화면으로 이동
}

function BackGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}
function HeartGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M12 20s-7-4.4-7-9.3A3.7 3.7 0 0 1 12 8a3.7 3.7 0 0 1 7 2.7C19 15.6 12 20 12 20z" />
    </svg>
  );
}
function CoinGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v8M9.5 10.5h3.2a1.5 1.5 0 0 1 0 3H10" />
    </svg>
  );
}

export default function ChatHeader({
  characterId,
  characterName,
  accent,
  balance,
  sajuMode,
  onBack,
  onOpenAffinity,
}: ChatHeaderProps) {
  return (
    <header
      className={`flex shrink-0 items-center gap-2 border-b px-3 py-3 transition-colors ${
        sajuMode ? 'border-dohwahong' : 'border-simyagal'
      }`}
    >
      <button
        type="button"
        onClick={onBack}
        aria-label="뒤로가기"
        className="flex h-9 w-9 items-center justify-center rounded-pill bg-simyagal text-hwaseonji"
      >
        <BackGlyph className="h-5 w-5" />
      </button>

      {/* 캐릭터 아바타(avatar→card 강등) */}
      <div className="h-8 w-8 shrink-0 overflow-hidden rounded-pill">
        <CharacterImage
          id={characterId}
          kind="avatar"
          alt={characterName}
          className="h-full w-full object-cover"
          fallback={<CharacterSlot label={characterName} accent={accent} className="h-full w-full" />}
        />
      </div>

      <div className="flex flex-1 flex-col items-center">
        <h1 className="font-title text-base font-semibold text-hwaseonji">{characterName}</h1>
        {sajuMode && (
          <span className="mt-0.5 inline-flex items-center gap-1 rounded-pill border border-dohwahong px-2 py-0.5 font-body text-[10px] text-dohwahong">
            🔮 사주 모드
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={onOpenAffinity}
        aria-label="호감도"
        className="flex h-9 w-9 items-center justify-center rounded-pill bg-simyagal text-dohwahong"
      >
        <HeartGlyph className="h-5 w-5" />
      </button>

      <span className="inline-flex items-center gap-1 rounded-pill bg-simyagal px-2.5 py-1 font-body text-xs font-semibold text-dohwahong">
        <CoinGlyph className="h-4 w-4" />
        {balance}
      </span>
    </header>
  );
}
