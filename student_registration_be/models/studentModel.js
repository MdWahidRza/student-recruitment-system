const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qualification: { type: String, required: true },
  university: { type: String, required: true },
  grade: { type: Number, required: true, min: 1.0, max: 10.0 },
  years_of_study_start: { type: Date, required: true },
  years_of_study_end: { type: Date, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  registrationId: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Student", studentSchema);
