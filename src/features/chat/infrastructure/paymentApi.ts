// HANDOFF(H4): mock 충전 → 토스페이먼츠 + 확정 단가. 시그니처/인터페이스 유지 (구현만 교체).
// [infrastructure] 어댑터 = 시그니처(유지). chargePackages = 더미(교체 대상).
// ❗원화 금액·PG 호출 없음. 토큰(추상 단위)만. 패키지 tokenAmount는 표시용 더미 [TBD].
import type { ChargePackage } from '@/features/chat/domain/model/wallet';

// 더미(교체 대상): 충전 패키지 시드 (추상 단위, 가격 필드 없음). 수량·개수는 [TBD] — 단가 확정 후.
export const chargePackages: ChargePackage[] = [
  { id: 'pkg-s', tokenAmount: 10, label: '소량' },
  { id: 'pkg-m', tokenAmount: 30, label: '보통' },
  { id: 'pkg-l', tokenAmount: 100, label: '넉넉' },
];

const CHARGE_LATENCY_MS = 500; // 목업 결제 지연 [TBD]

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface ChargeResult {
  packageId: string;
  tokenAmount: number; // 지급된 추상 단위
}

export const paymentApi = {
  /** 목업 충전 — 패키지 tokenAmount를 지급(잔량 갱신은 command에서). 실연동 시 토스 결제로 교체. */
  async charge(packageId: string): Promise<ChargeResult> {
    await delay(CHARGE_LATENCY_MS);
    const pkg = chargePackages.find((p) => p.id === packageId);
    if (!pkg) throw new Error(`unknown package: ${packageId}`);
    return { packageId, tokenAmount: pkg.tokenAmount };
  },
};
