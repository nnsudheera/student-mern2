const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// ➕ CREATE student
router.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// 📄 READ all students
router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});


// 🔍 SEARCH student (by name OR email OR course)
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;

    const students = await Student.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { course: { $regex: query, $options: "i" } }
      ]
    });

    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//update Students
router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
});
//Delete Students
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
