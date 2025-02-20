import { Link, useLocation } from 'react-router-dom'

export const Sidebar = ({ role }) => {
  const location = useLocation()
  
  const getMenuItems = () => {
    switch(role) {
      case 'student':
        return [
          { path: '/student/dashboard', label: 'Dashboard' },
          { path: '/student/profile', label: 'Profile' },
          { path: '/student/results', label: 'Results' },
          { path: '/student/courses', label: 'Courses' },
          { path: '/student/timetable', label: 'Timetable' }
        ]
      case 'faculty':
        return [
          { path: '/faculty/dashboard', label: 'Dashboard' },
          { path: '/faculty/profile', label: 'Profile' },
          { path: '/faculty/manage-results', label: 'Manage Results' },
          { path: '/faculty/manage-courses', label: 'Manage Courses' },
          { path: '/faculty/manage-timetable', label: 'Manage Timetable' }
        ]
      case 'admin':
        return [
          { path: '/admin/dashboard', label: 'Dashboard' },
          { path: '/admin/manage-users', label: 'Manage Users' },
          { path: '/admin/manage-faculty', label: 'Manage Faculty' },
          { path: '/admin/manage-students', label: 'Manage Students' },
          { path: '/admin/manage-courses', label: 'Manage Courses' }
        ]
      default:
        return []
    }
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img 
          src="/placeholder-avatar.png" 
          alt="User Avatar" 
          className="user-avatar"
        />
        <h3>{role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</h3>
      </div>
      <nav className="sidebar-nav">
        {getMenuItems().map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
} 