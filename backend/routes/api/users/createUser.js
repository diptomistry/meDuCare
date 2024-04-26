import express from 'express';
import pool from '../../database.js'; // Import your database connection pool
import multer from 'multer';
import bcryptjs from 'bcryptjs';
const upload = multer(
  { dest: 'public/' }
);
const router = express.Router();
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// POST /api/users/create-user
router.post('/create-user', upload.single('file'),async (req, res) => {
  const { username, password, email, dob, name, sex, user_type, specialization, department, session ,registration_no,joining_date } = req.body;

  // Check if required parameters are empty
  if (!username || !password || !email || !dob || !name || !sex || !user_type) {
    return res.status(400).json({ success: false, message: 'All required parameters must be provided' });
  }
  

  try {
    var filePath;
    if(req.file){
    
     
      const host = req.hostname;
 filePath = req.protocol + "://" + host + '/' + req.file.path;
console.log(filePath);

    }
    else{

       filePath = req.protocol + "://" + req.get('host') + '/public/' + 'avatar.jpg';
       console.log(filePath);
    }
    // Check if user already exists
    const [users] = await pool.query('SELECT * FROM Users WHERE Username = ?', [username]);
    if (users.length > 0) {
      return res.status(200).json({ success: false, message: 'User already exists' });
    }
    // Check if email already exists
    const [emails] = await pool.query('SELECT * FROM Users WHERE Email = ?', [email]);
    if (emails.length > 0) {
      return res.status(200).json({ success: false, message: 'Email already exists' });
    }
    if(user_type=='student'){
      const [registration] = await pool.query('SELECT * FROM Student WHERE RegistrationNo = ?', [registration_no]);
      if (registration.length > 0) {
        return res.status(200).json({ success: false, message: 'Registration No. already exists' });
      }
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    console.log(hashedPassword);
    // Insert user into Users table
    const userInsertQuery = 'INSERT INTO Users (Username, Password, Email, DOB, Name, Sex, RoleID,Image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const [result] = await pool.query(userInsertQuery, [username, hashedPassword, email, dob, name, sex, getUserRoleId(user_type), filePath]);

    // Insert additional data based on user type
    switch (user_type) {
      case 'admin':
        // Insert admin specific data
        break;
      case 'doctor':
        // Insert doctor specific data into Doctors table
        if (!specialization) {
          return res.status(400).json({ success: false, message: 'Specialization must be provided for doctor user type' });
        }
        const doctorInsertQuery = 'INSERT INTO Doctors (UserID, Specialization) VALUES (?, ?)';
        await pool.query(doctorInsertQuery, [result.insertId, specialization]);
        break;
      case 'student':
        // Insert user specific data into Student table
        if (!department || !session || !registration_no) {
          return res.status(200).json({ success: false, message: 'Department and session and Registration No. must be provided' });
        }
        const studentInsertQuery = 'INSERT INTO Student (UserID, Department, Session ,RegistrationNo) VALUES (?, ?, ?, ?)';
        await pool.query(studentInsertQuery, [result.insertId, department, session,registration_no]);
        break;
      case 'teacher':
        // Insert teacher/staff specific data
        break;

      case 'dispensary_officer':
        // Insert dispensary officer specific data
        break;
      case 'senior_officer':
        // Insert senior officer specific data
        break;
      case 'section_officer':
        break
        // Insert senior officer specific data
        break;
      default:
        throw new Error('Invalid user type');
    }
    const user = await pool.query('SELECT * FROM Users WHERE UserID = ?', [result.insertId]);

    res.json({ success: true, message: 'User created successfully' , user: user[0][0]});
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, message: 'An error occurred while creating user' });
  }
});

// Helper function to get RoleID based on user type
const getUserRoleId = (userType) => {
  switch (userType) {
    case 'admin':
      return 1;
    case 'doctor':
      return 2;
    case 'student':
      return 3;
    case 'teacher':
      return 4;
    case 'staff':
      return 5;
    case 'dispensary_officer':
      return 6;
    case 'senior_officer':
      return 7;
    case 'section_officer':
      return 8;
    default:
      throw new Error('Invalid user type');
  }
};

//user/get
router.get('/', async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM Users');
    // console.log(users.RowDataPacket.toString);
    
    const to_return=users[0].map((user)=>{
    //  console.log(user);
      return {
      //  user_name: user.Username,
      //   email: user.Email,
      //   dob: user.DOB,
      // role: getRoleById(user.RoleID),
      // name: user.Name,
      // sex: user.Sex
      user


        
      };
    }
    );
   // console.log(to_return);

    res.json({success:true, users: users[0]});
  } catch (error) { 
    console.error('Error getting users:', error);
    res.status(500).json({ success: false, message: 'An error occurred while getting users' });
  }
});

//login
router.post('/login', async (req, res) => {
  const { username, password ,email} = req.body;
  console.log(username);
  if(!password)
  {
    return res.status(200).json({ success: false, message: 'Password is missing' });
  }
  if(!username && !email){
    return res.status(200).json({ success: false, message: 'User name or email is missing' });
  }
  try {
    // Check if user exists
    const [users] = await pool.query('SELECT * FROM Users WHERE Username = ? or Email = ?', [username,email]);
    if (users.length === 0) {
      return res.status(200).json({ success: false, message: 'User does not exists.' });
    }
    const user = users[0];
    // Check if password is correct
    const isPasswordValid = await bcryptjs.compare(password, user.Password);
    if (!isPasswordValid) {
      return res.status(200).json({ success: false, message: 'Invalid username or password' });
    }
    // Get user role
    const role = await getRoleById(user.RoleID);
    res.json({ success: true, message: 'Login successful', user: { username: user.Username, email: user.Email, dob: user.DOB, role: role, name: user.Name } });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ success: false, message: 'An error occurred while logging in' });
  }
}
);

// get role by role id function 
const getRoleById = async (role_id) => {
  console.log(role_id);
  const role = await pool.query('SELECT RoleName FROM Roles WHERE RoleID = ?', [role_id]);
  console.log(role[0][0].RoleName);
  return role[0][0].RoleName;
};

export default router;
