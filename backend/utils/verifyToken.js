const jwt = require("jsonwebtoken");
const errorHandler = require("./error");

const verifyToken = (req, res, next) => {
  const headerToken = req.headers.authorization?.split(" ")[1];
  if (!headerToken) {
    return next(errorHandler(401, "Unauthorized"));
  }
  jwt.verify(headerToken, process.env.SECRET, (err, data) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized"));
    }
    req.admin = data;
    req.adminId = data._id;

    next();
  });
};

module.exports = verifyToken;
