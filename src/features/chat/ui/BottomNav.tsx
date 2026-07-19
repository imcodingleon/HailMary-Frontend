'use client';

// [ui] BottomNav — Dumb 컴포넌트. (부록 B-2)
// 활성 탭은 별도 상태 atom 없이 현재 라우트(usePathname)에서 파생한다(State Driven UI).
// 색은 토큰만: 배경 심야갈 / 활성 도화홍 / 비활성 화선지. 하드코딩 금지(부록 C-1).
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAtomValue } from 'jotai';
import type { ComponentType, SVGProps } from 'react';
import { totalUnreadAtom } from '@/features/chat/application/selectors/chatSelectors';
import IconImg from './IconImg';
import { iconAsset } from './iconAsset';

type IconProps = SVGProps<SVGSVGElement>;

/* 기능용 인라인 SVG 아이콘(라인 스타일, currentColor 상속). 캐릭터·장식 아님. */
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

/* 탭 정의 (스펙 §5). 라우트 경로명은 합리적 기본값 [TBD]. */
type Tab = {
  href: string;
  label: string;
  icon: string; // 커스텀 png 경로(iconAsset)
  Icon: ComponentType<IconProps>; // png 실패 시 fallback 글리프
};

const TABS: readonly Tab[] = [
  { href: '/main', label: '도화선', icon: iconAsset.navHome, Icon: HomeIcon }, // 메인 복귀 스텁(비범위)
  { href: '/friends', label: '연락처', icon: iconAsset.navContacts, Icon: FriendsIcon }, // 인앱 기본 진입
  { href: '/chat', label: '채팅', icon: iconAsset.navChat, Icon: ChatIcon },
  { href: '/charge', label: '충전', icon: iconAsset.navCharge, Icon: ChargeIcon },
];

// 먹흑 운문 앱 배경을 쓰는 화면들 — 여기서만 네비 톤을 심야갈 surface로 파생(State Driven UI).
// (개별 채팅방 /room 은 BottomNav 없음 → 미해당.)
const APP_BG_ROUTES = ['/friends', '/charge', '/character', '/chat', '/main'] as const;

export default function BottomNav() {
  const pathname = usePathname();
  const totalUnread = useAtomValue(totalUnreadAtom);
  const isAppBg = APP_BG_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`));

  return (
    <nav
      className={`flex w-full shrink-0 pb-[env(safe-area-inset-bottom)] ${
        isAppBg ? 'app-surface app-nav' : 'border-t border-meokheuk bg-simyagal'
      }`}
    >
      {TABS.map(({ href, label, icon, Icon }) => {
        const isActive = pathname === href || pathname.startsWith(`${href}/`);
        const showUnread = href === '/chat' && totalUnread > 0;
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={`relative flex flex-1 flex-col items-center justify-center gap-1 py-2.5 font-body text-[11px] ${
              isActive ? 'text-dohwahong' : 'text-hwaseonji'
            }`}
          >
            <span className="relative">
              {/* 활성 opacity 1.0 / 비활성 0.5 (단일 png). 실패 시 기존 글리프 fallback(currentColor 상속). */}
              <span className={isActive ? 'opacity-100' : 'opacity-50'}>
                <IconImg
                  src={icon}
                  alt=""
                  className="h-6 w-6 object-contain"
                  fallback={<Icon className="h-6 w-6" />}
                />
              </span>
              {showUnread && (
                <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-pill bg-dohwahong px-1 font-body text-[9px] font-semibold text-hwaseonji">
                  {totalUnread}
                </span>
              )}
            </span>
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
