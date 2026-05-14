"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InfoForm from "@/features/saju/views/shared/InfoForm";
import SurveyCut from "@/features/saju/views/shared/SurveyCut";
import { SURVEY_STEPS } from "@/features/saju/domain/surveyOptions";
import { useCharacterSajuFlow } from "@/features/saju/hooks/useCharacterSajuFlow";

// QA 전용 진입 페이지 — 스토리/캐릭터 선택 스킵.
// 캐릭터는 yeonwoo 고정 (풀 플로 구현된 캐릭터). 흐름:
//   info → step1 → step2 → step3 → submitting → /saju/result?character=yeonwoo

type Stage = "info" | "step1" | "step2" | "step3" | "submitting";

export default function QaTestPage() {
  const router = useRouter();
  const flow = useCharacterSajuFlow({ storageKeyPrefix: "yeonwoo" });
  const [stage, setStage] = useState<Stage>("info");

  // /api/saju/free 응답이 success로 떨어지면 무료 결과 페이지로 이동.
  useEffect(() => {
    if (stage === "submitting" && flow.sajuStatus === "success") {
      router.push("/saju/result?character=yeonwoo");
    }
  }, [stage, flow.sajuStatus, router]);

  return (
    <main className="relative min-h-[100dvh] bg-black text-white">
      {/* QA 안내 배너 */}
      <div
        className="absolute left-0 right-0 top-0 z-30 px-4 py-1.5 text-center text-[11px]"
        style={{ background: "rgba(232,201,160,0.10)", color: "#E8C9A0", letterSpacing: "0.05em" }}
      >
        QA 테스트 모드 · 강연우 고정 · 스토리 스킵
      </div>

      {stage === "info" && (
        <InfoForm
          characterId="yeonwoo"
          buttonLabel="다음 →"
          onSubmit={(info) => {
            flow.submitInfo(info);
            setStage("step1");
          }}
        />
      )}

      {stage === "step1" && (
        <SurveyCut
          step={1}
          config={SURVEY_STEPS[1]}
          characterId="yeonwoo"
          onAnswer={(answers) => {
            flow.setSurveyAnswers((prev) => ({ ...prev, step1: answers }));
            setStage("step2");
          }}
        />
      )}

      {stage === "step2" && (
        <SurveyCut
          step={2}
          config={SURVEY_STEPS[2]}
          characterId="yeonwoo"
          onAnswer={(answers) => {
            flow.setSurveyAnswers((prev) => ({ ...prev, step2: answers }));
            setStage("step3");
          }}
        />
      )}

      {stage === "step3" && (
        <SurveyCut
          step={3}
          config={SURVEY_STEPS[3]}
          characterId="yeonwoo"
          buttonLabel="결과 보기 →"
          onAnswer={(text) => {
            flow.finalizeSurvey({ ...flow.surveyAnswers, step3: text });
            setStage("submitting");
          }}
        />
      )}

      {stage === "submitting" && (
        <div className="flex min-h-[100dvh] items-center justify-center">
          <div className="text-center">
            <div className="mb-3 text-[14px]" style={{ color: "#E8C9A0", letterSpacing: "0.1em" }}>
              사주 분석 중
            </div>
            <div className="text-[11px] text-[#888]">잠시만 기다려 줘.</div>
          </div>
        </div>
      )}
    </main>
  );
}
