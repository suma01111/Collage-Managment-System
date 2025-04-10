import { useEffect, useState } from 'react'

export const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({})

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/admin/dashboard',
          {credentials: 'include'}
        )
        const data = await response.json()
        console.log(data);
        setDashboardData(data)
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      }
    }

    fetchDashboardData()
  }, [])

  const containerStyle = {
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  }

  const headingStyle = {
    fontSize: '32px',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  }

  const cardsWrapperStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  }

  const cardStyle = {
    backgroundColor: '#ffffff',
    padding: '20px 30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    minWidth: '220px',
    maxWidth: '250px',
    flex: '1 1 220px',
    transition: 'transform 0.3s ease',
  }

  const cardTitleStyle = {
    fontSize: '18px',
    color: '#666',
    marginBottom: '10px',
  }

  const cardValueStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2c3e50',
  }

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Admin Dashboard</h1>
      <div style={cardsWrapperStyle}>
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Total Students</h3>
          <p style={cardValueStyle}>{dashboardData.total_students}</p>
        </div>
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Total Faculty</h3>
          <p style={cardValueStyle}>{dashboardData.total_faculty}</p>
        </div>
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Courses</h3>
          <p style={cardValueStyle}>{dashboardData.total_courses}</p>
        </div>
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Departments</h3>
          <p style={cardValueStyle}>
            14
          </p>
        </div>
      </div>
    </div>
  )
}
