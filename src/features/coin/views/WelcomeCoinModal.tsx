"use client";

// 신규 가입 웰컴 코인 팝업 (순수 뷰 — 데이터/동작은 props로).
// 도화선 톤(다크 #1a1715 / 골드 #E8C9A0 / 나눔명조)에 맞춘 심플 베이스.
// ※ 캐릭터 연출 버전은 디자이너가 이 컴포넌트를 교체할 수 있게 순수 뷰로 유지.

const SIGNUP_GRANT = 30;

export default function WelcomeCoinModal({
  balance,
  onClose,
}: {
  balance: number | null;
  onClose: () => void;
}) {
  const shown = balance ?? SIGNUP_GRANT;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="가입 환영"
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.7)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-[12px] px-6 py-8 text-center"
        style={{
          background: "#1a1715",
          border: "0.5px solid rgba(200,168,112,0.30)",
          boxShadow: "0 0 32px rgba(0,0,0,0.5)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          className="mb-5 text-[19px]"
          style={{
            fontFamily: "var(--font-nanum-myeongjo)",
            color: "#E8C9A0",
          }}
        >
          환영해
        </h2>

        <div className="mb-5 flex items-end justify-center gap-1.5">
          <span
            className="text-[44px] leading-none"
            style={{
              fontFamily: "var(--font-nanum-myeongjo)",
              color: "#E8C9A0",
            }}
          >
            {shown}
          </span>
          <span
            className="pb-1 text-[15px]"
            style={{ color: "rgba(232,201,160,0.70)" }}
          >
            코인
          </span>
        </div>

        <p
          className="mb-7 text-[14px] leading-relaxed"
          style={{ color: "rgba(232,201,160,0.72)" }}
        >
          가입 선물로 코인 {shown}개를 넣어뒀어.
          <br />
          연애운·채팅에 쓸 수 있어.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-[10px] py-3 text-[15px] transition-opacity hover:opacity-90"
          style={{
            background: "#E8C9A0",
            color: "#1a1715",
            fontFamily: "var(--font-nanum-myeongjo)",
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
}
