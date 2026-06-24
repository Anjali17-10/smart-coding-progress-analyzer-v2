import { useState } from "react";

import Navbar from "./components/Navbar";
import InputForm from "./components/InputForm";
import StatsCard from "./components/StatsCard";
import ProgressChart from "./components/ProgressChart";
import RatingChart from "./components/RatingChart";
import ConsistencyChart from "./components/ConsistencyChart";
import RatingHistoryChart from "./components/RatingHistoryChart";
import AnalyticsCard from "./components/AnalyticsCard";

import {
  getCodeforcesData,
  getCodeforcesSolved,
  getCodeforcesRatingHistory,
} from "./services/codeforcesApi";

import { getLeetCodeData } from "./services/leetcodeApi";

export default function App() {
  const [leetcode, setLeetcode] = useState("");
  const [codeforces, setCodeforces] = useState("");
  const [codechef, setCodechef] = useState("");

  const [showCard, setShowCard] = useState(false);

  const [cfData, setCfData] = useState(null);
  const [cfSolved, setCfSolved] = useState(0);
  const [cfRatingHistory, setCfRatingHistory] = useState([]);

  const [lcData, setLcData] = useState(null);

  async function handleAnalyze() {
    try {
      const [
        data,
        solved,
        history,
        leetcodeData,
      ] = await Promise.all([
        getCodeforcesData(codeforces),
        getCodeforcesSolved(codeforces),
        getCodeforcesRatingHistory(codeforces),
        getLeetCodeData(leetcode),
      ]);
console.log("LeetCode Data:", leetcodeData);
console.log(lcData.contest)
      setCfData(data);
      setCfSolved(solved);
      setCfRatingHistory(history);

      setLcData(leetcodeData);

      setShowCard(true);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch user data.");
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="flex justify-center px-4 py-12">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">

          <p className="text-center text-slate-500">
            Track ratings, solved problems and coding progress
            across multiple platforms in one place.
          </p>

          <InputForm
            leetcode={leetcode}
            setLeetcode={setLeetcode}
            codeforces={codeforces}
            setCodeforces={setCodeforces}
            codechef={codechef}
            setCodechef={setCodechef}
            onAnalyze={handleAnalyze}
          />

          {showCard && (
            <>
              <StatsCard
                leetcode={leetcode}
                codeforces={codeforces}
                codechef={codechef}
                cfData={cfData}
                lcData={lcData}
              />

              <ProgressChart
                cfData={cfData}
                cfSolved={cfSolved}
                lcData={lcData}
              />

              <RatingChart
                cfData={cfData}
                lcData={lcData}
              />

              <ConsistencyChart />

              <RatingHistoryChart
                history={cfRatingHistory}
              />

              <AnalyticsCard
                cfData={cfData}
                cfSolved={cfSolved}
                history={cfRatingHistory}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
