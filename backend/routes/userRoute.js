const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/verifyToken");
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUser,
} = require("../controllers/userController");

//CREATE
router.post("/", verifyToken, createUser);

//GET
router.get("/", verifyToken, getAllUsers);

//UPDATE
router.put("/:id", verifyToken, updateUser);

//DELETE
router.delete("/:id", verifyToken, deleteUser);

//GET USER
router.get("/:id", verifyToken, getUser);

module.exports = router;
