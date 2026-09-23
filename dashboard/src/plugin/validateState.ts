import type { SquadState } from "../types/state";

/**
 * Runtime type guard for the `state.json` payload emitted by the Pipeline Runner.
 *
 * Kept in its own module (free of Node/Vite imports) so it can be unit-tested
 * without spinning up the dev-server plugin.
 */
export function isValidState(data: unknown): data is SquadState {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.status === "string" &&
    d.step != null &&
    typeof d.step === "object" &&
    Array.isArray(d.agents)
  );
}
