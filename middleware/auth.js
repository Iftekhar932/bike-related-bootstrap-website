const JWT = require("jsonwebtoken");
const User = require("../model/User.js");
const bcrypt = require("bcrypt");

const authenticateUser = async (req, res) => {
  const { firstName, lastName, password, email } = req.body;
  try {
    if (!(email && password)) {
      return res
        .status(400)
        .json({ message: "Email and password is required" });
    }

    const foundUser = await User.findOne({ email: email }).exec();
    const match = bcrypt.compare(password, foundUser.password);

    const accessToken = JWT.sign(
      { email: email },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "2m" }
    );

    const refreshToken = JWT.sign(
      { email: email },
      process.env.REFRESH_TOKEN_KEY,
      { expiresIn: "1d" }
    );

    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    res.cookie("tokenHolder", refreshToken, {
      /*  httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, */
    });

    res.json({ accessToken, from: "auth.js" });
  } catch (error) {
    console.log("✨ 🌟  authenticateUser  error:", error);
    return res.status(401).send({ msg: "Invalid token" }); // 401 unauthorized
  }
};

module.exports = authenticateUser;
