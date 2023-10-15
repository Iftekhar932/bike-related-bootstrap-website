const JWT = require("jsonwebtoken");
const User = require("../model/User");

// at "/login" route
const refreshTokenAuth = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.tokenHolder) return res.sendStatus(401); // unauthorized
  const refreshToken = cookies.tokenHolder;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    return res.sendStatus(401);
  }

  JWT.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.sendStatus(401);
    }

    const accessToken = JWT.sign(
      { email: decoded.email },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "2h" }
    );

    res.status(201).json({ accessToken });
    // return next();
  });
};
module.exports = refreshTokenAuth;
