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
import PersonFrame from "../components/PersonFrame";

interface BlockingPart2Data {
  akyon_keyword: string;
  illusion_keyword: string;
  ai_akyon: string;     // 악연 특징 350~450자
  ai_illusion: string;  // 착각 인연 식별 350~400자
}

const MOCK_P4: BlockingPart2Data = {
  akyon_keyword: "보이는 듯 안 보이는 사람",
  illusion_keyword: "익숙한 결",
  ai_akyon:
    "네가 가장 위험하게 끌리는 사람은 처음엔 다 알 것 같은 사람이야. 말은 적고 눈빛은 깊은. 너랑 비슷한 결이라고 느껴지는 그런 사람.\n\n근데 그 사람은 너한테서 받기만 해. 네가 줄수록 그 사람은 더 멀어져. 그게 악연의 무늬야.\n\n壬水 일간은 자기랑 닮은 깊이에 끌려. 그게 함정이야. 진짜 인연은 너랑 다른 결이야. 너를 흘려보내 주는 사람.",
  ai_illusion:
    "익숙하다고 인연이 아니야. 익숙한 건 그냥 너를 닮은 결이야. 네가 만든 패턴 위에 올라탄 사람이야.\n\n진짜 인연은 처음엔 어색해. 네 결을 흔들거든. 너는 그게 불편해서 밀어내. 매번. 그러면서 익숙한 결로 다시 돌아가.\n\n이번엔 어색한 사람을 한 번 그대로 둬봐. 끊지 말고. 그 어색함이 흐름을 만들어줄 거야.",
};

export default function BlockingPart2Page({ data }: { data?: BlockingPart2Data }) {
  const p = data ?? MOCK_P4;
  return (
    <section
      data-page-idx="4"
      className="text-[#d8d6d0]"
      style={{ fontFamily: "var(--font-pretendard)" }}
    >
      <PageHead
        chHanja="二"
        chCode="CH-2"
        title="지금 연애를 막는 것 (2/2)"
        sub="방해 구조 · 반복 패턴 · 악연 컷팅"
        iconAsset="/yeonwoo/icon/icon_broken_thread.svg"
      />

      <Sec>
        <SectionLabel>2-3 악연 특징</SectionLabel>
        <SectionTitle>이런 사람이 너를 가장 깊게 다치게 해.</SectionTitle>

        <PersonFrame person="akyon" />

        <CardYw
          label="악연 키워드"
          value={<VarTag>{p.akyon_keyword}</VarTag>}
          sub="처음엔 다 알 것 같은 사람. 받기만 하고 더 멀어져."
        />
        <AiBlock text={p.ai_akyon} />
      </Sec>

      <Sec>
        <SectionLabel>2-4 착각 인연 식별</SectionLabel>
        <SectionTitle>익숙하다고 인연이 아니야.</SectionTitle>
        <div className="flex items-start gap-3 my-3">
          <div className="relative w-[110px] h-[140px] flex-shrink-0">
            <Image
              src="/yeonwoo/sd_yw/yw_cg_e.png"
              alt="강연우 — 경고"
              fill
              sizes="110px"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="flex-1">
            <CardYw
              label="식별 신호"
              value={<VarTag>{p.illusion_keyword}</VarTag>}
              sub="네 패턴 위에 올라탄 사람. 진짜 인연은 처음엔 어색해."
            />
          </div>
        </div>
        <AiBlock text={p.ai_illusion} />
        <YeonwooBubble text="가위는 가끔 들어야 해. 안 그러면 너만 다쳐." />
      </Sec>
    </section>
  );
}
