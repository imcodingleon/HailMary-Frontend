// [ui] WalletHistory — 사용 내역 리스트 (스펙 §7.6). Dumb: type/mode로 표시 분기만.
// 충전(+) / 소진(-, 사적·사주 구분). 추상 단위만, 원화 없음.
import type { WalletTransaction } from '@/features/chat/domain/model/wallet';

export interface WalletHistoryProps {
  items: WalletTransaction[];
}

function labelOf(t: WalletTransaction): string {
  if (t.type === 'charge') return '충전';
  return `소진 · ${t.mode === 'saju' ? '사주' : '사적'}`;
}

export default function WalletHistory({ items }: WalletHistoryProps) {
  if (items.length === 0) {
    return <p className="font-body text-xs text-hwaseonji">아직 내역이 없어요.</p>;
  }
  return (
    <ul className="flex flex-col divide-y divide-simyagal">
      {items.map((t) => (
        <li key={t.id} className="flex items-center justify-between py-2 font-body text-sm">
          <span className="text-hwaseonji">{labelOf(t)}</span>
          <span className={t.type === 'charge' ? 'font-semibold text-dohwahong' : 'text-hwaseonji'}>
            {t.type === 'charge' ? '+' : '-'}
            {t.amount}
          </span>
        </li>
      ))}
    </ul>
  );
}
