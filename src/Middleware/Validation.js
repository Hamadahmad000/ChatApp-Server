const { check, validationResult } = require("express-validator");

const SignupValidation = [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage({ success: false, error: "name is required" })
    .isLength({ min: 3, max: 20 })
    .withMessage({
      success: false,
      error: "name length must be 3 to 20 characters",
    }),
  check("phone")
    .trim()
    .not()
    .isEmpty()
    .withMessage({ success: false, error: "Mobile number is Required" })
    .isLength({ min: 9, max: 13 })
    .withMessage({
      success: false,
      error: "Phone msut be 9 to 13 characters longer",
    }),
  // check("otp-verification")
  //   .trim()
  //   .not()
  //   .isEmpty()
  //   .withMessage({ success: false, error: "OTP Required" }),
];

// Login Validation
const LoginValidation = [
  check("phone")
    .trim()
    .not()
    .isEmpty()
    .withMessage({ success: false, error: "Phone number is required" }),
];
const ResultOfValidation = (req, res, next) => {
  const error = validationResult(req).array();
  if (!error.length) return next();
  res.status(400).json({ success: false, error: error[0].msg });
};

module.exports = {
  SignupValidation,
  ResultOfValidation,
  LoginValidation,
};
