// [ui] HeaderTitle — 헤더 타이틀 + 옆 선황금 문양(공통). 표시 전용 Dumb.
// 네 탭 헤더가 동일한 타이틀 스타일 + title-ornament.png(선황금 문양)를 아이콘 크기로 세로 중앙 정렬해 붙인다.
// 문양 이미지 실패 시 문양 없이 타이틀만(fallback). 경로는 decorAsset util에서만.
import IconImg from './IconImg';
import { decorAsset } from './decorAsset';

export default function HeaderTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2">
      <h1 className="font-title text-2xl font-semibold text-seonhwanggeum">{title}</h1>
      <IconImg
        src={decorAsset.titleOrnament}
        alt=""
        className="h-7 w-7 shrink-0 object-contain"
        fallback={null}
      />
    </div>
  );
}
