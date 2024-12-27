const verifyToken = require("../utils/verifyToken");
const { responseStatus } = require("../handlers/responseStatus.handler");

const isLoggedIn = (req, res, next) => {
  try {
    // Check if the authorization header exists and is properly formatted
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return responseStatus(
        res,
        401,
        "failed",
        "Authorization token missing or malformed"
      );
    }

    // Extract token from header
    const token = authorizationHeader.split(" ")[1];

    // Verify the token
    const userData = verifyToken(token);
    if (!userData) {
      return responseStatus(res, 401, "failed", "Invalid or expired token");
    }

    // Attach user data to req.userAuth
    req.userAuth = userData;

    // Proceed to the next middleware or controller
    next();
  } catch (error) {
    return responseStatus(
      res,
      500,
      "failed",
      `An error occurred while verifying the token: ${error.message}`
    );
  }
};

module.exports = isLoggedIn;
