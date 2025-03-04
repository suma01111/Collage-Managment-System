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
    
        const formattedData = {
            Student_ID: studentData.studentId,
            full_name: studentData.fullName,
            DOB: studentData.DOB,
            Phone_No: studentData.phoneNo,
            Email: studentData.email,
            Address: studentData.address,
            Department: studentData.department,
            Current_semester: studentData.currentSemester,
            Enrollment_Year: studentData.enrollmentYear,
        };
    
        try {
            const response = await fetch("http://localhost:3000/api/student/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedData),
            });
    
            const result = await response.json();
            if (!response.ok) throw new Error(result.error);
            alert("Student registered successfully!");
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };
    // Faculty_ID VARCHAR(25) PRIMARY KEY,
    // Full_Name VARCHAR(255) NOT NULL,
    // Email VARCHAR(100) NOT NULL,
    // Department VARCHAR(50) NOT NULL,
    // Phone_No CHAR(10) NOT NULL,
    // Specialization VARCHAR(300),
    // Year_of_exp INT NOT NULL

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