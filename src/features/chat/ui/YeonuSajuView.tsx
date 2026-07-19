// [ui] YeonuSajuView — 강연우 3단 연출 (스펙 §7.5/§8). 표시 전용 Dumb.
// ① 장면 묘사 → ② 사주 근거 박스(선황금 액센트·촛불 톤, 한자 음독 병기) → ③ 실전 조언.
// ❗퍼센트·레이더 금지(도윤 언어). 운명론·한자·오행만.
import type { YeonuSajuBlock } from '@/features/chat/domain/model/message';

export interface YeonuSajuViewProps {
  block: YeonuSajuBlock;
}

export default function YeonuSajuView({ block }: YeonuSajuViewProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* ① 장면 묘사 */}
      <p className="font-body text-sm italic leading-relaxed text-hwaseonji">{block.scene}</p>

      {/* ② 사주 근거 박스 — 선황금 테두리(촛불 톤) */}
      <div className="rounded-card border border-seonhwanggeum bg-meokheuk p-3">
        <div className="mb-2 font-title text-xs text-seonhwanggeum">🕯 사주 근거</div>
        <ul className="flex flex-col gap-2">
          {block.evidence.map((e, i) => (
            <li key={i} className="font-body text-xs leading-relaxed text-hwaseonji">
              <span className="font-title text-seonhwanggeum">{e.hanja}</span>
              <span className="ml-1 text-seonhwanggeum">· {e.element}</span>
              <span className="mt-0.5 block text-hwaseonji">{e.note}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ③ 실전 조언 */}
      <div>
        <span className="font-title text-xs text-dohwahong">실전 조언</span>
        <p className="mt-1 font-body text-sm leading-relaxed text-hwaseonji">{block.advice}</p>
      </div>
    </div>
  );
}
