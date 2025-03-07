import { useState, useEffect } from "react";

export const AdminManageCourses = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [coursesInfo, setCoursesInfo] = useState([]);
  const [error, setError] = useState("");
  const [newCourse, setNewCourse] = useState({
    code: "",
    name: "",
    department: "",
    faculty: "",
    semester: "",
  });
  const [editingCourse, setEditingCourse] = useState(null);

  const departments = [
    { department_id: "IT", department_name: "Information Technology" },
    { department_id: "CSE", department_name: "Computer Science Engineering" },
    { department_id: "ECE", department_name: "Electronics and Communication Engineering" },
    { department_id: "EEE", department_name: "Electrical and Electronics Engineering" },
    { department_id: "ME", department_name: "Mechanical Engineering" },
    { department_id: "CE", department_name: "Civil Engineering" },
    { department_id: "AE", department_name: "Aeronautical Engineering" },
    { department_id: "BT", department_name: "Biotechnology" },
    { department_id: "CH", department_name: "Chemical Engineering" },
    { department_id: "MT", department_name: "Metallurgical Engineering" },
    { department_id: "PE", department_name: "Petroleum Engineering" },
    { department_id: "AI", department_name: "Artificial Intelligence and Machine Learning" },
    { department_id: "DS", department_name: "Data Science" },
    { department_id: "CY", department_name: "Cyber Security" }
  ];

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/courses/faculty", { credentials: "include" });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        setFacultyData(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchFaculty();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/courses", { credentials: "include" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setCoursesInfo(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const addCourse = async () => {
    if (!newCourse.code || !newCourse.name || !newCourse.department || !newCourse.semester) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/admin/courses/addcourse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course_id: newCourse.code,
          course_name: newCourse.name,
          department_id: newCourse.department,
          semester_id: newCourse.semester,
          Faculty_ID: newCourse.faculty || null,
        }),
        credentials: "include",
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error);

      alert("Course Added Successfully");
      fetchCourses(); // Refresh course list
      setNewCourse({
        code: "",
        name: "",
        department: "",
        faculty: "",
        semester: "",
      });
    } catch (error) {
      alert("Error adding course: " + error.message);
    }
  };


  const deleteCourse = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const response = await fetch(`http://localhost:3000/api/admin/courses/deletecourse/${courseId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error);

      alert("Course Deleted Successfully");
      fetchCourses();
    } catch (error) {
      alert("Error deleting course: " + error.message);
    }
  };

  const handleEditCourse = (course) => {
    console.log(course);
    setNewCourse({
      code: course.course_id,
      name: course.course_name,
      department: course.department_id,
      faculty: course.Faculty_ID || "",
      semester: course.semester_id,
    });
    setEditingCourse(course.course_id);
  };

  const updateCourse = async () => {
    if (!newCourse.code || !newCourse.name || !newCourse.department || !newCourse.semester) {
      alert("Please fill all required fields");
      return;
    }
    console.log(newCourse);

    try {
      const response = await fetch(`http://localhost:3000/api/admin/courses/updatecourse/${newCourse.code}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course_name: newCourse.name,
          department_id: newCourse.department,
          semester_id: newCourse.semester,
          Faculty_ID: newCourse.faculty || null,
        }),
        credentials: "include",
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error);

      alert("Course Updated Successfully");
      fetchCourses();
      setEditingCourse(null);
      setNewCourse({
        code: "",
        name: "",
        department: "",
        faculty: "",
        semester: "",
      });
    } catch (error) {
      alert("Error updating course: " + error.message);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Manage Courses</h1>

      <div className="course-form">
        <input type="text" name="code" placeholder="Course Code" value={newCourse.code} onChange={handleChange} disabled={editingCourse} />
        <input type="text" name="name" placeholder="Course Name" value={newCourse.name} onChange={handleChange} />

        <select name="department" value={newCourse.department} onChange={handleChange}>
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept.department_id} value={dept.department_id}>
              {dept.department_name}
            </option>
          ))}
        </select>

        <select name="faculty" value={newCourse.faculty} onChange={handleChange}>
          <option value="">Select Faculty (Optional)</option>
          {facultyData.map((faculty) => (
            <option key={faculty.Faculty_ID} value={faculty.Faculty_ID}>
              {faculty.Full_Name}
            </option>
          ))}
        </select>

        <select name="semester" value={newCourse.semester} onChange={handleChange}>
          <option value="">Select Semester</option>
          {[...Array(8).keys()].map((sem) => (
            <option key={sem + 1} value={sem + 1}>
              {sem + 1}
            </option>
          ))}
        </select>

        {editingCourse ? (
          <button className="submit-btn" onClick={updateCourse}>Update Course</button>
        ) : (
          <button className="submit-btn" onClick={addCourse}>Add Course</button>
        )}
      </div>

      <div className="courses-table">
        <table className="course-table">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Department</th>
              <th>Faculty</th>
              <th>Semester</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coursesInfo.map((course) => (
              <tr key={course.course_id}>
                <td>{course.course_id}</td>
                <td>{course.course_name}</td>
                <td>{course.department_id}</td>
                <td>{facultyData.find((f) => f.Faculty_ID === course.Faculty_ID)?.Full_Name || "Not Assigned"}</td>
                <td>{course.semester_id}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditCourse(course)}>Edit</button>
                  <button className="delete-btn" onClick={() => deleteCourse(course.course_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
