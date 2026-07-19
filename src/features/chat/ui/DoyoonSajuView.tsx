// [ui] DoyoonSajuView — 한도윤 분석 연출 (스펙 §7.5/§8). 표시 전용 Dumb.
// 분석 코멘트 + 레이더 차트 + 퍼센트 바 (데이터 컨설턴트 톤).
// ❗한자 근거박스·운명론 금지(연우 언어). 수치는 목업 표시값(H2).
import type { DoyoonSajuBlock } from '@/features/chat/domain/model/message';
import RadarChart from './RadarChart';

export interface DoyoonSajuViewProps {
  block: DoyoonSajuBlock;
}

export default function DoyoonSajuView({ block }: DoyoonSajuViewProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-body text-sm leading-relaxed text-hwaseonji">{block.comment}</p>

      {/* 레이더 차트 */}
      <div className="rounded-card bg-meokheuk p-3">
        <div className="mb-1 font-title text-xs text-seonhwanggeum">운세 레이더</div>
        <RadarChart data={block.radar} />
      </div>

      {/* 퍼센트 바 */}
      <div className="flex flex-col gap-2">
        {block.percents.map((p, i) => (
          <div key={i}>
            <div className="flex justify-between font-body text-xs text-hwaseonji">
              <span>{p.label}</span>
              <span className="font-semibold text-dohwahong">{p.value}%</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-pill bg-simyagal">
              <div className="h-full rounded-pill bg-dohwahong" style={{ width: `${p.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
