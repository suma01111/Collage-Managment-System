export const ManageResults = () => {
  const studentResults = [
    { id: 1, name: 'John Doe', subject: 'Data Structures', marks: '', grade: '' },
    { id: 2, name: 'Jane Smith', subject: 'Data Structures', marks: '', grade: '' },
    { id: 3, name: 'Mike Johnson', subject: 'Data Structures', marks: '', grade: '' }
  ]

  return (
    <div className="manage-results-container">
      <h1>Manage Results</h1>
      <div className="results-form">
        <div className="form-header">
          <select className="select-input">
            <option value="">Select Course</option>
            <option value="ds">Data Structures</option>
            <option value="db">Database Systems</option>
          </select>
          <select className="select-input">
            <option value="">Select Exam Type</option>
            <option value="mid">Midterm</option>
            <option value="final">Final</option>
          </select>
        </div>
        <div className="results-table">
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Subject</th>
                <th>Marks</th>
                <th>Grade</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {studentResults.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.subject}</td>
                  <td>
                    <input type="number" className="marks-input" placeholder="Enter marks" />
                  </td>
                  <td>
                    <select className="grade-input">
                      <option value="">Select Grade</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="F">F</option>
                    </select>
                  </td>
                  <td>
                    <button className="save-btn">Save</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 