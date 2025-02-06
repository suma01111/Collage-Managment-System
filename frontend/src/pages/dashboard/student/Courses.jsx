export const StudentCourses = () => {
  const courses = [
    {
      id: 1,
      code: 'CS301',
      name: 'Data Structures',
      instructor: 'Dr. Smith',
      schedule: 'Mon, Wed 10:00 AM'
    },
    {
      id: 2,
      code: 'CS302',
      name: 'Database Systems',
      instructor: 'Prof. Johnson',
      schedule: 'Tue, Thu 2:00 PM'
    },
    {
      id: 3,
      code: 'CS303',
      name: 'Web Development',
      instructor: 'Dr. Williams',
      schedule: 'Wed, Fri 11:00 AM'
    }
  ]

  return (
    <div className="courses-container">
      <h1>My Courses</h1>
      <div className="courses-grid">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <h3>{course.name}</h3>
            <p>Course Code: {course.code}</p>
            <p>Instructor: {course.instructor}</p>
            <p>Schedule: {course.schedule}</p>
          </div>
        ))}
      </div>
    </div>
  )
} 