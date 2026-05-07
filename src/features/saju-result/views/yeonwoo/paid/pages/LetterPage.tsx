import Image from "next/image";
import PageHead from "../components/PageHead";
import AiBlock from "../components/AiBlock";
import { Sec, SectionLabel, SectionTitle } from "../components/Section";

interface LetterData {
  ai_letter: string;       // 편지 클라이맥스 톤
}

const MOCK_P10: LetterData = {
  ai_letter:
    "너에게.\n\n네가 적어 보낸 한 줄을 받았어. 짧지만 거기엔 네 결이 다 들어 있더라. 너는 자신을 작게 적어 놓고, 그게 네 전부라고 믿어.\n\n네 한 줄에 답할게. 너는 깊은 사람이야. 너 자신도 못 다 본 깊이가 있어. 사람들은 그걸 다 못 봐도 돼. 너만 알아주면 돼.\n\n다음에 다시 만날 때 너는 지금보다 한 결 더 단단해져 있을 거야. 그러면 그때, 네가 적은 한 줄이 다른 의미로 읽힐 거야.\n\n— 연우.",
};

export default function LetterPage({ data }: { data?: LetterData }) {
  const p = data ?? MOCK_P10;
  return (
    <section
      data-page-idx="10"
      className="text-[#d8d6d0]"
      style={{ fontFamily: "var(--font-pretendard)" }}
    >
      <PageHead
        chHanja="七"
        chCode="CH-7"
        title="연우의 편지"
        sub="너의 한 줄에 답하다"
        iconAsset="/yeonwoo/motif/motif_seal_jeom.svg"
        iconOpacity={0.35}
      />

      <Sec>
        <SectionLabel>7-1 편지</SectionLabel>
        <SectionTitle>너의 한 줄을 받았어.</SectionTitle>

        {/* Y-11 외곽 wrapper 대각 액센트 */}
        <div className="relative my-3">
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
          <div className="flex justify-center">
            <div className="relative w-[240px] h-[316px]">
              <Image
                src="/yeonwoo/sd_yw/yw_cg_a.png"
                alt="강연우 — 편지"
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

        <AiBlock text={p.ai_letter} />
      </Sec>
    </section>
  );
}
