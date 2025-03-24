const JWT = require("jsonwebtoken");
const User = require("../model/User");

const verifyJWT = (req, res, next) => {
<<<<<<< HEAD
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);
=======
  try {
    // logic for cookie's one
    /*  const cookie = req.cookies;
    const token = cookie.a_tokenHolder;
    console.log(token, "💜"); // undefined */
>>>>>>> ac6b2008d2f19664d30895c4120b40945e600e8a

    // LOGIC FOR BEARER TOKEN
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    console.log("✨ 🌟🌟🌟🌟🌟🌟  verifyJWT  token:", token);

    JWT.verify(token, process.env.ACCESS_TOKEN_KEY, async (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ msg: "token not valid" });
      }
      const foundUser = await User.findOne({ email: decoded?.email }).exec();

      if (!foundUser) res.status(401).json({ msg: "not allowed verifyJWT" });

      // If everything is okay, call next() to proceed to the next middleware or route.
      next();
    });
  } catch (error) {
    console.log("✨ 🌟  verifyJWT  error:", error);
  }
};

module.exports = verifyJWT;
