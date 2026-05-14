const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

// QA 토큰 localStorage 키 (Phase 1.5 — APP_ENV=test 환경에서만 사용)
const QA_TOKEN_KEY = "qa_access_token";

/**
 * QA 토큰을 localStorage에서 읽어 헤더 객체로 반환.
 * 브라우저 환경에서만 동작 (SSR 안전).
 * 토큰 없으면 빈 객체 반환 (운영 환경 영향 X).
 */
function qaAuthHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = window.localStorage.getItem(QA_TOKEN_KEY);
  return token ? { "X-QA-Token": token } : {};
}

export const qaToken = {
  get: (): string | null => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(QA_TOKEN_KEY);
  },
  set: (token: string): void => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(QA_TOKEN_KEY, token);
  },
  clear: (): void => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(QA_TOKEN_KEY);
  },
};

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function parseOrThrow<T>(r: Response): Promise<T> {
  const json = await r.json().catch(() => null);
  if (!r.ok) {
    const detail =
      (json && typeof json === "object" && "detail" in json
        ? typeof (json as { detail: unknown }).detail === "string"
          ? ((json as { detail: string }).detail)
          : null
        : null) ?? `HTTP ${r.status}`;
    throw new ApiError(r.status, detail);
  }
  return json as T;
}

export const api = {
  get: <T>(path: string): Promise<T> =>
    fetch(`${BASE_URL}${path}`, {
      headers: { ...qaAuthHeaders() },
    }).then((r) => r.json() as Promise<T>),

  post: <T>(path: string, body: unknown): Promise<T> =>
    fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...qaAuthHeaders() },
      body: JSON.stringify(body),
    }).then((r) => r.json() as Promise<T>),

  getStrict: <T>(path: string): Promise<T> =>
    fetch(`${BASE_URL}${path}`, {
      headers: { ...qaAuthHeaders() },
    }).then((r) => parseOrThrow<T>(r)),
};
