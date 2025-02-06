export const ManageFaculty = () => {
  const faculty = [
    {
      id: 1,
      name: 'Dr. Sarah Smith',
      department: 'Computer Science',
      email: 'sarah.smith@example.com',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Prof. John Williams',
      department: 'Mathematics',
      email: 'john.williams@example.com',
      status: 'Active'
    }
  ]

  return (
    <div className="manage-faculty-container">
      <h1>Manage Faculty</h1>
      <div className="faculty-actions">
        <button className="add-faculty-btn">Add New Faculty</button>
      </div>
      <div className="faculty-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faculty.map(member => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.department}</td>
                <td>{member.email}</td>
                <td>{member.status}</td>
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