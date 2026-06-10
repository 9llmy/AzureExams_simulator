import { ArrowLeft, Award, BarChart3, Clock, ListChecks, Play, ShieldCheck, AlertTriangle } from "lucide-react";
import { effectiveQuestionCount, isPreviewBank, listDomains } from "../../data/examRepository";

/** Per-exam instructions screen. Every figure is read from the exam definition. */
export default function WelcomeScreen({ exam, onStart, onBack }) {
  const count = effectiveQuestionCount(exam);
  const preview = isPreviewBank(exam);
  const domainCount = listDomains(exam).length;

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-blue-900 px-8 py-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-800 flex items-center justify-center border border-blue-700">
            <ShieldCheck className="w-7 h-7 text-blue-200" />
          </div>
          <div>
            <p className="text-blue-300 text-xs font-semibold tracking-widest uppercase">Microsoft Certification Practice</p>
            <h1 className="text-white text-2xl font-bold">{exam.code}: {exam.name} — Exam Simulator</h1>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
              <Clock className="w-5 h-5 text-blue-700 mx-auto mb-2" />
              <p className="text-lg font-bold text-slate-800">{exam.durationMinutes} min</p>
              <p className="text-xs text-slate-500">Time limit</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
              <ListChecks className="w-5 h-5 text-blue-700 mx-auto mb-2" />
              <p className="text-lg font-bold text-slate-800">{count}</p>
              <p className="text-xs text-slate-500">Questions</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
              <Award className="w-5 h-5 text-blue-700 mx-auto mb-2" />
              <p className="text-lg font-bold text-slate-800">{exam.passPercent * 10} / 1000</p>
              <p className="text-xs text-slate-500">Passing score ({exam.passPercent}%)</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
              <BarChart3 className="w-5 h-5 text-blue-700 mx-auto mb-2" />
              <p className="text-lg font-bold text-slate-800">{domainCount} areas</p>
              <p className="text-xs text-slate-500">Skill domains</p>
            </div>
          </div>

          {preview && (
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 text-sm text-amber-800">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                This certification currently has a preview bank of {exam.bank.length} questions
                (target: {exam.questionCount}). The attempt will use all available questions.
              </span>
            </div>
          )}

          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">Exam instructions</h2>
          <ul className="space-y-2 text-sm text-slate-600 mb-8">
            <li className="flex gap-2"><span className="text-blue-700 font-bold">•</span> {count} questions are drawn at random from the bank, so every attempt is different. Question types include single choice, multiple choice (select exactly the number stated), and Yes/No statement sets.</li>
            <li className="flex gap-2"><span className="text-blue-700 font-bold">•</span> The countdown timer starts immediately and the exam auto-submits when time expires. You may pause the timer — the question is hidden while paused.</li>
            <li className="flex gap-2"><span className="text-blue-700 font-bold">•</span> Use the navigation grid to jump between questions, and flag any question to revisit before submitting.</li>
            <li className="flex gap-2"><span className="text-blue-700 font-bold">•</span> A question is scored as correct only if it is fully correct (all selections / all statements). Before final submission you will see a review screen highlighting unanswered and flagged items.</li>
            <li className="flex gap-2"><span className="text-blue-700 font-bold">•</span> After submitting, a performance dashboard shows your scaled score, domain breakdown, and a full answer review with explanations.</li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onBack}
              className="sm:w-48 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Change exam
            </button>
            <button
              onClick={onStart}
              className="flex-1 bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Play className="w-5 h-5" /> Start Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
