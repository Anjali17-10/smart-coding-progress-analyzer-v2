const express = require("express");
const cors = require("cors");
const leetcodeRoutes = require("./routes/leetcodeRoutes");
require("dotenv").config();
const codechefRoutes = require("./routes/codechefRoutes");
const codeforcesRoutes = require("./routes/codeforcesRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/codechef", codechefRoutes);
app.use("/api/codeforces", codeforcesRoutes);
app.use("/api/leetcode", leetcodeRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});