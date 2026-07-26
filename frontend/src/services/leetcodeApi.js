export async function getLeetCodeData(username) {
  const response = await fetch(
    `https://smart-coding-progress-analyzer-v2-1.onrender.com/api/leetcode/${username}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch LeetCode data");
  }

  return await response.json();
}