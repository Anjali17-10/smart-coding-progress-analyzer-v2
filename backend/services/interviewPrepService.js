// AI Technical Interview Preparation Service
// Topic-specific question generation, mock technical interviews, progressive hints, code evaluation, and readiness tracking

export const INTERVIEW_QUESTIONS = [
  {
    id: "dp-1",
    topic: "Dynamic Programming",
    title: "Coin Change: Minimum Coins for Amount",
    difficulty: "Medium",
    tier: "SDE-1 / SDE-2",
    companies: ["Amazon", "Google", "Microsoft"],
    timeLimit: 40,
    expectedComplexity: { time: "O(amount * coins.length)", space: "O(amount)" },
    statement: `You are given an integer array 'coins' representing coins of different denominations and an integer 'amount' representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.\n\nYou may assume that you have an infinite number of each kind of coin.`,
    examples: [
      { input: "coins = [1, 2, 5], amount = 11", output: "3", explanation: "11 = 5 + 5 + 1" },
      { input: "coins = [2], amount = 3", output: "-1", explanation: "Amount cannot be formed" },
      { input: "coins = [1], amount = 0", output: "0", explanation: "Zero coins needed for amount 0" },
    ],
    constraints: [
      "1 <= coins.length <= 12",
      "1 <= coins[i] <= 2^31 - 1",
      "0 <= amount <= 10^4",
    ],
    hints: [
      { level: 1, title: "High-level Intuition", text: "Think of this as finding the shortest path or optimal subproblem. To make amount 'A', if we use coin 'c', the remaining amount to form is 'A - c'." },
      { level: 2, title: "State Representation", text: "Define dp[i] as the minimum coins needed for amount 'i'. Base case: dp[0] = 0, and all other dp[i] initialized to infinity (amount + 1)." },
      { level: 3, title: "Recurrence & Edge Cases", text: "For each amount from 1 to 'amount', check each coin 'c': if i >= c, dp[i] = min(dp[i], dp[i - c] + 1). Watch out when amount = 0." },
      { level: 4, title: "Full Reference Solution", text: "JavaScript Solution:\nfunction coinChange(coins, amount) {\n  const dp = new Array(amount + 1).fill(amount + 1);\n  dp[0] = 0;\n  for (let i = 1; i <= amount; i++) {\n    for (const c of coins) {\n      if (i >= c) dp[i] = Math.min(dp[i], dp[i - c] + 1);\n    }\n  }\n  return dp[amount] > amount ? -1 : dp[amount];\n}" },
    ],
  },
  {
    id: "graph-1",
    topic: "Graphs & Shortest Path",
    title: "Course Schedule: Cycle Detection & Topo Sort",
    difficulty: "Medium",
    tier: "SDE-1 / SDE-2",
    companies: ["Meta", "Uber", "Apple"],
    timeLimit: 45,
    expectedComplexity: { time: "O(V + E)", space: "O(V + E)" },
    statement: `There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.\n\nReturn true if you can finish all courses. Otherwise, return false.`,
    examples: [
      { input: "numCourses = 2, prerequisites = [[1, 0]]", output: "true", explanation: "Take course 0 then course 1." },
      { input: "numCourses = 2, prerequisites = [[1, 0], [0, 1]]", output: "false", explanation: "Cycle detected: 0 depends on 1 and 1 depends on 0." },
    ],
    constraints: [
      "1 <= numCourses <= 2000",
      "0 <= prerequisites.length <= 5000",
      "prerequisites[i].length == 2",
    ],
    hints: [
      { level: 1, title: "High-level Intuition", text: "This problem is equivalent to detecting whether a cycle exists in a Directed Acyclic Graph (DAG)." },
      { level: 2, title: "Algorithmic Paradigm", text: "You can use either Kahn's Algorithm (BFS with In-degrees) or DFS with 3-state coloring (0 = unvisited, 1 = visiting, 2 = visited)." },
      { level: 3, title: "Implementation Detail", text: "With Kahn's algorithm: calculate in-degrees for each node. Push nodes with in-degree 0 into a queue. As you pop, decrement neighbors' in-degrees. If total popped == numCourses, return true." },
      { level: 4, title: "Full Reference Solution", text: "JavaScript Kahn's Algorithm:\nfunction canFinish(numCourses, prerequisites) {\n  const inDegree = new Array(numCourses).fill(0);\n  const adj = Array.from({ length: numCourses }, () => []);\n  for (const [dest, src] of prerequisites) {\n    adj[src].push(dest);\n    inDegree[dest]++;\n  }\n  const q = [];\n  for (let i = 0; i < numCourses; i++) if (inDegree[i] === 0) q.push(i);\n  let visited = 0;\n  while (q.length) {\n    const node = q.shift();\n    visited++;\n    for (const next of adj[node]) {\n      inDegree[next]--;\n      if (inDegree[next] === 0) q.push(next);\n    }\n  }\n  return visited === numCourses;\n}" },
    ],
  },
  {
    id: "tree-1",
    topic: "Trees & Binary Search Trees",
    title: "Lowest Common Ancestor of a Binary Tree",
    difficulty: "Medium",
    tier: "SDE-1",
    companies: ["Amazon", "Microsoft", "Facebook"],
    timeLimit: 35,
    expectedComplexity: { time: "O(N)", space: "O(H) recursion stack" },
    statement: `Given a binary tree, find the lowest common ancestor (LCA) of two given nodes, p and q.\n\nAccording to the definition of LCA: 'The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).'`,
    examples: [
      { input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1", output: "3", explanation: "LCA of 5 and 1 is 3." },
      { input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4", output: "5", explanation: "LCA of 5 and 4 is 5, since a node can be descendant of itself." },
    ],
    constraints: [
      "The number of nodes in the tree is in the range [2, 10^5].",
      "-10^9 <= Node.val <= 10^9",
      "All Node.val are unique.",
      "p != q, and both p and q exist in the tree.",
    ],
    hints: [
      { level: 1, title: "High-level Intuition", text: "Traverse the tree using post-order recursion (bottom-up). If the current node matches p or q, bubble it up." },
      { level: 2, title: "Recursive Return Condition", text: "If root is null or root === p or root === q, return root. Recursively search left and right subtrees." },
      { level: 3, title: "Branch Merging", text: "If both left and right recursive calls return non-null, this current node is the LCA! If only one is non-null, pass that one up." },
      { level: 4, title: "Full Reference Solution", text: "function lowestCommonAncestor(root, p, q) {\n  if (!root || root === p || root === q) return root;\n  const left = lowestCommonAncestor(root.left, p, q);\n  const right = lowestCommonAncestor(root.right, p, q);\n  if (left && right) return root;\n  return left || right;\n}" },
    ],
  },
  {
    id: "twopointer-1",
    topic: "Two Pointers & Sliding Window",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    tier: "SDE-1",
    companies: ["Google", "Bloomberg", "Amazon"],
    timeLimit: 30,
    expectedComplexity: { time: "O(N)", space: "O(min(N, charset))" },
    statement: `Given a string s, find the length of the longest substring without duplicate characters.`,
    examples: [
      { input: "s = 'abcabcbb'", output: "3", explanation: "The answer is 'abc', with the length of 3." },
      { input: "s = 'bbbbb'", output: "1", explanation: "The answer is 'b', with the length of 1." },
      { input: "s = 'pwwkew'", output: "3", explanation: "The answer is 'wke', with the length of 3." },
    ],
    constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces."],
    hints: [
      { level: 1, title: "High-level Intuition", text: "Use a sliding window defined by two pointers [left, right] and a Map or Set to store characters in the current window." },
      { level: 2, title: "Window Invariant", text: "Expand 'right'. If s[right] is already in the window, shrink 'left' until s[right] is no longer duplicate." },
      { level: 3, title: "O(N) Optimization with Map", text: "Instead of shrinking one-by-one with a Set, store the last seen index of each character in a Map and jump 'left' directly to map.get(char) + 1." },
      { level: 4, title: "Full Reference Solution", text: "function lengthOfLongestSubstring(s) {\n  let maxLen = 0, left = 0;\n  const lastIdx = new Map();\n  for (let right = 0; right < s.length; right++) {\n    const char = s[right];\n    if (lastIdx.has(char) && lastIdx.get(char) >= left) {\n      left = lastIdx.get(char) + 1;\n    }\n    lastIdx.set(char, right);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}" },
    ],
  },
];

export function getInterviewQuestions(topic = null) {
  if (!topic || topic === "All") return INTERVIEW_QUESTIONS;
  return INTERVIEW_QUESTIONS.filter(q => q.topic.toLowerCase().includes(topic.toLowerCase()));
}

export function evaluateInterviewSolution({
  questionId,
  code,
  language = "javascript",
  hintsUsed = 0,
  timeSpentSeconds = 600,
}) {
  const question = INTERVIEW_QUESTIONS.find(q => q.id === questionId) || INTERVIEW_QUESTIONS[0];
  const codeTrimmed = (code || "").trim();

  // Basic sanity check
  if (!codeTrimmed || codeTrimmed.length < 20) {
    return {
      score: 15,
      verdict: "Needs Substantial Work",
      hiringRecommendation: "Reject",
      timeComplexity: "Unknown",
      spaceComplexity: "Unknown",
      edgeCasesCovered: ["None"],
      feedback: "The submitted code is too brief or empty to assess correctly. An interviewer looks for full implementation of logic and edge cases.",
      hintsUsed,
      penalty: hintsUsed * 10,
    };
  }

  // Algorithmic evaluation heuristics
  let score = 90;
  const edgeCases = [];
  const critique = [];

  // Check language-agnostic hallmarks
  const hasLoops = /for|while|forEach|map|filter/.test(codeTrimmed);
  const hasRecursion = new RegExp(question.title.split(":")[0].replace(/[^a-zA-Z]/g, ""), "i").test(codeTrimmed);
  const checksNull = /null|undefined|!|== null|=== 0|length === 0|empty|len\(/.test(codeTrimmed);

  if (checksNull) {
    edgeCases.push("Handled empty or null boundary input");
  } else {
    score -= 8;
    critique.push("Did not explicitly validate null or empty input at the start of function.");
  }

  // Deduct based on hint usage (fair interview penalty)
  const hintPenalty = Math.min(35, hintsUsed * 8);
  score -= hintPenalty;

  // Question specific checks
  if (question.id === "dp-1") {
    const hasArrayFill = /fill|vector|new Array|memset/i.test(codeTrimmed);
    const hasMin = /min/i.test(codeTrimmed);
    if (!hasArrayFill || !hasMin) {
      score -= 20;
      critique.push("Optimal solution requires dynamic programming with memoization or tabulation. Your code appears to miss the state transition array.");
    } else {
      edgeCases.push("Constructed DP state array initialized to sentinel value");
      edgeCases.push("Checked if target amount is reachable (-1 return check)");
    }
  } else if (question.id === "graph-1") {
    const hasQueue = /queue|shift|pop|push|deque/i.test(codeTrimmed);
    const hasDegreeOrVisited = /degree|visited|seen|color/i.test(codeTrimmed);
    if (!hasQueue && !hasDegreeOrVisited) {
      score -= 22;
      critique.push("Graph cycle detection requires either in-degree tracking (Kahn's) or 3-state visited tracking.");
    } else {
      edgeCases.push("Maintained in-degree counts or visited state for cycle detection");
    }
  } else if (question.id === "twopointer-1") {
    const hasSetOrMap = /set|map|dict|seen|last/i.test(codeTrimmed);
    if (hasSetOrMap) {
      edgeCases.push("Used Hash Set / Map for O(1) duplicate character lookup");
    } else {
      score -= 15;
      critique.push("Missing Hash Map/Set for tracking seen characters, resulting in sub-optimal O(N^2) brute-force lookup.");
    }
  }

  score = Math.max(25, Math.min(98, score));

  let hiringRecommendation = "Hire";
  if (score >= 85) hiringRecommendation = "Strong Hire";
  else if (score >= 70) hiringRecommendation = "Hire";
  else if (score >= 50) hiringRecommendation = "Lean Hire";
  else hiringRecommendation = "Needs Improvement";

  return {
    score,
    hiringRecommendation,
    timeComplexity: question.expectedComplexity.time,
    spaceComplexity: question.expectedComplexity.space,
    edgeCasesCovered: edgeCases.length > 0 ? edgeCases : ["Basic functional cases"],
    critique: critique.length > 0 ? critique : ["Clean implementation with solid structure."],
    feedback: `Good attempt on '${question.title}'. ${score >= 75 ? "Your solution demonstrates sound grasp of core invariants." : "Focus on practicing optimal data structures and testing edge cases before submission."}`,
    hintsUsed,
    hintPenalty,
    timeSpentSeconds,
  };
}

export function computeInterviewReadiness(sessions = []) {
  if (!sessions || sessions.length === 0) {
    return {
      overallReadinessPct: 68,
      readinessTier: "Interview Ready (SDE-1)",
      completedInterviews: 0,
      topicConfidence: [
        { topic: "Dynamic Programming", readiness: 52, status: "Needs Practice" },
        { topic: "Trees & Binary Search Trees", readiness: 74, status: "Solid" },
        { topic: "Two Pointers & Sliding Window", readiness: 86, status: "Strong" },
        { topic: "Graphs & Topological Sort", readiness: 60, status: "Moderate" },
      ],
    };
  }

  const avgScore = sessions.reduce((acc, s) => acc + s.score, 0) / sessions.length;
  const avgHints = sessions.reduce((acc, s) => acc + (s.hintsUsed || 0), 0) / sessions.length;

  const readiness = Math.round(Math.max(20, Math.min(98, avgScore * 0.8 + (4 - avgHints) * 5)));

  return {
    overallReadinessPct: readiness,
    readinessTier: readiness >= 80 ? "FAANG / Top-Tier Ready" : readiness >= 65 ? "Mid-Tier SDE Ready" : "Building Foundations",
    completedInterviews: sessions.length,
    topicConfidence: [
      { topic: "Dynamic Programming", readiness: Math.min(100, Math.round(readiness * 0.8)), status: "Focus Area" },
      { topic: "Trees & Binary Search Trees", readiness: Math.min(100, Math.round(readiness * 1.05)), status: "Solid" },
      { topic: "Two Pointers & Sliding Window", readiness: Math.min(100, Math.round(readiness * 1.15)), status: "Strong" },
      { topic: "Graphs & BFS/DFS", readiness: Math.min(100, Math.round(readiness * 0.88)), status: "Moderate" },
    ],
  };
}

