const jwt = require("jsonwebtoken");

// List of routes to skip JWT verification
const excludedRoutes = [
  /^\/signup$/, // Matches exactly "/signup"
  /^\/user\/signup$/, // Matches exactly "/user/signup"
  /^\/user\/forgot-password$/, // Matches exactly "/user/forgot-password"
  /^\/user\/reset-password$/, // Matches exactly "/user/reset-password"
  /^\/tag$/,
  /^\/category$/,
  /^\/webhook$/,
  /^\/activity\/?$/, // Matches "/activity" and "/activity/"
  /^\/activity\/[a-fA-F0-9]+$/, // Matches "/activity/{id}"
  /^\/activity\/\?.*$/, // Matches "/activity/" with query parameters
  /^\/itinerary\/?$/, // Matches "/itinerary" and "/itinerary/"
  /^\/itinerary\/[a-fA-F0-9]+$/, // Matches "/itinerary/{id}"
  /^\/itinerary\/\?.*$/, // Matches "/itinerary/" with query parameters
  /^\/category\/?$/, // Matches "/category" and "/category/"
  /^\/category\/[a-fA-F0-9]+$/, // Matches "/category/{id}"
  /^\/category\/\?.*$/, // Matches "/category/" with query parameters
  /^\/tourguide\/?$/, // Matches "/tourguide" and "/tourguide/"
  /^\/tourguide\/[a-fA-F0-9]+$/, // Matches "/tourguide/{id}"
  /^\/tourguide\/\?.*$/, // Matches "/tourguide/" with query parameters
  /^\/advertiser\/?$/, // Matches "/advertiser" and "/advertiser/"
  /^\/advertiser\/[a-fA-F0-9]+$/, // Matches "/advertiser/{id}"
  /^\/advertiser\/\?.*$/, // Matches "/advertiser/" with query parameters
  /^\/site(\/?$|\?.*)$/, // Matches "/site", "/site/", and "/site" with query parameters
  /^\/site\/[a-fA-F0-9]+$/, // Matches "/site/{id}"
  /^\/auth(\/.*)?$/, // Matches "/auth" and anything after it
  /^\/advertiser\/upload\/[a-fA-F0-9]+$/, // Matches "/advertiser/upload/{id}"
  /^\/seller\/upload\/[a-fA-F0-9]+$/, // Matches "/seller/upload/{id}"
  /^\/tourGuide\/upload\/[a-fA-F0-9]+$/, // Matches "/tourGuide/upload/{id}"
  /^\/advertiser\/upload\/[a-fA-F0-9]+$/, // Matches "/advertiser/upload/{id}"
  /^\/seller\/upload\/[a-fA-F0-9]+$/, // Matches "/seller/upload/{id}"
  /^\/tourGuide\/upload\/[a-fA-F0-9]+$/, // Matches "/tourGuide/upload/{id}"
  /^\/user\/get-user-role\/[a-fA-F0-9]+$/,
  /^\/trip\/my-trips\/(?:[a-fA-F0-9]+|null)$/,
  /^\/activity\/my-activities\/[a-fA-F0-9]+$/,
  /^\/tourGuide\/[a-fA-F0-9]+$/,
  /^\/tourist\/[a-fA-F0-9]+$/,
  /^\/itinerary\/my-itineraries\/[a-fA-F0-9]+$/,
  // /^\/public-route/, // Matches "/public-route" and any sub-routes
  // Add more complex regex patterns if needed
];

const verifyJWT = (req, res, next) => {
  // console.log("original url: ", req.originalUrl);
  // Check if the route matches any of the excluded patterns
  if (excludedRoutes.some((pattern) => pattern.test(req.originalUrl))) {
    console.log("skipping jwt verification");
    return next();
  }

  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    console.log("no auth in header");
    return res.status(401).json({ message: "No JWT token in request" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(426).json({ message: "JWT access token expired" });
    }

    req.user = user;
    next();
  });
};

module.exports = verifyJWT;
