import Image from "next/image";
import PageHead from "../components/PageHead";
import AiBlock from "../components/AiBlock";
import {
  Sec,
  SectionLabel,
  SectionTitle,
  CardYw,
  VarTag,
  YeonwooBubble,
} from "../components/Section";

interface DestinedPart2Data {
  ending_a: string;
  ending_b: string;
  ending_c: string;
  ai_ending: string;     // Ch4 클로징 결말 시나리오 400~450자
}

const MOCK_P7: DestinedPart2Data = {
  ending_a: "한 번에 결정",
  ending_b: "흐름이 만들어줌",
  ending_c: "어긋난 자리에서 끊김",
  ai_ending:
    "결말은 세 갈래야. 하나, 너희 둘 다 한 번에 알아보는 결. 처음 마주한 자리에서 시간이 멈춰. 흔하지 않아.\n\n둘, 시간이 흐름을 만들어주는 결. 처음엔 어색해. 그러다 어느 순간 둘 다 멈춰서 서로를 봐. 가장 일반적이고 가장 단단한 결이야.\n\n셋, 어긋난 자리에서 끊기는 결. 너무 늦거나 너무 빠르거나. 둘 중 하나가 다른 자리에 가 있을 때 그 결이 와.\n\n네 사주는 두 번째 결에 가까워. 시간을 줘. 너 자신한테도, 그 사람한테도. 한 번에 다 알아보려고 하지 마.",
};

export default function DestinedPart2Page({ data }: { data?: DestinedPart2Data }) {
  const p = data ?? MOCK_P7;
  return (
    <section
      data-page-idx="7"
      className="text-[#d8d6d0]"
      style={{ fontFamily: "var(--font-pretendard)" }}
    >
      <div className="relative">
        <PageHead
          chHanja="四"
          chCode="CH-4"
          title="운명의 짝 · 결말 (2/2)"
          sub="인연 프로파일 · 속마음 · 결말 예측"
          iconAsset="/yeonwoo/icon/icon_two_threads.svg"
        />
        <span
          aria-hidden
          className="absolute top-0 right-0 w-12 h-12 bg-no-repeat bg-contain pointer-events-none opacity-80"
          style={{ backgroundImage: "url(/yeonwoo/decoration/decoration_petals.svg)" }}
        />
      </div>

      <Sec>
        <SectionLabel>4-4 결말 시나리오</SectionLabel>
        <SectionTitle>세 갈래 중 하나로 가.</SectionTitle>

        <CardYw
          label="갈래 ①"
          value={<VarTag>{p.ending_a}</VarTag>}
          sub="처음 마주한 자리에서 시간이 멈춰. 흔하지 않아."
        />
        <CardYw
          label="갈래 ②"
          value={<VarTag>{p.ending_b}</VarTag>}
          sub="처음엔 어색해. 시간이 흐름을 만들어. 가장 단단한 결."
        />
        <CardYw
          label="갈래 ③"
          value={<VarTag>{p.ending_c}</VarTag>}
          sub="너무 늦거나 너무 빠르거나. 어긋난 자리에서 끊겨."
        />
        <AiBlock text={p.ai_ending} />

        <div className="flex items-start gap-3 my-3">
          <div className="relative w-[96px] h-[128px] flex-shrink-0">
            <Image
              src="/yeonwoo/sd_yw/yw_05.png"
              alt="강연우 — 결말"
              fill
              sizes="96px"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="flex-1">
            <YeonwooBubble text="결말은 정해져 있지 않아. 네가 어느 자리에 서 있는지로 결정돼." />
          </div>
        </div>
      </Sec>
    </section>
  );
}
