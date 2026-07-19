// [ui] SajuMessage — 사주 응답 말풍선. Dumb: sajuBlock.kind로 렌더 분기만(로직 없음).
// 사주 톤(도화홍 테두리) 안에서 캐릭터별 연출. 좌측(캐릭터) 정렬.
import type { SajuBlock } from '@/features/chat/domain/model/message';
import YeonuSajuView from './YeonuSajuView';
import DoyoonSajuView from './DoyoonSajuView';
import KkebiSajuView from './KkebiSajuView';

export interface SajuMessageProps {
  block: SajuBlock;
}

export default function SajuMessage({ block }: SajuMessageProps) {
  return (
    <div className="flex justify-start">
      <div className="w-[90%] rounded-card border border-dohwahong bg-simyagal p-3">
        {block.kind === 'yeonu' && <YeonuSajuView block={block} />}
        {block.kind === 'doyoon' && <DoyoonSajuView block={block} />}
        {block.kind === 'kkebi' && <KkebiSajuView block={block} />}
      </div>
    </div>
  );
}
