const { body, validationResult } = require("express-validator");

exports.validateStudentRegistration = [
  body("name")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Name should contain only letters and spaces.")
    .escape()
    .trim(),
  body("qualification")
    .isAlphanumeric("en-US", { ignore: " " })
    .withMessage("Qualification should only contain alphanumeric characters.")
    .escape()
    .trim(),
  body("university")
    .matches(/^[A-Za-z. ]+$/)
    .withMessage("University should only contain letters, spaces, and periods.")
    .escape()
    .trim(),
  body("grade")
    .isFloat({ min: 1.0, max: 10.0 })
    .withMessage("Grade should be a number between 1.0 and 10.0.")
    .toFloat(),
  body("years_of_study_start")
    .notEmpty()
    .withMessage("Start year is required.")
    .isISO8601()
    .withMessage("Start year should be a valid date.")
    .toDate(),
  body("years_of_study_end")
    .notEmpty()
    .withMessage("End year is required.")
    .isISO8601()
    .withMessage("End year must be a valid date.")
    .toDate()
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.years_of_study_start)) {
        throw new Error("End year should be after the start year.");
      }
      return true;
    }),
  body("email").isEmail().withMessage("Invalid email format.").normalizeEmail(),
  body("password")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage(
      "Password must be at least 8 characters, contain letters, numbers, and a special character."
    )
    .trim(),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match.");
    }
    return true;
  }),
  // Middleware to handle errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
