// [domain/model] 스크립트 블록 — 캐릭터 응답을 지문/대사로 분리한 렌더 단위. 순수 타입.
// 크랙식 레이아웃: 지문(3인칭 서술) 블록과 대사(따옴표) 블록을 빈 줄로 분리 렌더.
export type ScriptBlockKind = 'narration' | 'dialogue';

export interface ScriptBlock {
  kind: ScriptBlockKind;
  text: string;
}
