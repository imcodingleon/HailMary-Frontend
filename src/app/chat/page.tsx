'use client';

// 채팅(대화방 리스트) — 진행 중 대화만 (스펙 §7.3). 연락처(캐릭터 목록)와 분리.
// 헤더·필터 칩 + 리스트. 데이터·필터는 useChatRooms, 라우팅·스텁 토스트만 page에서. 행은 Dumb.
// P3 이식: SOURCE 1:1 복제 — "7. 도화선 채팅 서비스 Test" app/(inapp)/chat/page.tsx.
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useChatRooms } from '@/features/chat/application/hooks/useChatRooms';
import ChatListHeader from '@/features/chat/ui/ChatListHeader';
import ChatRoomRow from '@/features/chat/ui/ChatRoomRow';
import Toast from '@/features/chat/ui/Toast';

export default function ChatPage() {
  const router = useRouter();
  const { rooms, totalUnread, filter, setFilter } = useChatRooms();
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <section className="app-bg flex flex-1 flex-col">
      <ChatListHeader
        filter={filter}
        totalUnread={totalUnread}
        onSelectFilter={setFilter}
        onSearch={() => setToast('검색은 준비 중이에요')}
        onNewChat={() => setToast('새 대화는 준비 중이에요')}
      />

      {rooms.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
          <p className="font-body text-sm text-hwaseonji">
            {filter === 'unread' ? '안 읽은 대화가 없어요.' : '아직 대화가 없어요.'}
          </p>
          {filter === 'all' && (
            <button
              type="button"
              onClick={() => router.push('/friends')}
              className="rounded-pill bg-dohwahong px-4 py-2 font-body text-sm font-semibold text-hwaseonji"
            >
              연락처에서 시작하기
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2 px-5 pb-4 pt-5">
          {rooms.map((item) => (
            <ChatRoomRow key={item.characterId} item={item} onOpen={(id) => router.push(`/room/${id}`)} />
          ))}
        </div>
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </section>
  );
}
