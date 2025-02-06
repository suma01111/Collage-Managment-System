export const ManageTimeTable = () => {
  return (
    <div className="manage-timetable-container">
      <h1>Manage Timetable</h1>
      <div className="timetable-actions">
        <select className="select-input">
          <option value="">Select Course</option>
          <option value="ds">Data Structures</option>
          <option value="db">Database Systems</option>
        </select>
        <button className="update-btn">Update Schedule</button>
      </div>
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
              <td className="slot">
                <select className="schedule-select">
                  <option value="">Available</option>
                  <option value="ds">Data Structures</option>
                  <option value="db">Database Systems</option>
                </select>
              </td>
              <td className="slot"><select className="schedule-select">
                  <option value="">Available</option>
                  <option value="ds">Data Structures</option>
                  <option value="db">Database Systems</option>
                </select></td>
              <td className="slot"><select className="schedule-select">
                  <option value="">Available</option>
                  <option value="ds">Data Structures</option>
                  <option value="db">Database Systems</option>
                </select></td>
              <td className="slot"><select className="schedule-select">
                  <option value="">Available</option>
                  <option value="ds">Data Structures</option>
                  <option value="db">Database Systems</option>
                </select></td>
              <td className="slot"><select className="schedule-select">
                  <option value="">Available</option>
                  <option value="ds">Data Structures</option>
                  <option value="db">Database Systems</option>
                </select></td>
            </tr>
            {/* Add more time slots as needed */}
          </tbody>
        </table>
      </div>
    </div>
  )
} 