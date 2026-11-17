// AI-Powered Study Planner Service
// Generates personalized weekly plans based on actual user weak topics, available study hours, and contest goals

const CURATED_PROBLEMS = {
  dynamic_programming: [
    { title: "Coin Change (0/1 Unbounded Knapsack)", platform: "LeetCode", difficulty: "Medium", id: 322, url: "https://leetcode.com/problems/coin-change/" },
    { title: "Longest Increasing Subsequence (Patience Sorting / DP)", platform: "LeetCode", difficulty: "Medium", id: 300, url: "https://leetcode.com/problems/longest-increasing-subsequence/" },
    { title: "House Robber II (Circular State DP)", platform: "LeetCode", difficulty: "Medium", id: 213, url: "https://leetcode.com/problems/house-robber-ii/" },
    { title: "Edit Distance (2D Grid Alignment)", platform: "LeetCode", difficulty: "Medium", id: 72, url: "https://leetcode.com/problems/edit-distance/" },
    { title: "Partition Equal Subset Sum", platform: "LeetCode", difficulty: "Medium", id: 416, url: "https://leetcode.com/problems/partition-equal-subset-sum/" },
    { title: "Cut Ribbon (1300 Rating CF DP)", platform: "Codeforces", difficulty: "Medium", id: "189A", url: "https://codeforces.com/problemset/problem/189/A" },
  ],
  graphs_bfs_dfs: [
    { title: "Course Schedule (Topological Sort / Cycle Detection)", platform: "LeetCode", difficulty: "Medium", id: 207, url: "https://leetcode.com/problems/course-schedule/" },
    { title: "Rotting Oranges (Multi-source BFS)", platform: "LeetCode", difficulty: "Medium", id: 994, url: "https://leetcode.com/problems/rotting-oranges/" },
    { title: "Network Delay Time (Dijkstra Shortest Path)", platform: "LeetCode", difficulty: "Medium", id: 743, url: "https://leetcode.com/problems/network-delay-time/" },
    { title: "Number of Provinces (Disjoint Set Union / DFS)", platform: "LeetCode", difficulty: "Medium", id: 547, url: "https://leetcode.com/problems/number-of-provinces/" },
    { title: "Badge (Codeforces 1029B BFS/DFS)", platform: "Codeforces", difficulty: "Easy", id: "1020B", url: "https://codeforces.com/problemset/problem/1020/B" },
  ],
  trees_bst: [
    { title: "Binary Tree Maximum Path Sum", platform: "LeetCode", difficulty: "Hard", id: 124, url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
    { title: "Lowest Common Ancestor of a Binary Tree", platform: "LeetCode", difficulty: "Medium", id: 236, url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/" },
    { title: "Construct Binary Tree from Preorder and Inorder Traversal", platform: "LeetCode", difficulty: "Medium", id: 105, url: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/" },
    { title: "Validate Binary Search Tree", platform: "LeetCode", difficulty: "Medium", id: 98, url: "https://leetcode.com/problems/validate-binary-search-tree/" },
  ],
  two_pointers: [
    { title: "3Sum (Sorted Two Pointers)", platform: "LeetCode", difficulty: "Medium", id: 15, url: "https://leetcode.com/problems/3sum/" },
    { title: "Container With Most Water (Greedy Two Pointers)", platform: "LeetCode", difficulty: "Medium", id: 11, url: "https://leetcode.com/problems/container-with-most-water/" },
    { title: "Longest Substring Without Repeating Characters (Sliding Window)", platform: "LeetCode", difficulty: "Medium", id: 3, url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
    { title: "Books (Codeforces Two Pointers 1400)", platform: "Codeforces", difficulty: "Medium", id: "279B", url: "https://codeforces.com/problemset/problem/279/B" },
  ],
  binary_search: [
    { title: "Find Minimum in Rotated Sorted Array", platform: "LeetCode", difficulty: "Medium", id: 153, url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
    { title: "Search a 2D Matrix II", platform: "LeetCode", difficulty: "Medium", id: 240, url: "https://leetcode.com/problems/search-a-2d-matrix-ii/" },
    { title: "Koko Eating Bananas (Binary Search on Answer)", platform: "LeetCode", difficulty: "Medium", id: 875, url: "https://leetcode.com/problems/koko-eating-bananas/" },
  ],
  backtracking: [
    { title: "Subsets & Permutations (Choice State Tree)", platform: "LeetCode", difficulty: "Medium", id: 78, url: "https://leetcode.com/problems/subsets/" },
    { title: "Word Search (2D Matrix Backtracking)", platform: "LeetCode", difficulty: "Medium", id: 79, url: "https://leetcode.com/problems/word-search/" },
    { title: "N-Queens", platform: "LeetCode", difficulty: "Hard", id: 51, url: "https://leetcode.com/problems/n-queens/" },
  ],
  greedy: [
    { title: "Jump Game II", platform: "LeetCode", difficulty: "Medium", id: 45, url: "https://leetcode.com/problems/jump-game-ii/" },
    { title: "Gas Station (Greedy Invariant)", platform: "LeetCode", difficulty: "Medium", id: 134, url: "https://leetcode.com/problems/gas-station/" },
    { title: "Task Scheduler", platform: "LeetCode", difficulty: "Medium", id: 621, url: "https://leetcode.com/problems/task-scheduler/" },
  ],
};

export function generateStudyPlan({
  analytics,
  hoursPerWeek = 10,
  targetGoal = "Upcoming Contest & Rating Growth",
  customWeakTopics = null,
}) {
  const weakTopics = customWeakTopics || (analytics?.weakTopics || []).map(w => w.name);
  const primaryWeak = weakTopics[0] || "Dynamic Programming";
  const secondaryWeak = weakTopics[1] || "Graphs & Shortest Path";

  const dailyHours = Math.round((hoursPerWeek / 7) * 10) / 10;
  const minutesPerDay = Math.round((hoursPerWeek * 60) / 7);

  // Map primary weak topic to problem keys
  const weakKey1 = primaryWeak.toLowerCase().includes("graph") ? "graphs_bfs_dfs" : "dynamic_programming";
  const weakKey2 = secondaryWeak.toLowerCase().includes("tree") ? "trees_bst" : 
                   secondaryWeak.toLowerCase().includes("pointer") ? "two_pointers" : 
                   secondaryWeak.toLowerCase().includes("search") ? "binary_search" : "graphs_bfs_dfs";

  const pool1 = CURATED_PROBLEMS[weakKey1] || CURATED_PROBLEMS.dynamic_programming;
  const pool2 = CURATED_PROBLEMS[weakKey2] || CURATED_PROBLEMS.graphs_bfs_dfs;

  const days = [
    {
      day: "Monday",
      focus: `Weak Topic Mastery: ${primaryWeak} (Foundations)`,
      duration: `${minutesPerDay} mins`,
      allocations: [
        { type: "Concept Review", duration: "25%", detail: "Review state transitions, recurrence relations, and memoization initialization." },
        { type: "Hands-on Practice", duration: "75%", detail: "Solve 2 targeted medium problems without looking at solutions for 25 mins." },
      ],
      problems: [pool1[0], pool1[1]].filter(Boolean),
      checklist: [
        "Write base cases explicitly on scratch paper before coding",
        "Trace time complexity of recurrence before running test cases",
      ],
    },
    {
      day: "Tuesday",
      focus: `Weak Topic Mastery: ${primaryWeak} (Variations & Edge Cases)`,
      duration: `${minutesPerDay} mins`,
      allocations: [
        { type: "Variation Solving", duration: "80%", detail: "Push into non-standard variations (e.g. 2D DP grids or interval states)." },
        { type: "Editorial Analysis", duration: "20%", detail: "Read alternative solutions to compare space optimizations ($O(N)$ vs $O(1)$)." },
      ],
      problems: [pool1[2], pool1[3]].filter(Boolean),
      checklist: [
        "Optimize 2D state array to 1D rolling array if applicable",
        "Test edge cases: empty input, array of length 1, all identical values",
      ],
    },
    {
      day: "Wednesday",
      focus: `Secondary Focus: ${secondaryWeak}`,
      duration: `${minutesPerDay} mins`,
      allocations: [
        { type: "Pattern Recognition", duration: "30%", detail: "Identify standard traversal templates (BFS Queue vs DFS Recursion vs DSU)." },
        { type: "Implementation Drills", duration: "70%", detail: "Solve 2 core problems focusing on zero compilation errors on first attempt." },
      ],
      problems: [pool2[0], pool2[1]].filter(Boolean),
      checklist: [
        "Verify graph representation (Adjacency List vs Adjacency Matrix)",
        "Check for visited sets to avoid infinite cycles",
      ],
    },
    {
      day: "Thursday",
      focus: "Speed & Implementation Drills (Contest Simulation)",
      duration: `${minutesPerDay} mins`,
      allocations: [
        { type: "Timed Drill", duration: "70%", detail: "Solve two 1200-1400 rated problems under a strict 40-minute countdown timer." },
        { type: "Post-Mortem Review", duration: "30%", detail: "Analyze wasted time: where did you get stuck? Was it syntax or logic?" },
      ],
      problems: [
        { title: "3Sum (Medium)", platform: "LeetCode", difficulty: "Medium", id: 15, url: "https://leetcode.com/problems/3sum/" },
        { title: "Books (Codeforces 1400)", platform: "Codeforces", difficulty: "Medium", id: "279B", url: "https://codeforces.com/problemset/problem/279/B" },
      ],
      checklist: [
        "Do not consult hints or discussion boards during the 40-min window",
        "Write invariant conditions before entering while loops",
      ],
    },
    {
      day: "Friday",
      focus: `Advanced ${primaryWeak} & Mixed Bag`,
      duration: `${minutesPerDay} mins`,
      allocations: [
        { type: "Challenge Problem", duration: "60%", detail: "Tackle a Hard or Upper-Medium problem with strict 35-min struggle period." },
        { type: "Technique Synthesis", duration: "40%", detail: "Write down the key takeaway pattern in your personal DSA notes." },
      ],
      problems: [pool1[4] || pool1[0]],
      checklist: [
        "Focus on problem breakdown rather than immediate coding",
        "Document pattern: State definition, Base case, Recurrence",
      ],
    },
    {
      day: "Saturday",
      focus: "Contest Day (Live or Virtual)",
      duration: `${Math.round(minutesPerDay * 1.3)} mins`,
      allocations: [
        { type: "Live / Virtual Contest", duration: "75%", detail: "Participate in LeetCode Biweekly / Codeforces Div. 3 or Div. 2 contest." },
        { type: "Immediate Review", duration: "25%", detail: "Quickly note problems that caused rating loss or excessive submission penalties." },
      ],
      problems: [
        { title: "Weekly / Biweekly Live Contest", platform: "LeetCode / Codeforces", difficulty: "Mixed", id: "Live", url: "https://codeforces.com/contests" },
      ],
      checklist: [
        "Check array bounds to avoid Out Of Bounds errors",
        "Use 64-bit integers (long long) for products and cumulative sums",
      ],
    },
    {
      day: "Sunday",
      focus: "Mandatory Upsolving & Weekly Progress Consolidation",
      duration: `${minutesPerDay} mins`,
      allocations: [
        { type: "Upsolving Contest Problem", duration: "60%", detail: "Re-solve the first problem you failed to solve in Saturday's contest." },
        { type: "Weekly Progress Review", duration: "40%", detail: "Review completed problems and adjust focus for next week's plan." },
      ],
      problems: [
        { title: "Contest Upsolving: Problem C/D", platform: "Codeforces / LeetCode", difficulty: "Challenging", id: "Upsolve", url: "https://codeforces.com" },
      ],
      checklist: [
        "Understand the editorial intuition completely before writing code",
        "Re-implement from scratch without referencing the editorial code",
      ],
    },
  ];

  const totalAllocatedMinutes = days.reduce((sum, d) => sum + parseInt(d.duration), 0);

  return {
    overview: {
      targetGoal,
      weeklyHours: hoursPerWeek,
      dailyAverageHours: dailyHours,
      primaryFocus: primaryWeak,
      secondaryFocus: secondaryWeak,
      totalProblemsScheduled: days.reduce((acc, d) => acc + d.problems.length, 0),
      curatedFocusStrategy: `Customized 7-day schedule weighted 40% towards your identified gap in ${primaryWeak}, 30% speed & contest simulation, and 30% review/upsolving.`,
    },
    schedule: days,
    actionGuidelines: [
      "The 25-Minute Rule: Spend at least 25 minutes trying to formulate a mathematical invariant before peeking at hints.",
      "Upsolving is Non-Negotiable: Rating growth happens when you solve problems you couldn't solve during the contest.",
      "Code from Scratch: Never copy-paste solutions. Type every character to solidify muscle memory.",
    ],
  };
}

