import fetch from "node-fetch";
import * as cheerio from "cheerio";  // ✅ use * as cheerio for ESM

export async function getCodeChefData(username) {
  try {
    const res = await fetch(`https://www.codechef.com/users/${username}`);
    const html = await res.text();
    const $ = cheerio.load(html);

    // Extract rating, stars, and problems solved
    const rating = $(".rating-number").first().text().trim();
    const stars = $(".rating").first().text().trim();
    const problemsSolved = $(".content h5").first().text().trim();

    return {
      username,
      rating,
      stars,
      problemsSolved,
    };
  } catch (error) {
    console.error("Error fetching CodeChef data:", error);
    return { error: "Failed to fetch CodeChef data" };
  }
}

