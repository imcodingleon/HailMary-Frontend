// 코인 기능 FE 플래그 — BE `coin_enabled`와 짝. 둘 다 켜질 때(go-live)까지 코인 UI 도어먼트.
// OFF면 잔액 표시·웰컴 팝업·충전 등 코인 화면이 전부 미노출 → 기존 앱 무변화.
export function isCoinEnabled(): boolean {
  return process.env.NEXT_PUBLIC_COIN_ENABLED === "true";
}
