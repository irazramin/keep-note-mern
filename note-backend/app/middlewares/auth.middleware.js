const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    console.log("access_token", token);

    if (!token) return res.status(403).json({ message: "Access denied" });

    const decoded = jwt.verify(token, "secret");
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized Access" });
  }
};
