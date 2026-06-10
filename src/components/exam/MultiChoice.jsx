import { useState } from "react";
import { LETTERS } from "../../constants";

/**
 * Checkbox renderer for multi-choice questions. Selection is capped at
 * `question.pick`; over-selecting shows a hint instead of selecting.
 */
export default function MultiChoice({ question, questionIndex, answer, onToggle }) {
  const [hint, setHint] = useState(false);
  const selections = Array.isArray(answer) ? answer : [];

  const handle = (oi) => {
    const selected = selections.includes(oi);
    if (!selected && selections.length >= question.pick) {
      setHint(true);
      return;
    }
    setHint(false);
    onToggle(questionIndex, oi, question.pick);
  };

  return (
    <div>
      <div className="space-y-3">
        {question.options.map((opt, oi) => {
          const selected = selections.includes(oi);
          return (
            <label
              key={oi}
              className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                selected ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-blue-300 bg-white"
              }`}
            >
              <input
                type="checkbox"
                checked={selected}
                onChange={() => handle(oi)}
                className="mt-1 w-4 h-4 accent-blue-700"
              />
              <span className="text-sm text-slate-700">
                <span className="font-semibold text-slate-500 mr-2">{LETTERS[oi]}.</span>{opt}
              </span>
            </label>
          );
        })}
      </div>
      <p className={`mt-3 text-sm ${hint ? "text-amber-600 font-medium" : "text-slate-500"}`}>
        {hint
          ? `You can select only ${question.pick} answers — deselect one first.`
          : `${selections.length} of ${question.pick} selected.`}
      </p>
    </div>
  );
}
