import express from 'express';

import pool from '../../database.js'; // Import your database connection pool
import multer from 'multer';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from "nodemailer";
import path from 'path';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  });
  const upload = multer({ storage: storage });
import { Department } from '../../../models/allmodels.js';
import exp from 'constants';

// Create a new router
const router = express.Router();

// create department

router.post('/create-department', upload.single('file'), async (req, res) => {
    const { name, description } = req.body;
    var filePath;
    if(req.file){
        const host = req.hostname;
      filePath = `${req.protocol}://${host}:8000/${req.file.path}`;
    }
    const department = new Department(null, name, description, filePath);
    console.log(department)
    try {
        const result = await pool.query('INSERT INTO Department SET ?', department);
        res.status(200).json({success:true, message: 'Department created successfully' });
    } catch (error) {
        res.status(200).json({ success:false,message: error.message });
    }
}
);
//get all departments

router.get('/get-departments', async (req, res) => {
    try {
        const departments = await pool.query('SELECT * FROM Department');
        res.status(200).json({success:true, data: departments[0] });
    } catch (error) {
        res.status(200).json({ success:false,message: error.message });
    }
}
);
router.post('/update-department', upload.single('file'), async (req, res) => {
    const { department_id,name, description } = req.body;
    var filePath;
    if(req.file){
        const host = req.hostname;
      filePath = `${req.protocol}://${host}:8000/${req.file.path}`;
    } if(!department_id){
        return res.status(404).json({success:false, message: 'Department ID is required' });
    }
    //get old department
    const oldDepartment = await pool.query('SELECT * FROM Department WHERE departmentId = ?', department_id);
    if(oldDepartment[0].length === 0){
        return res.status(404).json({success:false, message: 'Department not found' });
    }


    const department = new Department(department_id, name, description, filePath);
   if(!req.file){
       department.image = oldDepartment[0][0].Image;
   }

    if(name){
        department.name = name;
    
    }
    if(description){
        department.description = description;
    }
    console.log(department)
    try {
        const result = await pool.query('UPDATE Department SET ? WHERE departmentId = ?', [department,department_id]);
        if(result.affectedRows === 0){
            return res.status(404).json({success:false, message: 'Department not found' });
        }
        res.status(200).json({success:true, message: 'Department updated successfully' });
    } catch (error) {
        res.status(200).json({ success:false,message: error.message });
    }
}
);
export default router;