'use client';

// 친구(캐릭터 목록) — 인앱 기본 진입 (스펙 §7.2).
// 데이터·핸들러는 useCharacterList에서, 라우팅만 page에서. UI는 Dumb.
// P3 이식: SOURCE 1:1 복제 — "7. 도화선 채팅 서비스 Test" app/(inapp)/friends/page.tsx.
import { useRouter } from 'next/navigation';
import { useCharacterList } from '@/features/chat/application/hooks/useCharacterList';
import CharacterCard from '@/features/chat/ui/CharacterCard';
import LockedCard from '@/features/chat/ui/LockedCard';
import Toast from '@/features/chat/ui/Toast';
import HeaderDivider from '@/features/chat/ui/HeaderDivider';
import HeaderTitle from '@/features/chat/ui/HeaderTitle';

// PROTOTYPE-ONLY: 잠금 카드 더블클릭 시 상세 미리보기. 출시 전 false로 두거나 제거. (해금 아님)
const PROTOTYPE_UNLOCK_PREVIEW = true;

export default function FriendsPage() {
  const router = useRouter();
  const { cards, lockedSlots, notice, tapLockedSlot, dismissNotice } = useCharacterList();

  return (
    <section className="app-bg flex flex-1 flex-col">
      {/* 상단 타이틀 — 스크롤 고정(sticky). 반투명 심야갈 + blur로 배경 문양이 은은히 비침. */}
      <header className="app-surface app-header sticky top-0 z-10 px-5 pb-3 pt-5">
        <HeaderTitle title="연락처" />
        <p className="mt-1 font-body text-xs text-hwaseonji">대화할 상대를 골라보세요</p>
        <HeaderDivider />
      </header>

      <div className="grid grid-cols-2 gap-3 px-5 pb-4 pt-[17px]">
        {cards.map(({ character, affinityLevel, glow }) => (
          <CharacterCard
            key={character.id}
            character={character}
            affinityLevel={affinityLevel}
            glow={glow}
            onSelect={(id) => router.push(`/character/${id}`)}
          />
        ))}
        {lockedSlots.map(({ slot, glow, brightness }) => (
          <LockedCard
            key={slot.id}
            slot={slot}
            glow={glow}
            brightness={brightness}
            onLockedTap={tapLockedSlot}
            onPreview={
              PROTOTYPE_UNLOCK_PREVIEW ? (s) => router.push(`/character/${s.characterId}`) : undefined
            }
          />
        ))}
      </div>

      {notice && <Toast message={notice} onClose={dismissNotice} />}
    </section>
  );
}
