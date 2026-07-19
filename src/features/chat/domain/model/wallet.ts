// [domain/model] TokenWallet + ChargePackage — 순수 타입, 외부 의존 0. (부록 B-1, 스펙 §10)
// 토큰 = 추상 단위. ❗원화·단가·환산 필드 없음 (단가 미정 [TBD], H4 핸드오프).

export type WalletTxnType = 'charge' | 'spend';

export interface WalletTransaction {
  id: string;
  type: WalletTxnType;
  amount: number; // 추상 단위 (양수 표기, 증감은 type으로 구분)
  mode?: 'casual' | 'saju'; // spend일 때만 — 사적/사주 구분
  at: number; // epoch ms
}

export interface TokenWallet {
  balance: number; // 추상 단위 잔량
  history: WalletTransaction[];
}

export interface ChargePackage {
  id: string;
  tokenAmount: number; // 추상 단위 충전량
  label: string;
  // ❗가격(원화) 필드 없음 — 단가 미정이라 비워둠 (H4에서 확정)
}
