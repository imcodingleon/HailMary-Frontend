interface ComingSoonCardProps {
  /** 카드 안내 문구. */
  label: string;
  /** 플레이스홀더 아이콘(emoji). */
  icon?: string;
}

export function ComingSoonCard({ label, icon = "🔒" }: ComingSoonCardProps) {
  return (
    <div
      className="flex w-[305px] flex-shrink-0 snap-start items-center justify-center rounded-2xl border border-dashed border-white/[0.08]"
      style={{ background: "rgba(255,255,255,0.02)", aspectRatio: "3 / 4" }}
    >
      <div className="flex flex-col items-center gap-2 text-white/40">
        <span className="text-2xl" aria-hidden>{icon}</span>
        <span className="text-[13px]">{label}</span>
      </div>
    </div>
  );
}
