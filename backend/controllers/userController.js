const User = require("../models/userModel");
const bcrypt = require("bcrypt");

//CREATE
module.exports.createUser = async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;
    const newUser = new User({ firstName, lastName });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//GET ALL USERS
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//UPDATE
module.exports.updateUser = async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName },
      { new: true } // Return updated user
    );

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//DELETE
module.exports.deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//GET BY ID
module.exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
