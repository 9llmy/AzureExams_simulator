import { YN } from "../../constants";

/** Yes/No table renderer for matrix (statement-set) questions. */
export default function MatrixChoice({ question, questionIndex, answer, onSet }) {
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <div className="hidden sm:grid grid-cols-12 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wide">
        <div className="col-span-8 px-4 py-3">Statement</div>
        <div className="col-span-2 px-2 py-3 text-center">Yes</div>
        <div className="col-span-2 px-2 py-3 text-center">No</div>
      </div>
      {question.statements.map((st, si) => {
        const cur = Array.isArray(answer) ? answer[si] : null;
        return (
          <div key={si} className={`grid grid-cols-12 items-center ${si > 0 ? "border-t border-slate-200" : ""}`}>
            <div className="col-span-12 sm:col-span-8 px-4 py-3 text-sm text-slate-700">{st}</div>
            {YN.map((label, vi) => (
              <label
                key={vi}
                className={`col-span-6 sm:col-span-2 px-2 py-3 flex items-center justify-center gap-2 cursor-pointer text-sm ${
                  cur === vi ? "bg-blue-50 text-blue-800 font-semibold" : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <input
                  type="radio"
                  name={`q-${questionIndex}-s-${si}`}
                  checked={cur === vi}
                  onChange={() => onSet(questionIndex, si, vi, question.statements.length)}
                  className="w-4 h-4 accent-blue-700"
                />
                <span className="sm:hidden">{label}</span>
              </label>
            ))}
          </div>
        );
      })}
    </div>
  );
}
