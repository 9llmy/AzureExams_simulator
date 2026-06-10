import { ChevronLeft, ChevronRight, Flag, Send } from "lucide-react";

/** Previous / Flag for review / Next (Submit on the last question). */
export default function BottomNav({ isFirst, isLast, flagged, onPrev, onNext, onToggleFlag, onSubmit }) {
  return (
    <div className="mt-4 bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-3 flex-wrap">
      <button
        onClick={onPrev}
        disabled={isFirst}
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Previous
      </button>

      <button
        onClick={onToggleFlag}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
          flagged
            ? "bg-amber-50 border-amber-400 text-amber-700"
            : "border-slate-300 text-slate-600 hover:border-amber-400 hover:text-amber-700"
        }`}
      >
        <Flag className={`w-4 h-4 ${flagged ? "fill-amber-500 text-amber-500" : ""}`} />
        {flagged ? "Flagged for review" : "Flag for review"}
      </button>

      {isLast ? (
        <button
          onClick={onSubmit}
          className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold bg-blue-800 hover:bg-blue-900 text-white transition-colors"
        >
          <Send className="w-4 h-4" /> Submit Exam
        </button>
      ) : (
        <button
          onClick={onNext}
          className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold bg-blue-800 hover:bg-blue-900 text-white transition-colors"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
