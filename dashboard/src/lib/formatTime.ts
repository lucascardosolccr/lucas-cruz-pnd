/**
 * Format an elapsed duration (in milliseconds) as a compact clock string.
 *
 * - Under one hour  → "mm:ss"      (e.g. 65_000  → "01:05")
 * - One hour or more → "h:mm:ss"   (e.g. 3_665_000 → "1:01:05")
 *
 * Negative or non-finite inputs are clamped to zero so the UI never shows NaN.
 */
export function formatElapsed(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) ms = 0;

  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return hours > 0
    ? `${hours}:${pad(minutes)}:${pad(seconds)}`
    : `${pad(minutes)}:${pad(seconds)}`;
}
