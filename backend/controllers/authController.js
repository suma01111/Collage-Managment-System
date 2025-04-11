import db from '../config/db.js'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'


export const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  try {
    db.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      async (error, results) => {
        if (error) {
          console.error('Database error:', error)
          return res.status(500).json({ error: 'Internal server error' })
        }

        if (results.length === 0) {
          return res.status(401).json({ error: 'Invalid credentials' })
        }

        const user = results[0]

        if (user.status !== 'active') {
          return res.status(401).json({ 
            error: 'Account is pending approval. Please wait for admin activation.' 
          })
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
          return res.status(401).json({ error: 'Invalid credentials' })
        }

        // Check if student profile exists
        db.query(
          'SELECT * FROM student_info WHERE Email = ?',
          [email],
          (error, studentResults) => {
            if (error) {
              console.error('Database error:', error)
              return res.status(500).json({ error: 'Internal server error' })
            }

            const isStudentProfileComplete = studentResults.length > 0

            // Check if faculty profile exists
            db.query(
              'SELECT * FROM faculty_info WHERE Email = ?',
              [email],
              (error, facultyResults) => {
                if (error) {
                  console.error('Database error:', error)
                  return res.status(500).json({ error: 'Internal server error' })
                }

                const isFacultyProfileComplete = facultyResults.length > 0

                // Create session
                const sessionId = uuidv4()
                const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) 

                db.query(
                  'INSERT INTO user_sessions (session_id, user_id, expires_at) VALUES (?, ?, ?)',
                  [sessionId, user.id, expiresAt],
                  (error) => {
                    if (error) {
                      console.error('Session creation error:', error)
                      return res.status(500).json({ error: 'Internal server error' })
                    }

                    res.cookie('sessionId', sessionId, {
                      httpOnly: true,
                      secure: process.env.NODE_ENV === 'production',
                      expires: expiresAt,
                      sameSite: 'strict'
                    })

                    res.json({
                      message: 'Login successful',
                      user: {
                        id: user.id,
                        email: user.email,
                        role: user.role,
                        isStudentProfileComplete,
                        isFacultyProfileComplete
                      }
                    })
                  }
                )
              }
            )
          }
        )
      }
    )
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const logout = (req, res) => {
  const { sessionId } = req.cookies

  if (sessionId) {
    db.query(
      'DELETE FROM user_sessions WHERE session_id = ?',
      [sessionId],
      (error) => {
        if (error) {
          console.error('Logout error:', error)
        }
      }
    )
  }

  res.clearCookie('sessionId')
  res.json({ message: 'Logged out successfully' })
}

export const signup = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    // Check if email already exists
    db.query(
      'SELECT id FROM users WHERE email = ?',
      [email],
      async (error, results) => {
        if (error) {
          console.error('Database error:', error)
          return res.status(500).json({ error: 'Internal server error' })
        }message: "You have already have account"

        if (results.length > 0) {
          return res.status(400).json({ error: 'Email already exists' })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Insert new user
        db.query(
          'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
          [name, email, hashedPassword],
          (error) => {
            if (error) {
              console.error('Signup error:', error)
              return res.status(500).json({ error: 'Internal server error' })
            }

            res.status(201).json({ 
              message: 'Signup successful. Please wait for admin approval.' 
            })
          }
        )
      }
    )
  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
} 
