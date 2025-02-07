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
router.post("/", createUser);

//GET
router.get("/", getAllUsers);

//UPDATE
router.put("/:id", updateUser);

//DELETE
router.delete("/:id", verifyToken, deleteUser);

//GET USER
router.get("/:id", verifyToken, getUser);

module.exports = router;
