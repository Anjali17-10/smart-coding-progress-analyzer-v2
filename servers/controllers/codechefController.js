const axios = require("axios");
const cheerio = require("cheerio");

exports.getCodeChefData = async (req, res) => {
  try {
    const { username } = req.params;

    const response = await axios.get(
      `https://www.codechef.com/users/${username}`
    );

    const $ = cheerio.load(response.data);

    console.log($.html());

    res.json({
      success: true,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Failed to fetch CodeChef profile",
    });
  }
};