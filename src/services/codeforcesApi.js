const BASE_URL = "http://localhost:5000/api/codeforces";

export async function getCodeforcesData(handle) {
  const response = await fetch(`${BASE_URL}/${handle}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Codeforces user");
  }

  return await response.json();
}

export async function getCodeforcesSolved(handle) {
  const response = await fetch(`${BASE_URL}/${handle}/solved`);

  if (!response.ok) {
    throw new Error("Failed to fetch solved count");
  }

  const data = await response.json();

  return data.solved;
}

export async function getCodeforcesRatingHistory(handle) {
  const response = await fetch(`${BASE_URL}/${handle}/history`);

  if (!response.ok) {
    throw new Error("Failed to fetch rating history");
  }

  return await response.json();
}