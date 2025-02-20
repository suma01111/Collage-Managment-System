import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to College Management System</h1>
          <p className="hero-text">
            Streamline your educational institution with our comprehensive management solution
          </p>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Student Management</h3>
              <p>Complete student lifecycle management from admission to graduation</p>
            </div>
            <div className="feature-card">
              <h3>Faculty Portal</h3>
              <p>Efficient tools for faculty to manage classes and assessments</p>
            </div>
            <div className="feature-card">
              <h3>Administration</h3>
              <p>Streamlined administrative tasks and reporting</p>
            </div>
            <div className="feature-card">
              <h3>Communication</h3>
              <p>Integrated communication tools for better collaboration</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
