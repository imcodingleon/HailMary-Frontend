'use client';

// [ui] IconImg — 커스텀 png 아이콘 + onError fallback. 표시 전용 Dumb(에러 강등용 로컬 state만).
// 경로는 iconAsset util에서만 생성. png 로드 실패(파일 없음) 시 fallback(기존 lucide/글리프/텍스트)을 렌더.
import { useState } from 'react';
import type { ReactNode } from 'react';

export interface IconImgProps {
  src: string;
  alt: string;
  className?: string;
  fallback: ReactNode; // 로드 실패 시 렌더할 기존 글리프/텍스트
}

export default function IconImg({ src, alt, className, fallback }: IconImgProps) {
  const [failed, setFailed] = useState(false);

  if (failed) return <>{fallback}</>;

  return (
    // eslint-disable-next-line @next/next/no-img-element -- onError 강등 fallback이 필요해 next/image 대신 img 사용
    <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />
  );
}
