import { useState, useEffect } from "react";
import {
  IconCode,
  IconClock,
  IconLightbulb,
  IconCheckCircle,
  IconAlertTriangle,
  IconTrophy,
  IconShield,
  IconSparkles,
} from "./Icons";

export default function InterviewPrepView({
  questions = [],
  onEvaluate,
  evaluationResult,
  readiness = {},
  loading = false,
}) {
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [unlockedHints, setUnlockedHints] = useState([]);
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [timerActive, setTimerActive] = useState(false);

  // Set default active question
  useEffect(() => {
    if (questions && questions.length > 0 && !activeQuestion) {
      setActiveQuestion(questions[0]);
      resetEditorForQuestion(questions[0], "javascript");
    }
  }, [questions]);

  function resetEditorForQuestion(q, lang) {
    if (!q) return;
    if (lang === "javascript") {
      setCode(`/**\n * Solution for: ${q.title}\n * Topic: ${q.topic}\n */\nfunction solve(input) {\n  // Write your optimal solution here\n  \n}\n`);
    } else if (lang === "python") {
      setCode(`class Solution:\n    def solve(self, input):\n        # Write your optimal solution here\n        pass\n`);
    } else if (lang === "cpp") {
      setCode(`#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Optimal solution here\n    }\n};\n`);
    } else {
      setCode(`class Solution {\n    public void solve() {\n        // Optimal solution here\n    }\n}\n`);
    }
    setUnlockedHints([]);
    setTimeLeft(q.timeLimit ? q.timeLimit * 60 : 40 * 60);
    setTimerActive(false);
  }

  function handleSelectQuestion(q) {
    setActiveQuestion(q);
    resetEditorForQuestion(q, language);
  }

  function handleLanguageChange(lang) {
    setLanguage(lang);
    resetEditorForQuestion(activeQuestion, lang);
  }

  function unlockNextHint() {
    if (!activeQuestion) return;
    const nextLevel = unlockedHints.length + 1;
    if (nextLevel <= activeQuestion.hints.length) {
      setUnlockedHints([...unlockedHints, nextLevel]);
    }
  }

  // Timer countdown
  useEffect(() => {
    let interval = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }

  function handleSubmit() {
    if (!activeQuestion) return;
    const timeSpent = (activeQuestion.timeLimit ? activeQuestion.timeLimit * 60 : 2400) - timeLeft;
    onEvaluate({
      questionId: activeQuestion.id,
      code,
      language,
      hintsUsed: unlockedHints.length,
      timeSpentSeconds: Math.max(30, timeSpent),
    });
  }

  const filteredQuestions = questions.filter((q) => {
    if (selectedTopic === "All") return true;
    return q.topic.toLowerCase().includes(selectedTopic.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Interview Readiness Dashboard */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <IconTrophy className="w-4 h-4 text-amber-400" />
              <span>Technical Interview Readiness Index</span>
            </div>
            <h3 className="text-2xl font-bold">
              {readiness.readinessTier || "Interview Ready (SDE-1)"}
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-lg">
              Evaluated across problem breakdown speed, edge-case coverage, and hint reliance.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0">
            <div className="text-center">
              <span className="text-xs text-indigo-300 block font-semibold">Overall Readiness</span>
              <span className="text-3xl font-black text-emerald-400">
                {readiness.overallReadinessPct || 72}%
              </span>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div className="text-center">
              <span className="text-xs text-indigo-300 block font-semibold">Mock Sessions</span>
              <span className="text-2xl font-bold text-white">
                {readiness.completedInterviews || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Topic Confidence Breakdown */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mt-6 pt-5 border-t border-white/10">
          {(readiness.topicConfidence || []).map((t, idx) => (
            <div key={idx} className="p-3 bg-white/5 rounded-xl border border-white/5">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-300 truncate max-w-[130px]">{t.topic}</span>
                <span className="text-emerald-400 font-bold">{t.readiness}%</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full"
                  style={{ width: `${t.readiness}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Studio: Left Panel Questions & Right Panel Editor */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Questions List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white p-4 rounded-2xl shadow-md border border-slate-200">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                Question Bank ({filteredQuestions.length})
              </h4>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {["All", "Dynamic Programming", "Graphs", "Trees", "Two Pointers"].map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold transition ${
                    selectedTopic === topic
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {topic === "Dynamic Programming" ? "DP" : topic}
                </button>
              ))}
            </div>

            {/* Questions scroll */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {filteredQuestions.map((q) => {
                const isActive = activeQuestion?.id === q.id;
                return (
                  <div
                    key={q.id}
                    onClick={() => handleSelectQuestion(q)}
                    className={`p-3 rounded-xl border cursor-pointer transition ${
                      isActive
                        ? "bg-indigo-50/70 border-indigo-300 shadow-sm"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-1 mb-1">
                      <h5 className="font-bold text-slate-800 text-xs leading-snug">
                        {q.title}
                      </h5>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                          q.difficulty === "Hard"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {q.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                      <span>{q.topic}</span>
                      <span>•</span>
                      <span>{q.tier}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {(q.companies || []).slice(0, 3).map((comp, cIdx) => (
                        <span
                          key={cIdx}
                          className="text-[9px] px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Problem Statement & Live Code Editor */}
        <div className="lg:col-span-8 space-y-4">
          {activeQuestion && (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              {/* Header Bar */}
              <div className="p-4 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-indigo-500 text-white font-bold px-2 py-0.5 rounded">
                      {activeQuestion.topic}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base">
                      {activeQuestion.title}
                    </h3>
                  </div>
                </div>

                {/* Timer Controls */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 rounded-xl font-mono text-sm font-bold text-amber-400">
                    <IconClock className="w-4 h-4 text-amber-400" />
                    <span>{formatTime(timeLeft)}</span>
                  </div>

                  <button
                    onClick={() => setTimerActive(!timerActive)}
                    className="text-xs px-3 py-1 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition"
                  >
                    {timerActive ? "Pause" : "Start Timer"}
                  </button>
                </div>
              </div>

              {/* Problem Statement Box */}
              <div className="p-5 border-b border-slate-200 bg-slate-50/50">
                <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed mb-4">
                  {activeQuestion.statement}
                </p>

                {/* Examples */}
                <div className="space-y-2 mb-3">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Examples:
                  </span>
                  {activeQuestion.examples.map((ex, eIdx) => (
                    <div key={eIdx} className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs font-mono">
                      <div><strong className="text-slate-500">Input:</strong> {ex.input}</div>
                      <div><strong className="text-slate-500">Output:</strong> {ex.output}</div>
                      {ex.explanation && (
                        <div className="text-[11px] text-slate-500 font-sans mt-0.5">
                          <em>Explanation:</em> {ex.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Constraints & Expected Complexity */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                  <div>
                    <strong>Target Complexity:</strong> Time: {activeQuestion.expectedComplexity.time} | Space: {activeQuestion.expectedComplexity.space}
                  </div>
                  <div>
                    <strong>Constraints:</strong> {activeQuestion.constraints.join(", ")}
                  </div>
                </div>
              </div>

              {/* Code Workspace Bar */}
              <div className="p-3 bg-slate-800 flex items-center justify-between gap-3 text-white text-xs">
                <div className="flex items-center gap-2">
                  <IconCode className="w-4 h-4 text-indigo-400" />
                  <span className="font-semibold">Candidate Solution Workspace</span>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={language}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="bg-slate-700 text-white rounded-lg px-2 py-1 text-xs outline-none border border-slate-600 cursor-pointer"
                  >
                    <option value="javascript">JavaScript (ES6)</option>
                    <option value="python">Python 3</option>
                    <option value="cpp">C++ 20</option>
                    <option value="java">Java 17</option>
                  </select>

                  <button
                    onClick={() => resetEditorForQuestion(activeQuestion, language)}
                    className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg text-[11px] transition"
                  >
                    Reset Code
                  </button>
                </div>
              </div>

              {/* Code Editor Textarea */}
              <div className="relative">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  rows={14}
                  className="w-full bg-slate-900 text-slate-100 font-mono text-xs p-4 outline-none resize-none leading-relaxed selection:bg-indigo-600"
                  spellCheck="false"
                />
              </div>

              {/* Progressive Hint Drawer */}
              <div className="p-4 bg-amber-50/40 border-t border-slate-200">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <IconLightbulb className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-bold text-slate-800">
                      Progressive Interview Hints ({unlockedHints.length}/{activeQuestion.hints.length} Unlocked)
                    </span>
                  </div>

                  {unlockedHints.length < activeQuestion.hints.length && (
                    <button
                      onClick={unlockNextHint}
                      className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg shadow-sm transition"
                    >
                      Unlock Hint {unlockedHints.length + 1} (-8 pts penalty)
                    </button>
                  )}
                </div>

                {/* Display unlocked hints */}
                {unlockedHints.length > 0 && (
                  <div className="space-y-2 mt-3">
                    {unlockedHints.map((lvl) => {
                      const hint = activeQuestion.hints.find((h) => h.level === lvl);
                      if (!hint) return null;
                      return (
                        <div
                          key={lvl}
                          className="p-3 bg-white rounded-xl border border-amber-200 text-xs"
                        >
                          <span className="font-bold text-amber-800 block mb-1">
                            💡 Hint Level {lvl}: {hint.title}
                          </span>
                          <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                            {hint.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Submit Action Bar */}
              <div className="p-4 bg-slate-100 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-500">
                  Hints unlocked: {unlockedHints.length} | Timer: {formatTime(timeLeft)}
                </span>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition disabled:opacity-50"
                >
                  <IconSparkles className="w-4 h-4" />
                  {loading ? "Evaluating Code..." : "Submit for AI Evaluation"}
                </button>
              </div>
            </div>
          )}

          {/* AI Evaluation Report Modal/Panel */}
          {evaluationResult && (
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2 text-slate-800">
                  <IconShield className="w-5 h-5 text-indigo-600" />
                  <h4 className="font-bold text-base">AI Interviewer Evaluation Report</h4>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-xl ${
                      evaluationResult.hiringRecommendation === "Strong Hire"
                        ? "bg-emerald-100 text-emerald-800"
                        : evaluationResult.hiringRecommendation === "Hire"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    Verdict: {evaluationResult.hiringRecommendation}
                  </span>

                  <span className="text-sm font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-xl">
                    Score: {evaluationResult.score}/100
                  </span>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 mb-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <span className="text-slate-400 block mb-0.5">Assessed Time Complexity</span>
                  <strong className="text-slate-800">{evaluationResult.timeComplexity}</strong>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <span className="text-slate-400 block mb-0.5">Assessed Space Complexity</span>
                  <strong className="text-slate-800">{evaluationResult.spaceComplexity}</strong>
                </div>
              </div>

              {/* Edge Cases Covered */}
              <div className="mb-4">
                <span className="text-xs font-bold text-slate-700 block mb-1.5">
                  Edge Cases Handled:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(evaluationResult.edgeCasesCovered || []).map((ec, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg flex items-center gap-1"
                    >
                      <IconCheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      {ec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Feedback Summary */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 mb-2 leading-relaxed">
                <strong className="text-slate-900 block mb-1">Interviewer Feedback:</strong>
                {evaluationResult.feedback}
              </div>

              {evaluationResult.critique && evaluationResult.critique.length > 0 && (
                <div className="text-[11px] text-slate-500">
                  <strong>Notes for improvement:</strong> {evaluationResult.critique.join(" ")}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

