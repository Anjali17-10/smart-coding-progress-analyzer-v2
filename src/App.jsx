import { useState } from "react";
import Navbar from "./components/Navbar";
import InputForm from "./components/InputForm";
import StatsCard from "./components/StatsCard";

export default function App() {
  const [leetcode, setLeetcode] = useState("");
  const [codeforces, setCodeforces] = useState("");
  const [codechef, setCodechef] = useState("");
  const [showCard, setShowCard] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="flex justify-center px-4 py-12">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
          <p className="text-center text-slate-500">
            Track ratings, solved problems and coding progress across multiple
            platforms in one place.
          </p>

          <InputForm
            leetcode={leetcode}
            setLeetcode={setLeetcode}
            codeforces={codeforces}
            setCodeforces={setCodeforces}
            codechef={codechef}
            setCodechef={setCodechef}
            onAnalyze={() => setShowCard(true)}
          />

          {showCard && (
            <StatsCard
              leetcode={leetcode}
              codeforces={codeforces}
              codechef={codechef}
            />
          )}
        </div>
      </main>
    </div>
  );
}