const JWT = require("jsonwebtoken");
const User = require("../model/User");

const verifyJWT = (req, res, next) => {
  const cookie = req.cookies;
  const a_token = cookie.a_tokenHolder;
  console.log(a_token);

  // LOGIC FOR BEARER TOKEN
  /* const authHeader = req.headers.Authorization || req.headers.authorization;
  console.log("verifyJWT.js 🍎🍎", authHeader);
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
   */

  JWT.verify(a_token, process.env.ACCESS_TOKEN_KEY, async (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ msg: "token not valid" });
    }
    const foundUser = await User.findOne({ email: decoded?.email }).exec();

    if (!foundUser) res.status(401).json({ msg: "not allowed verifyJWT" });

    // If everything is okay, call next() to proceed to the next middleware or route.
    next();
  });
};

module.exports = verifyJWT;
