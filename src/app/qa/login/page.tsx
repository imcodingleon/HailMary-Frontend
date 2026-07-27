"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api, qaToken, ApiError } from "@/shared/utils/api";

interface QaLoginResponse {
  access_token: string;
}

export default function QaLoginPage() {
  // useSearchParams는 Suspense boundary가 필요 (Next.js static export 빌드 시 prerender 에러 방지).
  return (
    <Suspense fallback={null}>
      <QaLoginBody />
    </Suspense>
  );
}

function QaLoginBody() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.post<QaLoginResponse>("/api/qa/login", {
        username,
        password,
      });
      if (!res?.access_token) {
        setError("로그인 응답 형식 오류");
        return;
      }
      qaToken.set(res.access_token);
      // QA 진입 디폴트는 홈("/") — 2.0 app 레인은 홈(도화선 탭)에서 하단 4탭으로
      // 연애운·깨비·채팅·충전 전 동선이 갈라진다. (1.0 시절 /select 직행은 폐기.)
      // ?next= 쿼리로 명시 지정 시 그쪽 우선 (예: /qa/test 빠른 테스트).
      const next = searchParams.get("next") || "/";
      router.replace(next);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.status === 401 ? "아이디 또는 비밀번호가 틀렸어." : `오류: ${err.message}`);
      } else {
        setError("네트워크 오류");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#151513] px-6">
      <div
        className="w-full max-w-sm rounded-[12px] px-6 py-8"
        style={{
          background: "#1a1715",
          border: "0.5px solid rgba(200,168,112,0.30)",
          boxShadow: "0 0 24px rgba(0,0,0,0.4) inset",
        }}
      >
        <h1
          className="mb-2 text-center text-[20px]"
          style={{
            fontFamily: "var(--font-nanum-myeongjo)",
            color: "#E8C9A0",
            letterSpacing: "0.1em",
          }}
        >
          도화선 QA
        </h1>
        <p className="mb-6 text-center text-[12px] text-[#888]">
          테스트 환경 접근용 로그인
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label
              htmlFor="qa-username"
              className="mb-1 block text-[12px] text-[#b0aea4]"
            >
              아이디
            </label>
            <input
              id="qa-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              className="w-full rounded-[6px] px-3 py-2 text-[14px]"
              style={{
                background: "#0f0d0c",
                border: "0.5px solid rgba(216,214,208,0.20)",
                color: "#d8d6d0",
              }}
            />
          </div>
          <div>
            <label
              htmlFor="qa-password"
              className="mb-1 block text-[12px] text-[#b0aea4]"
            >
              비밀번호
            </label>
            <input
              id="qa-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="w-full rounded-[6px] px-3 py-2 text-[14px]"
              style={{
                background: "#0f0d0c",
                border: "0.5px solid rgba(216,214,208,0.20)",
                color: "#d8d6d0",
              }}
            />
          </div>

          {error && (
            <p className="text-[12px]" style={{ color: "#D4537E" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !username || !password}
            className="w-full rounded-[6px] py-2.5 text-[14px] font-semibold disabled:opacity-50"
            style={{
              background: "#E8C9A0",
              color: "#0a0a09",
            }}
          >
            {loading ? "확인 중..." : "로그인"}
          </button>
        </form>

        <p className="mt-6 text-center text-[11px] text-[#666]">
          QA 채팅방에서 공유된 ID·비밀번호를 입력하세요.
        </p>
      </div>
    </main>
  );
}
