import db from "../config/db.js";

export const registerFaculty = (req, res) => {
    console.log('Recieved Data:', req.body);

    const {Faculty_ID, Full_Name, Email, Phone_No, Specialization, Year_of_exp} = req.body;

    if(!Faculty_ID || !Full_Name || !Email || !Phone_No || !Specialization || !Year_of_exp)
        return res.status(400).json({error: "All fields are required"});

    // insert Data 
    db.query(
        "INSERT INTO faculty_info (Faculty_ID, Full_Name, Email, Phone_No, Specialization, Year_of_exp) VALUES (?,?,?,?,?,?)",
        [Faculty_ID, Full_Name, Email, Phone_No,Specialization, Year_of_exp],
        (error) => {
            console.log("Student registration error: ", error);
            return res.status(500).json({error: "Internal server error"})
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
        (error,results) =>{
            if(error) {
                console.error('Database error: ', error);
                return res.status(500).json({
                    error: 'Internal Server error'
                })
            }

            if(results.length===0) {
                return res.status(404).json({
                    error: 'Faculty profile not found'
                })
            }

            const faculty = results[0];
            res.json(faculty);
        }
    )
}

export const getFacultyForCourses = (req,res) => {
    console.log("recieved req: ", req.body);

    db.query(
        'SELECT Faculty_ID, Full_Name FROM faculty_info',
        (error,results) => {
            if(error) {
                console.error('Database error: ', error);
                return res.status(500).json({
                    error: 'Internal Server error'
                })
            }

            if(results.length===0) {
                return res.status(404).json({
                    error: 'Faculty profile not found'
                })
            }

            res.json(results)
        }
    )
}