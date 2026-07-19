// [ui] TypingIndicator — LOADING_RESPONSE 중 캐릭터 대기 표시. Dumb.
export interface TypingIndicatorProps {
  characterName: string;
}

export default function TypingIndicator({ characterName }: TypingIndicatorProps) {
  return (
    <div className="flex justify-start">
      <div className="rounded-card bg-simyagal px-3 py-2 font-body text-sm text-hwaseonji">
        {characterName}님이 입력 중…
      </div>
    </div>
  );
}
