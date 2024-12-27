const jwt = require("jsonwebtoken");
const { responseStatus } = require("../handlers/responseStatus.handler");

const verifyToken = (token, res) => {
  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded; // Return the decoded token if valid
  } catch (err) {
    // Handle token errors
    responseStatus(res, 401, "failed", "Invalid or expired token");
    return null; // Return null if the token is invalid
  }
};

module.exports = verifyToken;
