export const FacultyDashboard = () => {
  return (
    <div>
      <h1>Faculty Dashboard</h1>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Classes Today</h3>
          <p>4 Classes</p>
        </div>
        <div className="dashboard-card">
          <h3>Students</h3>
          <p>120 Total</p>
        </div>
        <div className="dashboard-card">
          <h3>Pending Assessments</h3>
          <p>2 Tests to Grade</p>
        </div>
        <div className="dashboard-card">
          <h3>Upcoming Events</h3>
          <p>Department Meeting</p>
        </div>
      </div>
    </div>
  )
} 