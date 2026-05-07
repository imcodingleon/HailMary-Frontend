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

interface BlockingPart1Data {
  ohang_excess: string;     // "수(水)"
  pattern_keyword: string;  // 반복 패턴 키워드
  ai_opening: string;       // Ch2 오프닝 300~350자
  ai_pattern: string;       // 반복 패턴 진단 250~300자
}

const MOCK_P3: BlockingPart1Data = {
  ohang_excess: "수(水)",
  pattern_keyword: "다 주고 혼자 끊는 결",
  ai_opening:
    "촛불을 거꾸로 비춰봐. 네 사주 안에 너무 많은 게 있어. 水(수) 기운이 넘쳐서 흐름이 막혀.\n\n과다(過多)는 부족만큼이나 위험해. 너무 많으면 흐르지 못하고 고여. 고이면 썩어. 네 연애가 그래왔어. 너는 다 줬는데 흐름이 안 만들어졌어.\n\n이 장에서 그걸 끊어줄게. 같은 자리에서 또 발목 잡히지 않게.",
  ai_pattern:
    "네 연애엔 같은 무늬가 반복돼. 처음엔 끌리고, 중반에 깊어지고, 끝엔 네가 다 짊어지고 끊어. 매번.\n\n壬水 일간이 그 자리를 만들어. 깊은 물은 받기는 잘 받는데 흘려보내질 못해. 한 번은 흐름을 끊어주는 사람을 만나야 해. 아니면 네가 흐름을 만드는 법을 배워야 해.",
};

export default function BlockingPart1Page({ data }: { data?: BlockingPart1Data }) {
  const p = data ?? MOCK_P3;
  return (
    <section
      data-page-idx="3"
      className="text-[#d8d6d0]"
      style={{ fontFamily: "var(--font-pretendard)" }}
    >
      <PageHead
        chHanja="二"
        chCode="CH-2"
        title="지금 연애를 막는 것 (1/2)"
        sub="방해 구조 · 반복 패턴 · 악연 컷팅"
        iconAsset="/yeonwoo/icon/icon_broken_thread.svg"
      />

      <Sec>
        <SectionLabel>2-1 과다 오행 진단</SectionLabel>
        <SectionTitle>
          지금 막고 있는 건 <VarTag>{p.ohang_excess}</VarTag>의 과다.
        </SectionTitle>
        <CardYw
          label="흐름을 막는 자리"
          value={<VarTag>{p.ohang_excess}</VarTag>}
          sub="너무 많으면 흐르지 못하고 고여. 부족만큼 위험해."
        />
        <AiBlock text={p.ai_opening} />

        <div className="flex justify-center my-3">
          <div className="relative w-full max-w-[240px] aspect-square">
            <Image
              src="/yeonwoo/sd_yw/yw_cg_b.png"
              alt="강연우 — 반전 안내"
              fill
              sizes="(max-width: 480px) 70vw, 240px"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
        <YeonwooBubble text="네 안에 너무 많은 걸 가지고 있어. 줄여야 흘러." />
      </Sec>

      <Sec>
        <SectionLabel>2-2 반복 패턴 진단</SectionLabel>
        <SectionTitle>네 연애엔 같은 무늬가 있어.</SectionTitle>
        <CardYw
          label="반복되는 결"
          value={<VarTag>{p.pattern_keyword}</VarTag>}
          sub="끌림 → 깊어짐 → 네가 다 짊어짐 → 끊어짐. 같은 곡선이야."
        />
        <AiBlock text={p.ai_pattern} />
        <YeonwooBubble text="같은 자리에서 또 끊어지면 그건 우연이 아니야." />
      </Sec>
    </section>
  );
}
