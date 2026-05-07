"use client";

import type { WuxingKey } from "@/features/saju/types";
import type {
  BlockingView,
  TenGodPatternKey,
} from "@/features/saju-result/domain/types";

const SECTION_BG = "#FDF5EA";
const CARD_BG = "#FDF5EA";
const CARD_BORDER = "#E0CFB6";
const BODY_COLOR = "#4a3a2a";
const SUB_COLOR = "#7A6B55";
const GOLDEN_ACCENT = "#AD7D38";
const RED_ACCENT = "#E94E3F";

const DOYOON_WUXING_HUES: Record<WuxingKey, string> = {
  목: "#4FB84F",
  화: "#E94E3F",
  토: "#E5A938",
  금: "#ABABAA",
  수: "#4180DC",
};

function pickIndex(id: string, poolLength: number): number {
  if (poolLength === 0) return 0;
  let hash = 0x811c9dc5;
  for (let i = 0; i < id.length; i++) {
    hash ^= id.charCodeAt(i);
    hash = (hash * 0x01000193) >>> 0;
  }
  return hash % poolLength;
}

function renderCopyWithHanjaAccent(
  copy: string,
  wuxingKey: WuxingKey | null,
): React.ReactNode {
  if (!wuxingKey) return copy;
  const hue = DOYOON_WUXING_HUES[wuxingKey] ?? BODY_COLOR;
  const first = copy.charAt(0);
  const rest = copy.slice(1);
  const hanjaSet = new Set(["木", "火", "土", "金", "水"]);
  if (hanjaSet.has(first)) {
    return (
      <>
        <span
          style={{
            fontFamily: '"NotoSerifTC", "ChosunNm", serif',
            fontWeight: 600,
            color: hue,
          }}
        >
          {first}
        </span>
        {rest}
      </>
    );
  }
  return copy;
}

export type BlockingDialogues = {
  elementCopies: Record<WuxingKey, string[]>;
  tenGodCopies: Record<TenGodPatternKey, string[]>;
  fallbackCopies: string[];
  reverseCardLabel?: string;
  reverseCardBody?: string;
};

const EMPTY_BLOCKING: BlockingView = {
  elementOverloadKey: null,
  tenGodPatternKey: null,
};

type Props = {
  blocking: BlockingView | null | undefined;
  sajuRequestId: string;
  dialogues: BlockingDialogues;
};

export default function BlockingSection({
  blocking,
  sajuRequestId,
  dialogues,
}: Props) {
  const safe = blocking ?? EMPTY_BLOCKING;

  const elementPool = safe.elementOverloadKey
    ? dialogues.elementCopies[safe.elementOverloadKey] ?? dialogues.fallbackCopies
    : dialogues.fallbackCopies;
  const elementCopy =
    elementPool[pickIndex(sajuRequestId, elementPool.length)] ??
    elementPool[0] ??
    "";

  const tenGodPool = safe.tenGodPatternKey
    ? dialogues.tenGodCopies[safe.tenGodPatternKey] ?? dialogues.fallbackCopies
    : dialogues.fallbackCopies;
  const tenGodCopy =
    tenGodPool[pickIndex(sajuRequestId + "_t", tenGodPool.length)] ??
    tenGodPool[0] ??
    "";

  const showFallback = !safe.elementOverloadKey && !safe.tenGodPatternKey;

  const reverseLabel = dialogues.reverseCardLabel ?? "하지만 데이터가 결합한다면?";
  const reverseBody =
    dialogues.reverseCardBody ??
    "어떻게 쓰냐에 따라 매력으로도 제일 강력한 무기로도 사용 가능합니다.";

  return (
    <div
      className="w-full"
      style={{
        background: SECTION_BG,
        paddingTop: "20px",
        paddingBottom: "32px",
      }}
    >
      <div
        style={{
          margin: "0 15px",
          background: CARD_BG,
          borderRadius: "22px",
          padding: "24px 0 24px",
        }}
      >
        <div
          style={{
            borderRadius: "14px",
            border: `1px solid ${CARD_BORDER}`,
            borderLeft: `4px solid ${RED_ACCENT}`,
            background: `${RED_ACCENT}08`,
            padding: "16px 16px 18px",
            marginBottom: "12px",
          }}
        >
          <p
            style={{
              fontSize: "16px",
              fontFamily: "Pretendard, sans-serif",
              fontWeight: 700,
              color: RED_ACCENT,
              letterSpacing: "0.05em",
              marginBottom: "10px",
            }}
          >
            지금 연애를 막는 것
          </p>
          <div
            style={{
              height: "1px",
              background: `${RED_ACCENT}33`,
              marginBottom: "12px",
            }}
          />
          {showFallback ? (
            <p
              style={{
                fontSize: "13px",
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 500,
                color: BODY_COLOR,
                lineHeight: 1.75,
                textWrap: "auto",
              }}
            >
              {elementCopy}
            </p>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {safe.elementOverloadKey && (
                <p
                  style={{
                    fontSize: "13px",
                    fontFamily: "Pretendard, sans-serif",
                    fontWeight: 500,
                    color: BODY_COLOR,
                    lineHeight: 1.75,
                    textWrap: "auto",
                  }}
                >
                  {renderCopyWithHanjaAccent(elementCopy, safe.elementOverloadKey)}
                </p>
              )}
              {safe.tenGodPatternKey && (
                <p
                  style={{
                    fontSize: "13px",
                    fontFamily: "Pretendard, sans-serif",
                    fontWeight: 500,
                    color: BODY_COLOR,
                    lineHeight: 1.75,
                    textWrap: "auto",
                  }}
                >
                  {tenGodCopy}
                </p>
              )}
            </div>
          )}
        </div>

        <div
          style={{
            borderRadius: "14px",
            border: `1px solid ${GOLDEN_ACCENT}55`,
            borderLeft: `4px solid ${GOLDEN_ACCENT}`,
            background: `${GOLDEN_ACCENT}0a`,
            padding: "16px 16px 18px",
          }}
        >
          <p
            style={{
              fontSize: "16px",
              fontFamily: "Pretendard, sans-serif",
              fontWeight: 700,
              color: GOLDEN_ACCENT,
              letterSpacing: "0.05em",
              marginBottom: "10px",
            }}
          >
            {reverseLabel}
          </p>
          <div
            style={{
              height: "1px",
              background: `${GOLDEN_ACCENT}33`,
              marginBottom: "12px",
            }}
          />
          <p
            style={{
              fontSize: "13px",
              fontFamily: "Pretendard, sans-serif",
              fontWeight: 500,
              color: SUB_COLOR,
              lineHeight: 1.75,
            }}
          >
            {reverseBody}
          </p>
        </div>
      </div>
    </div>
  );
}
