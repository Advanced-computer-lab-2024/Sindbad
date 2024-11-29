const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = user;
    next();
  });
};
//   const accessToken = req.header("Authorization");

//   if (!accessToken) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   try {
//     const user = jwt.verify(accessToken, process.env.JWT_SECRET);
//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(403).json({ message: "Forbidden" });
//   }

module.exports = verifyJWT;
