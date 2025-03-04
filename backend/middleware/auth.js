import db from '../config/db.js'

export const authenticateUser = (req, res, next) => {
  const { sessionId } = req.cookies

  if (!sessionId) {
    return res.status(401).json({ error: 'Authentication required' })
  }

  db.query(
    `SELECT users.* FROM users 
     JOIN user_sessions ON users.id = user_sessions.user_id 
     WHERE user_sessions.session_id = ? AND user_sessions.expires_at > NOW()`,
    [sessionId],
    (error, results) => {
      if (error) {
        console.error('Auth middleware error:', error)
        return res.status(500).json({ error: 'Internal server error' })
      }

      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid or expired session' })
      }

      req.user = results[0]
      next()
    }
  )
}
