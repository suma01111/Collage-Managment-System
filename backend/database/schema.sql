CREATE DATABASE IF NOT EXISTS college_management;
USE college_management;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'faculty', 'admin') DEFAULT 'student',
    status ENUM('pending', 'active', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password, role, status) VALUES 
('Admin', 
 'Admin@iiitvadodara.ac.in', 
 '$2b$10$hAz1KZUs0Bd9dZLVZ9mAueYZaoV5EZBMgG1wwRdBmcY7jOTNThyM2', 
 'admin', 
 'active'
);


CREATE TABLE user_sessions (
    session_id VARCHAR(255) PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
); 


