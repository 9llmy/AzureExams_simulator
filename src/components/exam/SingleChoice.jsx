import { LETTERS } from "../../constants";

/** Radio-button renderer for single-choice questions. */
export default function SingleChoice({ question, questionIndex, answer, onSelect }) {
  return (
    <div className="space-y-3">
      {question.options.map((opt, oi) => {
        const selected = answer === oi;
        return (
          <label
            key={oi}
            className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
              selected ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-blue-300 bg-white"
            }`}
          >
            <input
              type="radio"
              name={`q-${questionIndex}`}
              checked={selected}
              onChange={() => onSelect(questionIndex, oi)}
              className="mt-1 w-4 h-4 accent-blue-700"
            />
            <span className="text-sm text-slate-700">
              <span className="font-semibold text-slate-500 mr-2">{LETTERS[oi]}.</span>{opt}
            </span>
          </label>
        );
      })}
    </div>
  );
}
