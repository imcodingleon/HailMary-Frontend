// 도윤 페이지 페이즈 진입 전 placeholder. 각 P-N 작업 시 별도 페이지 컴포넌트로 대체.

interface DoyoonStubPageProps {
  chapter: string;
  title: string;
}

export default function DoyoonStubPage({ chapter, title }: DoyoonStubPageProps) {
  return (
    <div
      className="rounded-md flex flex-col items-center justify-center text-center px-6"
      style={{
        background: "#fffdf7",
        color: "#2c1a08",
        minHeight: "60vh",
      }}
    >
      <div
        className="text-[12px] font-semibold mb-2"
        style={{ color: "#a07840", letterSpacing: "0.08em" }}
      >
        {chapter}
      </div>
      <div
        className="text-[18px] font-bold mb-3"
        style={{ color: "#8B6914" }}
      >
        {title}
      </div>
      <div className="text-[13px]" style={{ color: "#7a5020" }}>
        이 페이지는 아직 작성 중입니다. 다음 페이즈 진입 시 채워집니다.
      </div>
    </div>
  );
}
