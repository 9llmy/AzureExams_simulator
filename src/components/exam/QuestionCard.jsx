import { questionTypeLabel } from "../../constants";
import SingleChoice from "./SingleChoice";
import MultiChoice from "./MultiChoice";
import MatrixChoice from "./MatrixChoice";

/**
 * Renders one question: type header, prompt, and the renderer matching
 * the question's type. Adding a new question type means adding a renderer
 * component and one branch here.
 */
export default function QuestionCard({ question, questionIndex, answer, handlers }) {
  return (
    <div>
      <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">
        Question {questionIndex + 1} · {questionTypeLabel(question)}
      </p>
      <h2 className="text-lg font-medium text-slate-800 leading-relaxed mb-6">{question.q}</h2>

      {question.type === "single" && (
        <SingleChoice
          question={question}
          questionIndex={questionIndex}
          answer={answer}
          onSelect={handlers.setSingle}
        />
      )}
      {question.type === "multi" && (
        <MultiChoice
          question={question}
          questionIndex={questionIndex}
          answer={answer}
          onToggle={handlers.toggleMulti}
        />
      )}
      {question.type === "matrix" && (
        <MatrixChoice
          question={question}
          questionIndex={questionIndex}
          answer={answer}
          onSet={handlers.setMatrix}
        />
      )}
    </div>
  );
}
