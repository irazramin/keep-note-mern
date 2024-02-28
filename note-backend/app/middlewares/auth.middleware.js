const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) return res.status(403).json({ message: "Access denied" });

    const decoded = jwt.verify(token, "secret");
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }
};
