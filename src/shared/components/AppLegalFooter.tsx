// 도화선 2.0(app) 사업자정보 + 법적 문서 링크 푸터.
// PG(포트원) 심사 요건: 사업자정보 상시 노출 + 이용약관/개인정보/환불 확인 가능.
// SiteFooter(모달)와 달리 실제 <a> 링크(정적 페이지) → 크롤러가 확실히 감지.
// 사업자정보는 사업자등록증과 일치해야 함.
import Link from "next/link";

const LINK = "underline underline-offset-2 hover:opacity-70";

export function AppLegalFooter() {
  return (
    <footer className="mt-12 border-t border-neutral-300 bg-neutral-100 px-6 py-10 text-center text-[11px] leading-relaxed text-neutral-600 select-text">
      <nav className="mb-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[12px] text-neutral-800">
        <Link href="/charge/" className={LINK}>
          코인 충전
        </Link>
        <span aria-hidden className="text-neutral-400">
          |
        </span>
        <Link href="/legal/terms/" className={LINK}>
          이용약관
        </Link>
        <span aria-hidden className="text-neutral-400">
          |
        </span>
        <Link href="/legal/privacy/" className={LINK}>
          개인정보처리방침
        </Link>
        <span aria-hidden className="text-neutral-400">
          |
        </span>
        <Link href="/legal/refund/" className={LINK}>
          환불 정책
        </Link>
      </nav>

      <div className="space-y-1.5">
        <p>
          <span className="font-medium text-neutral-800">상호</span> 슈퍼빌더즈
          <span className="mx-2 text-neutral-400">|</span>
          <span className="font-medium text-neutral-800">대표이사</span> 배성현
        </p>
        <p>
          경기도 용인시 기흥구 구갈로60번길 9-1, 6층 602-A61호 (구갈동, 라파빌딩)
        </p>
        <p>
          <span className="font-medium text-neutral-800">사업자등록번호</span>{" "}
          376-35-01679
        </p>
        <p>
          <span className="font-medium text-neutral-800">통신판매업 신고번호</span>{" "}
          제 2026-용인기흥-00967 호
        </p>
        <p>
          <span className="font-medium text-neutral-800">대표번호</span>{" "}
          <a href="tel:070-8064-6831" className={LINK}>
            070-8064-6831
          </a>
          <span className="mx-2 text-neutral-400">|</span>
          <span className="font-medium text-neutral-800">이메일</span>{" "}
          <a href="mailto:skwogusdld@gmail.com" className={LINK}>
            skwogusdld@gmail.com
          </a>
        </p>
        <p className="text-neutral-500">
          (전화 상담은 운영하지 않으며, 카카오톡 도화선 채널로 문의해 주세요.)
        </p>
      </div>

      <p className="mt-4 text-neutral-500">
        Copyright © 2026 슈퍼빌더즈. All rights reserved.
      </p>
    </footer>
  );
}
