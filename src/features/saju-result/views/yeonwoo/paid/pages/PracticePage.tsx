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

interface PracticeData {
  ohang_lack_action: string;
  charm_sal_action: string;
  ai_ohang: string;
  ai_charm: string;
}

const MOCK_P9: PracticeData = {
  ohang_lack_action: "단단한 결을 일상에 두기",
  charm_sal_action: "작은 표현 하루 한 번",
  ai_ohang:
    "비어 있는 자리는 작은 행동으로 채워. 토(土)가 부족하면 안정된 환경을 만들어. 같은 자리에서 같은 시간에 같은 일.\n\n壬水 일간한테는 이 반복이 약이야. 흘러가는 물에 단단한 자리를 만드는 거야.",
  ai_charm:
    "도화살(桃花煞)을 누르려고 하지 마. 그건 너의 자리야. 다만 작은 표현 하나만 하루에 추가해. 한 줄, 한 마디, 한 시선.\n\n작은 표현이 너의 깊이를 밖으로 흐르게 해. 그러면 사람들이 너를 알아봐. 의식하지 마. 그냥 한 번씩.",
};

export default function PracticePage({ data }: { data?: PracticeData }) {
  const p = data ?? MOCK_P9;
  return (
    <section
      data-page-idx="9"
      className="text-[#d8d6d0]"
      style={{ fontFamily: "var(--font-pretendard)" }}
    >
      <PageHead
        chHanja="六"
        chCode="CH-6"
        title="연애운 상승 실천 가이드"
        sub="오행 보완 · 매력살 활용"
        iconAsset="/yeonwoo/icon/icon_flint.svg"
      />

      <Sec>
        <SectionLabel>6-1 오행 보완</SectionLabel>
        <SectionTitle>비어 있는 자리를 채우는 실천.</SectionTitle>
        <CardYw
          label="실천 ①"
          value={<VarTag>{p.ohang_lack_action}</VarTag>}
          sub="같은 자리에서 같은 시간에 같은 일. 작은 반복이 약이야."
        />
        <AiBlock text={p.ai_ohang} />

        <div className="flex items-start gap-3 my-3">
          <div className="relative w-[110px] h-[140px] flex-shrink-0">
            <Image
              src="/yeonwoo/sd_yw/yw_04.png"
              alt="강연우 — 매력살 활용"
              fill
              sizes="110px"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="flex-1">
            <YeonwooBubble text="크게 바꾸지 마. 작게 자주 바꿔." />
          </div>
        </div>
      </Sec>

      <Sec>
        <SectionLabel>6-2 매력살 활용</SectionLabel>
        <SectionTitle>너의 결을 흐르게 만드는 작은 행동.</SectionTitle>
        <CardYw
          label="실천 ②"
          value={<VarTag>{p.charm_sal_action}</VarTag>}
          sub="한 줄, 한 마디, 한 시선. 작은 표현이 깊이를 밖으로 끌어내."
        />
        <AiBlock text={p.ai_charm} />
        <YeonwooBubble text="실천은 작아야 오래 가." />
      </Sec>
    </section>
  );
}
