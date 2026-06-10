/**
 * GRADING — pure scoring logic. No React, no UI, fully unit-testable.
 *
 * Scoring rule (mirrors Microsoft's item scoring): a question counts as
 * correct only when it is FULLY correct — the exact selection set for
 * multi-choice, and every statement for matrix questions.
 */

/** Has the question been completely answered? */
export function isAnswered(q, ans) {
  if (ans === undefined || ans === null) return false;
  if (q.type === "single") return typeof ans === "number";
  if (q.type === "multi") return Array.isArray(ans) && ans.length === q.pick;
  if (q.type === "matrix")
    return (
      Array.isArray(ans) &&
      ans.length === q.statements.length &&
      ans.every((v) => v === 0 || v === 1)
    );
  return false;
}

/** Is the given answer fully correct? Unanswered questions are incorrect. */
export function isCorrect(q, ans) {
  if (!isAnswered(q, ans)) return false;
  if (q.type === "single") return ans === q.correct[0];
  if (q.type === "multi") {
    const a = [...ans].sort((x, y) => x - y);
    const c = [...q.correct].sort((x, y) => x - y);
    return a.length === c.length && a.every((v, i) => v === c[i]);
  }
  if (q.type === "matrix") return ans.every((v, i) => v === q.matrixAnswers[i]);
  return false;
}

/**
 * Score a finished attempt.
 *
 * @param {object}   args
 * @param {object[]} args.questions  questions drawn for this attempt
 * @param {object}   args.answers    map of question index -> answer
 * @param {object}   args.flags      map of question index -> boolean
 * @param {object}   args.exam       exam definition (for passPercent)
 * @param {number}   args.timeTaken  elapsed seconds
 * @returns result object consumed by the results dashboard
 */
export function scoreExam({ questions, answers, flags, exam, timeTaken }) {
  const perQuestion = questions.map((q, i) => {
    const ans = answers[i];
    return {
      q,
      index: i,
      answer: ans,
      answered: isAnswered(q, ans),
      correct: isCorrect(q, ans),
      flagged: !!flags[i],
    };
  });

  const total = questions.length;
  const correctCount = perQuestion.filter((r) => r.correct).length;
  const percent = total > 0 ? (correctCount / total) * 100 : 0;

  const domains = {};
  perQuestion.forEach((r) => {
    const d = r.q.domain;
    if (!domains[d]) domains[d] = { total: 0, correct: 0 };
    domains[d].total += 1;
    if (r.correct) domains[d].correct += 1;
  });

  return {
    perQuestion,
    total,
    correctCount,
    percent,
    scaled: Math.round((percent / 100) * 1000),
    passed: percent >= exam.passPercent,
    timeTaken,
    domains,
  };
}
