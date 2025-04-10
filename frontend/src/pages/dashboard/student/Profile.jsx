import { useEffect, useState } from 'react';

export const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/student/profile', {
          credentials: 'include'
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch profile');
        }

        setProfile(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (!profile) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h1>Student Profile</h1>
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-info">
            <h2>{profile.full_name}</h2>
            <p>Student ID: {profile.Student_ID}</p>
            <p>Email: {profile.Email}</p>
          </div>
        </div>
        <div className="profile-details">
          <div className="detail-group">
            <h3>Personal Information</h3>
            <p>Date of Birth: {profile.DOB}</p>
            <p>Phone: {profile.Phone_No}</p>
            <p>Address: {profile.Address}</p>
          </div>
          <div className="detail-group">
            <h3>Academic Information</h3>
            <p>Department: {profile.Department}</p>
            <p>Current Semester: {profile.Current_semester}</p>
            <p>Enrollment Year: {profile.Enrollment_Year}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
