export const AdminManageCourses = () => {
  const courses = [
    {
      id: 1,
      code: 'CS301',
      name: 'Data Structures',
      department: 'Computer Science',
      instructor: 'Dr. Sarah Smith',
      status: 'Active'
    },
    {
      id: 2,
      code: 'CS302',
      name: 'Database Systems',
      department: 'Computer Science',
      instructor: 'Prof. Johnson',
      status: 'Active'
    }
  ]

  return (
    <div className="manage-courses-container">
      <h1>Manage Courses</h1>
      <div className="course-actions">
        <button className="add-course-btn">Add New Course</button>
      </div>
      <div className="courses-table">
        <table>
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Department</th>
              <th>Instructor</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id}>
                <td>{course.code}</td>
                <td>{course.name}</td>
                <td>{course.department}</td>
                <td>{course.instructor}</td>
                <td>{course.status}</td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 