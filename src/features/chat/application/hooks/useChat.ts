'use client';

// [application/hooks] useChat — 채팅방 Application Service. UI는 이것만 본다(Dumb). (부록 B-2·B-3)
// 의존성 방향: Application → Domain/atoms/selectors/commands. UI를 import하지 않는다.
import { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { chatStatusAtom, draftAtom } from '@/features/chat/application/atoms/chatAtom';
import {
  activeSuggestionsAtom,
  canSendAtom,
  isOutOfTokenAtom,
  isSajuModeAtom,
  messagesAtom,
  tokenBalanceAtom,
} from '@/features/chat/application/selectors/chatSelectors';
import { dispatchChatAtom, initRoomAtom } from '@/features/chat/application/commands/chatCommands';

export function useChat(characterId: string) {
  const initRoom = useSetAtom(initRoomAtom);
  const dispatch = useSetAtom(dispatchChatAtom);
  const setDraft = useSetAtom(draftAtom);

  const draft = useAtomValue(draftAtom);
  const messages = useAtomValue(messagesAtom);
  const status = useAtomValue(chatStatusAtom);
  const balance = useAtomValue(tokenBalanceAtom);
  const isOutOfToken = useAtomValue(isOutOfTokenAtom);
  const isSajuMode = useAtomValue(isSajuModeAtom);
  const canSend = useAtomValue(canSendAtom);
  const suggestions = useAtomValue(activeSuggestionsAtom);

  // 방 진입/전환 시 초기화
  useEffect(() => {
    initRoom(characterId);
    setDraft('');
  }, [characterId, initRoom, setDraft]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setDraft('');
    void dispatch({ characterId, intent: { type: 'SEND_MESSAGE', text } });
  };

  const toggleSaju = () => {
    void dispatch({ characterId, intent: { type: 'TOGGLE_SAJU_MODE' } });
  };

  // 추천 답변 선택 → 입력창에 채움(사용자가 검토 후 전송). 즉시 전송 아님.
  const pickSuggestion = (text: string) => {
    setDraft(text);
  };

  return {
    messages,
    status,
    balance,
    isOutOfToken,
    isSajuMode,
    canSend,
    draft,
    setDraft,
    send,
    toggleSaju,
    suggestions,
    pickSuggestion,
  };
}
