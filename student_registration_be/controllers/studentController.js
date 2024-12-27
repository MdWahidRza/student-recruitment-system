const Student = require("../models/studentModel");
const bcrypt = require("bcrypt");
const generateRegistrationId = require("../utils/generateRegistrationId");
const responseStatus = require("../handlers/responseStatus.handler");
const {
  studentLoginService,
  getStudentsProfileService,
  updateStudentProfileService,
  studentRegisterService,
} = require("../services/students.service");

/**
 * @desc Register Student
 * @route POST /students/admin/register
 * @access Public
 **/
// exports.register = async (req, res) => {
//   try {
//     const {
//       name,
//       qualification,
//       university,
//       grade,
//       years_of_study_start,
//       years_of_study_end,
//       email,
//       password,
//     } = req.body;

//     // Check if the email is already registered
//     const existingStudent = await Student.findOne({ email });
//     if (existingStudent) {
//       return responseStatus(res, 409, "failed", "Email is already registered");
//     }

//     //Generate unique registration ID
//     const registrationId = await generateRegistrationId();

//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new student instance
//     const newStudent = new Student({
//       name,
//       qualification,
//       university,
//       grade,
//       years_of_study_start,
//       years_of_study_end,
//       email,
//       password: hashedPassword, // Store the hashed password
//       registrationId, // new generate registration Id
//     });

//     // Save the student to the database
//     const savedStudent = await newStudent.save();

//     return responseStatus(res, 201, "success", {
//       message: "Student registered successfully!!",
//       student: {
//         id: savedStudent._id,
//         name: savedStudent.name,
//         email: savedStudent.email,
//         registrationId: savedStudent.registrationId,
//       },
//     });
//   } catch (error) {
//     console.error("Error during student registration:", error.message);
//     return responseStatus(res, 500, "failed", "Internal server error");
//   }
// };

exports.register = async (req, res) => {
  try {
    await studentRegisterService(req.body, res);
  } catch (error) {
    console.error("Error during student registration:", error.message);
    return responseStatus(res, 500, "failed", "Internal server error");
  }
};

/**
 * @desc Login student
 * @route POST /students/login
 * @access Public
 **/
exports.studentLoginController = async (req, res) => {
  try {
    // Pass request data to the service layer
    await studentLoginService(req.body, res);
  } catch (error) {
    // Handle unexpected errors
    responseStatus(res, 500, "failed", error.message);
  }
};

/**
 * @desc Student Profile
 * @route GET /students/profile
 * @access Private Student only
 **/

exports.getStudentProfileController = async (req, res) => {
  try {
    await getStudentsProfileService(req.userAuth.id, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Student updating profile
 * @route UPDATE /students/update
 * @access Private Student only
 **/
exports.updateStudentProfileController = async (req, res) => {
  try {
    console.log(req.userAuth.id);
    await updateStudentProfileService(req.body, req.userAuth.id, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};
