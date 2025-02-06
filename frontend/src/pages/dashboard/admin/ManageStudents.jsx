export const ManageStudents = () => {
  const students = [
    {
      id: 1,
      name: 'John Doe',
      department: 'Computer Science',
      year: '2nd Year',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      department: 'Computer Science',
      year: '3rd Year',
      status: 'Active'
    }
  ]

  return (
    <div className="manage-students-container">
      <h1>Manage Students</h1>
      <div className="student-actions">
        <button className="add-student-btn">Add New Student</button>
      </div>
      <div className="students-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Year</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.department}</td>
                <td>{student.year}</td>
                <td>{student.status}</td>
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