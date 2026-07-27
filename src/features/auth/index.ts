export { useAuth } from "./hooks/useAuth";
export { useLoginGate } from "./hooks/useLoginGate";
export type {
  LoginGate,
  LoginGateModalProps,
  LoginGateOptions,
} from "./hooks/useLoginGate";
export { LoginPromptModal } from "./views/LoginPromptModal";
export { saveLastUsed } from "./domain/lastUsed";
export type { LastUsedPayload } from "./domain/lastUsed";
export type {
  AuthProvider,
  AccountProfile,
  LastUsedProfile,
} from "./domain/types";
