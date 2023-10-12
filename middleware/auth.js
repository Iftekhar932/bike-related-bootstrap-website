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

    const foundUser = await User.findOne({ email: email });
    const match = bcrypt.compare(password, foundUser.password);

    const accessToken = JWT.sign(
      { email: email },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "15s" }
    );

    const refreshToken = JWT.sign(
      { email: email },
      process.env.REFRESH_TOKEN_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("tokenHolder", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (error) {
    console.log("✨ 🌟  authenticateUser  error:", error);
    return res.status(401).send({ msg: "Invalid token" }); // 401 unauthorized
  }
};

/* const authenticateUser = (req, res, next) => {
  token = req.body.token || req.query.token || req.headers["x-access-token"];
  console.log(req?.body?.token);
  console.log(req?.query?.token);
  console.log(req?.headers["x-access-token"]);
  if (!token) {
    return res
      .status(403)
      .send({ msg: "Token not found, token required for authentication" }); //403 forbidden
  }
  try {
    const decoded = JWT.verify(token, process.env.TOKEN_KEY);
    console.log("🚀 ~ file: auth.js:10 ~ authenticateUser ~ decoded:", decoded);
    req.user = decoded;
  } catch (error) {
    console.log(error);
    return res.status(401).send({ msg: "Invalid token" }); // 401 unauthorized
  }
  return next();
}; */

module.exports = authenticateUser;
