const JWT = require("jsonwebtoken");
const User = require("../model/User");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  JWT.verify(token, process.env.ACCESS_TOKEN_KEY, async (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(401).json({ msg: "token not valid" });
    }

    const foundUser = await User.findOne({ email: decoded?.email }).exec();

    if (!foundUser) res.status(401).json({ msg: "not allowed verifyJWT" });

    // If everything is okay, call next() to proceed to the next middleware or route.
    next();
  });
};

module.exports = verifyJWT;
