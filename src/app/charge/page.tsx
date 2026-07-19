import type { Metadata } from "next";
import Link from "next/link";
import { AppLegalFooter } from "@/shared/components/AppLegalFooter";
import { ChargeBalanceCard } from "./ChargeBalanceCard";

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

// SOURCE 미러: "7. 도화선 채팅 서비스 Test" app/(inapp)/charge/page.tsx 톤(app-bg 먹흑 운문 배경 +
// sticky app-surface/app-header 골드 타이틀 + card-surface 카드) — /chat, /friends와 동일한
// 헤더 관례(text-seonhwanggeum + Hahmlet 계열 serif, app-header의 옅은 하단 구분선)를 그대로 따른다.
// 내용은 기존 라이트 버전 그대로(금액·코인 수·환불 문구 1글자도 변경 없음) — 다크로 리스킨만.
export default function ChargePage() {
  return (
    <>
      <section className="app-bg flex min-h-[100dvh] flex-1 flex-col">
        <header className="app-surface app-header sticky top-0 z-10 px-5 pb-3 pt-5">
          <h1
            className="text-2xl font-semibold text-seonhwanggeum"
            style={{ fontFamily: "'Hahmlet', 'Noto Serif KR', serif" }}
          >
            코인 충전
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-hwaseonji/80">
            도화선 코인은 서비스 내에서 AI 연애운 리포트·사주 채팅 등 유료 콘텐츠를
            이용할 때 차감되는 선불 이용수단입니다. 아래 금액은 부가가치세(VAT)가
            포함된 가격입니다.
          </p>
        </header>

        <main className="flex-1 px-5 pt-5 pb-8">
          <ChargeBalanceCard />

          {/* 판매 상품 — 정확한 금액 */}
          <section aria-label="충전 상품" className="mt-5">
            <h2 className="mb-2 text-sm font-semibold text-hwaseonji">
              충전 상품
            </h2>
            <div className="flex flex-col gap-2">
              {CHARGE_PRODUCTS.map((p) => (
                <div
                  key={p.krw}
                  className="card-surface flex items-center justify-between rounded-card p-4"
                >
                  <div>
                    <div
                      className="text-base font-semibold text-hwaseonji"
                      style={{ fontFamily: "'Hahmlet', 'Noto Serif KR', serif" }}
                    >
                      {won(p.coins)} 코인
                    </div>
                    {p.bonus > 0 && (
                      <div className="mt-0.5 text-xs text-dohwahong">
                        보너스 +{p.bonus}
                      </div>
                    )}
                  </div>
                  <span className="text-[15px] font-medium text-seonhwanggeum">
                    {won(p.krw)}원
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[11.5px] text-hwaseonji/60">
              결제 수단: 신용·체크카드(NHN KCP), 카카오페이 — 결제대행사 포트원(코리아포트원㈜)을
              통해 처리됩니다.
            </p>
          </section>

          {/* 유효기간·환불 요약 + 상세 링크 */}
          <section className="card-surface rounded-card mt-5 px-4 py-4 text-[12.5px] leading-relaxed text-hwaseonji/80">
            <p className="mb-1">
              · 유료 충전 코인의 유효기간은 충전일로부터{" "}
              <strong className="text-hwaseonji">5년</strong>입니다.
            </p>
            <p className="mb-1">
              · 충전 상품은 결제일로부터{" "}
              <strong className="text-hwaseonji">7일 이내</strong>, 해당 충전분
              코인을 사용하지 않은 경우 환불이 가능합니다.
            </p>
            <p className="mb-3">
              · 이미 이용(조회·열람)한 디지털 콘텐츠는 청약철회가 제한됩니다.
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-[12.5px]">
              <Link
                href="/legal/refund/"
                className="text-seonhwanggeum underline underline-offset-2"
              >
                환불 정책 자세히
              </Link>
              <Link
                href="/legal/terms/"
                className="text-seonhwanggeum underline underline-offset-2"
              >
                이용약관
              </Link>
              <Link
                href="/legal/privacy/"
                className="text-seonhwanggeum underline underline-offset-2"
              >
                개인정보처리방침
              </Link>
            </div>
          </section>
        </main>
      </section>
      <AppLegalFooter />
    </>
  );
}
