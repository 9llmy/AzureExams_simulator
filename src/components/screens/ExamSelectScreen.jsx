import { ChevronRight, Clock, ListChecks, Award, FolderPlus, ShieldCheck } from "lucide-react";
import { listExams, effectiveQuestionCount, isPreviewBank } from "../../data/examRepository";

/**
 * Certification picker — the entry point of the app. Renders one card per
 * exam registered in src/config/examRegistry.js, so new certifications
 * (DP-900, SC-900, AZ-104, ...) appear here automatically.
 */
export default function ExamSelectScreen({ onSelect }) {
  const exams = listExams();
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-blue-900 flex items-center justify-center mx-auto mb-4 shadow">
            <ShieldCheck className="w-8 h-8 text-blue-200" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Azure Certification Exam Simulator</h1>
          <p className="text-sm text-slate-500 mt-1">Choose a certification to begin a timed practice exam.</p>
        </div>

        <div className="space-y-4">
          {exams.map((exam) => {
            const count = effectiveQuestionCount(exam);
            const preview = isPreviewBank(exam);
            return (
              <button
                key={exam.id}
                onClick={() => onSelect(exam)}
                className="w-full text-left bg-white border border-slate-200 hover:border-blue-500 rounded-xl p-5 flex items-center gap-5 transition-colors group shadow-sm"
              >
                <div className="w-16 h-16 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-800 font-bold text-sm">{exam.code}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-bold text-slate-800">{exam.name}</h2>
                    {preview && (
                      <span className="text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200 rounded-full px-2 py-0.5">
                        Preview bank — {exam.bank.length} questions
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5">{exam.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 flex-wrap">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {exam.durationMinutes} min</span>
                    <span className="flex items-center gap-1"><ListChecks className="w-3.5 h-3.5" /> {count} questions</span>
                    <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5" /> Pass: {exam.passPercent}% ({exam.passPercent * 10}/1000)</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 flex-shrink-0 transition-colors" />
              </button>
            );
          })}

          {/* Extension hint for developers */}
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-5 flex items-center gap-4 text-slate-400">
            <FolderPlus className="w-6 h-6 flex-shrink-0" />
            <p className="text-sm">
              <span className="font-semibold text-slate-500">Add another certification:</span>{" "}
              drop a question bank into <code className="text-xs bg-slate-200 text-slate-600 rounded px-1 py-0.5">src/data/banks/</code> and
              register it in <code className="text-xs bg-slate-200 text-slate-600 rounded px-1 py-0.5">src/config/examRegistry.js</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
