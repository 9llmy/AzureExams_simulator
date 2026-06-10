import { AlertTriangle, ChevronLeft, Flag, Send } from "lucide-react";
import TopBar from "../exam/TopBar";
import NavGrid from "../exam/NavGrid";
import StatusDot from "../common/StatusDot";
import { isAnswered } from "../../logic/grading";

/** Pre-submission review: progress totals plus the full grid for jumping back. */
export default function OverviewScreen({
  exam, session, secondsLeft, paused,
  onPauseToggle, onReturn, onJump, onSubmitRequest,
}) {
  const { questions, answers, flags, answeredCount, flaggedCount } = session;
  const total = questions.length;
  const unansweredCount = questions.filter((q, i) => !isAnswered(q, answers[i])).length;

  return (
    <div className="min-h-screen bg-slate-100">
      <TopBar
        examCode={exam.code}
        secondsLeft={secondsLeft}
        paused={paused}
        onPauseToggle={onPauseToggle}
        onFinish={onSubmitRequest}
        subtitle="Review before submitting"
      />
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-1">Exam review</h2>
          <p className="text-sm text-slate-500 mb-6">
            Check your progress below. Click any question number to return to it, or submit when you are ready.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-800">{answeredCount}</p>
              <p className="text-xs text-blue-700">Answered</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-slate-700">{unansweredCount}</p>
              <p className="text-xs text-slate-500">Unanswered</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-amber-600">{flaggedCount}</p>
              <p className="text-xs text-amber-700">Flagged</p>
            </div>
          </div>

          {unansweredCount > 0 && (
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 text-sm text-amber-800">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                You have {unansweredCount} unanswered question{unansweredCount > 1 ? "s" : ""}. Unanswered questions are scored as incorrect.
              </span>
            </div>
          )}

          <NavGrid
            questions={questions}
            answers={answers}
            flags={flags}
            current={-1}
            onJump={onJump}
            dense={false}
          />

          <div className="flex items-center gap-4 mt-4 text-xs text-slate-500 flex-wrap">
            <span className="flex items-center gap-1.5"><StatusDot className="bg-blue-700" /> Answered</span>
            <span className="flex items-center gap-1.5"><StatusDot className="bg-white border border-slate-300" /> Unanswered</span>
            <span className="flex items-center gap-1.5"><Flag className="w-3 h-3 text-amber-500" /> Flagged for review</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={onReturn}
              className="flex-1 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Return to exam
            </button>
            <button
              onClick={onSubmitRequest}
              className="flex-1 bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Send className="w-4 h-4" /> Submit Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
