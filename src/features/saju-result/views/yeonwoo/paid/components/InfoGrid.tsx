// HTML .info-row 디자인 답습 — key/val 6 row 점선 구분.
// 사용처: P-4 2-3 악연 외형 정보 그리드.

interface InfoGridProps {
  rows: ReadonlyArray<{ key: string; val: string }>;
}

export default function InfoGrid({ rows }: InfoGridProps) {
  return (
    <div
      className="rounded-[8px] px-[11px] py-[10px] my-2"
      style={{
        background: "#1a1a18",
        border: "0.5px solid #2a2a28",
      }}
    >
      {rows.map((row, i) => (
        <div
          key={row.key}
          className="flex justify-between py-2"
          style={{
            fontSize: "13px",
            borderBottom:
              i === rows.length - 1
                ? "none"
                : "0.5px dashed rgba(200,168,112,0.15)",
          }}
        >
          <span style={{ color: "#888780" }}>{row.key}</span>
          <span
            className="text-right"
            style={{
              color: "#d8d6d0",
              fontWeight: 500,
              maxWidth: "60%",
              wordBreak: "keep-all",
            }}
          >
            {row.val}
          </span>
        </div>
      ))}
    </div>
  );
}
