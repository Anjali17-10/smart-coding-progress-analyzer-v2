import { useState } from "react";
import Footer from "./components/Footer";
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
const [loading, setLoading] = useState(false);
  const [cfData, setCfData] = useState(null);
  const [cfSolved, setCfSolved] = useState(0);
  const [cfRatingHistory, setCfRatingHistory] = useState([]);
  const [ccData, setCcData] = useState(null);
  const [lcData, setLcData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");

async function handleAnalyze() {
  setLoading(true);

  try {
    if (!leetcode || !codeforces || !codechef) {
  alert("Please fill all usernames.");
  return;
}
    // ---------- Codeforces ----------
    const data = await getCodeforcesData(codeforces);
    const solved = await getCodeforcesSolved(codeforces);
    const history = await getCodeforcesRatingHistory(codeforces);

    // ---------- LeetCode ----------
    const leetcodeData = await getLeetCodeData(leetcode);

    // ---------- CodeChef ----------
    const ccResponse = await fetch(
      `http://localhost:5000/api/codechef/${codechef}`
    );

    if (!ccResponse.ok) {
      alert("❌ Invalid CodeChef username");
      setLoading(false);
      return;
    }

    const cc = await ccResponse.json();

    setCfData(data);
setCfSolved(solved);
setCfRatingHistory(history);
setLcData(leetcodeData);
setCcData(cc);

setLastUpdated(new Date().toLocaleString());

setShowCard(true);
  } catch (error) {
    alert(error.message);
  } finally {
    setLoading(false);
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
  loading={loading}
/>

          {showCard && (
            <>
<StatsCard
  leetcode={leetcode}
  codeforces={codeforces}
  codechef={codechef}
  cfData={cfData}
  cfSolved={cfSolved}
  lcData={lcData}
  ccData={ccData}
  lastUpdated={lastUpdated}
/>

           <ProgressChart
  cfData={cfData}
  cfSolved={cfSolved}
  lcData={lcData}
  ccData={ccData}
/>

<RatingChart
  cfData={cfData}
  lcData={lcData}
  ccData={ccData}
/>

              <ConsistencyChart 
                lcData={lcData}
              />

             <RatingHistoryChart
  cfHistory={cfRatingHistory}
  ccHistory={ccData?.history || []}
/>
              

              <AnalyticsCard
                cfData={cfData}
                cfSolved={cfSolved}
                history={cfRatingHistory}
                 ccData={ccData}
              />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
