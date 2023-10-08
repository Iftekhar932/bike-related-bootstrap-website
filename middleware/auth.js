const JWT = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
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
};

module.exports = authenticateUser;
