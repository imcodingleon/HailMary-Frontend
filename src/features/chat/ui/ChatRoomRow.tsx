// [ui] ChatRoomRow — 카톡식 대화방 행 (스펙 §7.3). Dumb: 탭 시 onOpen만.
// 좌측 썸네일(CharacterSlot placeholder, 작은 사이즈) + 이름 + 마지막 메시지 1줄 + 시간 + 안 읽음 배지.
import type { ChatRoomListItem } from '@/features/chat/application/selectors/chatSelectors';
import CharacterSlot from './CharacterSlot';
import CharacterImage from './CharacterImage';
import { formatTime } from './formatTime';

export interface ChatRoomRowProps {
  item: ChatRoomListItem;
  onOpen: (characterId: string) => void;
}

export default function ChatRoomRow({ item, onOpen }: ChatRoomRowProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item.characterId)}
      className="card-surface flex w-full items-center gap-3 rounded-card p-3 text-left"
    >
      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-card">
        <CharacterImage
          id={item.characterId}
          kind="avatar"
          alt={item.name}
          className="h-full w-full object-cover"
          fallback={<CharacterSlot label={item.name} accent={item.accent} className="h-full w-full" />}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="truncate font-title text-sm font-semibold text-hwaseonji">{item.name}</span>
          <span className="shrink-0 font-body text-[10px] text-hwaseonji">{formatTime(item.lastAt)}</span>
        </div>
        <p className="truncate font-body text-xs text-hwaseonji">{item.lastMessage}</p>
      </div>

      {item.unreadCount > 0 && (
        <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-pill bg-dohwahong px-1.5 font-body text-[10px] font-semibold text-hwaseonji">
          {item.unreadCount}
        </span>
      )}
    </button>
  );
}
