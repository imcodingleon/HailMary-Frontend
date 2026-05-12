// 유료 결과지 인연/악연 사진 매칭 컴포넌트 (P-4, P-6 공용).
// 사진은 spouse-face-prompts.md slotId 20 매트릭스 + neutral fallback.
// 경로: /images/spouse/{character}/paid/{type}/{slotId}.png (원본, 블러 X)
// neutral: /images/spouse/neutral.png (캐릭터 분리 안 함)

import Image from "next/image";

interface SpouseImageProps {
  character: "yeonwoo" | "doyoon";
  type: "avoid" | "match";
  slotId: string | null | undefined;
  alt?: string;
}

export default function SpouseImage({
  character,
  type,
  slotId,
  alt,
}: SpouseImageProps) {
  const safeSlot = slotId ?? "neutral";
  const src =
    safeSlot === "neutral"
      ? "/images/spouse/neutral.png"
      : `/images/spouse/${character}/paid/${type}/${safeSlot}.png`;

  return (
    <div className="relative my-3 mx-auto w-full max-w-[280px] aspect-[3/4]">
      <Image
        src={src}
        alt={alt ?? (type === "avoid" ? "악연 얼굴" : "인연 얼굴")}
        fill
        sizes="280px"
        style={{ objectFit: "cover", borderRadius: "8px" }}
      />
    </div>
  );
}
