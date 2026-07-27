'use client';

// [application/hooks] useSajuProfileGate — 방 진입 시 사주 프로필(생년월일시) 보유 확인 게이트.
// (CHAT_SSOT.md §7.1 "진입 시 확인 모달" 결정, P4-2b) 의존성 방향: Application → Domain/Infrastructure. UI를 import하지 않는다.
//
// enabled=false(목업 모드 또는 미로그인)면 조회 자체를 하지 않는다 — 네트워크 호출 0, 목업 데모 무변화.
// enabled=true에서 조회 결과 has_profile=false면 모달을 띄우고(open), 확정 전까지 전송을 막는다(sendBlocked).
// 취소(dismiss)해도 방은 둘러볼 수 있게 두되, 확정하기 전까지는 전송을 계속 막는다(chosen UX).
import { useCallback, useEffect, useRef, useState } from 'react';
import { chatApi, ChatHttpError } from '@/features/chat/infrastructure/chatApi';
import type { SajuProfileFormInput } from '@/features/chat/domain/model/sajuProfileInput';

export interface UseSajuProfileGateResult {
  /** 모달 노출 여부. */
  open: boolean;
  /** 제출(저장) 진행 중. */
  submitting: boolean;
  /** 마지막 저장 실패 사유(사용자 노출용). */
  error: string | null;
  /** true면 전송 버튼 비활성 — 최초 조회 중이거나, 모달이 열려있거나, 확정 없이 닫은 상태. */
  sendBlocked: boolean;
  confirm: (input: SajuProfileFormInput) => Promise<void>;
  /** '나중에' 닫기 — 방은 볼 수 있지만 sendBlocked는 유지. */
  dismiss: () => void;
}

export function useSajuProfileGate(enabled: boolean): UseSajuProfileGateResult {
  const [open, setOpen] = useState(false);
  const [checking, setChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const checkedRef = useRef(false);

  useEffect(() => {
    if (!enabled || checkedRef.current) return;
    checkedRef.current = true;
    setChecking(true);
    chatApi
      .fetchProfile()
      .then((profile) => {
        if (!profile.hasProfile) setOpen(true);
      })
      .catch(() => {
        // 조회 실패(네트워크 등)는 모달을 강제하지 않는다 — 전송 시점 UNAUTHORIZED/ERROR 상태가 이미 처리(P4-2a).
      })
      .finally(() => setChecking(false));
  }, [enabled]);

  const confirm = useCallback(async (input: SajuProfileFormInput) => {
    setSubmitting(true);
    setError(null);
    try {
      await chatApi.saveProfile(input);
      setOpen(false);
      setDismissed(false);
    } catch (e) {
      setError(
        e instanceof ChatHttpError && e.status === 401
          ? '로그인이 만료됐어요. 다시 로그인해 주세요.'
          : '저장에 실패했어요. 잠시 후 다시 시도해 주세요.',
      );
    } finally {
      setSubmitting(false);
    }
  }, []);

  const dismiss = useCallback(() => {
    setOpen(false);
    setDismissed(true);
  }, []);

  return {
    open,
    submitting,
    error,
    sendBlocked: enabled && (checking || open || dismissed),
    confirm,
    dismiss,
  };
}
