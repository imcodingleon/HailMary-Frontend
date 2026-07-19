import type { Metadata } from "next";
import Link from "next/link";
import { AppLegalFooter } from "@/shared/components/AppLegalFooter";

export const metadata: Metadata = {
  title: "코인 충전",
  description:
    "도화선 코인 충전 상품 안내. 코인으로 AI 연애운 리포트·사주 채팅 등 유료 콘텐츠를 이용할 수 있습니다.",
  robots: { index: true, follow: true },
};

// 코인 충전 상품 (BE settings와 일치). 정확한 금액 명시 — 전자상거래법 §13④.
const CHARGE_PRODUCTS = [
  { krw: 1000, coins: 100, bonus: 0 },
  { krw: 5000, coins: 550, bonus: 50 },
  { krw: 10000, coins: 1150, bonus: 150 },
];

const won = (n: number) => n.toLocaleString("ko-KR");

export default function ChargePage() {
  return (
    <>
      <main className="mx-auto max-w-2xl px-5 py-10 text-neutral-800">
        <header className="mb-6">
          <h1 className="text-[22px] font-bold text-neutral-900">코인 충전</h1>
          <p className="mt-2 text-[13.5px] leading-relaxed text-neutral-600">
            도화선 코인은 서비스 내에서 AI 연애운 리포트·사주 채팅 등 유료 콘텐츠를
            이용할 때 차감되는 선불 이용수단입니다. 아래 금액은 부가가치세(VAT)가
            포함된 가격입니다.
          </p>
        </header>

        {/* 판매 상품 — 정확한 금액 */}
        <section aria-label="충전 상품" className="mb-8">
          <h2 className="mb-3 text-[16px] font-semibold text-neutral-900">
            충전 상품
          </h2>
          <ul className="space-y-2.5">
            {CHARGE_PRODUCTS.map((p) => (
              <li
                key={p.krw}
                className="flex items-center justify-between rounded-xl border border-neutral-300 bg-white px-4 py-3.5"
              >
                <div>
                  <span className="text-[16px] font-semibold text-neutral-900">
                    {won(p.coins)} 코인
                  </span>
                  {p.bonus > 0 && (
                    <span className="ml-2 text-[12px] text-rose-500">
                      보너스 +{p.bonus}
                    </span>
                  )}
                </div>
                <span className="text-[15px] font-medium text-neutral-900">
                  {won(p.krw)}원
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[11.5px] text-neutral-500">
            결제 수단: 신용·체크카드(NHN KCP), 카카오페이 — 결제대행사 포트원(코리아포트원㈜)을
            통해 처리됩니다.
          </p>
        </section>

        {/* 유효기간·환불 요약 + 상세 링크 */}
        <section className="rounded-xl bg-neutral-100 px-4 py-4 text-[12.5px] leading-relaxed text-neutral-700">
          <p className="mb-1">
            · 유료 충전 코인의 유효기간은 충전일로부터 <strong>5년</strong>입니다.
          </p>
          <p className="mb-1">
            · 충전 상품은 결제일로부터 <strong>7일 이내</strong>, 해당 충전분 코인을
            사용하지 않은 경우 환불이 가능합니다.
          </p>
          <p className="mb-3">
            · 이미 이용(조회·열람)한 디지털 콘텐츠는 청약철회가 제한됩니다.
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-[12.5px]">
            <Link href="/legal/refund/" className="underline underline-offset-2">
              환불 정책 자세히
            </Link>
            <Link href="/legal/terms/" className="underline underline-offset-2">
              이용약관
            </Link>
            <Link href="/legal/privacy/" className="underline underline-offset-2">
              개인정보처리방침
            </Link>
          </div>
        </section>
      </main>
      <AppLegalFooter />
    </>
  );
}
