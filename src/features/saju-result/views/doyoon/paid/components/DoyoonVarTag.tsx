// 사용자 데이터 변수(USER_NAME, ILGAN 등) 강조 — 박스/배경 제거, 보라 bold만.
// 사용자 결정 2026-05-18: var-tag 배경/보더 완전 제거, 본문 흐름 안에 컬러+bold.

export function DoyoonVarTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-bold" style={{ color: "#3C3489" }}>
      {children}
    </span>
  );
}
