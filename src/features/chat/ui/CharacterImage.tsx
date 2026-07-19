'use client';

// [ui] CharacterImage — 캐릭터 이미지 + onError fallback 강등. 표시 전용 Dumb(에러 강등용 로컬 state만).
// 경로는 characterAsset util에서만 생성. 체인 모두 실패 시 fallback(placeholder) 렌더.
import { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { assetChain, type AssetKind } from './characterAsset';

export interface CharacterImageProps {
  id: string;
  kind: AssetKind;
  alt: string;
  className?: string;
  style?: CSSProperties; // 예: 잠금 실루엣 밝기 보정 filter
  fallback: ReactNode; // 체인 전부 실패 시 렌더할 placeholder(점선/색면/실루엣)
}

export default function CharacterImage({ id, kind, alt, className, style, fallback }: CharacterImageProps) {
  const chain = assetChain(id, kind);
  const [idx, setIdx] = useState(0);

  if (idx >= chain.length) return <>{fallback}</>;

  return (
    // eslint-disable-next-line @next/next/no-img-element -- onError 강등 fallback이 필요해 next/image 대신 img 사용
    <img
      src={chain[idx]}
      alt={alt}
      className={className}
      style={style}
      onError={() => setIdx((i) => i + 1)}
    />
  );
}
