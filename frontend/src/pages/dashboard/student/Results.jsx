export const StudentResults = () => {
  const results = [
    { subject: 'Mathematics', grade: 'A', score: 92 },
    { subject: 'Physics', grade: 'B+', score: 87 },
    { subject: 'Computer Science', grade: 'A-', score: 89 },
    { subject: 'English', grade: 'A', score: 95 }
  ]

  return (
    <div className="results-container">
      <h1>Academic Results</h1>
      <div className="results-table">
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Grade</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.subject}</td>
                <td>{result.grade}</td>
                <td>{result.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 