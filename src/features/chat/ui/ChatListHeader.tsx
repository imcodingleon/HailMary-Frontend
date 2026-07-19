// [ui] ChatListHeader — 채팅 리스트 상단 헤더(카톡식) + 필터 칩 (스펙 §7.3). Dumb: 핸들러는 props만.
// 액션 아이콘은 스텁(토스트). 필터(전체/안읽음)는 부모 selector 파생을 토글만 한다.
import type { ChatRoomFilter } from '@/features/chat/application/atoms/chatAtom';
import HeaderDivider from './HeaderDivider';
import HeaderTitle from './HeaderTitle';

export interface ChatListHeaderProps {
  filter: ChatRoomFilter;
  totalUnread: number;
  onSelectFilter: (filter: ChatRoomFilter) => void;
  onSearch: () => void;
  onNewChat: () => void;
}

function SearchGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="M16.5 16.5L21 21" />
    </svg>
  );
}
function NewChatGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M4 5h16v11H9l-4 3.5V16H4z" />
      <path d="M12 8v5M9.5 10.5h5" />
    </svg>
  );
}

function Chip({
  active,
  count,
  label,
  onClick,
}: {
  active: boolean;
  count?: number;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-1 font-body text-xs transition-colors ${
        active ? 'bg-dohwahong text-hwaseonji' : 'bg-simyagal text-hwaseonji'
      }`}
    >
      {label}
      {count !== undefined && count > 0 && (
        <span
          className={`inline-flex h-4 min-w-4 items-center justify-center rounded-pill px-1 text-[9px] font-semibold text-hwaseonji ${
            active ? 'bg-meokheuk' : 'bg-dohwahong'
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

export default function ChatListHeader({
  filter,
  totalUnread,
  onSelectFilter,
  onSearch,
  onNewChat,
}: ChatListHeaderProps) {
  return (
    <header className="app-surface app-header sticky top-0 z-10 flex flex-col gap-3 px-5 pb-3 pt-5">
      {/* 헤더 바 */}
      <div className="flex items-center justify-between">
        <HeaderTitle title="채팅" />
        <div className="flex items-center gap-1">
          <button type="button" onClick={onSearch} aria-label="검색" className="flex h-9 w-9 items-center justify-center rounded-pill text-hwaseonji">
            <SearchGlyph className="h-5 w-5" />
          </button>
          <button type="button" onClick={onNewChat} aria-label="새 대화" className="flex h-9 w-9 items-center justify-center rounded-pill text-hwaseonji">
            <NewChatGlyph className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* 필터 칩 */}
      <div className="flex items-center gap-2">
        <Chip active={filter === 'all'} label="전체" onClick={() => onSelectFilter('all')} />
        <Chip active={filter === 'unread'} label="안 읽음" count={totalUnread} onClick={() => onSelectFilter('unread')} />
      </div>

      <HeaderDivider />
    </header>
  );
}
