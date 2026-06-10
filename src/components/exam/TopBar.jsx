import { Clock, Pause, Play, Send, ShieldCheck } from "lucide-react";
import { fmtHMS } from "../../logic/time";

/**
 * Sticky exam header: certification code, countdown (amber under 10 min,
 * red under 5), pause/resume, and Finish Exam.
 */
export default function TopBar({ examCode, secondsLeft, paused, onPauseToggle, onFinish, subtitle }) {
  const warn = secondsLeft <= 600;
  const danger = secondsLeft <= 300;
  return (
    <header className="bg-blue-900 text-white px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-20 shadow">
      <div className="flex items-center gap-3 min-w-0">
        <ShieldCheck className="w-6 h-6 text-blue-300 flex-shrink-0" />
        <div className="min-w-0">
          <p className="font-semibold leading-tight truncate">{examCode}</p>
          <p className="text-xs text-blue-300 leading-tight truncate">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-sm font-semibold border ${
          danger ? "bg-rose-600 border-rose-500" : warn ? "bg-amber-600 border-amber-500" : "bg-blue-800 border-blue-700"
        }`}>
          <Clock className="w-4 h-4" />
          {fmtHMS(secondsLeft)}
        </div>
        <button
          onClick={onPauseToggle}
          title={paused ? "Resume" : "Pause"}
          className="p-2 rounded-lg bg-blue-800 hover:bg-blue-700 border border-blue-700 transition-colors"
        >
          {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
        </button>
        <button
          onClick={onFinish}
          className="hidden sm:flex items-center gap-2 bg-blue-800 hover:bg-blue-700 border border-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Send className="w-4 h-4" /> Finish Exam
        </button>
      </div>
    </header>
  );
}
