export async function getLeetCodeData(username) {
  const [profileRes, solvedRes, contestRes] =
    await Promise.all([
      fetch(
        `https://alfa-leetcode-api.onrender.com/${username}`
      ),
      fetch(
        `https://alfa-leetcode-api.onrender.com/${username}/solved`
      ),
      fetch(
        `https://alfa-leetcode-api.onrender.com/${username}/contest`
      ),
    ]);

  const profile = await profileRes.json();
  const solved = await solvedRes.json();
  const contest = await contestRes.json();

  return {
    ...profile,
    solved,
    contest,
  };
}