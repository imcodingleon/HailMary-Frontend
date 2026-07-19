'use client';

// [ui] InfoPanel — 채팅 상단 상태창(크랙 INFO 차용). 표시 전용 Dumb.
// 장소/시간/관계/상황 = LLM tail(useSceneInfo), 감정 = 기존 affinity mock(useAffinity).
import { useEffect, useState } from 'react';
import { useAffinity } from '@/features/chat/application/hooks/useAffinity';
import { useSceneInfo } from '@/features/chat/application/hooks/useSceneInfo';
import { formatTime } from './formatTime';

export interface InfoPanelProps {
  characterId: string;
}

export default function InfoPanel({ characterId }: InfoPanelProps) {
  const scene = useSceneInfo(characterId);
  const { profile } = useAffinity(characterId);
  const score = profile?.state.score ?? 0;
  const level = profile?.state.level ?? 1;

  // 시간은 클라 마운트 후에만(하이드레이션 불일치 방지), 1분마다 갱신.
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 의도적 패턴(위 주석): 마운트 후 1회만 시각 초기화해 SSR 하이드레이션 불일치를 피함.
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(t);
  }, []);

  if (!scene) return null;

  return (
    <div className="app-surface shrink-0 border-b border-seonhwanggeum/40 px-4 py-2">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-[11px] text-hwaseonji/70">
        <span>📍 {scene.place}</span>
        <span>⏰ {now ? formatTime(now) : '—'}</span>
        <span>🤝 {scene.relation}</span>
        <span className="flex items-center gap-1">
          💗 <span className="font-semibold text-dohwahong">{score}</span>
          <span className="text-hwaseonji/40">/100 · Lv.{level}</span>
        </span>
      </div>
      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-pill bg-simyagal">
        <div className="h-full rounded-pill bg-dohwahong" style={{ width: `${score}%` }} />
      </div>
      <p className="mt-1.5 font-body text-[11px] italic text-hwaseonji/55">📄 {scene.situation}</p>
    </div>
  );
}
