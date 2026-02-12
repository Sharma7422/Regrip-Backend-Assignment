const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
require("./models");

const app = express();




app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));



const authRoutes = require("./routes/auth.routes");



app.get("/", (req, res) => {
  res.send("Welcome to regrip_assignment!");
});


app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
