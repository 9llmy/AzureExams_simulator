import { useState, useRef, useEffect, useCallback } from "react";
import ExamSelectScreen from "./components/screens/ExamSelectScreen";
import WelcomeScreen from "./components/screens/WelcomeScreen";
import ExamScreen from "./components/screens/ExamScreen";
import OverviewScreen from "./components/screens/OverviewScreen";
import ResultsScreen from "./components/screens/ResultsScreen";
import ConfirmModal from "./components/common/ConfirmModal";
import { useExamSession } from "./hooks/useExamSession";
import { useCountdown } from "./hooks/useCountdown";
import { scoreExam } from "./logic/grading";

/**
 * Top-level orchestrator. Owns the phase state machine
 *
 *   select → welcome → exam ⇄ overview → results
 *
 * and wires the session (questions/answers/flags), the countdown timer,
 * and final scoring together. Screens stay presentational.
 */
export default function App() {
  const [phase, setPhase] = useState("select");
  const [exam, setExam] = useState(null);
  const [paused, setPaused] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [result, setResult] = useState(null);

  const session = useExamSession();

  // The timer's onExpire must always call the *latest* finalize closure.
  const finalizeRef = useRef(() => {});
  const { secondsLeft, reset } = useCountdown({
    running: (phase === "exam" || phase === "overview") && !paused,
    onExpire: () => finalizeRef.current(),
  });

  const finalize = useCallback(() => {
    if (!exam) return;
    setResult(
      scoreExam({
        questions: session.questions,
        answers: session.answers,
        flags: session.flags,
        exam,
        timeTaken: exam.durationMinutes * 60 - Math.max(0, secondsLeft),
      })
    );
    setConfirmOpen(false);
    setPaused(false);
    setPhase("results");
  }, [exam, session.questions, session.answers, session.flags, secondsLeft]);

  useEffect(() => {
    finalizeRef.current = finalize;
  }, [finalize]);

  const startExam = useCallback(
    (examDef) => {
      session.start(examDef);
      reset(examDef.durationMinutes * 60);
      setPaused(false);
      setConfirmOpen(false);
      setResult(null);
      setPhase("exam");
    },
    [session.start, reset]
  );

  if (phase === "select") {
    return (
      <ExamSelectScreen
        onSelect={(e) => {
          setExam(e);
          setPhase("welcome");
        }}
      />
    );
  }

  if (phase === "welcome" && exam) {
    return (
      <WelcomeScreen
        exam={exam}
        onStart={() => startExam(exam)}
        onBack={() => setPhase("select")}
      />
    );
  }

  if (phase === "results" && result && exam) {
    return (
      <ResultsScreen
        exam={exam}
        result={result}
        onRetake={() => startExam(exam)}
        onChangeExam={() => setPhase("select")}
      />
    );
  }

  const unansweredCount = session.questions.length - session.answeredCount;

  return (
    <>
      {phase === "exam" && exam && (
        <ExamScreen
          exam={exam}
          session={session}
          secondsLeft={secondsLeft}
          paused={paused}
          onPauseToggle={() => setPaused((p) => !p)}
          onOverview={() => setPhase("overview")}
          onFinishRequest={() => setConfirmOpen(true)}
        />
      )}

      {phase === "overview" && exam && (
        <OverviewScreen
          exam={exam}
          session={session}
          secondsLeft={secondsLeft}
          paused={paused}
          onPauseToggle={() => setPaused((p) => !p)}
          onReturn={() => setPhase("exam")}
          onJump={(i) => {
            session.setCurrent(i);
            setPhase("exam");
          }}
          onSubmitRequest={() => setConfirmOpen(true)}
        />
      )}

      {confirmOpen && (
        <ConfirmModal
          unansweredCount={unansweredCount}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={finalize}
        />
      )}
    </>
  );
}
