"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginPromptModal, useAuth } from "@/features/auth";
import { ConfirmModal } from "@/shared/components/ConfirmModal";
import { LegalModal, type LegalDoc } from "@/shared/components/LegalModal";
import { trackEvent } from "@/shared/utils/analytics";

const PAGE_BG = "linear-gradient(180deg, #1a1530 0%, #0f0a22 100%)";

function genderKo(g: string): string {
  return g === "male" ? "남성" : g === "female" ? "여성" : "";
}

interface MyPageViewProps {
  /** 코인 플래그 ON일 때만 "코인 충전" 메뉴행 노출. app-level 주입(mypage feature는 coin import 금지). */
  coinEnabled?: boolean;
}

export function MyPageView({ coinEnabled = false }: MyPageViewProps) {
  const router = useRouter();
  const { isAuthenticated, profile, refreshMe, logout, deleteAccount } = useAuth();
  const [legalDoc, setLegalDoc] = useState<LegalDoc | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    void refreshMe();
  }, [refreshMe]);

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  const handleDelete = async () => {
    setConfirmDelete(false);
    await deleteAccount();
    router.replace("/");
  };

  const lu = profile?.lastUsed ?? null;

  return (
    <div
      className="flex min-h-[100dvh] flex-1 flex-col"
      style={{ background: PAGE_BG, fontFamily: "var(--font-pretendard)" }}
    >
      {/* 상단바 */}
      <header className="sticky top-0 z-10 flex items-center justify-center px-4 py-3.5 backdrop-blur-md" style={{ background: "rgba(15,10,34,0.7)" }}>
        <button
          type="button"
          aria-label="뒤로"
          onClick={() => router.back()}
          className="absolute left-3 flex h-9 w-9 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-[15px] font-semibold tracking-wide text-white">마이페이지</h1>
      </header>

      {!isAuthenticated ? (
        <UnauthedState onLogin={() => setLoginOpen(true)} />
      ) : (
        <div className="flex flex-1 flex-col px-5 pb-12 pt-6">
          {/* 인사 + 사용자 정보 */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/70">
              <PersonIcon size={26} />
            </div>
            <div className="min-w-0">
              <p className="text-[17px] font-bold text-white">
                {profile?.nickname ?? "회원"}님 반가워요!
              </p>
              {lu ? (
                <p className="mt-0.5 text-[12.5px] text-white/45">
                  {lu.birth.replace(/-/g, ".")}
                  {genderKo(lu.gender) ? ` · ${genderKo(lu.gender)}` : ""}
                </p>
              ) : (
                <p className="mt-0.5 truncate text-[12.5px] text-white/45">
                  {profile?.email ?? ""}
                </p>
              )}
            </div>
          </div>

          {/* 추천 사주 — 포스터 위 소개문구 오버레이 (TIGHT 스타일) */}
          <button
            type="button"
            onClick={() => {
              trackEvent("mypage_recommend_click", {});
              router.push("/landing/");
            }}
            className="relative mt-7 block cursor-pointer overflow-hidden rounded-2xl border border-white/10 text-left transition-opacity hover:opacity-95"
          >
            <img
              src="/poster-love-saju-card.png"
              alt="연애 사주 — 두 남자가 보는 당신의 연애운"
              className="block h-auto w-full select-none"
              draggable={false}
            />
            {/* 하단 스크림 + CTA */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-2 bg-gradient-to-t from-black/85 via-black/35 to-transparent px-4 pb-3.5 pt-12">
              <p className="text-[12.5px] font-medium text-white/85">
                아직 안 본 인연이 있다면?
              </p>
              <span className="shrink-0 text-[12.5px] font-semibold text-[#f5b3c4]">
                보러 가기 →
              </span>
            </div>
            <span
              className="absolute left-4 top-4 z-10 inline-block rounded-lg px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-[#f5b3c4]"
              style={{ background: "rgba(15,8,30,0.6)", backdropFilter: "blur(8px)" }}
            >
              도화선 추천 사주
            </span>
          </button>

          {/* 메뉴 리스트 */}
          <div className="mt-7 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <MenuRow
              icon={<ArchiveIcon />}
              label="리포트 보관함"
              onClick={() => router.push("/archive/")}
            />
            {coinEnabled && (
              <>
                <Divider />
                <MenuRow
                  icon={<CoinIcon />}
                  label="코인 충전"
                  onClick={() => router.push("/charge/")}
                />
              </>
            )}
          </div>

          <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <MenuRow label="서비스 이용약관" small onClick={() => setLegalDoc("terms")} />
            <Divider />
            <MenuRow label="개인정보처리방침" small onClick={() => setLegalDoc("privacy")} />
          </div>

          {/* 로그아웃 / 회원탈퇴 */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={handleLogout}
              className="cursor-pointer text-[14px] font-semibold text-white/85 transition-colors hover:text-white"
            >
              로그아웃하기
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="cursor-pointer text-[12px] text-white/35 underline transition-colors hover:text-white/60"
            >
              회원탈퇴
            </button>
          </div>
        </div>
      )}

      <LegalModal doc={legalDoc} onClose={() => setLegalDoc(null)} />
      <ConfirmModal
        open={confirmDelete}
        title="회원탈퇴"
        message={"정말 탈퇴하시겠어요?\n계정 정보와 보관함이 삭제돼요.\n(구매 기록은 법령에 따라 일정 기간 보관됩니다)"}
        confirmLabel="탈퇴하기"
        cancelLabel="취소"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
      />
      <LoginPromptModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        returnTo="/mypage/"
        source="mypage"
      />
    </div>
  );
}

function MenuRow({
  icon,
  label,
  small,
  onClick,
}: {
  icon?: React.ReactNode;
  label: string;
  small?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-white/[0.04]"
    >
      {icon && <span className="text-white/70">{icon}</span>}
      <span className={`flex-1 ${small ? "text-[13px] text-white/70" : "text-[14px] font-medium text-white"}`}>
        {label}
      </span>
      <span className="text-white/30">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M9 18l6-6-6-6" />
        </svg>
      </span>
    </button>
  );
}

function Divider() {
  return <div className="mx-4 h-px bg-white/[0.06]" />;
}

function UnauthedState({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <img src="/kkebi/images/corner-m2.png" alt="깨비" className="h-24 w-24 select-none opacity-90" draggable={false} />
      <p className="text-[14px] font-medium text-white/80">로그인하고 내 정보를 확인하세요</p>
      <p className="max-w-[15rem] text-[12.5px] leading-relaxed text-white/45">
        사주 정보 자동 저장과 결과 보관함을 이용할 수 있어요.
      </p>
      <button
        type="button"
        onClick={onLogin}
        className="mt-2 cursor-pointer rounded-full bg-white px-6 py-2.5 text-[13px] font-semibold text-neutral-900 transition-opacity hover:opacity-90"
      >
        로그인하기
      </button>
    </div>
  );
}

function PersonIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="4" rx="1" />
      <path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8" />
      <path d="M10 12h4" />
    </svg>
  );
}

function CoinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 15.5c.5.7 1.4 1 2.5 1 1.7 0 3-.8 3-2s-1.3-1.6-3-2-3-.8-3-2 1.3-2 3-2c1.1 0 2 .3 2.5 1" strokeLinecap="round" />
    </svg>
  );
}
