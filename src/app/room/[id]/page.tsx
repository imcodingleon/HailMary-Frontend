// 채팅방 (스펙 §7.5) — static export 게이트: generateStaticParams는 server 컴포넌트에서만
// export 가능해 'use client' 실제 화면(ChatRoomClient)과 분리.
// P3 이식: SOURCE 1:1 복제 — "7. 도화선 채팅 서비스 Test" app/room/[id]/page.tsx.
import { ChatRoomClient } from './ChatRoomClient';

export function generateStaticParams() {
  return ['yeonu', 'doyoon', 'kkebi', 'seonjae', 'seojin', 'yunjae', 'ihyeon', 'junhyeok'].map((id) => ({ id }));
}

type Props = { params: Promise<{ id: string }> };

export default async function ChatRoomPage({ params }: Props) {
  const { id } = await params;
  return <ChatRoomClient id={id} />;
}
