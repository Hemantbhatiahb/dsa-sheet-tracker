const express = require("express");
const authRouter = express.Router();
const { registerUser, loginUser, getCurrentUser } = require("../controllers/authController");

// Register
authRouter.post("/register", registerUser);

// Login
authRouter.post("/login", loginUser);

authRouter.get('/get-current-user', getCurrentUser)

module.exports = authRouter;
