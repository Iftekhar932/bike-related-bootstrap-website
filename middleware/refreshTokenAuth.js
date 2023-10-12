const JWT = require("jsonwebtoken");

// at "/login" route
const refreshTokenAuth = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.tokenHolder) return res.status(401); // unauthorized
  const refreshToken = cookies.tokenHolder;

  try {
    JWT.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, decoded) => {
      if (err) {
        console.log(err, "line 13 ");
        return res.status(401);
      }
      const accessToken = JWT.sign(
        { email: decoded.email },
        process.env.ACCESS_TOKEN_KEY,
        { expiresIn: "2h" }
      );
      res.json({ accessToken });
    });
  } catch (error) {
    console.log("✨ 🌟  refreshTokenAuth  error:", error);
    return res.status(401); // unauthorized
  }
};
module.exports = refreshTokenAuth;


what to do after i get that access token