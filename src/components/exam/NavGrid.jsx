import { Flag } from "lucide-react";
import { isAnswered } from "../../logic/grading";

/**
 * Numbered question navigator. Blue = answered, white = unanswered,
 * amber flag icon overlays flagged questions, ring marks the current one.
 */
export default function NavGrid({ questions, answers, flags, current, onJump, dense }) {
  return (
    <div className={`grid ${dense ? "grid-cols-8 sm:grid-cols-10 lg:grid-cols-6" : "grid-cols-6 sm:grid-cols-10"} gap-1.5`}>
      {questions.map((q, i) => {
        const answered = isAnswered(q, answers[i]);
        const flagged = !!flags[i];
        const isCur = i === current;
        return (
          <button
            key={i}
            onClick={() => onJump(i)}
            className={`relative h-9 rounded-md text-xs font-semibold border transition-colors ${
              answered
                ? "bg-blue-700 text-white border-blue-700 hover:bg-blue-800"
                : "bg-white text-slate-600 border-slate-300 hover:border-blue-400"
            } ${isCur ? "ring-2 ring-offset-1 ring-blue-500" : ""}`}
            title={`Question ${i + 1}${flagged ? " — flagged" : ""}${answered ? " — answered" : " — unanswered"}`}
          >
            {i + 1}
            {flagged && (
              <Flag className="absolute -top-1 -right-1 w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            )}
          </button>
        );
      })}
    </div>
  );
}
