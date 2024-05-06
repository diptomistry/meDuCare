import express from 'express';
import pool from '../../database.js'; // Import your database connection pool
import multer from 'multer';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';

import  verifyToken  from '../../auth/token_validation.js';
import nodemailer from "nodemailer"; // Optional: Use Nodemailer for sending emails

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/')
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });
const router = express.Router();
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// POST /api/users/create-user
router.post('/create-user', upload.single('file'), async (req, res) => {
  const {  password,confirm_pass, email, dob, name, gender, user_type, department_id, department, session, registration_no,registered_from } = req.body;

  if ( !password || !email || !dob || !name || !gender || !user_type) {
    return res.status(200).json({ success: false, message: 'All required parameters must be provided' });
  }
  console.log(password,confirm_pass);
  if(password!==confirm_pass)
  {
    return res.status(200).json({ success: false, message: 'Password does not match' });
  }
  try {
    var filePath;
    if (req.file) {
      const host = req.hostname;
      filePath = `${req.protocol}://${host}:8000/${req.file.path}`;
    } else {
      filePath = `${req.protocol}://${req.get('host')}/public/avatar.jpg`;
    }


  

    // Check if email already exists
    const [emails] = await pool.query('SELECT * FROM Users WHERE Email = ?', [email]);
    if (emails.length > 0) {
      return res.status(200).json({ success: false, message: 'Email already exists' });
    }

    // Additional checks for students
    if (user_type === 'student' && (!department || !session || !registration_no)) {
      return res.status(200).json({ success: false, message: 'Department, session, and registration number must be provided for students' });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);
    const token = await bcryptjs.hash(email, 10);
    var status='Pending';
    if(user_type==='student'||user_type==='teacher'||user_type==='staff')
    status='Approved';

    // Insert user into Users table
    const userInsertQuery = 'INSERT INTO Users (Password, Email, DOB, Name, Sex, RoleID, Image ,Token ,Status ,RegisteredFrom) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? ,?)';
    const roleID = getUserRoleId(user_type);
    const [result] = await pool.query(userInsertQuery, [hashedPassword, email, dob, name, gender, roleID, filePath,token,status ,registered_from]);

    // Insert additional data based on user type
    if (user_type === 'doctor') {
      console.log(department_id);
      if (!department_id) {
        //delete user
        const deleteUserQuery = 'DELETE FROM Users WHERE UserID = ?';
        await pool.query(deleteUserQuery, [result.insertId]);
        return res.status(200).json({ success: false, message: 'Specialization must be provided for doctors' });
      }
      const doctorInsertQuery = 'INSERT INTO Doctors (UserID, DepartmentID) VALUES (?, ?)';
      await pool.query(doctorInsertQuery, [result.insertId, department_id]);
    } else if (user_type === 'student') {
      
      const studentInsertQuery = 'INSERT INTO Student (UserID, Department, Session, RegistrationNo) VALUES (?, ?, ?, ?)';
      await pool.query(studentInsertQuery, [result.insertId, department, session, registration_no]);
    }

    res.json({ success: true, message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, message: 'An error occurred while creating the user' });
  }
});

// POST /api/users/update-user

router.post('/update-user', upload.single('file'), async (req, res) => {

  const { user_id, password, email, dob, name,department, session, registration_no} = req.body;
  try{
  if (!user_id) {
    return res.status(200).json({ success: false, message: 'User ID must be provided' });
  }
  const [user] = await pool.query('SELECT * FROM Users WHERE UserID = ?', [user_id]);
  if (user.length === 0) {
    return res.status(200).json({ success: false, message: 'User does not exist' });
  }
  if(password)
  {
   //update password
   const hashedPassword = await bcryptjs.hash(password, 10);
    const updatePasswordQuery = 'UPDATE Users SET Password = ? WHERE UserID = ?';
    await pool.query(updatePasswordQuery, [hashedPassword, user_id]);
  }
  if(email){
    //update email
    const updateEmailQuery = 'UPDATE Users SET Email = ? WHERE UserID = ?';
    await pool.query(updateEmailQuery, [email, user_id]);
  }
  if(dob){
    //update dob
    const updateDobQuery = 'UPDATE Users SET DOB = ? WHERE UserID = ?';
    await pool.query(updateDobQuery, [dob, user_id]);
  }
  if(name){
    //update name
    const updateNameQuery = 'UPDATE Users SET Name = ? WHERE UserID = ?';
    await pool.query(updateNameQuery, [name, user_id]);
  }
  if(department){
    //update department
    const updateDepartmentQuery = 'UPDATE Student SET Department = ? WHERE UserID = ?';
    await pool.query(updateDepartmentQuery, [department, user_id]);
  }
  if(session){
    //update session
    const updateSessionQuery = 'UPDATE Student SET Session = ? WHERE UserID = ?';
    await pool.query(updateSessionQuery, [session, user_id]);
  }
  if(registration_no){
    //update registration_no
    const updateRegistrationNoQuery = 'UPDATE Student SET RegistrationNo = ? WHERE UserID = ?';
    await pool.query(updateRegistrationNoQuery, [registration_no, user_id]);
  }
  if(req.file){
    //update image
    const host = req.hostname;
    const filePath = `${req.protocol}://${host}:8000/${req.file.path}`;
    const updateImageQuery = 'UPDATE Users SET Image = ? WHERE UserID = ?';
    await pool.query(updateImageQuery, [filePath, user_id]);
  }
  res.json({ success: true, message: 'User updated successfully' });
}catch (error) {
  console.error('Error updating user:', error);
  res.status(200).json({ success: false, message: 'An error occurred while updating the user' });
}
});


// POST /api/users/delete-user
router.post('/delete-user', async (req, res) => {
  const { user_id } = req.body;
  if (!user_id) {
    return res.status(200).json({ success: false, message: 'User ID must be provided' });
  }
  try {
    const [user] = await pool.query('SELECT * FROM Users WHERE UserID = ?', [user_id]);
    if (user.length === 0) {
      return res.status(200).json({ success: false, message: 'User does not exist' });
    }
    const deleteUserQuery = 'DELETE FROM Users WHERE UserID = ?';
    await pool.query(deleteUserQuery, [user_id]);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(200).json({ success: false, message: 'An error occurred while deleting the user' });
  }
});


// POST /api/users/update-status
router.post('/update-status', async (req, res) => {
  const { user_id, status } = req.body;
  if (!user_id || !status) {
    return res.status(200).json({ success: false, message: 'User ID and status must be provided' });
  }
  try {
    const [user] = await pool.query('SELECT * FROM Users WHERE UserID = ?', [user_id]);
    if (user.length === 0) {
      return res.status(200).json({ success: false, message: 'User does not exist' });
    }
    const updateStatusQuery = 'UPDATE Users SET Status = ? WHERE UserID = ?';
    await pool.query(updateStatusQuery, [status, user_id]);
    res.json({ success: true, message: 'User status updated successfully' });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(200).json({ success: false, message: 'An error occurred while updating the user status' });
  }
});

// POST /api/users/update-role
router.post('/update-role', async (req, res) => {
  const { user_id, role_id } = req.body;
  if (!user_id || !role_id) {
    return res.status(200).json({ success: false, message: 'User ID and role ID must be provided' });
  }
  try {
    const [user] = await pool.query('SELECT * FROM Users WHERE UserID = ?', [user_id]);
    if (user.length === 0) {
      return res.status(200).json({ success: false, message: 'User does not exist' });
    }
    const updateRoleQuery = 'UPDATE Users SET RoleID = ? WHERE UserID = ?';
    await pool.query(updateRoleQuery, [role_id, user_id]);
    res.json({ success: true, message: 'User role updated successfully' });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(200).json({ success: false, message: 'An error occurred while updating the user role' });
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
router.post('/', verifyToken,async (req, res,next) => {
  // console.log('token');
  // var token = req.get('authorization');
  var user_id = req.userId;
  console.log(user_id);
  try {
    const [users] = await pool.query('SELECT * FROM Users WHERE  UserID = ?', [user_id]);
    if (users.length === 0) {
      return res.status(200).json({ success: false, message: 'User does not exists.' });
    }
    const user = users[0];
    // console.log(user);
    // Check if password is correct
    // const isPasswordValid = await bcryptjs.compare(password, user.Password);
    // if (!isPasswordValid) {
    //   return res.status(200).json({ success: false, message: 'Invalid username or password' });
    // }
    // Get user role
    const role = await getRoleById(user.RoleID);
    var registration_no='';
    var department='';
    var session='';
    var doctorDepartment;

    if(role==='student')
    {
      const [student] = await pool.query('SELECT * FROM Student WHERE UserID = ?', [user.UserID]);
      registration_no=student[0].RegistrationNo;
      department=student[0].Department;
      session=student[0].Session;
    }
    if(role==='doctor')
    {
      const [doctor] = await pool.query('SELECT * FROM Doctors WHERE UserID = ?', [user.UserID]);
      const [departmentName] = await pool.query('SELECT * FROM Department WHERE DepartmentID = ?', [doctor[0].DepartmentID]);
      doctorDepartment=departmentName[0];
    }
    const to_return={
      success: true, 
      message: 'Fetched',
      user: {
          user_id: user.UserID,
          email: user.Email,
          status: user.Status,
          gender:user.Sex,
          image: user.Image,
           dob: user.DOB, 
           role: role, 
           token: user.Token,
           name: user.Name,
           role_id: user.RoleID,
           otp: user.otp,
           registration_no: registration_no,
            department: department,
              session: session,
              doctor_department: doctorDepartment

           
    }
  };
    res.json(to_return);
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(200).json({ success: false, message: 'An error occurred while logging in' });
  }

});



router.post('/send-otp',  async (req, res) => {
  const {  email} = req.body;
 console.log(req.body);


  try {
    
    const [results] = await pool.execute('SELECT * FROM Users WHERE Email = ?', [email]);
    console.log(results);

    if (results.length === 0) {
      return res.status(200).json({success:false, message: 'User does not exists' });
    }

    const user = results[0];
   

    
    const randomBytes = crypto.randomBytes(2); // 2 bytes will give us a range up to 65535

    // Convert bytes to an integer
    const randomNumber = randomBytes[0] << 8 | randomBytes[1];
    
    // Ensure the random number is in the range of 1000 to 9999
    const min = 1000;
    const max = 9999;
    const otp = min + Math.floor(randomNumber / 65535 * (max - min + 1));

    const updateOtpQuery = 'UPDATE Users SET otp = ? WHERE Email = ?';

    await pool.query(updateOtpQuery, [otp, email]);

    // 3. Send the OTP to the user's email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "2003raselhossen@gmail.com",
        pass: "bxwt tify omgd tvsy",
      },
    });
    const mailOptions = {
      from: "2003raselhossen@gmail.com", // Replace with your sender email
      to: email,
      subject: "Password Reset Request",
      text: `Use this token to reset your password: ${otp}`, // or include reset link with token
    };

  await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'OTP sent successfully' ,otp:otp});
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(200).json({ success: false, message: 'An error occurred while sending OTP' });
  }
});

router.post('/verify-email', async (req, res) => {
  const { email } = req.body;
  try{
  const randomBytes = crypto.randomBytes(2); // 2 bytes will give us a range up to 65535

  // Convert bytes to an integer
  const randomNumber = randomBytes[0] << 8 | randomBytes[1];
  
  // Ensure the random number is in the range of 1000 to 9999
  const min = 1000;
  const max = 9999;
  const otp = min + Math.floor(randomNumber / 65535 * (max - min + 1));
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "2003raselhossen@gmail.com",
      pass: "bxwt tify omgd tvsy",
    },
  });
  const mailOptions = {
    from: "2003raselhossen@gmail.com", // Replace with your sender email
    to: email,
    subject: "Password Reset Request",
    text: `Use this token to reset your password: ${otp}`, // or include reset link with token
  };

await transporter.sendMail(mailOptions);
  res.json({ success: true, message: 'OTP sent successfully' ,otp:otp});
}
catch (error) {
  console.error('Error sending OTP:', error);
  res.status(200).json({ success: false, message: 'An error occurred while sending OTP' });
}

  
});

// reset password
router.post('/reset-password', async (req, res) => {
  const { email, current_pass,confirm_pass } = req.body;
  if (!email || !current_pass) {
    return res.status(200).json({ success: false, message: 'Email and password must be provided' });
  }
  try {
    // Check if user exists
    const [users] = await pool.query('SELECT * FROM Users WHERE Email = ?', [email]);
    if (users.length === 0) {
      return res.status(200).json({ success: false, message: 'User does not exist' });
    }
    if(current_pass!==confirm_pass)
    {
      return res.status(200).json({ success: false, message: 'Password does not match' });
    }
    const hashedPassword = await bcryptjs.hash(current_pass, 10);
    const updatePasswordQuery = 'UPDATE Users SET Password = ? WHERE Email = ?';
    await pool.query(updatePasswordQuery, [hashedPassword, email]);
    res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(200).json({ success: false, message: 'An error occurred while resetting password' });
  }
});

//login
router.post('/login', async (req, res) => {
  const { password ,email} = req.body;
 
  if(!password)
  {
    return res.status(200).json({ success: false, message: 'Password is missing' });
  }
  if( !email){
    return res.status(200).json({ success: false, message: 'User name or email is missing' });
  }
  try {
    // Check if user exists
    const [users] = await pool.query('SELECT * FROM Users WHERE  Email = ?', [email]);
    if (users.length === 0) {
      return res.status(200).json({ success: false, message: 'User does not exists.' });
    }
    const user = users[0];
    console.log(user);
    // Check if password is correct
    const isPasswordValid = await bcryptjs.compare(password, user.Password);
    if (!isPasswordValid) {
      return res.status(200).json({ success: false, message: 'Invalid username or password' });
    }
    // Get user role
    const role = await getRoleById(user.RoleID);
    var registration_no='';
    var department='';
    var session='';
    var doctorDepartment;

    if(role==='student')
    {
      const [student] = await pool.query('SELECT * FROM Student WHERE UserID = ?', [user.UserID]);
      registration_no=student[0].RegistrationNo;
      department=student[0].Department;
      session=student[0].Session;
    }
    if(role==='doctor')
    {
      const [doctor] = await pool.query('SELECT * FROM Doctors WHERE UserID = ?', [user.UserID]);
      const [departmentName] = await pool.query('SELECT * FROM Department WHERE DepartmentID = ?', [doctor[0].DepartmentID]);
      doctorDepartment=departmentName[0];
    }
    res.cookie('token', user.Token, {
      httpOnly: true, // Important: This makes the cookie inaccessible to client-side scripts
      secure: true, // Recommended: Send the cookie only over HTTPS
      sameSite: 'strict', // Prevents the browser from sending this cookie along with cross-site requests
  });
    const to_return={
      success: true, 
      message: 'Login successful',
       user: {
          user_id: user.UserID,
          email: user.Email,
          status: user.Status,
          gender:user.Sex,
          image: user.Image,
           dob: user.DOB, 
           role: role, 
           token: user.Token,
           name: user.Name,
           role_id: user.RoleID,
           otp: user.otp,
           registration_no: registration_no,
            department: department,
              session: session,
              doctor_department: doctorDepartment

           
    }
  };
    res.json(to_return);
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(200).json({ success: false, message: 'An error occurred while logging in' });
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

//get doctors 

router.get('/get-doctors', async (req, res) => {
  try {
    const [doctors1] = await pool.query(`
    SELECT 
        d.DoctorID,
        u.Name AS DoctorName,
        dept.Name AS DepartmentName,
        u.Email
    FROM Users u 
    JOIN Doctors d ON d.UserID = u.UserID
    JOIN Department dept ON d.DepartmentID = dept.DepartmentID
    ORDER BY d.DoctorID;
`);
console.log(doctors1);

    
    const [doctors] = await pool.query(`
    SELECT 
    d.DoctorID,
    u.Name AS DoctorName,
    u.Email,
    dept.Name AS DepartmentName,
    dr.DutyID,
    s.SlotID,
    s.StartTime,
    s.EndTime
FROM Doctors d
JOIN Users u ON d.UserID = u.UserID
JOIN Department dept ON d.DepartmentID = dept.DepartmentID
LEFT JOIN DutyRoster dr ON d.DoctorID = dr.DoctorID
LEFT JOIN DoctorSlot ds ON dr.DutyID = ds.DutyID
LEFT JOIN Slot s ON ds.SlotID = s.SlotID
ORDER BY d.DoctorID, s.StartTime;

  
    `);
    // Process the result to format the doctors data with their duties
    const formattedDoctors = doctors.reduce((acc, doc) => {
      if (!acc[doc.DoctorID]) {
        acc[doc.DoctorID] = {
          DoctorID: doc.DoctorID,
          Name: doc.Name,
          Email: doc.Email,
          DepartmentName: doc.DepartmentName,
          Duties: []
        };
      }
      if (doc.DutyID) {
        acc[doc.DoctorID].Duties.push({
          DutyID: doc.DutyID,
          SlotID: doc.SlotID,
          StartTime: doc.StartTime,
          EndTime: doc.EndTime
        });
      }
      return acc;
    }, {});
    res.json({ success: true, data: Object.values(formattedDoctors) });
  } catch (error) {
    console.error('Failed to fetch doctors:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});


export default router;
