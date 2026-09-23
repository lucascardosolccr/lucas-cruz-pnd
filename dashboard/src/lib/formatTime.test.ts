import { describe, it, expect } from "vitest";
import { formatElapsed } from "./formatTime";

describe("formatElapsed", () => {
  it("formats sub-minute durations as mm:ss", () => {
    expect(formatElapsed(0)).toBe("00:00");
    expect(formatElapsed(5_000)).toBe("00:05");
    expect(formatElapsed(59_000)).toBe("00:59");
  });

  it("formats minute durations as mm:ss", () => {
    expect(formatElapsed(65_000)).toBe("01:05");
    expect(formatElapsed(600_000)).toBe("10:00");
  });

  it("formats hour-plus durations as h:mm:ss", () => {
    expect(formatElapsed(3_600_000)).toBe("1:00:00");
    expect(formatElapsed(3_665_000)).toBe("1:01:05");
  });

  it("clamps negative and non-finite values to zero", () => {
    expect(formatElapsed(-1000)).toBe("00:00");
    expect(formatElapsed(Number.NaN)).toBe("00:00");
    expect(formatElapsed(Number.POSITIVE_INFINITY)).toBe("00:00");
  });
});
