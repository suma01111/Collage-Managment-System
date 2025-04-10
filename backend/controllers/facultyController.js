import db from "../config/db.js";
import pool from "../config/pool.js";

export const registerFaculty = (req, res) => {
    console.log('Recieved Data:', req.body);

    const { Faculty_ID, Full_Name, Email, Phone_No, Specialization, Year_of_exp } = req.body;

    if (!Faculty_ID || !Full_Name || !Email || !Phone_No || !Specialization || !Year_of_exp)
        return res.status(400).json({ error: "All fields are required" });

    // insert Data 
    db.query(
        "INSERT INTO faculty_info (Faculty_ID, Full_Name, Email, Phone_No, Specialization, Year_of_exp) VALUES (?,?,?,?,?,?)",
        [Faculty_ID, Full_Name, Email, Phone_No, Specialization, Year_of_exp],
        (error) => {
            console.log("Faculty registration error: ", error);
            return res.status(500).json({ error: "Internal server error" })
        },

        res.status(201).json({
            message: "Regestration Successful"
        })
    )
}

export const getFacultyProfile = (req, res) => {
    const userEmail = req.user.email;

    db.query(
        'SELECT * FROM  faculty_info where Email = ?',
        [userEmail],
        (error, results) => {
            if (error) {
                console.error('Database error: ', error);
                return res.status(500).json({
                    error: 'Internal Server error'
                })
            }

            if (results.length === 0) {
                return res.status(404).json({
                    error: 'Faculty profile not found'
                })
            }

            const faculty = results[0];
            res.json(faculty);
        }
    )
}

export const getFacultyForCourses = (req, res) => {
    console.log("recieved req: ", req.body);

    db.query(
        'SELECT Faculty_ID, Full_Name FROM faculty_info',
        (error, results) => {
            if (error) {
                console.error('Database error: ', error);
                return res.status(500).json({
                    error: 'Internal Server error'
                })
            }

            if (results.length === 0) {
                return res.status(404).json({
                    error: 'Faculty profile not found'
                })
            }

            res.json(results)
        }
    )
}

// render this courses on the faculty courses
export const facutlyAssignCourses = async (req, res) => {
    const { facultyId } = req.params;
    const query = `
        SELECT c.course_id, c.course_name, c.department_id, d.department_name, 
               COUNT(e.Student_ID) AS student_count
        FROM faculty_courses fc
        JOIN courses c ON fc.Course_ID = c.course_id
        JOIN departments d ON c.department_id = d.department_id
        LEFT JOIN enrollment e ON c.course_id = e.course_id
        WHERE fc.Faculty_ID = ?
        GROUP BY c.course_id, c.course_name, c.department_id, d.department_name;
    `;

    db.query(query, [facultyId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }
        res.json(results);
    });
}

export const StudentCourse = async (req, res) => {
    const { facultyId } = req.params; // Extract facultyId correctly

    if (!facultyId) {
        return res.status(400).json({ error: "Faculty_ID is required" });
    }

    const sqlQuery = `
        SELECT Course_ID, Faculty_ID, Student_ID, full_name, course_name
        FROM faculty_courses 
        NATURAL JOIN enrollment 
        NATURAL JOIN student_info
        NATURAL JOIN courses
        WHERE Faculty_ID = ?;
    `;

    db.query(sqlQuery, [facultyId], (err, results) => {
        if (err) {
            console.error("Error fetching course details:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json(results);
    });
};

export const assignResult = async (req, res) => {
    const { student_id, course_id, marks_obtained, grade, exam_type } = req.body;
    console.log(student_id, course_id, marks_obtained, grade, exam_type)

    try {
        const connection = await pool.getConnection();

        await connection.query(
            'INSERT INTO results (student_id, course_id, marks_obtained, grade, exam_type) VALUES (?, ?, ?, ?, ?)',
            [student_id, course_id, marks_obtained, grade, exam_type]
        );

        connection.release();
        res.status(200).json({ message: 'Result saved successfully' });
    } catch (err) {
        console.error('Error in assignResult:', err);
        res.status(500).json({ error: 'Failed to save result' });
    }
};
