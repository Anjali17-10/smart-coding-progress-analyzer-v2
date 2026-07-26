import express from "express";
import fetch from "node-fetch";
import * as cheerio from "cheerio";   // ✅ use * as cheerio
import cors from "cors";

const app = express();
app.use(cors());

// LeetCode route
app.get("/api/leetcode/:username", async (req, res) => {
  const { username } = req.params;

  const query = `
  {
    matchedUser(username: "${username}") {
      username

      submitStats {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
  `;

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    console.log(data);

    const stats = data.data.matchedUser.submitStats.acSubmissionNum;

res.json({
  username,

  solved: {
    solvedProblem: stats.find(x => x.difficulty === "All")?.count || 0,
    easySolved: stats.find(x => x.difficulty === "Easy")?.count || 0,
    mediumSolved: stats.find(x => x.difficulty === "Medium")?.count || 0,
    hardSolved: stats.find(x => x.difficulty === "Hard")?.count || 0,
  }
});

  } catch (err) {
   // console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
});
// CodeChef route
app.get("/api/codechef/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const response = await fetch(`https://www.codechef.com/users/${username}`);
    const html = await response.text();

    // Rating history
    const historyMatch = html.match(/var all_rating = (.*?);/s);

    let history = [];

    if (historyMatch) {
      history = JSON.parse(historyMatch[1]);
    }

    const currentRating =
      history.length > 0
        ? Number(history[history.length - 1].rating)
        : 0;

    const maxRating =
      history.length > 0
        ? Math.max(...history.map(x => Number(x.rating)))
        : 0;

    function getStars(rating) {
      if (rating < 1400) return 1;
      if (rating < 1600) return 2;
      if (rating < 1800) return 3;
      if (rating < 2000) return 4;
      if (rating < 2200) return 5;
      if (rating < 2500) return 6;
      return 7;
    }

    const solvedMatch = html.match(/solving\s*<span[^>]*>(\d+)<\/span>\s*Problems/i);

    const solvedProblems = solvedMatch
      ? Number(solvedMatch[1])
      : 0;

    res.json({
      username,
      rating: currentRating,
      maxRating,
      stars: getStars(currentRating),
      solvedProblems,
      history,
    });

  } catch (err) {
  //  console.error(err);
    res.status(500).json({
      error: "Failed to fetch CodeChef data",
    });
  }
});
// codeforces
app.get("/api/codeforces/:handle", async (req, res) => {
  try {
    const response = await fetch(
      `https://codeforces.com/api/user.info?handles=${req.params.handle}`
    );

    const data = await response.json();

    if (data.status !== "OK") {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json(data.result[0]);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
app.get("/api/codeforces/:handle/solved", async (req, res) => {
  try {
    const response = await fetch(
      `https://codeforces.com/api/user.status?handle=${req.params.handle}`
    );

    const data = await response.json();

    if (data.status !== "OK") {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const solved = new Set();

    data.result.forEach((sub) => {
      if (sub.verdict === "OK") {
        solved.add(`${sub.problem.contestId}-${sub.problem.index}`);
      }
    });

    res.json({
      solved: solved.size,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
app.get("/api/codeforces/:handle/history", async (req, res) => {
  try {
    const response = await fetch(
      `https://codeforces.com/api/user.rating?handle=${req.params.handle}`
    );

    const data = await response.json();

    if (data.status !== "OK") {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json(data.result);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
