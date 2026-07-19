// [ui] Toast — 안내 토스트 (슬롯 조건 안내 등). Dumb: message + onClose만.
// 셸(max-w-shell) 폭에 맞춰 하단 네비 위에 뜬다. 토큰 색만.
export interface ToastProps {
  message: string;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  return (
    <div className="fixed inset-x-0 bottom-20 z-50 flex justify-center px-4">
      <div className="w-full max-w-shell">
        <div className="flex items-center justify-between gap-3 rounded-pill border border-seonhwanggeum bg-simyagal px-4 py-2 font-body text-xs text-hwaseonji">
          <span>{message}</span>
          <button type="button" onClick={onClose} aria-label="닫기" className="text-seonhwanggeum">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
