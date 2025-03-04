import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const FacultySetup = () => {
    const [facultyData, setFacultyData] = useState({
        fullname: "",
        facultyId: "",
        email: "",
        phoneNo: "",
        specialization: "",
        yearOfExp: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFacultyData({...facultyData, [e.target.name]: e.target.value});
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        console.log(facultyData);
        const formarttedData = {
            Faculty_ID: facultyData.facultyId,
            Full_Name: facultyData.fullname,
            Email: facultyData.email,
            Phone_No: facultyData.phoneNo,
            Specialization: facultyData.specialization,
            Year_of_exp: facultyData.yearOfExp
        }

        try {
            const response = await fetch("http://localhost:3000/api/faculty/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formarttedData),
            });

            const result = await response.json();
            if(!response.ok) throw new Error(result.error);
            alert("registered successfuly");

        } catch (error) {
            console.error('Registatration failed: ',error);
        }

        navigate('/faculty/profile');
    }

    return (
        <div className='registration-container'>
            <h2 className='form-title'>Faculty Registration</h2>
            <form onSubmit={handleSubmit} className='registration-form'>
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="fullname" className='form-input' value={facultyData.fullname} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Faculty ID</label>
                    <input type="text" name="facultyId" className='form-input' value={facultyData.facultyId} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className='form-input' value={facultyData.email} onChange={handleChange} required />
                </div>
                    <div className="form-group">
                        <label>Phone No.</label>
                        <input
                            type="tel"
                            name="phoneNo"
                            className="form-input"
                            pattern="[0-9]{10}"
                            title="Enter a 10-digit phone number"
                            maxLength="10"
                            onChange={handleChange}
                            value={facultyData.phoneNo}
                            required
                        />
                    </div>

                <div className="form-group">
                    <label>Specilization</label>
                    <textarea name="specialization" className='form-textarea' onChange={handleChange} value={facultyData.specialization} required />
                </div>
                <div className="form-group">
                    <label>Year of Experience</label>
                    <input type="number" name="yearOfExp" className='form-input' value={facultyData.yearOfExp} onChange={handleChange} required />
                </div>

                <button type="submit" className="form-submit">Register  </button>
            </form>
        </div>
    )
}