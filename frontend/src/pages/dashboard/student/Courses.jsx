import { useState } from "react";
import { useEffect } from "react";

export const StudentCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/student/courses', { credentials: 'include' }) 
      .then(response => response.json()) 
      .then(data => setCourses(data))
      .catch(error => console.error("Error fetching courses:", error));
  }, []);
  

  return (
    <div className="courses-container">
      <h1>My Courses</h1>
      <div className="courses-grid">
        {courses.length > 0 ? (
          courses.map(course => (
            <div key={course.course_id} className="course-card">
              <h3>{course.course_name}</h3>
              <p>Course ID: {course.course_id}</p>
            </div>
          ))
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
} 