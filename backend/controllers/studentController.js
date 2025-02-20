import db from '../config/db.js';

// Student Registration (Existing)
export const registerStudent = (req, res) => {
  console.log("Received data:", req.body); // Debugging

  const { Student_ID, full_name, DOB, Phone_No, Email, Address, Department, Current_semester, Enrollment_Year } = req.body;

  if (!Student_ID || !full_name || !DOB || !Phone_No || !Email || !Address || !Department || !Current_semester || !Enrollment_Year) {
    return res.status(400).json({ error: "All fields are required" });
  }

  db.query(
    "INSERT INTO student_info (Student_ID, full_name, DOB, Phone_No, Email, Address, Department, Current_semester, Enrollment_Year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [Student_ID, full_name, DOB, Phone_No, Email, Address, Department, Current_semester, Enrollment_Year],
    (error) => {
      if (error) {
        console.error("Student registration error:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(201).json({ message: "Student registered successfully" });
    }
  );
};

// Fetch Student Profile (New)
export const getStudentProfile = (req, res) => {
  const userEmail = req.user.email;

  db.query(
    'SELECT * FROM student_info WHERE Email = ?',
    [userEmail],
    (error, results) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'Student profile not found' });
      }

      const student = results[0];

      // Format the date before sending
      student.DOB = student.DOB.toISOString().split('T')[0]; 

      res.json(student);
    }
  );
};
