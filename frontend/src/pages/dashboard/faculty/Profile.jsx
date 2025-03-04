import { useEffect, useState } from "react"

export const FacultyProfile = () => {
  const [facultyData, setFacultyData] = useState(null);
  const [error, setError] = useState('');

  useEffect (() => {
    const fetchProfile = async () => {
      try{
        const response = await fetch('http://localhost:3000/api/faculty/profile', {
          credentials:'include'
        });

        const data = await response.json();

        if(!response.ok) 
          throw new Error(data.error || 'Failed to fetch profile');

        setFacultyData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  if(error) return <p className="error">{error}</p>
  if(!facultyData) return <p>Loading...</p>


  
  return (
    <div className="profile-container">
      <h1>Faculty Profile</h1>
      <div className="profile-card">
        <div className="profile-header">
          <img src="/placeholder-avatar.png" alt="Profile" className="profile-avatar" />
          <div className="profile-info">
            <h2>{facultyData.Full_Name}</h2>
            <p><strong>Faculty Id: </strong>{facultyData.Faculty_ID}</p>
          </div>
        </div>
        <div className="profile-details">
          <div className="detail-group">
            <h3>Personal Information</h3>
            <p><strong>Phone No.:</strong> {facultyData.Phone_No}</p>
            <p><strong>Email: </strong>{facultyData.Email}</p>
          </div>
          <div className="detail-group">  
            <h3>Academic Information</h3>
            <p><strong>Specialization:</strong> {facultyData.Specialization}</p>
            <p><strong>Years of Experience:</strong> {facultyData.Year_of_exp}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 