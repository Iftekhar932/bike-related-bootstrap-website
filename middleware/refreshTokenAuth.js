const JWT = require("jsonwebtoken");

const refreshTokenAuth = (req, res, next) => {
  const cookies = req.cookies;
  console.log("✨ 🌟  refreshTokenAuth  cookies:", cookies);
  if (!cookies?.tokenholder) return res.status(401); // unauthorized
  const refreshToken = cookies.tokenholder;

  try {
    const decoded = JWT.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_KEY,
      (err, decoded) => {
        const accessToken = JWT.sign(
          { email: decoded.email },
          process.env.ACCESS_TOKEN_KEY,
          { expiresIn: "30s" }
        );
      }
    );
    res.status(200).send({ accessToken });
  } catch (error) {
    console.log("✨ 🌟  refreshTokenAuth  error:", error);
    return res.status(401); // unauthorized
  }
  next();
};
module.exports = refreshTokenAuth;
