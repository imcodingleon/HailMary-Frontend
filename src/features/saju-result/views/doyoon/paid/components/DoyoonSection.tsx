import { DOYOON_TOKENS } from "./doyoonTokens";

// 도윤 유료 페이지 공통 섹션 컨테이너 + 헤더 슬롯.
// 도윤_final.html `.sec-dy / .slabel / .stitle / .sbody` 미러.

export function DoyoonSection({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="px-[14px] py-5 relative"
      style={{ borderBottom: `0.5px solid rgba(139,105,20,0.10)` }}
    >
      {children}
    </div>
  );
}

export function DoyoonSLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[13px] font-semibold mb-1.5 uppercase"
      style={{ color: DOYOON_TOKENS.goldSoft, letterSpacing: "0.05em" }}
    >
      {children}
    </div>
  );
}

export function DoyoonSTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[17px] font-bold mb-2 leading-[1.5]"
      style={{
        color: DOYOON_TOKENS.text,
        letterSpacing: "-0.01em",
        wordBreak: "keep-all",
      }}
    >
      {children}
    </div>
  );
}

export function DoyoonSBody({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[15px] leading-[1.75] mb-2"
      style={{
        color: DOYOON_TOKENS.textMeta,
        letterSpacing: "-0.01em",
        wordBreak: "keep-all",
      }}
    >
      {children}
    </div>
  );
}
