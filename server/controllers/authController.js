const User = require("../models/User");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password is required" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        message: "User already exists",
        user: existingUser,
        success: false,
      });
    }

    // Todo: hash password before saving
    const newUser = new User({ email, password });
    await newUser.save();

    // generate jwt
    const secretKey = process.env.JWT_SECRETKEY;
    const token = jwt.sign({ userId: newUser._id }, secretKey, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Register successful",
      data: { token: token, email: newUser.email },
      success: true,
    });
  } catch (err) {
    console.error("Register error:", err);
    res
      .status(500)
      .json({ error: "Registration failed. Please try again later." });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ error: "Email and password is required", sucess: false });

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "User not found. Please register first.",
        success: false,
      });
    }

    if (user.password !== password) {
      return res
        .status(401)
        .json({ error: "Invalid password", success: false });
    }

    // generate jwt
    const secretKey = process.env.JWT_SECRETKEY;
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      data: { token: token, email: user.email },
      success: true,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed. Please try again later." });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    // console.log("URL", req.url, req.method);

    const token = req.headers["authorization"]?.split(" ")[1];
    let userId;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
      userId = decoded.userId;
    } else {
      throw new Error("Token is missing");
    }
    if (userId) {
      const user = await User.findById(userId).select("-password");
      return res.send({
        success: true,
        message: "You are authenticated!",
        data: user,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not get current user: " + error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser
};
