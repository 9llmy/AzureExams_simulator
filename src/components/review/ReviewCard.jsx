import { BookOpen, CheckCircle2, Flag, XCircle } from "lucide-react";
import { LETTERS, YN } from "../../constants";

/**
 * Post-exam review card for one question: the user's answer vs. the
 * correct answer (per option / per statement) plus the explanation.
 */
export default function ReviewCard({ r }) {
  const { q, answer, correct, answered, flagged, index } = r;
  return (
    <div className={`bg-white rounded-xl border-2 overflow-hidden ${correct ? "border-emerald-200" : "border-rose-200"}`}>
      <div className={`px-5 py-3 flex items-center justify-between gap-3 flex-wrap ${correct ? "bg-emerald-50" : "bg-rose-50"}`}>
        <div className="flex items-center gap-2">
          {correct
            ? <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            : <XCircle className="w-5 h-5 text-rose-600" />}
          <span className="font-semibold text-slate-800 text-sm">
            Question {index + 1} — {correct ? "Correct" : answered ? "Incorrect" : "Not answered"}
          </span>
          {flagged && <Flag className="w-4 h-4 text-amber-500 fill-amber-400" />}
        </div>
        <span className="text-xs font-medium text-slate-500 bg-white border border-slate-200 rounded-full px-2.5 py-0.5">
          {q.domain}
        </span>
      </div>

      <div className="p-5">
        <p className="text-sm font-medium text-slate-800 leading-relaxed mb-4">{q.q}</p>

        {(q.type === "single" || q.type === "multi") && (
          <div className="space-y-2 mb-4">
            {q.options.map((opt, oi) => {
              const isRight = q.correct.includes(oi);
              const chosen = q.type === "single"
                ? answer === oi
                : Array.isArray(answer) && answer.includes(oi);
              let cls = "border-slate-200 bg-white text-slate-600";
              if (isRight) cls = "border-emerald-400 bg-emerald-50 text-emerald-900";
              else if (chosen) cls = "border-rose-400 bg-rose-50 text-rose-900";
              return (
                <div key={oi} className={`flex items-start gap-2 p-3 rounded-lg border text-sm ${cls}`}>
                  {isRight
                    ? <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-600 flex-shrink-0" />
                    : chosen
                      ? <XCircle className="w-4 h-4 mt-0.5 text-rose-600 flex-shrink-0" />
                      : <span className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                  <span>
                    <span className="font-semibold mr-1.5">{LETTERS[oi]}.</span>{opt}
                    {chosen && <span className="ml-2 text-xs font-semibold opacity-70">(your answer)</span>}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {q.type === "matrix" && (
          <div className="border border-slate-200 rounded-lg overflow-hidden mb-4">
            {q.statements.map((st, si) => {
              const user = Array.isArray(answer) ? answer[si] : null;
              const right = q.matrixAnswers[si];
              const ok = user === right;
              return (
                <div key={si} className={`flex flex-col sm:flex-row sm:items-center gap-2 px-4 py-3 ${si > 0 ? "border-t border-slate-200" : ""}`}>
                  <p className="flex-1 text-sm text-slate-700">{st}</p>
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <span className={`px-2 py-1 rounded-md ${
                      user == null
                        ? "bg-slate-100 text-slate-500"
                        : ok ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                    }`}>
                      You: {user == null ? "—" : YN[user]}
                    </span>
                    <span className="px-2 py-1 rounded-md bg-emerald-100 text-emerald-700">
                      Correct: {YN[right]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex gap-2.5 bg-blue-50 border border-blue-100 rounded-lg p-4">
          <BookOpen className="w-4 h-4 text-blue-700 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-900 leading-relaxed">
            <span className="font-semibold">Explanation: </span>{q.explanation}
          </p>
        </div>
      </div>
    </div>
  );
}
