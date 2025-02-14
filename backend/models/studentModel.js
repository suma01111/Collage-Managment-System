import db from "../config/db.js";

export const addStudent = (studentData, callback) => {
  const sql = `
  INSERT INTO student_info (Student_ID, full_name, Email, DOB, Phone_No, Address, Department, Current_semester, Enrollment_Year)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

  db.query(sql, [
    studentData.studentId,
    studentData.fullName,
    studentData.email,
    studentData.DOB,
    studentData.phoneNo,
    studentData.address,
    studentData.department,
    studentData.currentSemester,
    studentData.enrollmentYear
  ], callback);
};
    