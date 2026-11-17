import {
  IconBrain,
  IconChart,
  IconTrend,
  IconCalendar,
  IconCode,
  IconSparkles,
} from "./Icons";

export default function Navbar({ activeTab, setActiveTab, onSelectPreset }) {
  const tabs = [
    { id: "analytics", label: "Intelligent Analytics", icon: IconChart, badge: "Feature 1" },
    { id: "ai-insights", label: "AI Performance Insights", icon: IconBrain, badge: "Feature 2" },
    { id: "ml-predictions", label: "ML Predictions & Archetypes", icon: IconTrend, badge: "Feature 3" },
    { id: "study-planner", label: "AI Study Planner", icon: IconCalendar, badge: "Feature 4" },
    { id: "interview-prep", label: "AI Interview Studio", icon: IconCode, badge: "Feature 5" },
  ];

  return (
    <header className="bg-slate-900 text-white shadow-xl sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-3.5 gap-3">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <IconBrain className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-tight text-white">
                  Smart Coding Progress Analyzer <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-2 py-0.5 rounded-full font-mono">v2.0 AI</span>
                </h1>
              </div>
              <p className="text-xs text-slate-400">
                AI Diagnostics • ML Performance Forecasts • Adaptive Study Plans • Mock Interviews
              </p>
            </div>
          </div>

          {/* Quick Demo Preset Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-[11px] font-semibold text-slate-400 mr-1 hidden sm:inline">
              1-Click Demo Profiles:
            </span>
            <button
              onClick={() => onSelectPreset("anjali")}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition"
            >
              👩‍💻 Anjali (Active)
            </button>
            <button
              onClick={() => onSelectPreset("grinder")}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition"
            >
              ⚡ Contest Grinder
            </button>
            <button
              onClick={() => onSelectPreset("interview")}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition"
            >
              💼 Interview Aspirant
            </button>
          </div>
        </div>

        {/* Tab Navigation Navigation */}
        <nav className="flex space-x-1 overflow-x-auto scrollbar-none pt-2 border-t border-slate-800/80">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 border-b-2 text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? "border-indigo-400 text-white bg-slate-800/60 rounded-t-xl"
                    : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-indigo-400" : "text-slate-400"}`} />
                <span>{tab.label}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                    isActive ? "bg-indigo-500/20 text-indigo-300" : "bg-slate-800 text-slate-500"
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
