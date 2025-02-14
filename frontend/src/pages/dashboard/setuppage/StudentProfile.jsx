import { useState } from "react";

export const StudentSetup = () => {
    const [studentData, setStudentData] = useState({
        fullName: "",
        studentId: "",
        email: "",
        DOB: "",
        phoneNo: "",
        address: "",
        department: "",
        currentSemester: "",
        enrollmentYear: "",
    });

    const handleChange = (e) => {
        setStudentData({ ...studentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/student/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(studentData),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.error);
            alert("Student registered successfully!");
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };


    return (
        <div className="registration-container">
            <h2 className="form-title">Student Registration</h2>
            <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                    <label>Full Name:</label>
                    <input type="text" name="fullName" value={studentData.fullName} onChange={handleChange} required className="form-input" />
                </div>

                <div className="form-group">
                    <label>Student ID:</label>
                    <input type="text" name="studentId" value={studentData.studentId} onChange={handleChange} required className="form-input" />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={studentData.email} onChange={handleChange} required className="form-input" />
                </div>

                <div className="form-group">
                    <label>Date of Birth:</label>
                    <input type="date" name="DOB" value={studentData.DOB} onChange={handleChange} required className="form-input" />
                </div>

                <div className="form-group">
                    <label>Phone Number:</label>
                    <input type="tel" name="phoneNo" value={studentData.phoneNo} onChange={handleChange} required className="form-input" />
                </div>

                <div className="form-group">
                    <label>Address:</label>
                    <textarea name="address" value={studentData.address} onChange={handleChange} required className="form-textarea"></textarea>
                </div>

                <div className="form-group">
                    <label>Department:</label>
                    <select name="department" value={studentData.department} onChange={handleChange} required className="form-select">
                        <option value="">Select Department</option>
                        <option value="IT">Information Technology</option>
                        <option value="CSE">Computer Science Engineering</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Current Semester:</label>
                    <input type="number" name="currentSemester" value={studentData.currentSemester} onChange={handleChange} required className="form-input" />
                </div>

                <div className="form-group">
                    <label>Enrollment Year:</label>
                    <input type="number" name="enrollmentYear" value={studentData.enrollmentYear} onChange={handleChange} required className="form-input" />
                </div>

                <button type="submit" className="form-submit">Register</button>
            </form>
        </div>
    );
};
