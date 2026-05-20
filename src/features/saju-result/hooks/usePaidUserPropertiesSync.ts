"use client";

// 유료 결과 p0 진입 시 1회만 Amplitude identify + setUserId 호출.
// 백엔드 PaidReportResponse.user (PII 가공값) 가 단일 입력 소스.
// 응답 snake_case 그대로 전송 (Amplitude property key 도 snake_case 권장).

import { useEffect, useRef } from "react";
import { setUserId, setUserProperties } from "@/shared/utils/analytics";

export interface PaidUserProperties {
  user_id: string;
  user_nickname: string | null;
  user_name_initial: string;
  user_email_domain: string;
  user_email_hash: string;
  birth_year: number;
  age_group: string;
  birth_branch: string | null;
  gender: string;
}

interface Args {
  user: PaidUserProperties | null | undefined;
  active: boolean;  // p0 가 현재 활성 페이지일 때만 동작
}

export function usePaidUserPropertiesSync({ user, active }: Args): void {
  const syncedRef = useRef<string | null>(null);  // 동기화된 user_id

  useEffect(() => {
    if (!active) return;
    if (!user) return;
    if (syncedRef.current === user.user_id) return;

    setUserId(user.user_id);
    setUserProperties({
      user_nickname: user.user_nickname,
      user_name_initial: user.user_name_initial,
      user_email_domain: user.user_email_domain,
      user_email_hash: user.user_email_hash,
      birth_year: user.birth_year,
      age_group: user.age_group,
      birth_branch: user.birth_branch,
      gender: user.gender,
    });

    syncedRef.current = user.user_id;
  }, [active, user]);
}
