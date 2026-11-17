import { IconAlertTriangle, IconSparkles } from "./Icons";

export default function WeakTopicsAlert({ weakTopics = [], onGeneratePlan }) {
  if (!weakTopics || weakTopics.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-orange-50 border border-rose-200 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-rose-500 text-white rounded-xl shadow-md shrink-0 mt-0.5">
            <IconAlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              Critical DSA Learning Gaps Detected ({weakTopics.length} Areas)
            </h4>
            <p className="text-sm text-slate-600 mt-1">
              Your problem-solving volume is significantly below benchmark in:{" "}
              <strong className="text-rose-700">
                {weakTopics.map(w => w.name).join(", ")}
              </strong>
              . This is the primary bottleneck suppressing your contest rating and interview readiness.
            </p>
          </div>
        </div>

        {onGeneratePlan && (
          <button
            onClick={onGeneratePlan}
            className="shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-md transition hover:scale-105"
          >
            <IconSparkles className="w-4 h-4 text-yellow-300" />
            Build Targeted Study Plan
          </button>
        )}
      </div>
    </div>
  );
}

