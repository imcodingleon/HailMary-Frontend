"use client";

import { useEffect, useState } from "react";
import { isValidEmail } from "@/shared/utils/validation";

/**
 * PayApp 결제 페이지로 리다이렉트하기 직전 노출되는 이메일 재확인 모달.
 *
 * 결과지 재접속 링크를 받을 이메일이 정확한지 한 번 더 확인.
 * "확인" → onConfirm(현재 표시 이메일) → 부모가 BE /api/payments/request 호출 → payurl 리다이렉트.
 * "수정" → 모달 내부에서 input 노출 → 새 이메일 검증 → "변경 확인" → onConfirm(새 이메일).
 *
 * ESC/배경 클릭으로 모달이 닫히면 결제 단계가 멈춰 사용자가 결과지 링크를 못 받음.
 * 따라서 close 콜백을 노출하지 않고, 닫는 경로는 두 버튼만 허용.
 */
export default function EmailConfirmModal({
  email,
  open,
  onConfirm,
}: {
  email: string;
  open: boolean;
  onConfirm: (email: string) => void;
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [draft, setDraft] = useState<string>(email);
  const [draftError, setDraftError] = useState<string | null>(null);

  // 모달이 새로 열릴 때 상태 리셋
  useEffect(() => {
    if (open) {
      setIsEditing(false);
      setDraft(email);
      setDraftError(null);
    }
  }, [open, email]);

  if (!open) return null;

  const handleSubmitEdit = () => {
    const trimmed = draft.trim();
    if (!isValidEmail(trimmed)) {
      setDraftError("이메일 형식을 다시 확인해줘.");
      return;
    }
    onConfirm(trimmed);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="이메일 재확인"
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.7)" }}
    >
      <div
        className="w-full max-w-sm rounded-[12px] px-6 py-7"
        style={{
          background: "#1a1715",
          border: "0.5px solid rgba(200,168,112,0.30)",
          boxShadow: "0 0 32px rgba(0,0,0,0.5)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          className="mb-3 text-center text-[17px]"
          style={{
            fontFamily: "var(--font-nanum-myeongjo)",
            color: "#E8C9A0",
            letterSpacing: "0.05em",
          }}
        >
          결과지 보낼 이메일 확인
        </h2>

        <p
          className="mb-5 text-center text-[13px] leading-[1.7]"
          style={{ color: "#b0aea4" }}
        >
          {isEditing ? (
            <>
              새 이메일을 입력해줘.
              <br />
              결제 후 이 주소로 결과지 링크를 보낼게.
            </>
          ) : (
            <>
              결제 후 이 주소로 결과지 링크를 보낼게.
              <br />
              맞아?
            </>
          )}
        </p>

        {isEditing ? (
          <div className="mb-6">
            <input
              type="email"
              autoFocus
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                if (draftError) setDraftError(null);
              }}
              placeholder="you@example.com"
              className="w-full rounded-[8px] px-3 py-3 text-[14px]"
              style={{
                background: "rgba(232,201,160,0.07)",
                border: `0.5px solid ${draftError ? "#D4537E" : "rgba(232,201,160,0.30)"}`,
                color: "#E8C9A0",
                outline: "none",
              }}
            />
            {draftError && (
              <p className="mt-2 text-[12px]" style={{ color: "#D4537E" }}>
                {draftError}
              </p>
            )}
          </div>
        ) : (
          <div
            className="mb-6 rounded-[8px] px-3 py-3 text-center"
            style={{
              background: "rgba(232,201,160,0.07)",
              border: "0.5px dashed rgba(232,201,160,0.30)",
            }}
          >
            <span
              className="text-[15px] font-semibold"
              style={{ color: "#E8C9A0", wordBreak: "break-all" }}
            >
              {email}
            </span>
          </div>
        )}

        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setDraft(email);
                  setDraftError(null);
                }}
                className="flex-1 rounded-[6px] py-2.5 text-[13px] font-medium"
                style={{
                  background: "transparent",
                  border: "0.5px solid rgba(216,214,208,0.30)",
                  color: "#d8d6d0",
                }}
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleSubmitEdit}
                className="flex-1 rounded-[6px] py-2.5 text-[13px] font-semibold"
                style={{
                  background: "#E8C9A0",
                  color: "#0a0a09",
                }}
              >
                변경하고 받기
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex-1 rounded-[6px] py-2.5 text-[13px] font-medium"
                style={{
                  background: "transparent",
                  border: "0.5px solid rgba(216,214,208,0.30)",
                  color: "#d8d6d0",
                }}
              >
                수정하기
              </button>
              <button
                type="button"
                onClick={() => onConfirm(email)}
                className="flex-1 rounded-[6px] py-2.5 text-[13px] font-semibold"
                style={{
                  background: "#E8C9A0",
                  color: "#0a0a09",
                }}
              >
                맞아, 결제 진행
              </button>
            </>
          )}
        </div>

        <p
          className="mt-5 text-center text-[11px]"
          style={{ color: "#666", lineHeight: 1.6 }}
        >
          결과지 링크는 30일 동안 다시 볼 수 있어.
        </p>
      </div>
    </div>
  );
}
