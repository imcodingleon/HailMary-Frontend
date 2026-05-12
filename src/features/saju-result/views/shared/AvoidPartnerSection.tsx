"use client";

import Image from "next/image";
import type { AvoidSlotKey } from "@/features/saju-result/domain/types";

const SECTION_BG = "#FDF5EA";

type Props = {
  slotId?: AvoidSlotKey | null;
  imageBasePath?: string;
};

export default function AvoidPartnerSection({
  slotId,
  imageBasePath = "/images/spouse",
}: Props) {
  // backend가 항상 `{m|f}-{element}-{yinyang}` 또는 `{m|f}-neutral` 반환.
  // null/undefined인 경우만 안전장치로 m-neutral 사용 (디렉토리에 파일 존재 필요).
  const safeSlot = slotId ?? "m-neutral";
  const imageSrc = `${imageBasePath}/${safeSlot}.png`;

  return (
    <div
      className="w-full px-3"
      style={{
        background: SECTION_BG,
        paddingTop: "24px",
        paddingBottom: "24px",
      }}
    >
      {/* 새 무료 사진은 자체에 프레임/블러 포함 → 추가 border/강제 비율 X. 3:4 본 비율로 자연 표시. */}
      <div className="w-full">
        <Image
          src={imageSrc}
          alt=""
          width={384}
          height={512}
          className="w-full h-auto block"
          sizes="(max-width: 448px) 100vw, 448px"
        />
      </div>
    </div>
  );
}
