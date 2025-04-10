import db from '../config/db.js';

// Student Registration (Existing)
// export const registerStudent = (req, res) => {
//   console.log("Received data:", req.body); // Debugging


//   const { Student_ID, full_name, DOB, Phone_No, Email, Address, Department, Current_semester, Enrollment_Year } = req.body;

//   if (!Student_ID || !full_name || !DOB || !Phone_No || !Email || !Address || !Department || !Current_semester || !Enrollment_Year) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   db.query(
//     "INSERT INTO student_info (Student_ID, full_name, DOB, Phone_No, Email, Address, Department, Current_semester, Enrollment_Year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
//     [Student_ID, full_name, DOB, Phone_No, Email, Address, Department, Current_semester, Enrollment_Year],
//     (error) => {
//       if (error) {
//         console.error("Student registration error:", error);
//         return res.status(500).json({ error: "Internal server error" });
//       }
//       res.status(201).json({ message: "Student registered successfully" });
//     }
//   );
// };

export const registerStudent = (req, res) => {
  console.log("Received data:", req.body); // Debugging

  const { Student_ID, full_name, DOB, Phone_No, Email, Address, Department, Current_semester, Enrollment_Year } = req.body;

  if (!Student_ID || !full_name || !DOB || !Phone_No || !Email || !Address || !Department || !Current_semester || !Enrollment_Year) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Insert student into student_info
  db.query(
    "INSERT INTO student_info (Student_ID, full_name, DOB, Phone_No, Email, Address, Department, Current_semester, Enrollment_Year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [Student_ID, full_name, DOB, Phone_No, Email, Address, Department, Current_semester, Enrollment_Year],
    (error) => {
      if (error) {
        console.error("Student registration error:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      // After successful registration, enroll the student in courses
      enrollStudentInCourses(Student_ID, Department, Current_semester, res);
    }
  );
};

// Function to enroll student in relevant courses
const enrollStudentInCourses = (Student_ID, Department, Current_semester, res) => {
 
    const query = `
    INSERT INTO enrollment (Student_ID, course_id)
    SELECT 
        s.Student_ID, 
        c.course_id
    FROM student_info s
    JOIN courses c 
        ON s.Department = c.department_id 
        AND s.Current_semester = c.semester_id
    WHERE s.Student_ID = ?;
  `;

  db.query(query, [Student_ID, Department, Current_semester], (error) => {
    if (error) {
      console.error("Enrollment error:", error);
      return res.status(500).json({ error: "Failed to enroll student in courses" });
    }

    res.status(201).json({ message: "Student registered and enrolled successfully" });
  });
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

export const getStudentCourses = (req, res) => {
  const userEmail = req.user.email;

  // Step 1: Fetch Student_ID from student_info using email
  db.query(
    'SELECT Student_ID FROM student_info WHERE Email = ?',
    [userEmail],
    (error, results) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }

      const studentId = results[0].Student_ID;

      // Step 2: Fetch course IDs from enrollment
      db.query(
        'SELECT course_id FROM enrollment WHERE Student_ID = ?',
        [studentId],
        (error, enrollmentResults) => {
          if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Internal server error' });
          }

          if (enrollmentResults.length === 0) {
            return res.status(404).json({ error: 'No courses found for the student' });
          }

          const courseIds = enrollmentResults.map(row => row.course_id);

          // Step 3: Fetch course details from courses table
          db.query(
            'SELECT course_id, course_name FROM courses WHERE course_id IN (?)',
            [courseIds],
            (error, courseResults) => {
              if (error) {
                console.error('Database error:', error);
                return res.status(500).json({ error: 'Internal server error' });
              }

              res.json(courseResults);
            }
          );
        }
      );
    }
  );
};

export const getStudentResults = (req, res) => {
  const userEmail = req.user.email;

  // Step 1: Get Student_ID using Email
  db.query(
    'SELECT Student_ID FROM student_info WHERE Email = ?',
    [userEmail],
    (error, studentRows) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (studentRows.length === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }

      const studentId = studentRows[0].Student_ID;

      // Step 2: Fetch Results for the Student
      const query = `
        SELECT c.course_name AS subject, r.grade, r.marks_obtained AS score
        FROM results r
        JOIN courses c ON r.course_id = c.course_id
        WHERE r.student_id = ?
      `;

      db.query(query, [studentId], (error, resultRows) => {
        if (error) {
          console.error('Error fetching results:', error);
          return res.status(500).json({ error: 'Failed to fetch results' });
        }

        res.status(200).json({ data: resultRows });
      });
    }
  );
};