"use client";

// [ui] AppBottomNav — 도화선 2.0 채팅앱 셸의 4탭 하단 네비 (도화선/연락처/채팅/충전).
// SOURCE 1:1 복제 대상: "7. 도화선 채팅 서비스 Test" features/chat/ui/BottomNav.tsx
// 색은 토큰만: 배경 심야갈(반투명) / 활성 도화홍 / 비활성 화선지 50%.
// unread 배지는 채팅 상태가 아직 없어 스텁(항상 미노출).
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function HomeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </svg>
  );
}
function FriendsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5" />
      <path d="M16 5.2A3 3 0 0 1 16 11M17.5 14.6c2.2.5 3.8 2.4 3.8 5.4" />
    </svg>
  );
}
function ChatIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M4 5h16v11H9l-4 3.5V16H4z" />
    </svg>
  );
}
function ChargeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <ellipse cx="12" cy="6.5" rx="7" ry="3" />
      <path d="M5 6.5v5c0 1.66 3.13 3 7 3s7-1.34 7-3v-5" />
      <path d="M5 11.5v5c0 1.66 3.13 3 7 3s7-1.34 7-3v-5" />
    </svg>
  );
}

type Tab = {
  href: string;
  label: string;
  Icon: ComponentType<IconProps>;
};

// SOURCE 탭 순서 그대로: 도화선(홈 복귀)/연락처/채팅/충전.
const TABS: readonly Tab[] = [
  { href: "/", label: "도화선", Icon: HomeIcon },
  { href: "/friends", label: "연락처", Icon: FriendsIcon },
  { href: "/chat", label: "채팅", Icon: ChatIcon },
  { href: "/charge", label: "충전", Icon: ChargeIcon },
];

// 4탭 라우트 + 보관함에서만 노출. 인트로/캐릭터선택/사주플로우/체크아웃 등
// 딥플로우 화면에서는 자동 숨김 — 기존 shared/components/BottomNav.tsx의 shouldShow 패턴을 그대로 따름.
const SHOW_ROUTES = ["/", "/friends/", "/chat/", "/charge/", "/archive/"] as const;

function shouldShow(pathname: string): boolean {
  const p = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return SHOW_ROUTES.includes(p as (typeof SHOW_ROUTES)[number]);
}

export function AppBottomNav() {
  const pathname = usePathname();

  if (!shouldShow(pathname)) return null;

  return (
    <nav
      className="flex w-full shrink-0 border-t border-meokheuk bg-simyagal/85 backdrop-blur-md pb-[env(safe-area-inset-bottom)]"
      style={{ boxShadow: "0 -8px 20px -12px rgba(0,0,0,0.6)" }}
    >
      {TABS.map(({ href, label, Icon }) => {
        // 도화선 탭은 정확히 "/"일 때만 활성 — 그 외 탭은 하위 경로도 활성 처리.
        const isActive = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] ${
              isActive ? "text-dohwahong" : "text-hwaseonji"
            }`}
          >
            <span className={isActive ? "opacity-100" : "opacity-50"}>
              <Icon className="h-6 w-6" />
            </span>
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
