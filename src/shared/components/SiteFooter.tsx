"use client";

import { useState } from "react";
import Link from "next/link";
import { LegalModal, type LegalDoc } from "./LegalModal";

export type SiteFooterVariant = "dark" | "light";

interface SiteFooterProps {
  /** "dark" (기본): 어두운 배경 + 밝은 텍스트. "light": 연한 회색 배경 + 어두운 텍스트. */
  variant?: SiteFooterVariant;
  /**
   * true면 이용약관·개인정보처리방침을 모달 대신 실제 페이지 링크(/legal/terms/, /legal/privacy/)로
   * 렌더링하고 환불 정책(/legal/refund/) 링크를 추가한다. PG 심사 요건(크롤러가 실제 <a> 링크 감지) 대응.
   * 기본 false — 기존 모달 방식 유지(CheckoutView 등 기존 호출부는 영향 없음).
   */
  legalLinksAsPages?: boolean;
  /**
   * true면 링크 로우 맨 앞에 "코인 충전"(/charge/) 링크를 추가한다.
   * legalLinksAsPages와 함께 사용. 기본 false.
   */
  showChargeLink?: boolean;
}

interface FooterTheme {
  footerBg: string;
  body: string;
  label: string;
  separator: string;
  copyright: string;
  socialBg: string;
  socialFg: string;
  socialHover: string;
}

const THEMES: Record<SiteFooterVariant, FooterTheme> = {
  dark: {
    footerBg: "bg-neutral-800",
    body: "text-neutral-300",
    label: "text-neutral-100",
    separator: "text-neutral-500",
    copyright: "text-neutral-400",
    socialBg: "bg-neutral-700",
    socialFg: "text-neutral-200",
    socialHover: "hover:bg-neutral-600",
  },
  light: {
    footerBg: "bg-neutral-100",
    body: "text-neutral-600",
    label: "text-neutral-900",
    separator: "text-neutral-400",
    copyright: "text-neutral-500",
    socialBg: "bg-neutral-300",
    socialFg: "text-neutral-700",
    socialHover: "hover:bg-neutral-400",
  },
};

export function SiteFooter({
  variant = "dark",
  legalLinksAsPages = false,
  showChargeLink = false,
}: SiteFooterProps) {
  const [openDoc, setOpenDoc] = useState<LegalDoc | null>(null);
  const t = THEMES[variant];
  const linkRowClass = legalLinksAsPages
    ? "mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
    : "mt-5 flex items-center justify-center gap-3";
  return (
    <footer
      className={`select-text px-6 py-10 text-center text-[11px] leading-relaxed ${t.footerBg} ${t.body}`}
    >
      <div className="space-y-1.5">
        <p>
          <span className={`font-medium ${t.label}`}>상호</span> 슈퍼빌더즈
          <span className={`mx-2 ${t.separator}`}>|</span>
          <span className={`font-medium ${t.label}`}>대표이사</span> 배성현
        </p>
        <p>경기도 용인시 기흥구 구갈로60번길 9-1, 6층 602-A61호 (구갈동, 라파빌딩)</p>
        <p>
          <span className={`font-medium ${t.label}`}>사업자등록번호</span>{" "}
          376-35-01679
        </p>
        <p>
          <span className={`font-medium ${t.label}`}>통신판매업 신고번호</span>{" "}
          제 2026-용인기흥-00967 호
        </p>
        <p>
          <span className={`font-medium ${t.label}`}>고객센터</span>{" "}
          <a
            href="http://pf.kakao.com/_axcGxbX/chat"
            target="_blank"
            rel="noreferrer noopener"
            className="underline"
          >
            카카오톡 도화선 채널
          </a>
          <span className={`mx-2 ${t.separator}`}>|</span>
          <span className={`font-medium ${t.label}`}>MAIL</span>{" "}
          <a href="mailto:skwogusdld@gmail.com" className="underline">
            skwogusdld@gmail.com
          </a>
        </p>
        <p>
          <span className={`font-medium ${t.label}`}>대표번호</span>{" "}
          <a href="tel:070-8064-6831" className="underline">
            070-8064-6831
          </a>
        </p>
        <p className={t.copyright}>
          (전화 상담은 운영하지 않으며, 채팅으로 문의해 주세요.)
        </p>
      </div>

      <div className={linkRowClass}>
        {legalLinksAsPages ? (
          <>
            {showChargeLink && (
              <>
                <Link href="/charge/" className="underline">
                  코인 충전
                </Link>
                <span aria-hidden className={t.separator}>
                  |
                </span>
              </>
            )}
            <Link href="/legal/terms/" className="underline">
              이용약관
            </Link>
            <span aria-hidden className={t.separator}>
              |
            </span>
            <Link href="/legal/privacy/" className="underline">
              개인정보처리방침
            </Link>
            <span aria-hidden className={t.separator}>
              |
            </span>
            <Link href="/legal/refund/" className="underline">
              환불 정책
            </Link>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setOpenDoc("terms")}
              className="underline"
            >
              이용약관
            </button>
            <span aria-hidden className={t.separator}>
              |
            </span>
            <button
              type="button"
              onClick={() => setOpenDoc("privacy")}
              className="underline"
            >
              개인정보처리방침
            </button>
          </>
        )}
      </div>

      <p className={`mt-3 ${t.copyright}`}>
        Copyright © 2026 슈퍼빌더즈. All rights reserved.
      </p>

      <div className="mt-5 flex items-center justify-center gap-3">
        <a
          href="http://pf.kakao.com/_axcGxbX"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="카카오톡 도화선 채널"
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${t.socialBg} ${t.socialFg} ${t.socialHover}`}
        >
          <KakaoIcon />
        </a>
        <a
          href="https://www.instagram.com/dohwaseon_saju/"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="인스타그램 @dohwaseon_saju"
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${t.socialBg} ${t.socialFg} ${t.socialHover}`}
        >
          <InstagramIcon />
        </a>
      </div>

      <LegalModal doc={openDoc} onClose={() => setOpenDoc(null)} />
    </footer>
  );
}

function KakaoIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 4C6.48 4 2 7.59 2 12.02c0 2.86 1.86 5.36 4.65 6.78l-1.18 4.32c-.1.36.3.65.62.45l5.18-3.42c.24.02.48.04.73.04 5.52 0 10-3.59 10-8.17S17.52 4 12 4z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
