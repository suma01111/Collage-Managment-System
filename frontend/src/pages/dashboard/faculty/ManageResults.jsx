import axios from "axios";
import { useEffect, useState } from "react";

export const ManageResults = () => {
  const [facultyId, setFacultyId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [studentCourses, setStudentCourses] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(""); // Use empty string for a single value
  const grades = ['AA', 'AB', 'BB', 'BC', 'CC', 'CD', 'DD', 'FF'];

  const [result, setresult] = useState({
    student_id: "",
    course_id: "",
    marks_obtained: 0,
    grade: "",
    total_marks: 100,
    exam_type: ""
  });

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
    console.log(selectedCourseId);
    setSelectedCourse(selectedCourseId);

    const filtered = selectedCourseId ? studentCourses.filter(course => course.Course_ID.toString() === selectedCourseId) : studentCourses;
    setFilterData(filtered);
  };

  const handleSaveResult = () => {
    e.preventDefault();
  }

  return (
    <div className="manage-results-container">
      <h1>Manage Results</h1>
      <div className="results-form">
        <div className="form-header">
          {/* onChange should be on the select, not the option */}
          <select className="select-input" value={selectedCourse} onChange={handleSelectCourse}>
            <option value="">All Courses</option>
            {courses.map((course) => (
              <option key={course.course_id} value={course.course_id}>
                {course.course_name}
              </option>
            ))}
          </select>

          <select className="select-input">
            <option value="">Select Exam Type</option>
            <option value="midsem">midsem</option>
            <option value="endesem">endsem</option>
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
                    <button onClick={handleSaveResult} className="save-btn">Save</button>
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
