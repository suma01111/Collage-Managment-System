import { useEffect, useState } from 'react'
import axios from 'axios'

export const StudentResults = () => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/student/result', {
          credentials: 'include'
        });
        const data = await res.json();
        setResults(data.data)
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch results:', err)
        setError('Failed to fetch results')
        setLoading(false)
      }
    }

    fetchResults()
  }, [])

  if (loading) return <p>Loading academic results...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div className="results-container">
      <h1>Academic Results</h1>
      {results.length > 0 ? (
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
      ) : (
        <p>No results found for you yet.</p>
      )}
    </div>
  )
}
