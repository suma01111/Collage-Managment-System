import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {rejectUnauthorized: false}
})

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.message)
    console.error('Database connection config:', {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME
    })
    return
  }
  console.log('Connected to MySQL database')
})

export default db