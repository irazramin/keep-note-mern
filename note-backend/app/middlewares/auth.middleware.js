const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
  try {
    const headers = req.headers.authorization;
    
    const token = headers && headers.split(" ")[1]
    console.log("access_token", token);

    if (!token) return res.status(403).json({ message: "Access denied" });

    req.user = jwt.verify(token, "secret");

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized Access" });
  }
};
