'use client';

// 채팅방 (스펙 §7.5) — 사적 모드만.
// 데이터·핸들러는 useChat에서, 라우팅·스크롤만 page에서. 말풍선/입력/헤더는 Dumb.
// P3 이식: SOURCE 1:1 복제 본문 — id는 useParams 대신 상위 page.tsx(generateStaticParams)로부터 prop 전달.
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useChat } from '@/features/chat/application/hooks/useChat';
import { useCharacterDetail } from '@/features/chat/application/hooks/useCharacterDetail';
import ChatHeader from '@/features/chat/ui/ChatHeader';
import InfoPanel from '@/features/chat/ui/InfoPanel';
import ChatMessage from '@/features/chat/ui/ChatMessage';
import TypingIndicator from '@/features/chat/ui/TypingIndicator';
import ChatInput from '@/features/chat/ui/ChatInput';

export function ChatRoomClient({ id }: { id: string }) {
  const router = useRouter();
  const { character } = useCharacterDetail(id); // 이름만
  const {
    messages, status, balance, isOutOfToken, isSajuMode, canSend, draft, setDraft, send, toggleSaju,
    suggestions, pickSuggestion,
  } = useChat(id);

  const characterName = character?.name ?? id;
  const scrollRef = useRef<HTMLDivElement>(null);

  // 새 메시지/로딩 시 하단 자동 스크롤(표시용 DOM 효과)
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, status]);

  return (
    <section className="flex h-[100dvh] flex-col bg-meokheuk">
      <ChatHeader
        characterId={id}
        characterName={characterName}
        accent={character?.accent ?? 'simyagal'}
        balance={balance}
        sajuMode={isSajuMode}
        onBack={() => router.back()}
        onOpenAffinity={() => router.push(`/affinity/${id}`)}
      />

      <InfoPanel characterId={id} />

      <div ref={scrollRef} className="no-scrollbar flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} sajuMode={isSajuMode} characterName={characterName} />
        ))}
        {status === 'LOADING_RESPONSE' && <TypingIndicator characterName={characterName} />}
      </div>

      <ChatInput
        draft={draft}
        onDraftChange={setDraft}
        onSend={send}
        onToggleSaju={toggleSaju}
        onGoCharge={() => router.push('/charge')}
        canSend={canSend}
        outOfToken={isOutOfToken}
        sajuMode={isSajuMode}
        suggestions={suggestions}
        onPickSuggestion={pickSuggestion}
      />
    </section>
  );
}
