const axios = require("axios");

exports.getUserInfo = async (req, res) => {
  try {
    const { handle } = req.params;

    const response = await axios.get(
      `https://codeforces.com/api/user.info?handles=${handle}`
    );

    res.json(response.data.result[0]);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch Codeforces user",
    });
  }
};

exports.getSolvedCount = async (req, res) => {
  try {
    const { handle } = req.params;

    const response = await axios.get(
      `https://codeforces.com/api/user.status?handle=${handle}`
    );

    const solved = new Set();

    response.data.result.forEach((sub) => {
      if (sub.verdict === "OK") {
        solved.add(`${sub.problem.contestId}-${sub.problem.index}`);
      }
    });

    res.json({
      solved: solved.size,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch solved count",
    });
  }
};

exports.getRatingHistory = async (req, res) => {
  try {
    const { handle } = req.params;

    const response = await axios.get(
      `https://codeforces.com/api/user.rating?handle=${handle}`
    );

    res.json(response.data.result);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch rating history",
    });
  }
};