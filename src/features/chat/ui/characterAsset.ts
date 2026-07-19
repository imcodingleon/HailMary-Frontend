// [ui] 캐릭터 에셋 경로 — 한 곳에서만 생성(컴포넌트가 경로 문자열을 직접 조합하지 않게). (스펙 §4.1)
// 경로 규약:
//   카드     /characters/{id}/card.png
//   히어로   /characters/{id}/hero.png      (아직 없음 → fallback)
//   아바타   /characters/{id}/avatar.png    (아직 없음 → fallback)
//   실루엣   /characters/locked/silhouette-{id}.png
export type AssetKind = 'card' | 'hero' | 'avatar' | 'silhouette';

export function characterAsset(id: string, kind: AssetKind): string {
  if (kind === 'silhouette') return `/characters/locked/silhouette-${id}.png`;
  return `/characters/${id}/${kind}.png`;
}

// fallback 체인 — 없으면 자동 강등. 마지막 실패 시 컴포넌트가 placeholder 렌더.
const CHAIN: Record<AssetKind, (id: string) => string[]> = {
  card: (id) => [characterAsset(id, 'card')],
  hero: (id) => [characterAsset(id, 'hero'), characterAsset(id, 'card')], // hero→card→placeholder
  avatar: (id) => [characterAsset(id, 'avatar'), characterAsset(id, 'card')], // avatar→card→placeholder
  silhouette: (id) => [characterAsset(id, 'silhouette')], // →placeholder(어두운 실루엣)
};

export function assetChain(id: string, kind: AssetKind): string[] {
  return CHAIN[kind](id);
}
