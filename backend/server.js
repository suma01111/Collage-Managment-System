import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import studentRoutes from './routes/studentRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js';

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}))

app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/student', studentRoutes);
app.use('/api/faculty', facultyRoutes);
// http://localhost:3000/api/admin/courses
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
