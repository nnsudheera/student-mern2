const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  course: String,
  email: String,
  year: Number
}, { collection: "students" }); // 👈 FORCE collection

module.exports = mongoose.model("Student", studentSchema);