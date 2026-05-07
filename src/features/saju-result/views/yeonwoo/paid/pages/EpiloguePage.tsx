import Image from "next/image";
import PageHead from "../components/PageHead";
import { Sec, SectionLabel, SectionTitle, SectionBody } from "../components/Section";

export default function EpiloguePage() {
  return (
    <section
      data-page-idx="11"
      className="text-[#d8d6d0]"
      style={{ fontFamily: "var(--font-pretendard)" }}
    >
      <PageHead
        chHanja="終"
        chCode="EPILOGUE"
        title="연우의 마지막 말"
        sub="다 읽었어? 천천히 따라와."
        iconAsset="/yeonwoo/motif/motif_seal_jeom.svg"
        iconOpacity={0.35}
      />

      <Sec>
        <SectionLabel>마지막 한 마디</SectionLabel>
        <SectionTitle>여기까지 따라온 너에게.</SectionTitle>

        <div className="relative my-4 flex justify-center">
          <span
            aria-hidden
            className="absolute -top-2 -left-2 w-12 h-12 bg-no-repeat bg-contain pointer-events-none opacity-60 z-10"
            style={{ backgroundImage: "url(/yeonwoo/thread/thread_corner.png)" }}
          />
          <span
            aria-hidden
            className="absolute -bottom-2 -right-2 w-12 h-12 bg-no-repeat bg-contain pointer-events-none opacity-60 z-10"
            style={{ backgroundImage: "url(/yeonwoo/thread/thread_corner.png)", transform: "scale(-1,-1)" }}
          />
          <div className="relative w-[240px] h-[240px]">
            <Image
              src="/yeonwoo/sd_yw/yw_cg_c.png"
              alt="강연우 — 클로징"
              fill
              sizes="240px"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        {/* 강연우 하드코딩 멘트 (PAID_FEATURE.md: P-11 AI 슬롯 0개) */}
        <div
          className="rounded-[10px] px-4 py-5 my-3 text-center"
          style={{
            background: "linear-gradient(180deg, #1a1a18, #141413)",
            border: "0.5px solid rgba(200,168,112,0.25)",
          }}
        >
          <div
            className="text-[12px] mb-2 tracking-[0.15em] text-[#E8C9A0] uppercase"
          >
            강연우
          </div>
          <p
            className="text-[16px] leading-[1.95] text-[#d8d4cc]"
            style={{
              fontFamily: "var(--font-nanum-myeongjo)",
              wordBreak: "keep-all",
              letterSpacing: "0.01em",
            }}
          >
            &ldquo;다 읽었어? 네 팔자에 뭐가 걸려 있는지 이제 알겠지.
            <br />
            나는 여기까지 보여줬어. 다음은 네가 흐를 차례야.&rdquo;
          </p>
        </div>

        {/* 단청 디바이더 */}
        <div
          aria-hidden
          className="my-5 h-6 bg-no-repeat bg-center bg-contain opacity-80"
          style={{ backgroundImage: "url(/yeonwoo/motif/motif_dancheong.svg)" }}
        />

        {/* 緣 인장 (마지막 줄) */}
        <div className="flex flex-col items-center my-4 gap-2">
          <div
            aria-hidden
            className="w-16 h-16 bg-no-repeat bg-center bg-contain"
            style={{
              backgroundImage: "url(/yeonwoo/motif/motif_seal_yeon.svg)",
              filter: "drop-shadow(0 0 14px rgba(232,201,160,0.45))",
            }}
          />
          <SectionBody>
            <span
              className="block text-center text-[13px] text-[#888780] tracking-[0.1em]"
            >
              緣 — 이 결이 너를 어디로 데려갈지, 그건 시간이 답해.
            </span>
          </SectionBody>
        </div>
      </Sec>
    </section>
  );
}
