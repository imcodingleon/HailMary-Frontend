"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/shared/utils/analytics";

export function TopNav() {
  const router = useRouter();
  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between border-b border-white/[0.06] px-5 py-3 backdrop-blur-xl"
      style={{ background: "rgba(5,2,12,0.92)" }}
    >
      <Image
        src="/dohwaseon-logo.png"
        alt="도화선"
        height={35}
        width={98}
        priority
        className="h-[35px] w-auto"
      />
      {/* 마이페이지 (계정 정보·보관함·약관·로그아웃·회원탈퇴) */}
      <button
        type="button"
        aria-label="마이페이지"
        onClick={() => {
          trackEvent("topnav_mypage_click", {});
          router.push("/mypage/");
        }}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      </button>
    </nav>
  );
}
