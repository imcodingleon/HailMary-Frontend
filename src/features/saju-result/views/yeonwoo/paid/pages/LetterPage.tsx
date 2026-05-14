import Image from "next/image";
import PageHead from "../components/PageHead";
import { Sec, VarTag } from "../components/Section";
import type { PaidChapterP10 } from "@/features/saju-result/domain/paidReport";

// P-10 (CH-7) 편지 — 박스 3개 분리 디자인.
// 박스 1: 지금의 너에게 (step1 답장)
// 박스 2: 네가 알고 싶은 것에 답할게 (step2 답장)
// 박스 3: 너의 한 줄에 답하다 (step3 quote + AI 답장 or 폴백 + 강조구 + 꼬리)
// 헤더: "강 연 우 의 편 지" + 일주 표기 (박스 1 위에 1번)
// 시그니처: "— 연우 올림" (박스 3 아래)

const MOCK_P10: PaidChapterP10 = {
  ilju_with_hanja: "임술(壬戌)",
  box1_body: "네가 선택한 고민, 잘 봤어.\n\n(MOCK — 박스 1 본문 영역)",
  box2_body: "(MOCK — 박스 2 본문 영역)",
  quote_text: "요즘 사람을 만나도 깊어지지 않아.",
  quote_label: "— 네가 적은 너의 고민",
  box3_body: "(MOCK — 박스 3 AI 답장 영역)",
  emphasis: "너 정도면 충분해. 아직 안 보일 뿐이야.",
  tail: "… 가봐. 이제 네 차례야. 오늘 밤은 좀 자.\n여기까지 와줘서 고마워. 또 와도 돼.",
  uses_ai: false,
};

export default function LetterPage({ data }: { data?: PaidChapterP10 }) {
  const p: PaidChapterP10 = data ?? MOCK_P10;
  return (
    <section
      data-page-idx="10"
      className="text-[#d8d6d0]"
      style={{ fontFamily: "var(--font-pretendard)" }}
    >
      <PageHead
        chHanja="七"
        chCode="CH-7"
        title="편지"
        sub="너의 한 줄에 답하다"
        iconAsset="/yeonwoo/motif/motif_seal_jeom.svg"
        iconOpacity={0.35}
      />

      <Sec>
        {/* SD yw_cg_a (sz-xxxl 240×316) 골드 글로우 + thread_corner 외곽 wrapper */}
        <div className="relative my-2" style={{ marginBottom: "-10px" }}>
          <span
            aria-hidden
            className="absolute -top-3 -left-3 w-[60px] h-[60px] bg-no-repeat bg-contain pointer-events-none opacity-65 z-10"
            style={{ backgroundImage: "url(/yeonwoo/thread/thread_corner.png)" }}
          />
          <span
            aria-hidden
            className="absolute -bottom-3 -right-3 w-[60px] h-[60px] bg-no-repeat bg-contain pointer-events-none opacity-65 z-10"
            style={{
              backgroundImage: "url(/yeonwoo/thread/thread_corner.png)",
              transform: "scale(-1,-1)",
            }}
          />
          <div className="flex justify-center">
            <div className="relative w-[240px] h-[316px]">
              <Image
                src="/yeonwoo/sd_yw/yw_cg_a.png"
                alt="강연우 — 편지 쓰는"
                fill
                sizes="240px"
                style={{
                  objectFit: "contain",
                  filter: "drop-shadow(0 0 18px rgba(232,201,160,0.35))",
                }}
              />
            </div>
          </div>
        </div>

        {/* 편지 헤더 (전체 박스 위에 1번) */}
        <LetterHeader ilju={p.ilju_with_hanja} />

        {/* 박스 1. 지금의 너에게 */}
        <LetterBox subtitle="지금의 너에게" body={p.box1_body} />

        {/* 박스 2. 네가 알고 싶은 것에 답할게 */}
        <LetterBox subtitle="네가 알고 싶은 것에 답할게" body={p.box2_body} />

        {/* 박스 3. 너의 한 줄에 답하다 */}
        <LetterBox3
          quoteText={p.quote_text}
          quoteLabel={p.quote_label}
          body={p.box3_body}
          emphasis={p.emphasis}
          tail={p.tail}
        />

        {/* 시그니처 (박스 3 아래) */}
        <LetterSignature />
      </Sec>
    </section>
  );
}

// ── 편지 헤더 ──
function LetterHeader({ ilju }: { ilju: string }) {
  return (
    <div className="mt-4 mb-5">
      <div
        className="text-center mb-1"
        style={{
          fontFamily: "var(--font-nanum-myeongjo)",
          fontSize: "13px",
          color: "#888",
          letterSpacing: "0.5em",
        }}
      >
        강 연 우 의 편 지
      </div>
      <div
        className="text-center pb-4"
        style={{
          fontSize: "13px",
          color: "#b0aea4",
          borderBottom: "0.5px solid rgba(200,168,112,0.20)",
        }}
      >
        — <VarTag>{ilju}</VarTag> 일주, 너에게
      </div>
    </div>
  );
}

// ── 박스 1·2 (공통 박스) ──
function LetterBox({ subtitle, body }: { subtitle: string; body: string }) {
  return (
    <div
      className="rounded-[12px] px-5 py-5 my-4"
      style={{
        background: "linear-gradient(180deg, #1a1715 0%, #14110f 100%)",
        border: "0.5px solid rgba(200,168,112,0.20)",
        boxShadow: "0 0 16px rgba(0,0,0,0.3) inset",
      }}
    >
      {/* 박스 부제 */}
      <div
        className="text-center mb-4 pb-2"
        style={{
          fontFamily: "var(--font-nanum-myeongjo)",
          fontSize: "13px",
          color: "#E8C9A0",
          letterSpacing: "0.1em",
          borderBottom: "0.5px dashed rgba(232,201,160,0.20)",
        }}
      >
        {subtitle}
      </div>

      {/* 본문 */}
      <BodyText body={body} />
    </div>
  );
}

// ── 박스 3 (quote + 답장 + 강조구 + 꼬리) ──
function LetterBox3({
  quoteText,
  quoteLabel,
  body,
  emphasis,
  tail,
}: {
  quoteText: string;
  quoteLabel: string;
  body: string;
  emphasis: string;
  tail: string;
}) {
  return (
    <div
      className="rounded-[12px] px-5 py-5 my-4"
      style={{
        background: "linear-gradient(180deg, #1a1715 0%, #14110f 100%)",
        border: "0.5px solid rgba(200,168,112,0.30)",
        boxShadow: "0 0 24px rgba(0,0,0,0.4) inset",
      }}
    >
      {/* 박스 부제 */}
      <div
        className="text-center mb-4 pb-2"
        style={{
          fontFamily: "var(--font-nanum-myeongjo)",
          fontSize: "13px",
          color: "#E8C9A0",
          letterSpacing: "0.1em",
          borderBottom: "0.5px dashed rgba(232,201,160,0.20)",
        }}
      >
        너의 한 줄에 답하다
      </div>

      {/* quote 영역 */}
      <div
        className="rounded-[8px] px-3 py-3 mb-5 text-center"
        style={{
          background: "rgba(232,201,160,0.05)",
          border: "0.5px dashed rgba(232,201,160,0.30)",
        }}
      >
        <div
          className="text-[14px] leading-[1.75] italic mb-1"
          style={{
            color: "#d8d4cc",
            fontFamily: "var(--font-nanum-myeongjo)",
            wordBreak: "keep-all",
          }}
        >
          &ldquo;<VarTag>{quoteText}</VarTag>&rdquo;
        </div>
        <div
          className="text-[11px]"
          style={{ color: "#888", letterSpacing: "0.04em" }}
        >
          {quoteLabel}
        </div>
      </div>

      {/* 답장 본문 */}
      <BodyText body={body} />

      {/* 강조구 (굵게) */}
      <p className="mt-4 mb-2">
        <span
          style={{
            color: "#E8C9A0",
            fontWeight: 600,
            fontSize: "15px",
          }}
        >
          {emphasis}
        </span>
      </p>

      {/* 꼬리 */}
      <p style={{ color: "#b0aea4", fontSize: "14px", lineHeight: 1.85, whiteSpace: "pre-line" }}>
        {tail}
      </p>
    </div>
  );
}

// ── 시그니처 ──
function LetterSignature() {
  return (
    <div
      className="text-right mt-4 mb-2 px-2"
      style={{
        fontFamily: "var(--font-nanum-myeongjo)",
        fontSize: "14px",
        color: "#E8C9A0",
        letterSpacing: "0.05em",
      }}
    >
      — 연우 올림
    </div>
  );
}

// ── 본문 단락 렌더 ──
function BodyText({ body }: { body: string }) {
  return (
    <div
      className="text-[14px] leading-[1.95]"
      style={{
        color: "#d8d6d0",
        wordBreak: "keep-all",
        letterSpacing: "-0.005em",
      }}
    >
      {body.split("\n\n").map((para, i) => {
        // **굵게** 마크다운 처리 (간단 inline parse)
        const parts = para.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i} className="mb-3 last:mb-0">
            {parts.map((part, j) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return (
                  <strong
                    key={j}
                    style={{ color: "#E8C9A0", fontWeight: 600 }}
                  >
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              return <span key={j}>{part}</span>;
            })}
          </p>
        );
      })}
    </div>
  );
}
