import { EXAMS } from "../config/examRegistry";
import { shuffle } from "../logic/shuffle";

/**
 * EXAM REPOSITORY — the data-access layer.
 *
 * Today the question banks live in memory (imported JS modules), so these
 * functions are synchronous. If you later move questions to an API or a
 * database, this module is the ONLY file that needs to change: convert
 * these functions to async, fetch the data, and keep the same return
 * shapes — every screen and hook consumes the data exclusively through
 * this interface.
 */

/** All registered exams, in display order. */
export function listExams() {
  return EXAMS;
}

/** Look up a single exam definition by its id. */
export function getExam(id) {
  return EXAMS.find((e) => e.id === id) ?? null;
}

/**
 * Number of questions an attempt will actually contain.
 * Uses the configured count, capped by what the bank holds.
 */
export function effectiveQuestionCount(exam) {
  return Math.min(exam.questionCount, exam.bank.length);
}

/** True when the bank is smaller than the configured exam length. */
export function isPreviewBank(exam) {
  return exam.bank.length < exam.questionCount;
}

/** Draw a fresh, randomly ordered set of questions for one attempt. */
export function drawQuestions(exam) {
  return shuffle(exam.bank).slice(0, effectiveQuestionCount(exam));
}

/** Distinct skill domains covered by an exam's bank. */
export function listDomains(exam) {
  return [...new Set(exam.bank.map((q) => q.domain))];
}
