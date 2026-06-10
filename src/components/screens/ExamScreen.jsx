import { LayoutGrid, ListChecks, Pause, Play } from "lucide-react";
import { useState } from "react";
import TopBar from "../exam/TopBar";
import NavGrid from "../exam/NavGrid";
import QuestionCard from "../exam/QuestionCard";
import BottomNav from "../exam/BottomNav";
import StatusDot from "../common/StatusDot";
import { Flag } from "lucide-react";

/** The main testing interface: top bar, navigator sidebar, question, bottom nav. */
export default function ExamScreen({
  exam, session, secondsLeft, paused,
  onPauseToggle, onOverview, onFinishRequest,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { questions, current, answers, flags, answeredCount } = session;
  const q = questions[current];
  if (!q) return null;

  const total = questions.length;
  const isLast = current === total - 1;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <TopBar
        examCode={exam.code}
        secondsLeft={secondsLeft}
        paused={paused}
        onPauseToggle={onPauseToggle}
        onFinish={onFinishRequest}
        subtitle={`Question ${current + 1} of ${total}`}
      />

      {/* answered-progress bar */}
      <div className="h-1 bg-slate-200">
        <div
          className="h-1 bg-blue-700"
          style={{ width: `${(answeredCount / total) * 100}%`, transition: "width 0.3s ease" }}
        />
      </div>

      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto">
        {/* sidebar */}
        <aside className={`${sidebarOpen ? "block" : "hidden"} lg:w-72 w-full bg-white border-b lg:border-b-0 lg:border-r border-slate-200 p-4`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Question navigator</h3>
            <span className="text-xs text-slate-400">{answeredCount}/{total} answered</span>
          </div>
          <NavGrid
            questions={questions}
            answers={answers}
            flags={flags}
            current={current}
            onJump={session.setCurrent}
            dense
          />
          <div className="mt-4 space-y-1.5 text-xs text-slate-500">
            <p className="flex items-center gap-1.5"><StatusDot className="bg-blue-700" /> Answered</p>
            <p className="flex items-center gap-1.5"><StatusDot className="bg-white border border-slate-300" /> Unanswered</p>
            <p className="flex items-center gap-1.5"><Flag className="w-3 h-3 text-amber-500" /> Flagged for review</p>
          </div>
          <button
            onClick={onOverview}
            className="mt-4 w-full text-sm border border-slate-300 hover:border-blue-500 hover:text-blue-700 text-slate-600 rounded-lg py-2 flex items-center justify-center gap-2 transition-colors"
          >
            <ListChecks className="w-4 h-4" /> Review all questions
          </button>
        </aside>

        {/* question area */}
        <main className="flex-1 p-4 md:p-8 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setSidebarOpen((s) => !s)}
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-700 border border-slate-300 hover:border-blue-400 rounded-lg px-3 py-1.5 bg-white transition-colors"
            >
              <LayoutGrid className="w-4 h-4" /> {sidebarOpen ? "Hide" : "Show"} navigator
            </button>
            <span className="text-xs font-medium text-slate-500 bg-white border border-slate-200 rounded-full px-3 py-1">
              {q.domain}
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 flex-1 relative">
            {paused && (
              <div className="absolute inset-0 bg-white rounded-xl z-10 flex flex-col items-center justify-center gap-3">
                <Pause className="w-10 h-10 text-slate-400" />
                <p className="font-semibold text-slate-700">Exam paused</p>
                <p className="text-sm text-slate-500">The timer is stopped and the question is hidden.</p>
                <button
                  onClick={onPauseToggle}
                  className="mt-2 bg-blue-800 hover:bg-blue-900 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                >
                  <Play className="w-4 h-4" /> Resume
                </button>
              </div>
            )}

            {/* key resets per-question UI state (e.g. multi-select hint) */}
            <QuestionCard
              key={current}
              question={q}
              questionIndex={current}
              answer={answers[current]}
              handlers={{
                setSingle: session.setSingle,
                toggleMulti: session.toggleMulti,
                setMatrix: session.setMatrix,
              }}
            />
          </div>

          <BottomNav
            isFirst={current === 0}
            isLast={isLast}
            flagged={!!flags[current]}
            onPrev={session.goPrev}
            onNext={session.goNext}
            onToggleFlag={() => session.toggleFlag(current)}
            onSubmit={onOverview}
          />
        </main>
      </div>
    </div>
  );
}
