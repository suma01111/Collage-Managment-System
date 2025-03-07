import db from "../config/db.js";

export const AddCourse = (req, res) => {
    const { course_id, course_name, department_id, semester_id, Faculty_ID } = req.body;

    if (!course_id || !course_name || !department_id || !semester_id) {
        return res.status(400).json({ error: 'Fields Are Required' });
    }

    db.query(
        'INSERT INTO courses (course_id, course_name, department_id, semester_id) VALUES (?, ?, ?, ?)',
        [course_id, course_name, department_id, semester_id],
        (error) => {
            if (error) {
                console.error('Error in Course Add:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (Faculty_ID) {
                db.query(
                    'INSERT INTO faculty_courses (Faculty_ID, Course_id) VALUES (?, ?)',
                    [Faculty_ID, course_id],
                    (error) => {
                        if (error) {
                            console.error('Error in Course and Faculty Add:', error);
                            return res.status(500).json({ error: 'Internal Server Error' });
                        }
                    }
                );

                db.query(
                    'INSERT INTO faculty_department (Faculty_ID, Department_id) VALUES (?, ?)',
                    [Faculty_ID, department_id],
                    (error) => {
                        if (error) {
                            console.error('Error in Department and Faculty Add:', error);
                            return res.status(500).json({ error: 'Internal Server Error' });
                        }
                    }
                );
            }

            return res.status(201).json({
                message: "Course added successfully",
                course: { course_id, course_name, department_id, semester_id, Faculty_ID }
            });
        }
    );
};

// Get Courses
export const getCourses = (req, res) => {
    const LeftJoin = `
        SELECT 
            c.course_id, 
            c.course_name, 
            c.department_id, 
            c.semester_id, 
            fc.Faculty_ID 
        FROM courses c
        LEFT JOIN faculty_courses fc ON c.course_id = fc.Course_ID`;

    db.query(LeftJoin, (error, results) => {
        if (error) return res.status(500).json({ error: "Internal Server Error" });
        res.status(200).json(results);
    });
};

// Update Course
export const updateCourse = (req, res) => {
    const { course_id } = req.params;
    const { course_name, department_id, semester_id, Faculty_ID } = req.body;

    console.log("Incoming request:", req.params, req.body);  // Log request data

    db.query(
        'UPDATE courses SET course_name = ?, department_id = ?, semester_id = ? WHERE course_id = ?',
        [course_name, department_id, semester_id, course_id],
        (error, results) => {
            if (error) {
                console.error('Error updating courses:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            console.log('Courses table updated:', results);

            db.query(
                'UPDATE faculty_courses SET Faculty_ID = ? WHERE Course_id = ?',
                [Faculty_ID, course_id],
                (error, results) => {
                    if (error) {
                        console.error('Error updating faculty_courses:', error);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }
                    console.log('Faculty_courses table updated:', results);
                    res.status(200).json({ message: "Course updated successfully" });
                }
            );
        }
    );
};



export const deleteCourse = (req, res) => {
    const { course_id } = req.params;

    db.query('DELETE FROM faculty_courses WHERE Course_id = ?', [course_id], (error) => {
        if (error) return res.status(500).json({ error: 'Error deleting from faculty_courses' });

        db.query('DELETE FROM courses WHERE course_id = ?', [course_id], (error) => {
            if (error) return res.status(500).json({ error: 'Error deleting course' });
            res.status(200).json({ message: "Course deleted successfully" });
        });
    });
};