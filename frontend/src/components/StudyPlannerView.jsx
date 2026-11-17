import { useState } from "react";
import {
  IconCalendar,
  IconClock,
  IconCheckCircle,
  IconExternalLink,
  IconCopy,
  IconTarget,
  IconRefresh,
} from "./Icons";

export default function StudyPlannerView({
  plan,
  analytics,
  onGeneratePlan,
  loading = false,
}) {
  const [hours, setHours] = useState(10);
  const [targetGoal, setTargetGoal] = useState("Upcoming Contest & Rating Growth");
  const [completedTasks, setCompletedTasks] = useState({});
  const [copied, setCopied] = useState(false);

  if (!plan) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center shadow-xl border border-slate-100">
        <IconCalendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-700">No Study Plan Generated</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-6">
          Analyze developer handles first or generate a study plan.
        </p>
      </div>
    );
  }

  const { overview = {}, schedule = [], actionGuidelines = [] } = plan;

  function toggleTask(id) {
    setCompletedTasks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  // Calculate completion percentage
  const totalItems = schedule.reduce(
    (acc, day) => acc + (day.checklist?.length || 0) + (day.problems?.length || 0),
    0
  );
  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPct = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  function handleCopyMarkdown() {
    let md = `# 🎯 7-Day Personalized DSA Study Plan\n\n`;
    md += `**Target Goal:** ${overview.targetGoal}\n`;
    md += `**Weekly Study Budget:** ${overview.weeklyHours} hours (${overview.dailyAverageHours} hrs/day)\n`;
    md += `**Primary Weak Focus:** ${overview.primaryFocus}\n\n`;
    md += `---\n\n`;

    schedule.forEach((d) => {
      md += `### ${d.day}: ${d.focus} (${d.duration})\n`;
      if (d.problems?.length) {
        md += `**Recommended Problems:**\n`;
        d.problems.forEach((p) => {
          md += `- [${p.platform}] ${p.title} (${p.difficulty}): ${p.url}\n`;
        });
      }
      if (d.checklist?.length) {
        md += `**Checklist:**\n`;
        d.checklist.forEach((c) => {
          md += `- [ ] ${c}\n`;
        });
      }
      md += `\n`;
    });

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="space-y-6">
      {/* Configuration & Parameter Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <IconCalendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">
                Adaptive AI Study Planner
              </h3>
              <p className="text-xs text-slate-500">
                Grounded strictly in your detected weak topics ({overview.primaryFocus}, {overview.secondaryFocus})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <IconCopy className="w-3.5 h-3.5" />
              {copied ? "Copied Markdown!" : "Copy Plan"}
            </button>

            <button
              onClick={() => onGeneratePlan({ hoursPerWeek: hours, targetGoal })}
              disabled={loading}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow transition disabled:opacity-50"
            >
              <IconRefresh className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Regenerating..." : "Regenerate Plan"}
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid gap-4 sm:grid-cols-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Weekly Available Study Hours: <span className="text-emerald-700">{hours} hrs/week</span> (~{Math.round((hours * 60) / 7)} mins/day)
            </label>
            <input
              type="range"
              min="5"
              max="25"
              step="1"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>5 hrs (Casual)</span>
              <span>10 hrs (Recommended)</span>
              <span>25 hrs (Intense Bootcamp)</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Primary Objective / Milestone Target
            </label>
            <select
              value={targetGoal}
              onChange={(e) => setTargetGoal(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs focus:ring-2 focus:ring-emerald-400 outline-none text-slate-700"
            >
              <option>Upcoming Contest & Rating Growth</option>
              <option>FAANG / SDE Technical Interviews</option>
              <option>Overcoming Stagnation in Dynamic Programming</option>
              <option>Contest Speed & Div. 3 Optimization</option>
            </select>
          </div>
        </div>
      </div>

      {/* Plan Summary & Progress Gauge */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
              Weekly Plan Roadmap
            </span>
            <h4 className="text-xl font-bold mt-1">
              {overview.targetGoal}
            </h4>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              {overview.curatedFocusStrategy}
            </p>
          </div>

          {/* Progress Circle / Bar */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 text-center min-w-[160px]">
            <p className="text-xs text-emerald-300 font-semibold">Weekly Completion</p>
            <p className="text-3xl font-black text-white mt-0.5">{progressPct}%</p>
            <p className="text-[11px] text-slate-300 mt-1">
              {completedCount} of {totalItems} items checked
            </p>
          </div>
        </div>
      </div>

      {/* 7-Day Plan Cards */}
      <div className="space-y-4">
        {schedule.map((day, dIdx) => (
          <div
            key={day.day}
            className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 hover:shadow-lg transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg bg-slate-900 text-white text-xs font-bold">
                    {day.day}
                  </span>
                  <h4 className="font-bold text-slate-800 text-sm">
                    {day.focus}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                <IconClock className="w-3.5 h-3.5" />
                <span>{day.duration}</span>
              </div>
            </div>

            {/* Time Allocations */}
            <div className="grid gap-2 sm:grid-cols-2 mb-4">
              {(day.allocations || []).map((alloc, aIdx) => (
                <div key={aIdx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-700">{alloc.type}</span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      {alloc.duration}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    {alloc.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Recommended Problems */}
            {day.problems && day.problems.length > 0 && (
              <div className="mb-4">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  🎯 Targeted Practice Problems
                </span>
                <div className="space-y-2">
                  {day.problems.map((prob, pIdx) => {
                    const taskId = `prob-${dIdx}-${pIdx}`;
                    const isChecked = !!completedTasks[taskId];

                    return (
                      <div
                        key={pIdx}
                        className={`flex items-center justify-between p-3 rounded-xl border transition ${
                          isChecked
                            ? "bg-emerald-50/50 border-emerald-200"
                            : "bg-white border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleTask(taskId)}
                            className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-800">
                                {prob.title}
                              </span>
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                  prob.difficulty === "Hard"
                                    ? "bg-rose-100 text-rose-700"
                                    : prob.difficulty === "Medium"
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-emerald-100 text-emerald-700"
                                }`}
                              >
                                {prob.difficulty}
                              </span>
                              <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                                {prob.platform}
                              </span>
                            </div>
                          </div>
                        </div>

                        <a
                          href={prob.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline font-semibold shrink-0 ml-2"
                        >
                          <span>Solve</span>
                          <IconExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Checklist items */}
            {day.checklist && day.checklist.length > 0 && (
              <div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  ✓ Concept Retention Check
                </span>
                <div className="space-y-1.5">
                  {day.checklist.map((item, cIdx) => {
                    const checkId = `check-${dIdx}-${cIdx}`;
                    const isChecked = !!completedTasks[checkId];

                    return (
                      <label
                        key={cIdx}
                        className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleTask(checkId)}
                          className="w-3.5 h-3.5 mt-0.5 accent-emerald-600 rounded"
                        />
                        <span className={isChecked ? "line-through text-slate-400" : ""}>
                          {item}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Guidelines Box */}
      <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2">
          Effective Study Principles
        </h5>
        <ul className="space-y-1.5 text-xs text-slate-600">
          {actionGuidelines.map((g, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✦</span>
              <span>{g}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

