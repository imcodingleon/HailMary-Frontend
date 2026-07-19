"use client";

// [ui] AppBottomNav — 도화선 2.0 채팅앱 셸의 4탭 하단 네비 (도화선/연락처/채팅/충전).
// SOURCE 1:1 복제 대상: "7. 도화선 채팅 서비스 Test" features/chat/ui/BottomNav.tsx (+ IconImg/iconAsset).
// 색은 토큰만: 배경 심야갈(반투명 app-surface/app-nav) / 활성 도화홍 / 비활성 화선지 50%.
// ❗뷰포트 고정: SOURCE는 셸(max-w-shell) 안에서 sticky/shrink-0로 흘렀지만,
//   이 프로젝트 body 셸은 max-w-md(448px) 중앙 정렬 컬럼이라 옛 1.0 shared/components/BottomNav.tsx와
//   동일하게 position:fixed + left-1/2 -translate-x-1/2 + max-w-md로 그 컬럼에 맞춰 뷰포트 하단에 고정한다.
//   (fixed는 문서 흐름에서 빠지므로, 콘텐츠가 가려지지 않도록 아래에 in-flow spacer를 같이 렌더한다 —
//    홈(MainView)·보관함(ArchiveView)은 1.0부터 이미 자체 paddingBottom을 갖고 있어 이중 여백 없음.
//    spacer는 그 두 화면 밖에서 이 컴포넌트가 새로 노출되는 라우트에 한해 실제로 여백을 만든다.)
// unread 배지는 채팅 상태가 아직 없어 스텁(항상 미노출).
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ComponentType, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/* 기능용 인라인 SVG 아이콘(라인 스타일, currentColor 상속) — SOURCE 폴백 글리프 그대로. */
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

// SOURCE의 IconImg — png 로드 실패(onError) 시 fallback 글리프로 강등. 표시 전용 Dumb(로컬 state만).
function NavIconImg({
  src,
  className,
  fallback,
}: {
  src: string;
  className?: string;
  fallback: React.ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- onError 강등 fallback이 필요해 next/image 대신 img 사용
    <img src={src} alt="" className={className} onError={() => setFailed(true)} />
  );
}

// SOURCE iconAsset 미러 — 이 프로젝트 public/chat-nav/ 로 복사된 4종 png.
const NAV_ICON = {
  home: "/chat-nav/home.png",
  contacts: "/chat-nav/contacts.png",
  chat: "/chat-nav/chat.png",
  charge: "/chat-nav/charge.png",
} as const;

type Tab = {
  href: string;
  label: string;
  icon: string;
  Icon: ComponentType<IconProps>;
};

// SOURCE 탭 순서 그대로: 도화선(홈 복귀)/연락처/채팅/충전.
const TABS: readonly Tab[] = [
  { href: "/", label: "도화선", icon: NAV_ICON.home, Icon: HomeIcon },
  { href: "/friends", label: "연락처", icon: NAV_ICON.contacts, Icon: FriendsIcon },
  { href: "/chat", label: "채팅", icon: NAV_ICON.chat, Icon: ChatIcon },
  { href: "/charge", label: "충전", icon: NAV_ICON.charge, Icon: ChargeIcon },
];

// 4탭 라우트 + 보관함에서만 노출. 인트로/캐릭터선택/사주플로우/체크아웃 등
// 딥플로우 화면에서는 자동 숨김 — 기존 shared/components/BottomNav.tsx의 shouldShow 패턴을 그대로 따름.
const SHOW_ROUTES = ["/", "/friends/", "/chat/", "/charge/", "/archive/"] as const;

function shouldShow(pathname: string): boolean {
  const p = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return SHOW_ROUTES.includes(p as (typeof SHOW_ROUTES)[number]);
}

// 하단 여백 spacer가 필요한 라우트만 별도 관리. 홈(MainView)·보관함(ArchiveView)은 1.0부터
// 옛 고정 네비(67px) 몫의 paddingBottom을 이미 자체적으로 갖고 있어(건드리지 않음) 여기서 spacer를
// 또 추가하면 화면 맨 아래에 여백이 이중으로 쌓인다 — 그래서 이 둘은 제외.
const SPACER_ROUTES = ["/friends/", "/chat/", "/charge/"] as const;

function needsSpacer(pathname: string): boolean {
  const p = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return SPACER_ROUTES.includes(p as (typeof SPACER_ROUTES)[number]);
}

// 네비 실측 높이(SOURCE py-2.5 + icon 24 + gap 4 + label 11px 라인 근사) — 옛 1.0 BottomNav와
// 동일 관례로 67px 사용.
const NAV_HEIGHT = "67px";

export function AppBottomNav() {
  const pathname = usePathname();

  if (!shouldShow(pathname)) return null;

  return (
    <>
      {/* in-flow spacer — fixed nav가 문서 흐름에서 빠지는 만큼, /friends·/chat·/charge 콘텐츠 맨 아래에
          동일 높이의 여백을 확보(홈·보관함은 자체 paddingBottom이 이미 있어 제외 — 이중 여백 방지). */}
      {needsSpacer(pathname) && (
        <div aria-hidden style={{ height: `calc(${NAV_HEIGHT} + env(safe-area-inset-bottom))` }} className="shrink-0" />
      )}
      <nav
        className="app-surface app-nav fixed bottom-0 left-1/2 z-50 flex w-full max-w-md -translate-x-1/2 shrink-0 pb-[env(safe-area-inset-bottom)]"
        style={{ minHeight: NAV_HEIGHT }}
      >
        {TABS.map(({ href, label, icon, Icon }) => {
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
              {/* 활성 opacity 1.0 / 비활성 0.5 (단일 png). 실패 시 SOURCE와 동일한 stroke 글리프로 강등. */}
              <span className={isActive ? "opacity-100" : "opacity-50"}>
                <NavIconImg src={icon} className="h-6 w-6 object-contain" fallback={<Icon className="h-6 w-6" />} />
              </span>
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
