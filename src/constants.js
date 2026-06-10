/** Shared UI constants used across components. */

/** Matrix answer labels — index 0 = "Yes", index 1 = "No" (matches bank data). */
export const YN = ["Yes", "No"];

/** Option letters for single/multi choice questions. */
export const LETTERS = "ABCDEFGH";

/** Human-readable label for each question type. */
export function questionTypeLabel(q) {
  if (q.type === "single") return "Single choice — select one answer";
  if (q.type === "multi") return `Multiple choice — select exactly ${q.pick}`;
  return "Yes / No — answer every statement";
}
