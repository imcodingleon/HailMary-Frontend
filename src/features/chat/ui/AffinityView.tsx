// [ui] AffinityView — 호감도 화면 콘텐츠 (스펙 §7.7). 표시 전용 Dumb.
// 게이지 + 다음 보상 미리보기 + 비화폐 보상 트랙(해금/미해금) + 안내. ❗구매 버튼·페이월 없음(DL-C03).
import type { RewardTier } from '@/features/chat/domain/model/affinity';
import AffinityGauge from './AffinityGauge';

export interface AffinityViewProps {
  name: string;
  level: number;
  score: number;
  nextReward: string;
  rewardTrack: RewardTier[];
}

function LockGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </svg>
  );
}
function StarGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden className={className}>
      <path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 17l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" />
    </svg>
  );
}

// 보상 컷 placeholder (§4.1) — 임의 SVG 캐릭터/이미지 아님, 토큰 색 타일 + 잠금/별 글리프.
function RewardCut({ unlocked }: { unlocked: boolean }) {
  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-card border bg-meokheuk ${
        unlocked ? 'border-seonhwanggeum text-seonhwanggeum' : 'border-simyagal text-hwaseonji'
      }`}
    >
      {unlocked ? <StarGlyph className="h-4 w-4" /> : <LockGlyph className="h-4 w-4" />}
    </div>
  );
}

function RewardTierRow({ tier }: { tier: RewardTier }) {
  return (
    <li
      className={`flex items-center gap-3 rounded-card border p-2.5 ${
        tier.unlocked ? 'border-seonhwanggeum bg-simyagal' : 'border-simyagal bg-meokheuk'
      }`}
    >
      <RewardCut unlocked={tier.unlocked} />
      <div className="min-w-0 flex-1">
        <div className="font-body text-sm text-hwaseonji">
          Lv.{tier.tier} · {tier.label}
        </div>
        <div className={`font-body text-[10px] ${tier.unlocked ? 'text-seonhwanggeum' : 'text-hwaseonji'}`}>
          {tier.unlocked ? '해금됨' : '잠김'}
        </div>
      </div>
    </li>
  );
}

export default function AffinityView({ name, level, score, nextReward, rewardTrack }: AffinityViewProps) {
  return (
    <div className="flex flex-col gap-5 px-5 py-5">
      {/* 게이지 */}
      <div>
        <h2 className="mb-2 font-title text-base font-semibold text-hwaseonji">{name}</h2>
        <AffinityGauge level={level} score={score} nextReward={nextReward} tone="dark" />
      </div>

      {/* 다음 보상 미리보기 */}
      <div>
        <h3 className="mb-2 font-title text-sm font-semibold text-seonhwanggeum">다음 보상</h3>
        <div className="flex items-center gap-3 rounded-card bg-simyagal p-3">
          <RewardCut unlocked={false} />
          <div className="min-w-0">
            <div className="font-body text-sm text-hwaseonji">{nextReward}</div>
            <div className="font-body text-[11px] text-hwaseonji">레벨업 시 해금되는 비화폐 보상</div>
          </div>
        </div>
      </div>

      {/* 보상 트랙 */}
      <div>
        <h3 className="mb-2 font-title text-sm font-semibold text-seonhwanggeum">보상 트랙</h3>
        <ul className="flex flex-col gap-2">
          {rewardTrack.map((tier) => (
            <RewardTierRow key={tier.tier} tier={tier} />
          ))}
        </ul>
      </div>

      {/* 안내 — 돈으로 사는 게 아님 (DL-C03) */}
      <p className="font-body text-[11px] text-hwaseonji">
        호감도는 대화·출석으로 쌓여요. 돈으로 살 수 없어요.
      </p>
    </div>
  );
}
