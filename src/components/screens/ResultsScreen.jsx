import { useState } from "react";
import {
  ArrowLeft, BarChart3, CheckCircle2, Eye,
  RotateCcw, ShieldCheck, XCircle,
} from "lucide-react";
import ScoreRing from "../common/ScoreRing";
import ReviewCard from "../review/ReviewCard";
import { fmtHMS } from "../../logic/time";

/** Results dashboard: performance tab + full question review tab. */
export default function ResultsScreen({ exam, result, onRetake, onChangeExam }) {
  const [tab, setTab] = useState("performance");
  const [filter, setFilter] = useState("all");

  const incorrectCount = result.total - result.correctCount;
  const flaggedTotal = result.perQuestion.filter((r) => r.flagged).length;
  const passScaled = exam.passPercent * 10;

  const filtered = result.perQuestion.filter((r) => {
    if (filter === "correct") return r.correct;
    if (filter === "incorrect") return !r.correct;
    if (filter === "flagged") return r.flagged;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-blue-900 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-blue-300" />
          <span className="font-semibold">{exam.code} — Exam Results</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onChangeExam}
            className="flex items-center gap-2 bg-blue-800 hover:bg-blue-700 border border-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Change exam
          </button>
          <button
            onClick={onRetake}
            className="flex items-center gap-2 bg-blue-800 hover:bg-blue-700 border border-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Retake Exam
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-4 md:p-8">
        {/* tabs */}
        <div className="flex gap-2 mb-6">
          {[["performance", "Performance", BarChart3], ["review", "Question Review", Eye]].map(([key, label, Icon]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                tab === key
                  ? "bg-blue-800 text-white border-blue-800"
                  : "bg-white text-slate-600 border-slate-300 hover:border-blue-400"
              }`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        {tab === "performance" && (
          <div className="space-y-6">
            {/* hero */}
            <div className={`rounded-xl border-2 p-8 flex flex-col md:flex-row items-center gap-8 ${
              result.passed ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"
            }`}>
              <ScoreRing percent={result.percent} passed={result.passed} />
              <div className="text-center md:text-left">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold mb-3 ${
                  result.passed ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
                }`}>
                  {result.passed ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  {result.passed ? "PASS" : "FAIL"}
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-1">{result.scaled} / 1000</h2>
                <p className="text-slate-600 text-sm">
                  Passing score: {passScaled} / 1000 ({exam.passPercent}%).{" "}
                  {result.passed
                    ? "Congratulations — you met the passing standard."
                    : `You were ${passScaled - result.scaled} points short. Review the explanations below and try again.`}
                </p>
              </div>
            </div>

            {/* stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Correct</p>
                <p className="text-2xl font-bold text-emerald-600">{result.correctCount} <span className="text-base text-slate-400 font-medium">/ {result.total}</span></p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Incorrect</p>
                <p className="text-2xl font-bold text-rose-600">{incorrectCount} <span className="text-base text-slate-400 font-medium">/ {result.total}</span></p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Time taken</p>
                <p className="text-2xl font-bold text-slate-800">{fmtHMS(result.timeTaken)}</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Flagged</p>
                <p className="text-2xl font-bold text-amber-600">{flaggedTotal}</p>
              </div>
            </div>

            {/* domain breakdown */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-semibold text-slate-800 mb-4">Performance by skill domain</h3>
              <div className="space-y-4">
                {Object.entries(result.domains).map(([domain, d]) => {
                  const pct = d.total ? Math.round((d.correct / d.total) * 100) : 0;
                  return (
                    <div key={domain}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-700 font-medium">{domain}</span>
                        <span className="text-slate-500">{d.correct}/{d.total} ({pct}%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-2 rounded-full ${pct >= exam.passPercent ? "bg-emerald-500" : pct >= 50 ? "bg-amber-500" : "bg-rose-500"}`}
                          style={{ width: `${pct}%`, transition: "width 0.8s ease" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setTab("review")}
              className="w-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Eye className="w-4 h-4" /> Review all {result.total} questions with explanations
            </button>
          </div>
        )}

        {tab === "review" && (
          <div>
            {/* filters */}
            <div className="flex flex-wrap gap-2 mb-5">
              {[
                ["all", `All (${result.total})`],
                ["incorrect", `Incorrect (${incorrectCount})`],
                ["correct", `Correct (${result.correctCount})`],
                ["flagged", `Flagged (${flaggedTotal})`],
              ].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    filter === key
                      ? "bg-blue-800 text-white border-blue-800"
                      : "bg-white text-slate-600 border-slate-300 hover:border-blue-400"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="bg-white border border-slate-200 rounded-xl p-10 text-center text-slate-500">
                No questions match this filter.
              </div>
            )}

            <div className="space-y-5">
              {filtered.map((r) => (
                <ReviewCard key={r.index} r={r} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
