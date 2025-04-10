CREATE DATABASE IF NOT EXISTS college_management;
USE college_management;

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'faculty', 'admin') DEFAULT 'student',
    status ENUM('pending', 'active', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO users (name, email, password, role, status) VALUES 
('Admin', 
 'Admin@iiitvadodara.ac.in', 
 '$2b$10$hAz1KZUs0Bd9dZLVZ9mAueYZaoV5EZBMgG1wwRdBmcY7jOTNThyM2', 
 'admin', 
 'active'
);

CREATE TABLE IF NOT EXISTS user_sessions (
    session_id VARCHAR(255) PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
); 

CREATE TABLE IF NOT EXISTS departments (
    department_id VARCHAR(50) PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS semesters (
    semester_id VARCHAR(30) PRIMARY KEY,
    semester_name VARCHAR(50) NOT NULL
);

INSERT IGNORE INTO departments (department_id, department_name) VALUES
('IT', 'Information Technology'),
('CSE', 'Computer Science Engineering'),
('ECE', 'Electronics and Communication Engineering'),
('EEE', 'Electrical and Electronics Engineering'),
('ME', 'Mechanical Engineering'),
('CE', 'Civil Engineering'),
('AE', 'Aeronautical Engineering'),
('BT', 'Biotechnology'),
('CH', 'Chemical Engineering'),
('MT', 'Metallurgical Engineering'),
('PE', 'Petroleum Engineering'),
('AI', 'Artificial Intelligence and Machine Learning'),
('DS', 'Data Science'),
('CY', 'Cyber Security');


INSERT IGNORE INTO semesters (semester_id, semester_name) VALUES
('1', 'First Semester'),
('2', 'Second Semester'),
('3', 'Third Semester'),
('4', 'Fourth Semester'),
('5', 'Fifth Semester'),
('6', 'Sixth Semester'),
('7', 'Seventh Semester'),
('8', 'Eighth Semester');


CREATE TABLE IF NOT EXISTS courses (
    course_id VARCHAR(50) PRIMARY KEY,
    course_name VARCHAR(200) NOT NULL,
    department_id VARCHAR(50),
    semester_id VARCHAR(30),
    FOREIGN KEY (semester_id) REFERENCES semesters(semester_id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS student_info (
    Student_ID VARCHAR(25) PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,  
    Email VARCHAR(100) NOT NULL,
    DOB DATE NOT NULL,
    Phone_No CHAR(10) NOT NULL,
    Address TEXT NOT NULL,  
    Department VARCHAR(50),
    Current_semester VARCHAR(30),
    Enrollment_Year INT,
    FOREIGN KEY (Department) REFERENCES departments(department_id) ON DELETE CASCADE,
    FOREIGN KEY (Current_semester) REFERENCES semesters(semester_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS faculty_info (
    Faculty_ID VARCHAR(25) PRIMARY KEY,
    Full_Name VARCHAR(255) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Phone_No CHAR(10) NOT NULL,
    Specialization VARCHAR(300),
    Year_of_exp INT NOT NULL
);

CREATE TABLE IF NOT EXISTS enrollment (
    Enrollment_Id INT PRIMARY KEY AUTO_INCREMENT,
    Student_ID VARCHAR(25),
    course_id VARCHAR(50),
    FOREIGN KEY (Student_ID) REFERENCES student_info(Student_ID) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS faculty_department (
    Faculty_ID VARCHAR(25),
    Department_ID VARCHAR(50),
    PRIMARY KEY (Faculty_ID, Department_ID),
    FOREIGN KEY (Faculty_ID) REFERENCES faculty_info(Faculty_ID) ON DELETE CASCADE,
    FOREIGN KEY (Department_ID) REFERENCES departments(department_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS faculty_courses (
    Faculty_ID VARCHAR(25),
    Course_ID VARCHAR(50),
    PRIMARY KEY (Faculty_ID, Course_ID),
    FOREIGN KEY (Faculty_ID) REFERENCES faculty_info(Faculty_ID) ON DELETE CASCADE,
    FOREIGN KEY (Course_ID) REFERENCES courses(course_id) ON DELETE CASCADE
);
CREATE DATABASE IF NOT EXISTS college_management;
USE college_management;

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'faculty', 'admin') DEFAULT 'student',
    status ENUM('pending', 'active', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO users (name, email, password, role, status) VALUES 
('Admin', 
 'Admin@iiitvadodara.ac.in', 
 '$2b$10$hAz1KZUs0Bd9dZLVZ9mAueYZaoV5EZBMgG1wwRdBmcY7jOTNThyM2', 
 'admin', 
 'active'
);

CREATE TABLE IF NOT EXISTS user_sessions (
    session_id VARCHAR(255) PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
); 

CREATE TABLE IF NOT EXISTS departments (
    department_id VARCHAR(50) PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS semesters (
    semester_id VARCHAR(30) PRIMARY KEY,
    semester_name VARCHAR(50) NOT NULL
);

INSERT IGNORE INTO departments (department_id, department_name) VALUES
('IT', 'Information Technology'),
('CSE', 'Computer Science Engineering'),
('ECE', 'Electronics and Communication Engineering'),
('EEE', 'Electrical and Electronics Engineering'),
('ME', 'Mechanical Engineering'),
('CE', 'Civil Engineering'),
('AE', 'Aeronautical Engineering'),
('BT', 'Biotechnology'),
('CH', 'Chemical Engineering'),
('MT', 'Metallurgical Engineering'),
('PE', 'Petroleum Engineering'),
('AI', 'Artificial Intelligence and Machine Learning'),
('DS', 'Data Science'),
('CY', 'Cyber Security');


INSERT IGNORE INTO semesters (semester_id, semester_name) VALUES
('1', 'First Semester'),
('2', 'Second Semester'),
('3', 'Third Semester'),
('4', 'Fourth Semester'),
('5', 'Fifth Semester'),
('6', 'Sixth Semester'),
('7', 'Seventh Semester'),
('8', 'Eighth Semester');


CREATE TABLE IF NOT EXISTS courses (
    course_id VARCHAR(50) PRIMARY KEY,
    course_name VARCHAR(200) NOT NULL,
    department_id VARCHAR(50),
    semester_id VARCHAR(30),
    FOREIGN KEY (semester_id) REFERENCES semesters(semester_id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS student_info (
    Student_ID VARCHAR(25) PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,  
    Email VARCHAR(100) NOT NULL,
    DOB DATE NOT NULL,
    Phone_No CHAR(10) NOT NULL,
    Address TEXT NOT NULL,  
    Department VARCHAR(50),
    Current_semester VARCHAR(30),
    Enrollment_Year INT,
    FOREIGN KEY (Department) REFERENCES departments(department_id) ON DELETE CASCADE,
    FOREIGN KEY (Current_semester) REFERENCES semesters(semester_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS faculty_info (
    Faculty_ID VARCHAR(25) PRIMARY KEY,
    Full_Name VARCHAR(255) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Phone_No CHAR(10) NOT NULL,
    Specialization VARCHAR(300),
    Year_of_exp INT NOT NULL
);

CREATE TABLE IF NOT EXISTS enrollment (
    Enrollment_Id INT PRIMARY KEY AUTO_INCREMENT,
    Student_ID VARCHAR(25),
    course_id VARCHAR(50),
    FOREIGN KEY (Student_ID) REFERENCES student_info(Student_ID) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS faculty_department (
    Faculty_ID VARCHAR(25),
    Department_ID VARCHAR(50),
    PRIMARY KEY (Faculty_ID, Department_ID),
    FOREIGN KEY (Faculty_ID) REFERENCES faculty_info(Faculty_ID) ON DELETE CASCADE,
    FOREIGN KEY (Department_ID) REFERENCES departments(department_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS faculty_courses (
    Faculty_ID VARCHAR(25),
    Course_ID VARCHAR(50),
    PRIMARY KEY (Faculty_ID, Course_ID),
    FOREIGN KEY (Faculty_ID) REFERENCES faculty_info(Faculty_ID) ON DELETE CASCADE,
    FOREIGN KEY (Course_ID) REFERENCES courses(course_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS results (
    student_id VARCHAR(25) NOT NULL,
    course_id VARCHAR(50) NOT NULL,
    marks_obtained DECIMAL(5,2) NOT NULL,
    total_marks DECIMAL(5,2) NOT NULL DEFAULT 100,
    grade CHAR(2),
    exam_type ENUM('midsem', 'endsem') NOT NULL,
    PRIMARY KEY (student_id, course_id, exam_type), 
    FOREIGN KEY (student_id) REFERENCES student_info(Student_ID) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
);
