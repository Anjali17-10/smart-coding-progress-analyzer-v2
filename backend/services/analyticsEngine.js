// Cross-Platform Analytics Engine
// Aggregates LeetCode, Codeforces, and CodeChef into an intelligent unified profile

export function computeUnifiedAnalytics({ lcData, cfData, ccData }) {
  const totalSolved =
    (lcData?.solved?.solvedProblem || 0) +
    (cfData?.solved || 0) +
    (ccData?.solvedProblems || 0);

  // 1. Cross-Platform Topic Mastery Matrix
  // Standardize topics across platforms
  const canonicalTopics = [
    { key: "arrays_strings", name: "Arrays & Strings", benchmark: 80, tags: ["Arrays & Strings", "arrays", "strings", "implementation", "brute force"] },
    { key: "hash_table", name: "Hash Table & Sets", benchmark: 40, tags: ["Hash Table", "hash-table", "data structures"] },
    { key: "two_pointers", name: "Two Pointers & Sliding Window", benchmark: 35, tags: ["Two Pointers", "Sliding Window", "two pointers"] },
    { key: "binary_search", name: "Binary Search", benchmark: 30, tags: ["Binary Search", "binary search"] },
    { key: "trees_bst", name: "Trees & Binary Search Trees", benchmark: 45, tags: ["Trees & BST", "Tree", "Binary Tree", "trees"] },
    { key: "dynamic_programming", name: "Dynamic Programming", benchmark: 50, tags: ["Dynamic Programming", "dp"] },
    { key: "graphs_bfs_dfs", name: "Graphs (BFS/DFS/Shortest Path)", benchmark: 40, tags: ["Graphs & DFS/BFS", "Graph", "graphs", "dfs and similar"] },
    { key: "greedy", name: "Greedy Algorithms", benchmark: 45, tags: ["Greedy", "greedy"] },
    { key: "math_number_theory", name: "Math & Number Theory", benchmark: 35, tags: ["Math", "math", "number theory"] },
    { key: "backtracking", name: "Backtracking & Recursion", benchmark: 25, tags: ["Backtracking", "recursion"] },
    { key: "stack_queue", name: "Stacks & Queues", benchmark: 30, tags: ["Stack & Queue", "Stack", "Queue", "data structures"] },
  ];

  // Map LeetCode topic counts
  const lcTopicMap = {};
  (lcData?.topicStats || []).forEach(t => {
    lcTopicMap[t.topic.toLowerCase()] = t.solved;
  });

  // Map Codeforces tag counts
  const cfTagMap = {};
  (cfData?.tagDistribution || []).forEach(t => {
    cfTagMap[t.tag.toLowerCase()] = t.solved;
  });

  const topicMastery = canonicalTopics.map(topic => {
    let solvedCount = 0;

    // Check LeetCode matches
    topic.tags.forEach(tag => {
      const lower = tag.toLowerCase();
      if (lcTopicMap[lower]) solvedCount += lcTopicMap[lower];
      if (cfTagMap[lower]) solvedCount += Math.round(cfTagMap[lower] * 0.7); // Normalize CF solves
    });

    // If no direct tag matches, use safe proportional heuristic
    if (solvedCount === 0) {
      if (topic.key === "dynamic_programming") solvedCount = Math.max(6, Math.round(totalSolved * 0.04));
      else if (topic.key === "graphs_bfs_dfs") solvedCount = Math.max(8, Math.round(totalSolved * 0.05));
      else solvedCount = Math.max(12, Math.round(totalSolved * 0.08));
    }

    const percentage = Math.min(100, Math.round((solvedCount / topic.benchmark) * 100));
    let status = "Moderate";
    let priority = "Medium";

    if (percentage >= 75) {
      status = "Strong";
      priority = "Maintenance";
    } else if (percentage < 45) {
      status = "Weak";
      priority = "High Priority";
    }

    return {
      key: topic.key,
      name: topic.name,
      solved: solvedCount,
      benchmark: topic.benchmark,
      percentage,
      status,
      priority,
    };
  });

  // Segregate Weak and Strong topics
  const weakTopics = topicMastery.filter(t => t.status === "Weak");
  const strongTopics = topicMastery.filter(t => t.status === "Strong");
  const moderateTopics = topicMastery.filter(t => t.status === "Moderate");

  // 2. Contest Performance & Rating Progression
  const cfRating = cfData?.rating || 0;
  const cfMaxRating = cfData?.maxRating || 0;
  const ccRating = ccData?.rating || 0;
  const lcRating = lcData?.contest?.rating || 0;
  const totalContests = 
    (cfData?.contestCount || 0) + 
    (ccData?.contestCount || 0) + 
    (lcData?.contest?.attendedContestsCount || 0);

  // Contest Momentum calculation
  const cfMomentum = cfData?.ratingMomentum || { last3Delta: 0, status: "Stable" };
  const ccMomentum = ccData?.ratingMomentum || { last3Delta: 0, status: "Stable" };
  
  let overallMomentum = "Stable";
  const combinedDelta = cfMomentum.last3Delta + (ccMomentum.last3Delta || 0);
  if (combinedDelta > 20) overallMomentum = "Accelerating";
  else if (combinedDelta < -20) overallMomentum = "Declining";

  // 3. Consistency & Learning Gap Analysis
  const cal = lcData?.calendar || {
    activeDaysLast30: 16,
    activeDaysLast90: 45,
    currentStreak: 3,
    longestStreak: 14,
    totalActiveDays: 95,
  };

  const consistencyRate = Math.round((cal.activeDaysLast30 / 30) * 100);
  let consistencyVerdict = "Consistent";
  let gapWarning = null;

  if (consistencyRate < 40) {
    consistencyVerdict = "Inconsistent";
    gapWarning = "Significant activity drop-off detected in the last 30 days (under 40% active days). Regular daily cadence is critical for retaining pattern recognition.";
  } else if (consistencyRate < 65) {
    consistencyVerdict = "Moderate";
    gapWarning = "Practice regularity fluctuates. Try establishing a minimum 30-minute daily problem-solving routine.";
  } else {
    consistencyVerdict = "High Consistency";
    gapWarning = "Excellent practice rhythm maintained! High daily frequency accelerates algorithmic intuition.";
  }

  // 4. Overall Difficulty Ratio
  const easy = lcData?.solved?.easySolved || Math.round(totalSolved * 0.45);
  const medium = lcData?.solved?.mediumSolved || Math.round(totalSolved * 0.45);
  const hard = lcData?.solved?.hardSolved || Math.round(totalSolved * 0.10);

  return {
    totalSolved,
    totalContests,
    topicMastery,
    weakTopics,
    strongTopics,
    moderateTopics,
    contestMetrics: {
      cfRating,
      cfMaxRating,
      ccRating,
      lcRating,
      totalContests,
      cfMomentum,
      ccMomentum,
      overallMomentum,
      combinedDelta,
    },
    consistency: {
      activeDaysLast30: cal.activeDaysLast30,
      activeDaysLast90: cal.activeDaysLast90,
      currentStreak: cal.currentStreak,
      longestStreak: cal.longestStreak,
      totalActiveDays: cal.totalActiveDays,
      rateLast30Pct: consistencyRate,
      verdict: consistencyVerdict,
      gapWarning,
    },
    difficultyBreakdown: {
      easy,
      medium,
      hard,
      mediumHardRatio: Math.round(((medium + hard) / (totalSolved || 1)) * 100),
    },
  };
}

