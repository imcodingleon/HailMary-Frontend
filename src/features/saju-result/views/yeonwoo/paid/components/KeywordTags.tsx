// HTML .tag-yw 디자인 답습 — 골드 알약 모양 태그.
// 사용처: P-4 2-3 악연 키워드 태그.

interface KeywordTagsProps {
  tags: ReadonlyArray<string>;
}

export default function KeywordTags({ tags }: KeywordTagsProps) {
  return (
    <div className="my-2 flex flex-wrap gap-1 justify-center">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-block rounded-[20px] px-2.5 py-[3px] text-[13px]"
          style={{
            background: "rgba(200,168,112,0.12)",
            color: "#E8C9A0",
            border: "0.5px solid rgba(200,168,112,0.25)",
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
