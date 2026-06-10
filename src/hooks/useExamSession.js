import { useState, useMemo, useCallback } from "react";
import { drawQuestions } from "../data/examRepository";
import { isAnswered } from "../logic/grading";

/**
 * Exam session state: the questions drawn for this attempt, the user's
 * answers and flags, and the current position. All answer mutations live
 * here so components stay purely presentational.
 */
export function useExamSession() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState({});

  /** Begin a fresh attempt for the given exam definition. */
  const start = useCallback((exam) => {
    setQuestions(drawQuestions(exam));
    setCurrent(0);
    setAnswers({});
    setFlags({});
  }, []);

  const answeredCount = useMemo(
    () => questions.reduce((n, q, i) => n + (isAnswered(q, answers[i]) ? 1 : 0), 0),
    [questions, answers]
  );

  const flaggedCount = useMemo(
    () => Object.values(flags).filter(Boolean).length,
    [flags]
  );

  /** Single choice: store the selected option index. */
  const setSingle = useCallback((qi, oi) => {
    setAnswers((a) => ({ ...a, [qi]: oi }));
  }, []);

  /**
   * Multiple choice: toggle an option, capped at `pick` selections.
   * Attempts to exceed the cap are ignored (the component shows a hint).
   */
  const toggleMulti = useCallback((qi, oi, pick) => {
    setAnswers((a) => {
      const cur = Array.isArray(a[qi]) ? a[qi] : [];
      if (cur.includes(oi)) return { ...a, [qi]: cur.filter((x) => x !== oi) };
      if (cur.length >= pick) return a;
      return { ...a, [qi]: [...cur, oi] };
    });
  }, []);

  /** Matrix: set Yes(0)/No(1) for one statement. */
  const setMatrix = useCallback((qi, si, val, totalStatements) => {
    setAnswers((a) => {
      const cur = Array.isArray(a[qi]) ? [...a[qi]] : new Array(totalStatements).fill(null);
      cur[si] = val;
      return { ...a, [qi]: cur };
    });
  }, []);

  const toggleFlag = useCallback((qi) => {
    setFlags((f) => ({ ...f, [qi]: !f[qi] }));
  }, []);

  const goPrev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);
  const goNext = useCallback(
    () => setCurrent((c) => Math.min(questions.length - 1, c + 1)),
    [questions.length]
  );

  return {
    questions,
    current,
    setCurrent,
    answers,
    flags,
    answeredCount,
    flaggedCount,
    start,
    setSingle,
    toggleMulti,
    setMatrix,
    toggleFlag,
    goPrev,
    goNext,
  };
}
