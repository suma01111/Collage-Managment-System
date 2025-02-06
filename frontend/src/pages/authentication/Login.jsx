import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        email: data.user.email,
        role: data.user.role
      }))

      // Redirect based on role
      switch(data.user.role) {
        case 'student':
          navigate('/student/dashboard')
          break
        case 'faculty':
          navigate('/faculty/dashboard')
          break
        case 'admin':
          navigate('/admin/dashboard')
          break
        default:
          navigate('/login')
      }
    } catch (error) {
      setError(error.message)
      // Clear error after 5 seconds
      setTimeout(() => setError(''), 5000)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && (
        <p className="error">
          {error}
          {error.includes('pending') && (
            <span className="pending-note">
              <br />
              Please wait for an administrator to approve your account.
            </span>
          )}
        </p>
      )}
    </div>
  )
}