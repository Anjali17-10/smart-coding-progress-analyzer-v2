export default function Footer() {
  return (
    <footer className="mt-20 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Project */}
          <div>
            <h2 className="text-2xl font-bold">
              Smart Coding Progress Analyzer
            </h2>

            <p className="text-slate-400 mt-4 leading-7">
              A full-stack coding analytics dashboard that aggregates
              LeetCode, Codeforces, and CodeChef statistics into one
              beautiful interface with interactive charts and insights.
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Features
            </h3>

            <ul className="space-y-2 text-slate-400">
              <li>📊 Interactive Analytics</li>
              <li>📈 Rating History</li>
              <li>🏆 Coding Statistics</li>
              <li>🌐 Multi-platform Dashboard</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Connect
            </h3>

            <div className="space-y-3">

              <a
                href="https://github.com/Anjali17-10/smart-coding-progress-analyzer-v2"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-blue-400 transition"
              >
                📂 Project Repository
              </a>

              <a
                href="https://github.com/Anjali17-10"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-blue-400 transition"
              >
                👨‍💻 GitHub Profile
              </a>

              <a
                href="https://www.linkedin.com/in/anjali-diswar1710/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-blue-400 transition"
              >
                💼 LinkedIn
              </a>

              <a
                href="mailto:anjalidiswar570@gmail.com"
                className="flex items-center gap-2 hover:text-blue-400 transition"
              >
                ✉️ Email
              </a>

            </div>
          </div>

        </div>

        <div className="border-t border-slate-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-slate-400">
            © {new Date().getFullYear()} Anjali Diswar • Open Source Project
          </p>

          <p className="text-slate-500 text-sm mt-2 md:mt-0">
            Built with React • Express • Tailwind • Recharts
          </p>

        </div>

      </div>
    </footer>
  );
}