import { AlertTriangle, Send } from "lucide-react";

/** Final-submission confirmation dialog, warning about unanswered items. */
export default function ConfirmModal({ unansweredCount, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900 bg-opacity-60 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${unansweredCount > 0 ? "bg-amber-100" : "bg-blue-100"}`}>
            {unansweredCount > 0
              ? <AlertTriangle className="w-5 h-5 text-amber-600" />
              : <Send className="w-5 h-5 text-blue-700" />}
          </div>
          <h3 className="font-bold text-slate-800 text-lg">Submit exam?</h3>
        </div>
        <p className="text-sm text-slate-600 mb-6">
          {unansweredCount > 0
            ? `You still have ${unansweredCount} unanswered question${unansweredCount > 1 ? "s" : ""}, which will be scored as incorrect. This action cannot be undone.`
            : "All questions are answered. Once submitted, your answers are final and the exam will be scored."}
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-2.5 rounded-lg transition-colors"
          >
            Keep working
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            Submit now
          </button>
        </div>
      </div>
    </div>
  );
}
