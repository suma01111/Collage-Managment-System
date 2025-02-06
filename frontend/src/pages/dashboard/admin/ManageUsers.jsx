import { useState, useEffect } from 'react'

export const ManageUsers = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/users', {
        credentials: 'include'
      })
      const data = await response.json()
      setUsers(data.users)
    } catch (error) {
      setError('Failed to fetch users')
    }
  }

  const handleRoleChange = async (userId, role) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ role })
      })

      if (!response.ok) {
        throw new Error('Failed to update role')
      }

      fetchUsers()
    } catch (error) {
      setError(error.message)
    }
  }

  const handleStatusChange = async (userId, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ status })
      })

      if (!response.ok) {
        throw new Error('Failed to update status')
      }

      fetchUsers()
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="manage-users-container">
      <h1>Manage Users</h1>
      {error && <p className="error">{error}</p>}
      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <select
                    value={user.status}
                    onChange={(e) => handleStatusChange(user.id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 