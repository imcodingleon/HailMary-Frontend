"use client";

import Image from "next/image";
import type { AvoidSlotKey } from "@/features/saju-result/domain/types";

const SECTION_BG = "#FDF5EA";
const CARD_BORDER = "#E0CFB6";

type Props = {
  slotId?: AvoidSlotKey | null;
  imageBasePath?: string;
};

export default function AvoidPartnerSection({
  slotId,
  imageBasePath = "/images/spouse",
}: Props) {
  const safeSlot = slotId ?? "neutral";
  // neutral은 캐릭터 분리 안 함 — 단일 fallback 이미지 사용.
  const imageSrc =
    safeSlot === "neutral"
      ? `/images/spouse/neutral.png`
      : `${imageBasePath}/${safeSlot}.png`;

  return (
    <div
      className="w-full px-3"
      style={{
        background: SECTION_BG,
        paddingTop: "24px",
        paddingBottom: "24px",
      }}
    >
      <div
        className="w-full overflow-hidden"
        style={{
          borderRadius: "12px",
          border: `1px solid ${CARD_BORDER}`,
        }}
      >
        <Image
          src={imageSrc}
          alt=""
          width={448}
          height={300}
          className="w-full h-auto block"
          sizes="(max-width: 448px) 100vw, 448px"
        />
      </div>
    </div>
  );
}
