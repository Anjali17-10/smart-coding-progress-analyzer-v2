export async function getCodeforcesData(handle) {
  const response = await fetch(
    `https://codeforces.com/api/user.info?handles=${handle}`
  );

  const data = await response.json();

  return data.result[0];
}

export async function getCodeforcesSolved(handle) {
  const response = await fetch(
    `https://codeforces.com/api/user.status?handle=${handle}`
  );

  const data = await response.json();

  const solvedProblems = new Set();

  data.result.forEach((submission) => {
    if (submission.verdict === "OK") {
      const problemId =
        submission.problem.contestId +
        "-" +
        submission.problem.index;

      solvedProblems.add(problemId);
    }
  });

  return solvedProblems.size;
}