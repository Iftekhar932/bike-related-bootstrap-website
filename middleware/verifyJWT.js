const JWT = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) return res.status(401).json("Not authorized");

  const token = authHeader.split(" ")[1];

  JWT.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json("token not valid");
    }
  });
  next();
};
module.exports = verifyJWT;
