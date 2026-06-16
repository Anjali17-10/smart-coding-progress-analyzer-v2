export async function getLeetCodeData(username) {
  const response = await fetch(
    "https://leetcode-stats-api.herokuapp.com/" + username
  );

  const data = await response.json();

  return data;
}