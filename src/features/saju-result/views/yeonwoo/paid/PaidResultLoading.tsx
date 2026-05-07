interface PaidResultLoadingProps {
  message?: string;
}

export default function PaidResultLoading({
  message = "두루마리를 펼치는 중...",
}: PaidResultLoadingProps) {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-6 bg-neutral-950 px-6 py-10 text-neutral-100">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-700 border-t-[#E8C9A0]"
        aria-hidden
      />
      <p className="text-[14px] text-neutral-300">{message}</p>
    </main>
  );
}
