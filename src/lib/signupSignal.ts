// 신규 가입(첫 로그인) 1회 신호 — 세션 한정 in-memory.
// auth feature가 발화하고, 다른 feature(coin 등)가 구독한다. feature 간 직접 결합을 피하기
// 위한 공유 채널(둘 다 lib에만 의존). 새로고침엔 유지 안 됨(첫 로그인 순간에만 의미).

type Listener = () => void;
const listeners = new Set<Listener>();
let pending = false;

function emit(): void {
  listeners.forEach((l) => l());
}

export const signupSignal = {
  /** 신규 계정 로그인 직후 auth가 호출. */
  trigger(): void {
    pending = true;
    emit();
  },
  /** 소비자가 처리 후 호출 — 신호 해제. */
  consume(): void {
    pending = false;
    emit();
  },
  get(): boolean {
    return pending;
  },
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
