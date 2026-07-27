'use client';

// 채팅방 (스펙 §7.5) — 사적 모드만.
// 데이터·핸들러는 useChat에서, 라우팅·스크롤만 page에서. 말풍선/입력/헤더는 Dumb.
// P3 이식: SOURCE 1:1 복제 본문 — id는 useParams 대신 상위 page.tsx(generateStaticParams)로부터 prop 전달.
//
// P4-2b: app 레벨 조립 — chat feature는 features/auth·features/coin을 import하지 않는 경계 규칙(FEATURE BOUNDARY) 때문에
// 로그인 게이트·사주 프로필 확인·실 코인 잔액 시드를 전부 여기서 조합한다. 목업(chatApi.isReal=false)이면 세 가지 모두 no-op —
// 기존 목업 데모는 완전히 그대로다.
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSetAtom } from 'jotai';
import { useChat } from '@/features/chat/application/hooks/useChat';
import { useCharacterDetail } from '@/features/chat/application/hooks/useCharacterDetail';
import { useSajuProfileGate } from '@/features/chat/application/hooks/useSajuProfileGate';
import { walletAtom } from '@/features/chat/application/atoms/walletAtom';
import { chatApi } from '@/features/chat/infrastructure/chatApi';
import ChatHeader from '@/features/chat/ui/ChatHeader';
import InfoPanel from '@/features/chat/ui/InfoPanel';
import ChatMessage from '@/features/chat/ui/ChatMessage';
import TypingIndicator from '@/features/chat/ui/TypingIndicator';
import ChatInput from '@/features/chat/ui/ChatInput';
import SajuProfileModal from '@/features/chat/ui/SajuProfileModal';
import { useAuth, useLoginGate, LoginPromptModal } from '@/features/auth';
import { useCoinBalance, isCoinEnabled } from '@/features/coin';

export function ChatRoomClient({ id }: { id: string }) {
  const router = useRouter();
  const { character } = useCharacterDetail(id); // 이름만
  const {
    messages, status, balance, isOutOfToken, isSajuMode, canSend, draft, setDraft, send, toggleSaju,
    suggestions, pickSuggestion,
  } = useChat(id);

  const characterName = character?.name ?? id;
  const scrollRef = useRef<HTMLDivElement>(null);

  // ── (1) 로그인 게이트 — 실연동 + 미로그인일 때만. 목업은 isReal=false라 run() 자체가 호출되지 않는다.
  // required — X를 눌러도 채팅방에 남지 않고 연락처(/friends/)로 되돌린다(로그인 없이 채팅 진입 차단). ──
  const { isAuthenticated, profile } = useAuth();
  const loginGate = useLoginGate('chat_room', `/room/${id}/`, {
    required: true,
    onCancel: () => router.push('/friends/'),
  });
  const loginPromptedRef = useRef(false);
  useEffect(() => {
    if (!chatApi.isReal || loginPromptedRef.current) return;
    loginPromptedRef.current = true;
    loginGate.run(() => {}); // 이미 로그인 상태면 훅 내부에서 즉시 no-op.
  }, [loginGate]);

  // ── (2) 사주 프로필 확인 모달 — 실연동 + 로그인 상태에서만 조회(네트워크 호출 0 보장은 훅 내부 enabled 분기). ──
  const sajuGate = useSajuProfileGate(chatApi.isReal && isAuthenticated);

  // ── (3) 실 코인 잔액 시드 — 코인 ON + 실연동일 때만 walletAtom을 BE 권위값으로 덮어쓴다. 목업은 SEED_BALANCE(10) 그대로. ──
  const { balance: coinBalance } = useCoinBalance();
  const setWallet = useSetAtom(walletAtom);
  useEffect(() => {
    if (!chatApi.isReal || !isCoinEnabled() || coinBalance == null) return;
    setWallet((w) => ({ ...w, balance: coinBalance }));
  }, [coinBalance, setWallet]);

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
        canSend={canSend && !sajuGate.sendBlocked}
        outOfToken={isOutOfToken}
        sajuMode={isSajuMode}
        suggestions={suggestions}
        onPickSuggestion={pickSuggestion}
      />

      <LoginPromptModal {...loginGate.modal} />
      {sajuGate.open && (
        <SajuProfileModal
          prefill={profile?.lastUsed ?? null}
          submitting={sajuGate.submitting}
          error={sajuGate.error}
          onConfirm={sajuGate.confirm}
          onClose={sajuGate.dismiss}
        />
      )}
    </section>
  );
}
