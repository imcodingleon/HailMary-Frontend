// [ui] ThumbnailStrip — 보조 썸네일 자리(와이어프레임 하단). 표시 전용 Dumb, placeholder만.
// ❗썸네일에 캐릭터를 SVG/이미지로 그리지 않는다. 회색(심야갈) 톤 빈 타일 + 작은 글리프.
export interface ThumbnailStripProps {
  count?: number;
}

function ImageGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="M5 18l4.5-4.5 3 3L16 13l3 3.5" />
    </svg>
  );
}

export default function ThumbnailStrip({ count = 4 }: ThumbnailStripProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex aspect-square items-center justify-center rounded-card border border-meokheuk bg-simyagal"
        >
          <ImageGlyph className="h-5 w-5 text-seonhwanggeum" />
        </div>
      ))}
    </div>
  );
}
