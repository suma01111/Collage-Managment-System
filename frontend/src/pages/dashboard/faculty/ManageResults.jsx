import { useState, useEffect } from "react";
import axios from "axios";

export const ManageResults = () => {
  const [facultyId, setFacultyId] = useState(null);
  const [studentCourses, setStudentCourses] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(""); // Use empty string for a single value
  const grades = ['AA', 'AB', 'BB', 'BC', 'CC', 'CD', 'DD', 'F'];

  useEffect(() => {
    const fetchFacultyId = async () => {
      try {
        const storedEmail = localStorage.getItem('facultyEmail');
        if (!storedEmail) {
          console.error('No faculty email found in localStorage');
          return;
        }

        const response = await fetch('http://localhost:3000/api/faculty/profile', {
          credentials: 'include'
        });

        const faculty = await response.json();
        if (faculty) {
          setFacultyId(faculty.Faculty_ID);
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
    const fetchData = async () => {
      if (!facultyId) return; // Prevent API call if facultyId is null

      try {
        const response = await axios.get(`http://localhost:3000/api/faculty/course-student/${facultyId}`);
        setStudentCourses(response.data);
        setFilterData(response.data); // Initially, set filterData to all courses
      } catch (error) {
        console.error('Error fetching courses-student:', error);
      }
    };

    fetchData();
  }, [facultyId]);

  const handleSelectCourse = (e) => {
    const selectedCourseId = e.target.value;
    setSelectedCourse(selectedCourseId);

    const filtered = selectedCourseId ? studentCourses.filter(course => course.Course_ID === selectedCourseId) : studentCourses;
    setFilterData(filtered);
  };

  return (
    <div className="manage-results-container">
      <h1>Manage Results</h1>
      <div className="results-form">
        <div className="form-header">
          {/* onChange should be on the select, not the option */}
          <select className="select-input" value={selectedCourse} onChange={handleSelectCourse}>
            <option value="">Select Course</option>
            {studentCourses.map((course) => (
              <option key={course.Course_ID} value={course.Course_ID}>
                {course.course_name}
              </option>
            ))}
          </select>

          <select className="select-input">
            <option value="">Select Exam Type</option>
            <option value="mid">Midterm</option>
            <option value="final">Final</option>
          </select>
        </div>
        <div className="results-table">
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Subject</th>
                <th>Marks</th>
                <th>Grade</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filterData.map(student => (
                <tr key={student.Student_ID+student.Course_ID}>
                  <td>{student.full_name}</td>
                  <td>{student.course_name}</td>
                  <td>
                    <input type="number" className="marks-input" placeholder="Enter marks" />
                  </td>
                  <td>
                    <select className="grade-input">
                      <option value="">Select Grade</option>
                      {grades.map((grade, index) => (
                        <option value={grade} key={index}>{grade}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button className="save-btn">Save</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
