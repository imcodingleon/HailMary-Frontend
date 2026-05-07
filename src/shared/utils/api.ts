const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

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
    fetch(`${BASE_URL}${path}`).then((r) => r.json() as Promise<T>),

  post: <T>(path: string, body: unknown): Promise<T> =>
    fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((r) => r.json() as Promise<T>),

  getStrict: <T>(path: string): Promise<T> =>
    fetch(`${BASE_URL}${path}`).then((r) => parseOrThrow<T>(r)),
};
