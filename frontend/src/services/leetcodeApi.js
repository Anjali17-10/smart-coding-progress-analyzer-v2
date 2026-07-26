export async function getLeetCodeData(username) {
  const response = await fetch(
    `http://localhost:5000/api/leetcode/${username}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch LeetCode data");
  }

  return await response.json();
}