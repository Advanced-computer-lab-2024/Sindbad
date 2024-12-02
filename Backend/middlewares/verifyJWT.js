const jwt = require("jsonwebtoken");

// List of routes to skip JWT verification
const excludedRoutes = [
  /^\/signup$/, // Matches exactly "/signup"
  /^\/tag$/,
  /^\/auth(\/.*)?$/, // Matches "/auth" and anything after it
  /^\/advertiser\/upload\/[a-fA-F0-9]+$/, // Matches "/advertiser/upload/{id}"
  /^\/seller\/upload\/[a-fA-F0-9]+$/, // Matches "/seller/upload/{id}"
  /^\/tourGuide\/upload\/[a-fA-F0-9]+$/, // Matches "/tourGuide/upload/{id}"

  // /^\/public-route/, // Matches "/public-route" and any sub-routes
  // Add more complex regex patterns if needed
];

const verifyJWT = (req, res, next) => {
  // Check if the route matches any of the excluded patterns
  if (excludedRoutes.some((pattern) => pattern.test(req.originalUrl))) {
    return next();
  }

  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    console.log("no auth in header");
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

module.exports = verifyJWT;
