import axios from "axios";
import { useEffect, useState } from "react";

export const ManageResults = () => {
  const [facultyId, setFacultyId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [studentCourses, setStudentCourses] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(""); 
  const [examType, setExamType] = useState("");
  const grades = ['AA', 'AB', 'BB', 'BC', 'CC', 'CD', 'DD', 'FF'];

  const [marksData, setMarksData] = useState({});
  const [gradesData, setGradesData] = useState({});

  // Fetch faculty ID based on email
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

  // Fetch faculty courses
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
  
  // Fetch students enrolled in faculty's courses
  useEffect(() => {
    const fetchData = async () => {
      if (!facultyId) return;

      try {
        const response = await axios.get(`http://localhost:3000/api/faculty/course-student/${facultyId}`);
        setStudentCourses(response.data);
        setFilterData(response.data);
      } catch (error) {
        console.error('Error fetching courses-student:', error);
      }
    };

    fetchData();
  }, [facultyId]);

  // Handle course filter
  const handleSelectCourse = (e) => {
    const selectedCourseId = e.target.value;
    setSelectedCourse(selectedCourseId);

    const filtered = selectedCourseId
      ? studentCourses.filter(course => course.Course_ID.toString() === selectedCourseId)
      : studentCourses;
    setFilterData(filtered);
  };

  // Handle input changes
  const handleMarksChange = (studentId, courseId, value) => {
    setMarksData(prev => ({
      ...prev,
      [`${studentId}-${courseId}`]: value
    }));
  };

  const handleGradeChange = (studentId, courseId, value) => {
    setGradesData(prev => ({
      ...prev,
      [`${studentId}-${courseId}`]: value
    }));
  };

  // Save results
  const handleSave = async (studentId, courseId) => {
    if (!examType) {
      alert("Please select an exam type before saving results.");
      return;
    }

    const marks = marksData[`${studentId}-${courseId}`] || 0;
    const grade = gradesData[`${studentId}-${courseId}`] || "FF";

    try {
      await axios.post(`http://localhost:3000/api/faculty/results`, {
        student_id: studentId,
        course_id: courseId,
        marks_obtained: marks,
        grade: grade,
        exam_type: examType,
      });

      alert("Result saved successfully!");
    } catch (error) {
      console.error("Error saving results:", error);
      alert("Failed to save result.");
    }
  };

  return (
    <div className="manage-results-container">
      <h1>Manage Results</h1>
      <div className="results-form">
        <div className="form-header">
          <select className="select-input" value={selectedCourse} onChange={handleSelectCourse}>
            <option value="">All Courses</option>
            {courses.map((course) => (
              <option key={course.course_id} value={course.course_id}>
                {course.course_name}
              </option>
            ))}
          </select>

          <select className="select-input" value={examType} onChange={(e) => setExamType(e.target.value)}>
            <option value="">Select Exam Type</option>
            <option value="midsem">Midsem</option>
            <option value="endsem">Endsem</option>
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
                <tr key={student.Student_ID + student.Course_ID}>
                  <td>{student.full_name}</td>
                  <td>{student.course_name}</td>
                  <td>
                    <input
                      type="number"
                      className="marks-input"
                      placeholder="Enter marks"
                      value={marksData[`${student.Student_ID}-${student.Course_ID}`] || ""}
                      onChange={(e) =>
                        handleMarksChange(student.Student_ID, student.Course_ID, e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <select
                      className="grade-input"
                      value={gradesData[`${student.Student_ID}-${student.Course_ID}`] || ""}
                      onChange={(e) =>
                        handleGradeChange(student.Student_ID, student.Course_ID, e.target.value)
                      }
                    >
                      <option value="">Select Grade</option>
                      {grades.map((grade, index) => (
                        <option value={grade} key={index}>{grade}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => handleSave(student.Student_ID, student.Course_ID)}
                      className="save-btn"
                    >
                      Save
                    </button>
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
