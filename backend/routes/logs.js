const express = require("express");
const router = express.Router();
const db = require("../db"); // MySQL connection file

// Get Faculty Assignment Logs
router.get("/faculty-assignment-logs", async (req, res) => {
    try {
        const [logs] = await db.query(`
            SELECT f.Full_Name, c.course_name, l.assigned_at
            FROM faculty_assignment_logs l
            JOIN faculty_info f ON l.faculty_id = f.Faculty_ID
            JOIN courses c ON l.course_id = c.course_id
            ORDER BY l.assigned_at DESC
        `);

        res.json(logs);
    } catch (error) {
        console.error("Error fetching faculty assignment logs:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;

