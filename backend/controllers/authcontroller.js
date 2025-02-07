const Auth = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/error");

//login
module.exports.login = async (req, res, next) => {
  try {
    const admin = await Auth.findOne({ username: req.body.username });

    if (!admin) {
      return next(errorHandler(403, "Username Not found"));
    }
    const match = await bcrypt.compare(req.body.password, admin.password);

    if (!match) {
      return next(errorHandler(401, "Wrong credentials!"));
    }
    const token = jwt.sign(
      {
        _id: admin._id,
        username: admin.username,
      },
      process.env.SECRET,
      { expiresIn: "3d" }
    );
    const { password, ...info } = admin._doc;
    res
      .cookie("token", token)
      .status(200)
      .json({
        token,
        admin: { id: admin._id, username: admin.username },
        message: "User logged in successfully",
      });
  } catch (error) {
    next(error);
  }
};

///logout
module.exports.logout = async (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .send("User logged out successfully!");
  } catch (error) {
    return next(errorHandler(500, "Error logging out"));
  }
};
