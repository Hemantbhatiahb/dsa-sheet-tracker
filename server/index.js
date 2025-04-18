const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const topicRouter = require("./routes/topics");
const authRouter = require("./routes/auth");
dotenv.config();

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// connect to db
connectDB();

// Routes
app.use("/api/topics", topicRouter);
app.use("/api/auth", authRouter);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("running");
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log("App is running on PORT: " + PORT);
});
