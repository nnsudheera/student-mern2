const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  course: {
    type: String,
    enum: ["CSE", "CSM"],   // ✅ dropdown restriction
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  year: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Student", studentSchema);
