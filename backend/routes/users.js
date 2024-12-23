const express = require("express");
const router = express.Router();
const {
  registerUser,
  authenticateUser,
  getUsers,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", authenticateUser);
router.get("/", getUsers);

module.exports = router;
