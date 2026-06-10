/** Animated SVG percentage ring shown on the results dashboard. */
export default function ScoreRing({ percent, passed }) {
  const r = 70;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.min(100, Math.max(0, percent)) / 100);
  const color = passed ? "#059669" : "#e11d48";
  return (
    <div className="relative w-44 h-44">
      <svg viewBox="0 0 160 160" className="w-44 h-44 -rotate-90">
        <circle cx="80" cy="80" r={r} fill="none" stroke="#e2e8f0" strokeWidth="12" />
        <circle
          cx="80" cy="80" r={r} fill="none"
          stroke={color} strokeWidth="12" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-4xl font-bold ${passed ? "text-emerald-600" : "text-rose-600"}`}>
          {Math.round(percent)}%
        </span>
        <span className="text-xs text-slate-500 mt-1">accuracy</span>
      </div>
    </div>
  );
}
