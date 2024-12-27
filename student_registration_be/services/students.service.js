const Student = require("../models/studentModel");
const generateToken = require("../utils/tokenGenerator");
const responseStatus = require("../handlers/responseStatus.handler");
const generateRegistrationId = require("../utils/generateRegistrationId");

const { hashPassword, isPassMatched } = require("../handlers/passHash.handler");

/**
 * Student registration service.
 *
 * @param {Object} data - The student data for registration.
 * @param {Object} res - The Express response object.
 * @returns {Object} - The response object indicating success or failure.
 */
exports.studentRegisterService = async (data, res) => {
  const {
    name,
    qualification,
    university,
    grade,
    years_of_study_start,
    years_of_study_end,
    email,
    password,
  } = data;

  // Check if the email is already registered
  const existingStudent = await Student.findOne({ email });
  if (existingStudent) {
    return responseStatus(res, 409, "failed", "Email is already registered");
  }

  // Generate unique registration ID
  const registrationId = await generateRegistrationId();

  // Hash the password before saving
  const hashedPassword = await hashPassword(password);

  // Create a new student instance
  const newStudent = new Student({
    name,
    qualification,
    university,
    grade,
    years_of_study_start,
    years_of_study_end,
    email,
    password: hashedPassword, // Store the hashed password
    registrationId, // Generated registration ID
  });

  // Save the student to the database
  const savedStudent = await newStudent.save();

  return responseStatus(res, 201, "success", {
    message: "Student registered successfully!!",
    student: {
      id: savedStudent._id,
      name: savedStudent.name,
      email: savedStudent.email,
      registrationId: savedStudent.registrationId,
    },
  });
};

/**
 * Student login service.
 *
 * @param {Object} data - The data containing information about the login.
 * @param {string} data.email - The email of the student.
 * @param {string} data.registrationId - The registration ID of the student.
 * @param {string} data.password - The password of the student.
 * @param {Object} res - The Express response object.
 * @returns {Object} - The response object indicating success or failure.
 */
exports.studentLoginService = async (data, res) => {
  const { identifier, password } = data;
  console.log(data);
  // Identify if the user is logging in with email or registrationId
  const query = identifier.includes("@")
    ? { email: identifier } // Login using email
    : { registrationId: identifier }; // Login using registrationId

  console.log(query);

  // Find the user based on the identifier
  const student = await Student.findOne(query).select("+password");
  if (!student) {
    return responseStatus(res, 401, "failed", "Invalid login credentials");
  }

  console.log(student);

  // Verify the password
  const isMatched = await isPassMatched(password, student.password);
  if (!isMatched) {
    return responseStatus(res, 401, "failed", "Invalid login credentials");
  }
  console.log(isMatched);

  // Generate the response
  const responseData = {
    student: {
      id: student._id,
      name: student.name,
      email: student.email,
      registrationId: student.registrationId,
    },
    token: generateToken(student._id),
  };

  console.log(responseData);

  return responseStatus(res, 200, "success", responseData);
};

/**
 * Get student profile service.
 *
 * @param {string} id - The ID of the student.
 * @param {Object} res - The Express response object.
 * @returns {Object} - The response object indicating success or failure.
 */
exports.getStudentsProfileService = async (id, res) => {
  const student = await Student.findById(id).select(
    "-password -createdAt -updatedAt"
  );
  if (!student) return responseStatus(res, 402, "failed", "Student not found");
  return responseStatus(res, 200, "success", student);
};

/**
 * Student update profile service.
 *
 * @param {Object} data - The data containing information about the updated profile.
 * @param {string} userId - The ID of the student.
 * @param {Object} res - The Express response object.
 * @returns {Object} - The response object indicating success or failure.
 */
exports.updateStudentProfileService = async (data, userId, res) => {
  const {
    name,
    qualification,
    grade,
    years_of_study_start,
    years_of_study_end,
  } = data;

  // Validate that required fields are present (optional, based on your requirements)
  if (
    !name &&
    !qualification &&
    !grade &&
    !years_of_study_start &&
    !years_of_study_end
  ) {
    return responseStatus(
      res,
      400,
      "failed",
      "No valid fields to update provided."
    );
  }

  // Update student details
  const updatedFields = {
    ...(name && { name }),
    ...(qualification && { qualification }),
    ...(grade && { grade }),
    ...(years_of_study_start && { years_of_study_start }),
    ...(years_of_study_end && { years_of_study_end }),
  };

  try {
    const student = await Student.findByIdAndUpdate(userId, updatedFields, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!student) {
      return responseStatus(res, 404, "failed", "Student not found.");
    }

    return responseStatus(res, 200, "success", student);
  } catch (error) {
    return responseStatus(res, 500, "failed", error.message);
  }
};
