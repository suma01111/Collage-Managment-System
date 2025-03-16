import { useEffect, useState } from 'react';
import axios from 'axios';

export const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [facultyId, setFacultyId] = useState(null);

  useEffect(() => {
    const fetchFacultyId = async () => {
      try {
        const storedEmail = localStorage.getItem('facultyEmail'); // Get faculty email from localStorage
        if (!storedEmail) {
          console.error('No faculty email found in localStorage');
          return;
        }

        const response = await fetch('http://localhost:3000/api/faculty/profile', {
          credentials:'include'
        });

        const faculty = await response.json();
        console.log(faculty);
        if (faculty) {
          setFacultyId(faculty.Faculty_ID);
          console.log('Faculty ID:', facultyId);
        } else {
          console.error('Faculty not found for the given email');
        }
      } catch (error) {
        console.error('Error fetching faculty profile:', error);
      }
    };

    fetchFacultyId();
  }, []);

  useEffect(() => {
    if (!facultyId) return;

    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/faculty/courses/${facultyId}`);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [facultyId]);

  return (
    <div className="manage-courses-container">
      <h1>Assigned Courses</h1>
      <div className="courses-table">
        <table>
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Department</th>
              <th>Students Enrolled</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.course_id}>
                <td>{course.course_id}</td>
                <td>{course.course_name}</td>
                <td>{course.department_name}</td>
                <td>{course.student_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
