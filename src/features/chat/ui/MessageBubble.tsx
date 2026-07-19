// [ui] MessageBubble — 말풍선 (스펙 §7.5/§9). Dumb: role·sajuMode 파생값에 따른 정렬·색만(State Driven UI).
// OFF(평상): 유저=심야갈(우)·캐릭터=심야갈(좌, 정렬로 구분). ON(사주): 유저=도화홍, 캐릭터=심야갈+도화홍 테두리.
import type { Message } from '@/features/chat/domain/model/message';

export interface MessageBubbleProps {
  message: Message;
  sajuMode: boolean;
}

export default function MessageBubble({ message, sajuMode }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  const userTone = sajuMode ? 'bg-dohwahong text-hwaseonji' : 'bg-simyagal text-hwaseonji';
  const characterTone = sajuMode
    ? 'bg-simyagal text-hwaseonji border border-dohwahong'
    : 'bg-simyagal text-hwaseonji';

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
      <div
        className={`max-w-[80%] rounded-card px-3 py-2 font-body text-sm leading-relaxed transition-colors ${
          isUser ? userTone : characterTone
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
