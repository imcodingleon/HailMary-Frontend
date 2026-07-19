// [ui] ChargePackageCard — 충전 패키지 카드 (스펙 §7.6). Dumb: 탭 시 onCharge만.
// ❗원화·단가 표시 없음. tokenAmount(추상 단위) + label만.
import type { ChargePackage } from '@/features/chat/domain/model/wallet';
import IconImg from './IconImg';
import { iconAsset } from './iconAsset';

export interface ChargePackageCardProps {
  pkg: ChargePackage;
  onCharge: (packageId: string) => void;
}

export default function ChargePackageCard({ pkg, onCharge }: ChargePackageCardProps) {
  return (
    <div className="card-surface flex items-center justify-between rounded-card p-4">
      <div>
        <div className="font-title text-base font-semibold text-hwaseonji">{pkg.label}</div>
        <div className="mt-0.5 flex items-center gap-1 font-body text-xs text-seonhwanggeum">
          <IconImg src={iconAsset.token} alt="" className="h-3.5 w-3.5 object-contain" fallback={null} />
          +{pkg.tokenAmount} 토큰
        </div>
      </div>
      <button
        type="button"
        onClick={() => onCharge(pkg.id)}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-pill bg-dohwahong px-5 py-2 font-body text-sm font-semibold text-hwaseonji"
      >
        <IconImg src={iconAsset.tokenCharge} alt="" className="h-4 w-4 object-contain" fallback={null} />
        충전
      </button>
    </div>
  );
}
