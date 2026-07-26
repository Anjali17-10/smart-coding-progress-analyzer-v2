const axios = require("axios");

exports.getLeetCodeData = async (req, res) => {
  try {
    const { username } = req.params;

    const [profileRes, solvedRes] = await Promise.all([
      axios.get(`https://alfa-leetcode-api.onrender.com/${username}`),
      axios.get(`https://alfa-leetcode-api.onrender.com/${username}/solved`),
    ]);

    const profile = profileRes.data;
    const solved = solvedRes.data;

    res.json({
      username: profile.username,
      name: profile.name,
      avatar: profile.avatar,
      ranking: profile.ranking,
      country: profile.country,

      solved: {
        solvedProblem: solved.solvedProblem,
        easySolved: solved.easySolved,
        mediumSolved: solved.mediumSolved,
        hardSolved: solved.hardSolved,
      },
    });

  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      error: "Failed to fetch LeetCode data",
    });
  }
};