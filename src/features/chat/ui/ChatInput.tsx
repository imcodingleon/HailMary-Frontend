'use client';

// [ui] ChatInput — 입력창 + 사주 모드 토글 + 추천 답변 (스펙 §7.5/§9). Dumb: 핸들러는 props, 색 분기는 sajuMode.
// 토글은 상태 토글(매 턴 리셋 아님). OUT_OF_TOKEN이어도 토글은 유지(사적 모드로 되돌릴 수 있게).
// 추천 답변(💡): 토글 옆 버튼 → 3개 칩 펼침 → 탭하면 입력창에 채움(사용자 검토 후 전송).
import { useState } from 'react';

export interface ChatInputProps {
  draft: string;
  onDraftChange: (value: string) => void;
  onSend: () => void;
  onToggleSaju: () => void;
  onGoCharge: () => void;
  canSend: boolean;
  outOfToken: boolean;
  sajuMode: boolean;
  suggestions: string[];
  onPickSuggestion: (text: string) => void;
}

export default function ChatInput({
  draft,
  onDraftChange,
  onSend,
  onToggleSaju,
  onGoCharge,
  canSend,
  outOfToken,
  sajuMode,
  suggestions,
  onPickSuggestion,
}: ChatInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const hasSuggestions = suggestions.length > 0;

  const pick = (text: string) => {
    onPickSuggestion(text);
    setShowSuggestions(false);
  };

  return (
    <div
      className={`shrink-0 border-t px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-colors ${
        sajuMode ? 'border-dohwahong' : 'border-simyagal'
      }`}
    >
      {/* OUT_OF_TOKEN: 충전 안내 + 충전 탭 연결. 토글은 아래에서 유지. */}
      {outOfToken && (
        <div className="mb-2 flex flex-col items-center gap-1.5">
          <p className="text-center font-body text-xs text-dohwahong">
            토큰이 부족해요. {sajuMode ? '사주 모드는 고토큰이에요. ' : ''}충전이 필요합니다.
          </p>
          <button
            type="button"
            onClick={onGoCharge}
            className="rounded-pill bg-dohwahong px-4 py-1.5 font-body text-xs font-semibold text-hwaseonji"
          >
            충전하러 가기
          </button>
        </div>
      )}

      {/* 추천 답변 펼침 — 💡 버튼으로 토글. 탭하면 입력창에 채움. */}
      {showSuggestions && hasSuggestions && (
        <div className="mb-2 flex flex-col gap-1.5">
          {suggestions.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => pick(s)}
              className="rounded-card border border-seonhwanggeum/50 bg-simyagal px-3 py-2 text-left font-body text-xs leading-relaxed text-hwaseonji transition-colors hover:border-dohwahong"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
        className="flex items-center gap-2"
      >
        {/* 사주 모드 토글 (🔮) — 상태 토글 */}
        <button
          type="button"
          onClick={onToggleSaju}
          aria-pressed={sajuMode}
          aria-label="사주 모드 토글"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-pill text-base transition-colors ${
            sajuMode ? 'bg-dohwahong text-hwaseonji' : 'bg-simyagal text-hwaseonji'
          }`}
        >
          🔮
        </button>

        {/* 추천 답변 (💡) — 토글 옆. suggestions 없으면 비활성. */}
        <button
          type="button"
          onClick={() => setShowSuggestions((v) => !v)}
          disabled={!hasSuggestions}
          aria-pressed={showSuggestions}
          aria-label="추천 답변"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-pill text-base transition-colors disabled:opacity-40 ${
            showSuggestions ? 'bg-seonhwanggeum text-meokheuk' : 'bg-simyagal text-hwaseonji'
          }`}
        >
          💡
        </button>

        <input
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          disabled={outOfToken}
          placeholder={sajuMode ? '사주 모드 — 무엇이든 물어보세요' : '메시지를 입력하세요'}
          aria-label="메시지 입력"
          className={`flex-1 rounded-pill border bg-simyagal px-4 py-2 font-body text-sm text-hwaseonji outline-none transition-colors focus-visible:ring-2 focus-visible:ring-dohwahong disabled:opacity-50 ${
            sajuMode ? 'border-dohwahong' : 'border-transparent'
          }`}
        />

        <button
          type="submit"
          disabled={!canSend}
          className="shrink-0 rounded-pill bg-dohwahong px-4 py-2 font-body text-sm font-semibold text-hwaseonji disabled:opacity-50"
        >
          보내기
        </button>
      </form>
    </div>
  );
}
