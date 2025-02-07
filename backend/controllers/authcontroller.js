const Auth = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//login
module.exports.login = async (req, res) => {
  try {
    const admin = await Auth.findOne({ username: req.body.username });

    if (!admin) {
      return res.status(404).json({ error: "Admin Not found" });
    }
    const match = await bcrypt.compare(req.body.password, admin.password);

    if (!match) {
      return res.status(401).json({ error: "Wrong credentials" });
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
      .json({ message: "User Logged in Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
};
