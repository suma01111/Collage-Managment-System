export const FacultyProfile = () => {
  return (
    <div className="profile-container">
      <h1>Faculty Profile</h1>
      <div className="profile-card">
        <div className="profile-header">
          <img src="/placeholder-avatar.png" alt="Profile" className="profile-avatar" />
          <div className="profile-info">
            <h2>Dr. Sarah Smith</h2>
            <p>Faculty ID: FC12345</p>
            <p>Email: sarah.smith@example.com</p>
          </div>
        </div>
        <div className="profile-details">
          <div className="detail-group">
            <h3>Personal Information</h3>
            <p>Department: Computer Science</p>
            <p>Phone: (123) 456-7890</p>
            <p>Office: Room 405, CS Building</p>
          </div>
          <div className="detail-group">
            <h3>Academic Information</h3>
            <p>Specialization: Data Structures & Algorithms</p>
            <p>Years of Experience: 8</p>
            <p>Office Hours: Mon-Wed 2:00 PM - 4:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  )
} 