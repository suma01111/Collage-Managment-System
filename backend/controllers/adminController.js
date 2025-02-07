import db from '../config/db.js'

export const getUsers = (req, res) => {
  db.query(
    'SELECT id, name, email, role, status FROM users WHERE role != "admin"',
    (error, results) => {
      if (error) {
        console.error('Error fetching users:', error)
        return res.status(500).json({ error: 'Internal server error' })
      }
      res.json({ users: results })
    }
  )
}

export const updateUserStatus = (req, res) => {
  const { userId } = req.params
  const { status } = req.body

  if (!['pending', 'active', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' })
  }

  db.query(
    'UPDATE users SET status = ? WHERE id = ?',
    [status, userId],
    (error) => {
      if (error) {
        console.error('Error updating user status:', error)
        return res.status(500).json({ error: 'Internal server error' })
      }
      res.json({ message: 'User status updated successfully' })
    }
  )
}

export const updateUserRole = (req, res) => {
  const { userId } = req.params
  const { role } = req.body

  if (!['student', 'faculty'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' })
  }

  db.query(
    'UPDATE users SET role = ? WHERE id = ?',
    [role, userId],
    (error) => {
      if (error) {
        console.error('Error updating user role:', error)
        return res.status(500).json({ error: 'Internal server error' })
      }
      res.json({ message: 'User role updated successfully' })
    }
  )
} 