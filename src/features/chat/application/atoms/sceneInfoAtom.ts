// [application/atoms] 상태창(INFO) 전역 상태 — 캐릭터별 월드 상태 스냅샷.
// LLM 응답 tail(<<<INFO>>>)에서 매 턴 갱신. 첫 턴 전에도 패널이 보이도록 캐릭터별 시드 기본값.
// 의존성 방향: Application → Domain. UI를 import하지 않는다.
import { atom } from 'jotai';
import type { SceneInfo } from '@/features/chat/domain/model/sceneInfo';

export const sceneInfoSeed: Record<string, SceneInfo> = {
  yeonu: { place: '촛불 밝힌 상담실', timeHint: '늦은 밤', relation: '찾아온 손님', situation: '상담이 막 시작됐다' },
  doyoon: { place: '자료가 쌓인 작업실', timeHint: '늦은 오후', relation: '상담 온 의뢰인', situation: '분석을 준비하는 중' },
  kkebi: { place: '달빛 어린 툇마루', timeHint: '한밤중', relation: '심심풀이 말동무', situation: '느긋하게 마주 앉았다' },
};

export const sceneInfoAtom = atom<Record<string, SceneInfo>>(sceneInfoSeed);
