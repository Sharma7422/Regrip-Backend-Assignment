const express = require("express");
const cors = require("cors");
const path = require("path");
const { apiLimiter } = require("./middleware/rateLimiter");
require("dotenv").config();
require("./models");

const app = express();



app.use(apiLimiter);
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));



const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");



app.get("/", (req, res) => {
  res.send("Welcome to regrip_assignment!");
});


app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
