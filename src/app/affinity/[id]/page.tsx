// 호감도 화면 (스펙 §7.7) — static export 게이트: generateStaticParams는 server 컴포넌트에서만
// export 가능해 'use client' 실제 화면(AffinityClient)과 분리.
// P3 이식: SOURCE 1:1 복제 — "7. 도화선 채팅 서비스 Test" app/affinity/[id]/page.tsx.
import { AffinityClient } from './AffinityClient';

export function generateStaticParams() {
  return ['yeonu', 'doyoon', 'kkebi', 'seonjae', 'seojin', 'yunjae', 'ihyeon', 'junhyeok'].map((id) => ({ id }));
}

type Props = { params: Promise<{ id: string }> };

export default async function AffinityPage({ params }: Props) {
  const { id } = await params;
  return <AffinityClient id={id} />;
}
