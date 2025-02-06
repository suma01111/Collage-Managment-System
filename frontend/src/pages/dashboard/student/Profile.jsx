export const StudentProfile = () => {
  return (
    <div className="profile-container">
      <h1>Student Profile</h1>
      <div className="profile-card">
        <div className="profile-header">
          <img src="/placeholder-avatar.png" alt="Profile" className="profile-avatar" />
          <div className="profile-info">
            <h2>John Doe</h2>
            <p>Student ID: ST12345</p>
            <p>Email: john.doe@example.com</p>
          </div>
        </div>
        <div className="profile-details">
          <div className="detail-group">
            <h3>Personal Information</h3>
            <p>Date of Birth: 15/05/2000</p>
            <p>Phone: (123) 456-7890</p>
            <p>Address: 123 Student Street, Education City</p>
          </div>
          <div className="detail-group">
            <h3>Academic Information</h3>
            <p>Department: Computer Science</p>
            <p>Current Semester: 5th</p>
            <p>Enrollment Year: 2021</p>
          </div>
        </div>
      </div>
    </div>
  )
} 