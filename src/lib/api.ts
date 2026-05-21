import { env } from "./env";
import { tokenStore } from "./tokenStore";

export type ApiErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "CALCULATION_FAILED"
  | "TIMEOUT"
  | "NETWORK"
  | "UNKNOWN";

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiErrorCode; detail?: unknown; status?: number };

// 외부 의존(FortuneTeller Lambda cold start, Claude API 등) 고려.
// 90s: claude_client.max_retries=5의 expo backoff 누적(최악 ~60s) 흡수.
// 30s였을 때 SDK retry 도중 fetch가 abort되어 retry 강화 의미가 없었음.
const TIMEOUT_MS = 90000;

// ── QA 토큰 스토어 (단일 진실원) ───────────────────────────────────
// QaAuthGuard / buildHeaders 양쪽에서 사용. shared/utils/api.ts가 re-export.
// 만료 가드: set 시 expiresAt(+3일) 같이 저장, get 시 만료된 토큰 자동 클리어.
// Legacy 토큰(expires 키 없음)은 호환 위해 통과 — 다음 로그인부터 만료 가드 활성.

const QA_TOKEN_KEY = "qa_access_token";
const QA_TOKEN_EXPIRES_KEY = "qa_access_token_expires_at";
const QA_TOKEN_TTL_MS = 3 * 24 * 60 * 60 * 1000; // 3일

export const qaToken = {
  get: (): string | null => {
    if (typeof window === "undefined") return null;
    const token = window.localStorage.getItem(QA_TOKEN_KEY);
    if (!token) return null;
    const expiresAtStr = window.localStorage.getItem(QA_TOKEN_EXPIRES_KEY);
    if (expiresAtStr) {
      const expiresAt = Number(expiresAtStr);
      if (Number.isFinite(expiresAt) && Date.now() > expiresAt) {
        window.localStorage.removeItem(QA_TOKEN_KEY);
        window.localStorage.removeItem(QA_TOKEN_EXPIRES_KEY);
        return null;
      }
    }
    // expiresAt 없는 legacy 토큰 (이전 버전 발급분) → 통과. 재로그인 유도.
    return token;
  },
  set: (token: string): void => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(QA_TOKEN_KEY, token);
    window.localStorage.setItem(
      QA_TOKEN_EXPIRES_KEY,
      String(Date.now() + QA_TOKEN_TTL_MS),
    );
  },
  clear: (): void => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(QA_TOKEN_KEY);
    window.localStorage.removeItem(QA_TOKEN_EXPIRES_KEY);
  },
};

function buildHeaders(extra?: HeadersInit): HeadersInit {
  const headers: Record<string, string> = {};
  if (extra) {
    new Headers(extra).forEach((v, k) => {
      headers[k] = v;
    });
  }
  const token = tokenStore.get();
  if (token && !("Authorization" in headers) && !("authorization" in headers)) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  // QA 게이트 토큰 (APP_ENV=test 환경에서만 의미. 토큰 없으면 헤더 미첨부 → 운영 영향 0)
  const qa = qaToken.get();
  if (qa) headers["X-QA-Token"] = qa;
  return headers;
}

async function request<T>(
  path: string,
  init?: RequestInit,
): Promise<ApiResult<T>> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${env.API_URL}${path}`, {
      ...init,
      headers: buildHeaders(init?.headers),
      signal: ctrl.signal,
    });

    const body = await res.json().catch(() => null);

    if (res.ok) return { ok: true, data: body as T };

    if (res.status === 400) {
      return { ok: false, error: "BAD_REQUEST", detail: body?.detail ?? body, status: 400 };
    }
    if (res.status === 401 || res.status === 403) {
      return { ok: false, error: "UNAUTHORIZED", detail: body, status: res.status };
    }
    if (res.status >= 500) {
      return { ok: false, error: "CALCULATION_FAILED", detail: body, status: res.status };
    }
    return { ok: false, error: "UNKNOWN", detail: body, status: res.status };
  } catch (e) {
    if ((e as Error).name === "AbortError") {
      return { ok: false, error: "TIMEOUT" };
    }
    return { ok: false, error: "NETWORK", detail: (e as Error).message };
  } finally {
    clearTimeout(timer);
  }
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
};
