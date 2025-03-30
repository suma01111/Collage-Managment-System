import React, { useState, useEffect } from "react";

const FacultyAssignmentLogs = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/logs/faculty-assignment-logs")
            .then(response => response.json())
            .then(data => setLogs(data))
            .catch(error => console.error("Error fetching logs:", error));
    }, []);

    return (
        <div>
            <h2>Faculty Assignment Logs</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Faculty Name</th>
                        <th>Course Name</th>
                        <th>Assigned At</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, index) => (
                        <tr key={index}>
                            <td>{log.Full_Name}</td>
                            <td>{log.course_name}</td>
                            <td>{new Date(log.assigned_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FacultyAssignmentLogs;
