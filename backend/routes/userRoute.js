const express = require("express");
const router = express.Router();

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
router.delete("/:id", deleteUser);

//GET USER
router.get("/:id", getUser);

module.exports = router;
