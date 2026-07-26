const BASE_URL = "http://localhost:5000/api/codeforces";

export async function getCodeforcesData(handle) {
  const response = await fetch(`${BASE_URL}/${handle}`);

  if (!response.ok) {
    throw new Error("Invalid Codeforces username");
  }

  return await response.json();
}

export async function getCodeforcesSolved(handle) {
  const response = await fetch(`${BASE_URL}/${handle}/solved`);

  if (!response.ok) {
    throw new Error("Invalid Codeforces username");
  }

  const data = await response.json();
  return data.solved;
}

export async function getCodeforcesRatingHistory(handle) {
  const response = await fetch(`${BASE_URL}/${handle}/history`);

  if (!response.ok) {
    throw new Error("Invalid Codeforces username");
  }

  return await response.json();
}