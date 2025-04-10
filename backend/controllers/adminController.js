import db from '../config/db.js'

export const getUsers = (req, res) => {
  db.query(
    'SELECT id, name, email, role, status FROM users WHERE role != \'admin\'',
    (error, results) => {
      if (error) {
        console.error('Error fetching users:', error)
        return res.status(500).json({ error: 'Internal server error' })
      }
      res.json({ users: results })
    }
  )
}

export const updateUserStatus = (req, res) => {
  const { userId } = req.params
  const { status } = req.body

  if (!['pending', 'active', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' })
  }

  db.query(
    'UPDATE users SET status = ? WHERE id = ?',
    [status, userId],
    (error) => {
      if (error) {
        console.error('Error updating user status:', error)
        return res.status(500).json({ error: 'Internal server error' })
      }
      res.json({ message: 'User status updated successfully' })
    }
  )
}

export const updateUserRole = (req, res) => {
  const { userId } = req.params
  const { role } = req.body

  if (!['student', 'faculty'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' })
  }

  db.query(
    'UPDATE users SET role = ? WHERE id = ?',
    [role, userId],
    (error) => {
      if (error) {
        console.error('Error updating user role:', error)
        return res.status(500).json({ error: 'Internal server error' })
      }
      res.json({ message: 'User role updated successfully' })
    }
  )
} 

export const overallDetails = (req, res) => {
  let total_students = 0;
  let total_faculty = 0;
  let total_courses = 0;

  db.query(
    "SELECT COUNT(*) AS total_students FROM users WHERE role = 'student'",
    (err, studentResult) => {
      if (err) {
        console.error('Error fetching student count:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      total_students = studentResult[0].total_students;

      db.query(
        "SELECT COUNT(*) AS total_faculty FROM users WHERE role = 'faculty'",
        (err, facultyResult) => {
          if (err) {
            console.error('Error fetching faculty count:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
          }
          total_faculty = facultyResult[0].total_faculty;

          db.query(
            "SELECT COUNT(*) AS total_courses FROM courses",
            (err, courseResult) => {
              if (err) {
                console.error('Error fetching course count:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
              }
              total_courses = courseResult[0].total_courses;

              res.status(200).json({
                total_students,
                total_faculty,
                total_courses,
              });
            }
          );
        }
      );
    }
  );
};
