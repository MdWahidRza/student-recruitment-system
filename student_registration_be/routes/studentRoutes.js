const express = require("express");
const router = express.Router();
const {
  register,
  studentLoginController,
  getStudentProfileController,
  updateStudentProfileController,
} = require("../controllers/studentController");
const {
  validateStudentRegistration,
} = require("../middlewares/studentValidators");
const isLoggedIn = require("../middlewares/isLoggedIn");

//Routes
router.post("/register", validateStudentRegistration, register);
router.post("/login", studentLoginController);
router.get("/profile", isLoggedIn, getStudentProfileController);
router.put("/update", isLoggedIn, updateStudentProfileController);
module.exports = router;
