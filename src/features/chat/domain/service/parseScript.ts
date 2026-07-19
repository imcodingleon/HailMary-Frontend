// [domain/service] 스크립트 파서 — 캐릭터 응답 원문을 지문/대사 블록으로 분리 + INFO tail 추출. 순수.
// BE prompt_builder(INFO_SENTINEL·strip_info_tail)와 동일 계약. 스트리밍 누적 문자열을 매 렌더 파싱.
import type { ScriptBlock } from '@/features/chat/domain/model/scriptBlock';
import type { SceneInfo } from '@/features/chat/domain/model/sceneInfo';

export const INFO_SENTINEL = '<<<INFO>>>';

/** INFO tail(및 스트리밍 중 후행 부분 마커) 제거 — 표시용 본문만 남김. BE strip_info_tail과 동일. */
export function stripInfoTail(raw: string): string {
  const full = raw.indexOf(INFO_SENTINEL);
  if (full !== -1) return raw.slice(0, full).trimEnd();
  // 스트리밍 중 마커가 부분만 도착한 경우(예: 끝이 "<<<IN") 잘라 깜빡임 방지
  for (let n = INFO_SENTINEL.length - 1; n > 0; n--) {
    if (raw.endsWith(INFO_SENTINEL.slice(0, n))) return raw.slice(0, raw.length - n).trimEnd();
  }
  return raw;
}

/** 본문을 빈 줄 기준 블록으로 분리. 따옴표로 시작하면 대사, 아니면 지문. */
export function parseScript(raw: string): ScriptBlock[] {
  return stripInfoTail(raw)
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map((text) => ({
      kind: text.startsWith('"') || text.startsWith('“') ? 'dialogue' : 'narration',
      text,
    }));
}

/** INFO tail JSON을 방어적으로 파싱. 실패/부재 시 null 반환. */
function parseTailJson(raw: string): Record<string, unknown> | null {
  const at = raw.indexOf(INFO_SENTINEL);
  if (at === -1) return null;
  const tail = raw.slice(at + INFO_SENTINEL.length).trim();
  if (!tail) return null;
  try {
    const o = JSON.parse(tail) as Record<string, unknown>;
    return o && typeof o === 'object' ? o : null;
  } catch {
    return null;
  }
}

/** INFO(월드 상태) 추출 (BE는 time_hint 스네이크). 실패 시 null(직전 유지). */
export function extractInfo(raw: string): SceneInfo | null {
  const o = parseTailJson(raw);
  if (!o) return null;
  return {
    place: String(o.place ?? ''),
    timeHint: String(o.time_hint ?? o.timeHint ?? ''),
    relation: String(o.relation ?? ''),
    situation: String(o.situation ?? ''),
  };
}

/** 추천 답변(유저 1인칭 대사) 최대 3개 추출. 없으면 빈 배열. */
export function extractSuggestions(raw: string): string[] {
  const o = parseTailJson(raw);
  const list = o?.suggestions;
  if (!Array.isArray(list)) return [];
  return list.filter((s): s is string => typeof s === 'string' && s.trim() !== '').slice(0, 3);
}
