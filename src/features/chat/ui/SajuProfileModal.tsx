'use client';

// [ui] SajuProfileModal — 방 최초 진입, 사주 프로필 미보유 시 확인 모달. (CHAT_SSOT.md §7.1, P4-2b)
// Dumb에 가깝지만 폼 입력 상태는 로컬로 들고 있다(LoginPromptModal의 테스트 로그인 폼과 동일 관례).
// 색·간격은 tailwind 토큰만(bg-meokheuk/simyagal, text-seonhwanggeum/hwaseonji, bg-dohwahong) — 하드코딩 금지.
// open 여부는 호출부(ChatRoomClient)가 `{sajuGate.open && <SajuProfileModal .../>}`로 마운트/언마운트 제어한다
// (내부에서 open prop을 받아 useEffect로 prefill을 동기화하면 "effect에서 setState" 린트 위반 — 매번 새로 마운트되는
//  편이 React 관용구에 맞고, lazy useState 초기화로 prefill을 그대로 반영할 수 있다).
import { useEffect, useMemo, useState } from 'react';
import type { SajuProfileFormInput, SajuProfilePrefill } from '@/features/chat/domain/model/sajuProfileInput';

export interface SajuProfileModalProps {
  /** 계정 last_used 프리필 — 없으면(첫 로그인 등) 빈 폼. */
  prefill: SajuProfilePrefill | null;
  submitting: boolean;
  error: string | null;
  onConfirm: (input: SajuProfileFormInput) => void;
  /** '나중에 할게요' — 방은 볼 수 있지만 전송은 계속 막힘(호출부가 sendBlocked로 처리). */
  onClose: () => void;
}

function formatBirthInput(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`;
}

function formatTimeInput(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}:${digits.slice(2)}`;
}

function isValidBirth(birth: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birth)) return false;
  const [y, mo, d] = birth.split('-').map(Number);
  const thisYear = new Date().getFullYear();
  if (y < 1900 || y > thisYear || mo < 1 || mo > 12) return false;
  const date = new Date(y, mo - 1, d);
  return date.getFullYear() === y && date.getMonth() === mo - 1 && date.getDate() === d;
}

function isValidTime(time: string): boolean {
  if (!/^\d{2}:\d{2}$/.test(time)) return false;
  const [h, m] = time.split(':').map(Number);
  return h >= 0 && h <= 23 && m >= 0 && m <= 59;
}

function toGender(value: string | undefined): 'male' | 'female' | null {
  return value === 'male' || value === 'female' ? value : null;
}

function toCalendar(value: string | undefined): 'solar' | 'lunar' {
  return value === 'lunar' ? 'lunar' : 'solar';
}

export default function SajuProfileModal({
  prefill,
  submitting,
  error,
  onConfirm,
  onClose,
}: SajuProfileModalProps) {
  // lazy 초기화 — 마운트 시점(=모달이 열리는 시점, 호출부가 조건부 렌더) prefill 그대로 반영. 이후 prefill이
  // 바뀌어도(참조 불변 기대) 재동기화하지 않는다 — 이 모달이 살아있는 동안 계정 프로필이 바뀔 일은 없다.
  const [birth, setBirth] = useState(() => prefill?.birth ?? '');
  const [calendar, setCalendar] = useState<'solar' | 'lunar'>(() => toCalendar(prefill?.calendar));
  const [time, setTime] = useState(() => prefill?.time ?? '');
  const [timeUnknown, setTimeUnknown] = useState(() => !prefill?.time);
  const [gender, setGender] = useState<'male' | 'female' | null>(() => toGender(prefill?.gender));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const isValid = useMemo(
    () => isValidBirth(birth) && (timeUnknown || isValidTime(time)) && gender !== null,
    [birth, timeUnknown, time, gender],
  );

  const handleConfirm = () => {
    if (!isValid || !gender || submitting) return;
    onConfirm({
      birthDate: birth,
      birthTime: timeUnknown ? null : time,
      birthTimeUnknown: timeUnknown,
      calendar,
      gender,
    });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="card-surface rounded-card relative w-full max-w-xs px-5 py-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <h2 className="font-title text-lg font-semibold text-seonhwanggeum">사주 정보 확인</h2>
          <p className="mt-2 whitespace-pre-line font-body text-[13px] leading-relaxed text-hwaseonji/80">
            {'사주 모드로 풀이하려면 생년월일시가 필요해요.\n맞는지 확인하고, 다르면 고쳐주세요.'}
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-4">
          <Field label="생년월일">
            <input
              type="text"
              value={birth}
              onChange={(e) => setBirth(formatBirthInput(e.target.value))}
              placeholder="YYYY-MM-DD"
              inputMode="numeric"
              maxLength={10}
              aria-label="생년월일"
              className="w-full rounded-pill border border-seonhwanggeum/30 bg-meokheuk px-3 py-2 font-body text-sm text-hwaseonji outline-none focus-visible:ring-2 focus-visible:ring-dohwahong"
            />
            <div className="mt-2 flex gap-2">
              <Chip selected={calendar === 'solar'} onClick={() => setCalendar('solar')}>
                양력
              </Chip>
              <Chip selected={calendar === 'lunar'} onClick={() => setCalendar('lunar')}>
                음력
              </Chip>
            </div>
          </Field>

          <Field label="태어난 시간">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={time}
                onFocus={() => timeUnknown && setTimeUnknown(false)}
                onChange={(e) => {
                  if (timeUnknown) setTimeUnknown(false);
                  setTime(formatTimeInput(e.target.value));
                }}
                placeholder="HH:MM"
                inputMode="numeric"
                maxLength={5}
                aria-label="태어난 시간"
                disabled={timeUnknown}
                className="min-w-0 flex-1 rounded-pill border border-seonhwanggeum/30 bg-meokheuk px-3 py-2 font-body text-sm text-hwaseonji outline-none focus-visible:ring-2 focus-visible:ring-dohwahong disabled:opacity-40"
              />
              <Chip
                selected={timeUnknown}
                onClick={() => {
                  setTimeUnknown((v) => !v);
                  if (!timeUnknown) setTime('');
                }}
              >
                시간 모름
              </Chip>
            </div>
          </Field>

          <Field label="성별">
            <div className="flex gap-2">
              <Chip selected={gender === 'female'} onClick={() => setGender('female')} wide>
                여성
              </Chip>
              <Chip selected={gender === 'male'} onClick={() => setGender('male')} wide>
                남성
              </Chip>
            </div>
          </Field>
        </div>

        {error && <p className="mt-3 text-center font-body text-xs text-dohwahong">{error}</p>}

        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!isValid || submitting}
            className="w-full rounded-pill bg-dohwahong py-2.5 font-body text-sm font-semibold text-hwaseonji transition-opacity disabled:opacity-40"
          >
            {submitting ? '저장하는 중…' : '확인하고 시작하기'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer py-1 font-body text-xs text-hwaseonji/50 transition-colors hover:text-hwaseonji/80"
          >
            나중에 할게요
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block font-body text-xs font-medium text-seonhwanggeum/80">{label}</label>
      {children}
    </div>
  );
}

function Chip({
  selected,
  onClick,
  children,
  wide = false,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer whitespace-nowrap rounded-pill font-body text-xs font-medium transition-colors ${
        wide ? 'flex-1 py-2' : 'px-3 py-1.5'
      } ${selected ? 'bg-seonhwanggeum text-meokheuk' : 'bg-meokheuk text-hwaseonji/70 border border-seonhwanggeum/20'}`}
    >
      {children}
    </button>
  );
}
