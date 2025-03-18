import { useState, useEffect } from "react";
import axios from "axios";
export const ManageResults = () => {
  const [courses, setCourses] = useState([]);
  const [facultyId, setFacultyId] = useState(null);
  const [studentCourse, setStudentCourse] = useState([]);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const fetchFacultyId = async () => {
      try {
        const storedEmail = localStorage.getItem('facultyEmail'); // Get faculty email from localStorage
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

  useEffect(()=>{
    const fetchData = async() => {
      try {
        const response = await axios.get(`http://localhost:3000/api/faculty/course-student/${facultyId}`);
        setStudentCourse(response.data);
        setFilterData(response.data);
      } catch (error) {
        console.error('Error fetching courses-student:', error);
      }
    } 
    fetchData();
  },[facultyId])


  const studentResults = [
    { id: 1, name: 'John Doe', subject: 'Data Structures', marks: '', grade: '' },
    { id: 2, name: 'Jane Smith', subject: 'Data Structures', marks: '', grade: '' },
    { id: 3, name: 'Mike Johnson', subject: 'Data Structures', marks: '', grade: '' }
  ]



  console.log(studentCourse);
  console.log('Filter')
  return (
    <div className="manage-results-container">
      <h1>Manage Results</h1>
      <div className="results-form">
        <div className="form-header">
          <select className="select-input">
            <option value="">Select Course</option>
            {
              filterData.map((course, index) => (
                <option key={course.course_id} value={course.course_id}>{course.course_name}</option>
              ))
            }
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
              {studentResults.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.subject}</td>
                  <td>
                    <input type="number" className="marks-input" placeholder="Enter marks" />
                  </td>
                  <td>
                    <select className="grade-input">
                      <option value="">Select Grade</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="F">F</option>
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
  )
} 
