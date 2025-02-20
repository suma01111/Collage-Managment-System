export const ManageCourses = () => {
  const courses = [
    {
      id: 1,
      code: 'CS301',
      name: 'Data Structures',
      students: 40,
      schedule: 'Mon, Wed 10:00 AM'
    },
    {
      id: 2,
      code: 'CS302',
      name: 'Database Systems',
      students: 35,
      schedule: 'Tue, Thu 2:00 PM'
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
              <th>Students Enrolled</th>
              <th>Schedule</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id}>
                <td>{course.code}</td>
                <td>{course.name}</td>
                <td>{course.students}</td>
                <td>{course.schedule}</td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="view-btn">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 