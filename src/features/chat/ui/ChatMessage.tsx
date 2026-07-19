// [ui] ChatMessage — 메시지 렌더 라우터. Dumb: role·type으로 렌더 분기만.
// 캐릭터 'text' → ScriptMessage(크랙식 지문/대사 컬럼) / 'saju' → SajuMessage(구조화 근거) / 유저 → MessageBubble.
import type { Message } from '@/features/chat/domain/model/message';
import MessageBubble from './MessageBubble';
import SajuMessage from './SajuMessage';
import ScriptMessage from './ScriptMessage';

export interface ChatMessageProps {
  message: Message;
  sajuMode: boolean;
  characterName: string;
}

export default function ChatMessage({ message, sajuMode, characterName }: ChatMessageProps) {
  if (message.type === 'saju' && message.sajuBlock) {
    return <SajuMessage block={message.sajuBlock} />;
  }
  if (message.role === 'character') {
    return (
      <ScriptMessage content={message.content} characterName={characterName} sajuMode={sajuMode} />
    );
  }
  return <MessageBubble message={message} sajuMode={sajuMode} />;
}
