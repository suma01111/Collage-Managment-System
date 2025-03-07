import { useEffect, useState } from 'react'

export const ManageUsers = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3000/api/admin/users', {
        credentials: 'include'
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      setUsers(data.users)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (userId, status) => {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/users/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ status })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }
      // Refresh users list
      fetchUsers()
    } catch (error) {
      setError(error.message)
    }
  }

  const handleRoleChange = async (userId, role) => {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ role })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      fetchUsers()
    } catch (error) {
      setError(error.message)
    }
  }

  if (loading) return <div>Loading...</div>

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
                  </select>
                </td>
                <td>
                  <select
                    value={user.status}
                    onChange={(e) => handleStatusChange(user.id, e.target.value)}
                    className={`status-${user.status}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td>
                  <button 
                    className="delete-btn"
                    onClick={() => handleStatusChange(user.id, 'rejected')}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 
