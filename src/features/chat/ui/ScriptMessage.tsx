// [ui] ScriptMessage — 캐릭터 텍스트 응답을 크랙식 스크립트 컬럼으로 렌더. 표시 전용 Dumb.
// 지문(3인칭 서술 = 회색 이탤릭) 블록과 대사(`이름 | "대사"`) 블록을 빈 줄 기준으로 분리.
// 블록 분리 톤은 YeonuSajuView(이탤릭 회색 scene + dohwahong 라벨) 패턴 차용.
import { parseScript } from '@/features/chat/domain/service/parseScript';

export interface ScriptMessageProps {
  content: string;
  characterName: string;
  sajuMode: boolean;
}

export default function ScriptMessage({ content, characterName, sajuMode }: ScriptMessageProps) {
  const blocks = parseScript(content);
  if (blocks.length === 0) return null;

  return (
    <div className={`flex w-full flex-col gap-2 ${sajuMode ? 'border-l-2 border-dohwahong/40 pl-3' : ''}`}>
      {blocks.map((b, i) =>
        b.kind === 'narration' ? (
          <p key={i} className="font-body text-sm italic leading-relaxed text-hwaseonji/55">
            {b.text}
          </p>
        ) : (
          <p key={i} className="font-body text-sm leading-relaxed text-hwaseonji">
            <span className="font-title text-dohwahong">{characterName} │ </span>
            {b.text}
          </p>
        ),
      )}
    </div>
  );
}
