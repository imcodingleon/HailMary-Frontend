// [ui] KkebiSajuView — 깨비 가벼운 요약 카드 (스펙 §7.5/§8). 표시 전용 Dumb.
// 본격 근거 연출 아님(영물 톤 유지).
import type { KkebiSajuBlock } from '@/features/chat/domain/model/message';

export interface KkebiSajuViewProps {
  block: KkebiSajuBlock;
}

export default function KkebiSajuView({ block }: KkebiSajuViewProps) {
  return (
    <div className="rounded-card bg-meokheuk p-3">
      <div className="mb-1 font-title text-xs text-seonhwanggeum">오늘의 운세 요약</div>
      <p className="font-body text-sm leading-relaxed text-hwaseonji">{block.summary}</p>
    </div>
  );
}
