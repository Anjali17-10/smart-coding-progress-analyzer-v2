// CodeChef Data Service with Rating & Contest History
import fetch from "node-fetch";

export const SAMPLE_CODECHEF = {
  username: "sane_ring_4",
  rating: 1582,
  maxRating: 1640,
  stars: 3,
  solvedProblems: 146,
  contestCount: 11,
  ratingMomentum: {
    last3Delta: -18,
    status: "Declining",
  },
  history: [
    { code: "START110", getyear: "2026", getmonth: "1", rating: "1450", rank: "3200", name: "Starters 110" },
    { code: "START114", getyear: "2026", getmonth: "1", rating: "1520", rank: "2100", name: "Starters 114" },
    { code: "START118", getyear: "2026", getmonth: "2", rating: "1610", rank: "1450", name: "Starters 118" },
    { code: "START120", getyear: "2026", getmonth: "2", rating: "1640", rank: "1120", name: "Starters 120" },
    { code: "START122", getyear: "2026", getmonth: "2", rating: "1605", rank: "2480", name: "Starters 122" },
    { code: "START124", getyear: "2026", getmonth: "3", rating: "1582", rank: "3150", name: "Starters 124" },
  ],
};

function getStars(rating) {
  if (rating < 1400) return 1;
  if (rating < 1600) return 2;
  if (rating < 1800) return 3;
  if (rating < 2000) return 4;
  if (rating < 2200) return 5;
  if (rating < 2500) return 6;
  return 7;
}

export async function fetchCodeChefData(username) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(`https://www.codechef.com/users/${username}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`CodeChef responded with status ${response.status}`);
    }

    const html = await response.text();

    // Rating history regex
    const historyMatch = html.match(/var all_rating = (.*?);/s);
    let history = [];
    if (historyMatch) {
      try {
        history = JSON.parse(historyMatch[1]);
      } catch (e) {
        console.warn("Failed to parse CodeChef rating history JSON");
      }
    }

    const currentRating = history.length > 0 ? Number(history[history.length - 1].rating) : 0;
    const maxRating = history.length > 0 ? Math.max(...history.map(x => Number(x.rating))) : 0;

    const solvedMatch = html.match(/solving\s*<span[^>]*>(\d+)<\/span>\s*Problems/i);
    const solvedProblems = solvedMatch ? Number(solvedMatch[1]) : 0;

    let last3Delta = 0;
    if (history.length >= 3) {
      const recent = history.slice(-3);
      last3Delta = Number(recent[recent.length - 1].rating) - Number(recent[0].rating);
    }

    return {
      username,
      rating: currentRating,
      maxRating,
      stars: getStars(currentRating),
      solvedProblems,
      contestCount: history.length,
      ratingMomentum: {
        last3Delta,
        status: last3Delta > 20 ? "Accelerating" : last3Delta < -15 ? "Declining" : "Stable",
      },
      history: history.slice(-15),
      isLive: true,
    };
  } catch (err) {
    console.warn(`[CodeChef Service] Falling back to synthesized profile for '${username}':`, err.message);
    return {
      ...SAMPLE_CODECHEF,
      username,
      isLive: false,
      fallbackReason: err.message,
    };
  }
}

