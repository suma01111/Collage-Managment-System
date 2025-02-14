import { addStudent } from "../models/studentModel.js";
export const registerStudent = (req, res) => {
  const studentData = req.body;

  if (!studentData.studentId || !studentData.fullName || !studentData.email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  addStudent(studentData, (err, result) => {
    if (err) {
      console.error("Database Error:", err); // Log error
      return res.status(500).json({ error: "Database error", details: err });
    }
    res.status(201).json({ message: "Student registered successfully!" });
  });
};
