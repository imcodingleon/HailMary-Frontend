// [application/atoms] 추천 답변 — 캐릭터별 유저 답변 후보 3개.
// LLM 응답 tail(<<<INFO>>>의 suggestions)에서 매 턴 갱신. 첫 턴 전엔 캐릭터별 오프너 시드.
// 의존성 방향: Application → Domain. UI를 import하지 않는다.
import { atom } from 'jotai';

export const suggestionsSeed: Record<string, string[]> = {
  yeonu: ['무슨 얘기부터 해야 할지 모르겠어.', '요즘 좀 지쳤어.', '그냥… 답답해서 왔어.'],
  doyoon: ['요즘 마음이 복잡해요.', '어디서부터 말해야 할까요?', '괜찮아질 수 있을까요?'],
  kkebi: ['깨비야, 심심해서 왔어.', '오늘 운세 어때?', '그냥 얘기나 하자.'],
};

export const suggestionsAtom = atom<Record<string, string[]>>(suggestionsSeed);
