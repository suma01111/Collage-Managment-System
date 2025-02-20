export const StudentTimeTable = () => {
  return (
    <div className="timetable-container">
      <h1>Academic Timetable</h1>
      <div className="timetable">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>9:00 AM</td>
              <td>Mathematics</td>
              <td>Physics</td>
              <td>Mathematics</td>
              <td>Physics</td>
              <td>English</td>
            </tr>
            <tr>
              <td>11:00 AM</td>
              <td>Computer Science</td>
              <td>English</td>
              <td>Computer Science</td>
              <td>English</td>
              <td>Physics</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  )
} 