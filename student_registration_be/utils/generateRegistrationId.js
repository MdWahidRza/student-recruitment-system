const Student = require("../models/studentModel");

// Function to generate a random registration ID
const generateRegistrationId = async () => {
  let registrationId;
  let isUnique = false;

  while (!isUnique) {
    // Generate ID in the format G10XBRXXXX
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
    registrationId = `G10XBR${randomNumber}`;

    // Check if the ID already exists in the database
    const existingStudent = await Student.findOne({ registrationId });
    if (!existingStudent) {
      isUnique = true; // ID is unique
    }
  }

  return registrationId;
};

module.exports = generateRegistrationId;
