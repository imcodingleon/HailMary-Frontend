'use client';

// 호감도 화면 (스펙 §7.7). 상세 게이지(위치①)·채팅방 헤더(위치②) 양쪽에서 같은 화면으로 진입.
// 데이터는 useAffinity, 라우팅만 page. AffinityView는 Dumb. ❗표시·연출만(H6), 구매 동선 없음.
// P3 이식: SOURCE 1:1 복제 본문 — id는 useParams 대신 상위 page.tsx(generateStaticParams)로부터 prop 전달.
import { useRouter } from 'next/navigation';
import { useAffinity } from '@/features/chat/application/hooks/useAffinity';
import AffinityView from '@/features/chat/ui/AffinityView';

export function AffinityClient({ id }: { id: string }) {
  const router = useRouter();
  const { name, profile } = useAffinity(id);

  return (
    <section className="flex h-[100dvh] flex-col bg-meokheuk">
      <header className="flex shrink-0 items-center gap-2 border-b border-simyagal px-3 py-3">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="뒤로가기"
          className="flex h-9 w-9 items-center justify-center rounded-pill bg-simyagal text-hwaseonji"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-5 w-5">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <h1 className="font-title text-base font-semibold text-hwaseonji">호감도</h1>
      </header>

      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto">
        {profile ? (
          <AffinityView
            name={name}
            level={profile.state.level}
            score={profile.state.score}
            nextReward={profile.state.nextReward}
            rewardTrack={profile.rewardTrack}
          />
        ) : (
          <div className="flex flex-1 items-center justify-center px-8 py-10 text-center">
            <p className="font-body text-sm text-hwaseonji">호감도 정보를 찾을 수 없습니다.</p>
          </div>
        )}
      </div>
    </section>
  );
}
