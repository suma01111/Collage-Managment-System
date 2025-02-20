import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../App.css'

export const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Check if current path is a dashboard path
  const isDashboardPath = location.pathname.includes('/student/') || 
                         location.pathname.includes('/faculty/') || 
                         location.pathname.includes('/admin/')

  const handleLogout = () => {
    // In a real app, you would clear auth tokens/state here
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">EduSphere</Link>
      <div className="nav-center">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
      {isDashboardPath ? (
        <div className="nav-auth">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      ) : (
        <div className="nav-auth">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
  )
} 