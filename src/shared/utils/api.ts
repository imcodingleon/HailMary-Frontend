// throw 기반 인터페이스(ApiError + Promise<T>)를 유지하는 얇은 어댑터.
// 실제 fetch + timeout + Authorization 헤더는 모두 @/lib/api로 위임.
// 메모리 feedback_frontend_dual_api_wrapper: 공통 헤더 추가 시 lib/api 한 곳만 수정.
import { api as libApi, qaToken as libQaToken, type ApiErrorCode } from "@/lib/api";

// qaToken은 lib/api의 단일 진실원을 re-export (만료 가드 포함).
export const qaToken = libQaToken;

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const ERROR_CODE_TO_MESSAGE: Record<ApiErrorCode, string> = {
  BAD_REQUEST: "잘못된 요청",
  UNAUTHORIZED: "인증 실패",
  CALCULATION_FAILED: "서버 오류",
  TIMEOUT: "응답 시간 초과",
  NETWORK: "네트워크 오류",
  UNKNOWN: "알 수 없는 오류",
};

function toApiError(code: ApiErrorCode, status: number | undefined, detail: unknown): ApiError {
  const baseMessage = ERROR_CODE_TO_MESSAGE[code];
  const detailMessage =
    detail && typeof detail === "object" && "detail" in detail && typeof (detail as { detail: unknown }).detail === "string"
      ? (detail as { detail: string }).detail
      : typeof detail === "string"
        ? detail
        : null;
  return new ApiError(status ?? 0, detailMessage ?? baseMessage);
}

export const api = {
  get: async <T>(path: string): Promise<T> => {
    const result = await libApi.get<T>(path);
    if (result.ok) return result.data;
    throw toApiError(result.error, result.status, result.detail);
  },

  post: async <T>(path: string, body: unknown): Promise<T> => {
    const result = await libApi.post<T>(path, body);
    if (result.ok) return result.data;
    throw toApiError(result.error, result.status, result.detail);
  },

  // 동일 동작 (호환성 유지). 신규 코드는 api.get 사용 권장.
  getStrict: async <T>(path: string): Promise<T> => {
    const result = await libApi.get<T>(path);
    if (result.ok) return result.data;
    throw toApiError(result.error, result.status, result.detail);
  },
};
