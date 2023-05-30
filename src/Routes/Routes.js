const express = require("express");
const {
  SignUpUser,
  getAllUsers,
  OtpVerification,
  LoginUser,
} = require("../Controllers/Routes-Controller");
const {
  SignupValidation,
  ResultOfValidation,
  LoginValidation,
} = require("../Middleware/Validation");
const router = express.Router();

router.post("/signup", SignupValidation, ResultOfValidation, SignUpUser);
router.post("/login", LoginValidation, ResultOfValidation, LoginUser);
router.get("/users", getAllUsers);
router.post("/otp-verification", OtpVerification);

module.exports = router;
