export const StudentDashboard = () => {
  return (
    <div>
      <h1>Student Dashboard</h1>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Current Semester</h3>
          <p>Semester 5</p>
        </div>
        <div className="dashboard-card">
          <h3>Attendance</h3>
          <p>85%</p>
        </div>
        <div className="dashboard-card">
          <h3>Upcoming Exams</h3>
          <p>2 Exams this week</p>
        </div>
        <div className="dashboard-card">
          <h3>Assignments</h3>
          <p>3 Pending</p>
        </div>
      </div>
    </div>
  )
} 