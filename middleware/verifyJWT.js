const JWT = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) return res.status(401);

  const token = authHeader.split(" ")[1];
  console.log(token);

  JWT.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401);
    }
    console.log(decoded);
  });
  next();
};
module.exports = verifyJWT;
