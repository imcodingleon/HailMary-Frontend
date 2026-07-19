// 코인 API — 모든 HTTP는 shared/utils/api 경유. 계정 JWT 필요(auth: "account").
import { api } from "@/shared/utils/api";
import type { CoinBalance } from "./domain/types";

/** 로그인 계정의 현재 코인 잔액. */
export async function getCoinBalance(): Promise<number> {
  const res = await api.get<CoinBalance>("/api/coins/balance", {
    auth: "account",
  });
  return res.balance;
}
