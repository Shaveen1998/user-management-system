const User = require("../models/userModel");
const errorHandler = require("../utils/error");

// CREATE
module.exports.createUser = async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;
    const newUser = new User({ firstName, lastName });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    next(errorHandler(500, "Error creating user"));
  }
};

// GET ALL USERS
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(errorHandler(500, "Error fetching users"));
  }
};

// UPDATE
module.exports.updateUser = async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName },
      { new: true }
    );

    if (!updatedUser) return next(errorHandler(404, "User not found"));

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    next(errorHandler(500, "Error updating user"));
  }
};

// DELETE
module.exports.deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return next(errorHandler(404, "User not found"));

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(errorHandler(500, "Error deleting user"));
  }
};

// GET BY ID
module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandler(404, "User not found"));

    res.status(200).json(user);
  } catch (error) {
    next(errorHandler(500, "Error fetching user"));
  }
};
