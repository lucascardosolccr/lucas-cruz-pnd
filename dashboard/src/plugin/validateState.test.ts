import { describe, it, expect } from "vitest";
import { isValidState } from "./validateState";

const validState = {
  squad: "demo",
  status: "running",
  step: { current: 1, total: 3, label: "research" },
  agents: [],
  handoff: null,
  startedAt: null,
  updatedAt: "2026-01-01T00:00:00Z",
};

describe("isValidState", () => {
  it("accepts a well-formed state object", () => {
    expect(isValidState(validState)).toBe(true);
  });

  it("rejects non-objects", () => {
    expect(isValidState(null)).toBe(false);
    expect(isValidState(undefined)).toBe(false);
    expect(isValidState("running")).toBe(false);
    expect(isValidState(42)).toBe(false);
  });

  it("rejects objects missing required fields", () => {
    expect(isValidState({ ...validState, status: undefined })).toBe(false);
    expect(isValidState({ ...validState, step: null })).toBe(false);
    expect(isValidState({ ...validState, agents: "nope" })).toBe(false);
  });
});
