"use client";

import { useCallback, useRef, useState } from "react";
import { useAuth } from "./useAuth";

// 로그인 유도 게이트 — 두 모드.
//
// advisory(기본, 기존 동작 그대로 — kkebi/mypage/archive 등 코어 플로 불변 계약 유지):
//   run(proceed):
//     - 이미 로그인했으면 → 즉시 proceed() (코어 플로 불변)
//     - 비로그인 → 팝업을 띄우고 원래 동작(proceed)을 보류
//   onClose (X / Esc):
//     - 보류된 proceed() 실행 → 사용자는 원래 흐름 그대로 진행 (닫아도 안 막힘)
//
// required(코인 시대 신설 — 결제·채팅 진입처럼 실제로 로그인 없이는 못 넘어가야 하는 지점):
//   run(proceed):
//     - 이미 로그인했으면 → 즉시 proceed()
//     - 비로그인 → 팝업(mode="required")을 띄우고 proceed를 보류
//   onClose (X / Esc):
//     - proceed()를 호출하지 않는다 — 대신 options.onCancel?.() 호출 (예: 이전 화면으로 되돌리기)
//     - 로그인 완료 후에는 startLogin의 returnTo로 페이지 이동 → 사용자가 다시 탭해야 진행(자동 실행 없음)
//
// 로그인 하러가기는 LoginPromptModal 내부 startLogin이 returnTo로 처리 (페이지 이탈).
//
// 같은 진입(마운트)당 1회 노출은 호출부의 ref 가드로 처리한다.

export interface LoginGateModalProps {
  open: boolean;
  onClose: () => void;
  returnTo?: string;
  source: string;
  mode: "required" | "advisory";
}

export interface LoginGateOptions {
  /** true면 닫아도 proceed()를 호출하지 않는 실제 차단 게이트(코인 결제/채팅 진입 등). 기본 false(advisory). */
  required?: boolean;
  /** required 모드에서 닫았을 때 호출 — 예: 이전 화면으로 되돌리기. advisory에선 사용되지 않는다. */
  onCancel?: () => void;
}

export interface LoginGate {
  run: (proceed: () => void) => void;
  modal: LoginGateModalProps;
}

export function useLoginGate(
  source: string,
  returnTo?: string,
  options?: LoginGateOptions,
): LoginGate {
  const { isAuthenticated } = useAuth();
  const required = options?.required ?? false;
  const onCancel = options?.onCancel;
  const [open, setOpen] = useState(false);
  const proceedRef = useRef<(() => void) | null>(null);

  const run = useCallback(
    (proceed: () => void) => {
      if (isAuthenticated) {
        proceed();
        return;
      }
      proceedRef.current = proceed;
      setOpen(true);
    },
    [isAuthenticated],
  );

  const onClose = useCallback(() => {
    setOpen(false);
    if (required) {
      // 필수 게이트 — 닫으면 보류된 동작을 폐기하고 취소 콜백만 실행. proceed는 절대 호출하지 않는다
      // (로그인 없이 결제/채팅 진입을 허용하면 코인 시대 게이트의 취지가 무력화됨).
      proceedRef.current = null;
      onCancel?.();
      return;
    }
    const p = proceedRef.current;
    proceedRef.current = null;
    p?.();
  }, [required, onCancel]);

  return {
    run,
    modal: { open, onClose, returnTo, source, mode: required ? "required" : "advisory" },
  };
}
