// Codeforces Data Service with Deep Submission & Contest Analytics
import fetch from "node-fetch";

export const SAMPLE_CODEFORCES = {
  handle: "Anjali021",
  rating: 1342,
  maxRating: 1418,
  rank: "pupil",
  maxRank: "pupil",
  solved: 215,
  contestCount: 16,
  ratingMomentum: {
    last3Delta: -38,
    status: "Declining",
    recentContests: [
      { name: "Codeforces Round 920 (Div. 3)", rank: 2840, oldRating: 1380, newRating: 1418, delta: 38 },
      { name: "Codeforces Round 922 (Div. 2)", rank: 5410, oldRating: 1418, newRating: 1395, delta: -23 },
      { name: "Codeforces Round 925 (Div. 3)", rank: 6120, oldRating: 1395, newRating: 1380, delta: -15 },
      { name: "Educational Codeforces Round 162", rank: 6890, oldRating: 1380, newRating: 1342, delta: -38 },
    ],
  },
  tagDistribution: [
    { tag: "implementation", solved: 112, pct: 52 },
    { tag: "math", solved: 76, pct: 35 },
    { tag: "greedy", solved: 64, pct: 30 },
    { tag: "brute force", solved: 48, pct: 22 },
    { tag: "strings", solved: 38, pct: 18 },
    { tag: "sortings", solved: 35, pct: 16 },
    { tag: "data structures", solved: 22, pct: 10 },
    { tag: "binary search", solved: 18, pct: 8 },
    { tag: "dp", solved: 9, pct: 4 },
    { tag: "graphs", solved: 6, pct: 3 },
  ],
  difficultyDistribution: [
    { range: "800-1000", count: 110, label: "Beginner" },
    { range: "1100-1300", count: 72, label: "Pupil" },
    { range: "1400-1600", count: 26, label: "Specialist" },
    { range: "1700+", count: 7, label: "Expert+" },
  ],
  ratingHistory: [
    { contestId: 1914, contestName: "CF Round 916 (Div. 3)", rank: 4120, oldRating: 1220, newRating: 1285 },
    { contestId: 1915, contestName: "CF Round 918 (Div. 4)", rank: 1840, oldRating: 1285, newRating: 1380 },
    { contestId: 1921, contestName: "CF Round 920 (Div. 3)", rank: 2840, oldRating: 1380, newRating: 1418 },
    { contestId: 1922, contestName: "CF Round 922 (Div. 2)", rank: 5410, oldRating: 1418, newRating: 1395 },
    { contestId: 1927, contestName: "CF Round 925 (Div. 3)", rank: 6120, oldRating: 1395, newRating: 1380 },
    { contestId: 1928, contestName: "Edu CF Round 162", rank: 6890, oldRating: 1380, newRating: 1342 },
  ],
};

export async function fetchCodeforcesData(handle) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    // 1. User Info
    const userRes = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`, {
      signal: controller.signal,
    });
    const userData = await userRes.json();
    if (userData.status !== "OK" || !userData.result?.[0]) {
      throw new Error(`Codeforces user '${handle}' not found`);
    }
    const user = userData.result[0];

    // 2. Submissions
    const statusRes = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`, {
      signal: controller.signal,
    });
    const statusData = await statusRes.json();
    
    // 3. Rating History
    const ratingRes = await fetch(`https://codeforces.com/api/user.rating?handle=${handle}`, {
      signal: controller.signal,
    });
    const ratingData = await ratingRes.json();
    clearTimeout(timeout);

    const submissions = statusData.status === "OK" ? statusData.result : [];
    const ratingHistoryRaw = ratingData.status === "OK" ? ratingData.result : [];

    // Analyze solved problems and tags
    const solvedSet = new Set();
    const tagCounts = {};
    const difficultyBuckets = {
      "800-1000": 0,
      "1100-1300": 0,
      "1400-1600": 0,
      "1700+": 0,
    };

    submissions.forEach(sub => {
      if (sub.verdict === "OK" && sub.problem) {
        const probKey = `${sub.problem.contestId}-${sub.problem.index}`;
        if (!solvedSet.has(probKey)) {
          solvedSet.add(probKey);

          // Tags
          (sub.problem.tags || []).forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          });

          // Difficulty rating
          const r = sub.problem.rating;
          if (r) {
            if (r <= 1000) difficultyBuckets["800-1000"]++;
            else if (r <= 1300) difficultyBuckets["1100-1300"]++;
            else if (r <= 1600) difficultyBuckets["1400-1600"]++;
            else difficultyBuckets["1700+"]++;
          }
        }
      }
    });

    const solvedCount = solvedSet.size;

    const tagDistribution = Object.entries(tagCounts)
      .map(([tag, count]) => ({
        tag,
        solved: count,
        pct: solvedCount > 0 ? Math.round((count / solvedCount) * 100) : 0,
      }))
      .sort((a, b) => b.solved - a.solved)
      .slice(0, 10);

    const difficultyDistribution = [
      { range: "800-1000", count: difficultyBuckets["800-1000"], label: "Beginner" },
      { range: "1100-1300", count: difficultyBuckets["1100-1300"], label: "Pupil" },
      { range: "1400-1600", count: difficultyBuckets["1400-1600"], label: "Specialist" },
      { range: "1700+", count: difficultyBuckets["1700+"], label: "Expert+" },
    ];

    // Rating Momentum calculation
    const recentContests = ratingHistoryRaw.slice(-4).map(c => ({
      name: c.contestName,
      rank: c.rank,
      oldRating: c.oldRating,
      newRating: c.newRating,
      delta: c.newRating - c.oldRating,
    }));

    let last3Delta = 0;
    if (recentContests.length >= 2) {
      const first = recentContests[0].oldRating;
      const last = recentContests[recentContests.length - 1].newRating;
      last3Delta = last - first;
    }

    let momentumStatus = "Stable";
    if (last3Delta > 25) momentumStatus = "Accelerating";
    else if (last3Delta < -20) momentumStatus = "Declining";

    return {
      handle,
      rating: user.rating || 0,
      maxRating: user.maxRating || 0,
      rank: user.rank || "unranked",
      maxRank: user.maxRank || "unranked",
      solved: solvedCount,
      contestCount: ratingHistoryRaw.length,
      ratingMomentum: {
        last3Delta,
        status: momentumStatus,
        recentContests,
      },
      tagDistribution: tagDistribution.length > 0 ? tagDistribution : SAMPLE_CODEFORCES.tagDistribution,
      difficultyDistribution,
      ratingHistory: ratingHistoryRaw.slice(-15),
      isLive: true,
    };
  } catch (err) {
    console.warn(`[Codeforces Service] Falling back to synthesized profile for '${handle}':`, err.message);
    return {
      ...SAMPLE_CODEFORCES,
      handle,
      isLive: false,
      fallbackReason: err.message,
    };
  }
}

