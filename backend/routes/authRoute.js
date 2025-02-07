const express = require("express");
const router = express.Router();
const { login, logout } = require("../controllers/authcontroller");

//LOGIN
router.post("/login", login);

//LOGOUT
router.get("/logout", logout);

module.exports = router;
