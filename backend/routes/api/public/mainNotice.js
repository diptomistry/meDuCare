import express from 'express';
import pool from '../../database.js'; // Ensure correct import path
import fs from 'fs';
import { promisify } from 'util';
import multer from 'multer';
import path from 'path';


const unlinkAsync = promisify(fs.unlink); // Convert fs.unlink to a promise-based function
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

// Create notice
router.post('/create-notice', upload.single('file'), async (req, res) => {
    const { title, description, mainPage, isAdmin, date, link } = req.body;
    var filePath;
    if(req.file){
        const host = req.hostname;
        const protocol = req.protocol;
        // Ensure that this path matches how you serve static files
        filePath = `${protocol}://${host}:8000/${req.file.path}`;
        console.log(filePath);
    }
    //today date
    var today = new Date();
    // Prepare the notice data according to your table structure
    var noticeData = {
        Title: title,
        Description: description,
        Image: filePath,
        MainPage: mainPage,
        isAdmin: isAdmin,
        Date: today,
        Link: link
    };
   

    try {
        const result = await pool.query('INSERT INTO Notices SET ?', noticeData);
        res.status(201).json({ success: true, message: 'Notice created successfully', noticeId: result.insertId });
    } catch (error) {
        console.error('Failed to create notice:', error);
        res.status(200).json({ success: false, message: error.message });
    }
});

// Get all notices
router.get('/get-notices', async (req, res) => {
    try {
        const [notices, fields] = await pool.query('SELECT * FROM Notices');
        res.status(200).json({ success: true, data: notices });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update notice
router.post('/update-notice',upload.single('file'), async (req, res) => {
    var { notice_id, title, description, image, mainPage, isAdmin, link } = req.body;
    // console.log(req.body);
    if (!notice_id) {
        return res.status(200).json({ success: false, message: 'Notice ID is required' });
    }
    var filePath;
    if(req.file){
        const host = req.hostname;
        const protocol = req.protocol;
        // Ensure that this path matches how you serve static files
        filePath = `${protocol}://${host}:8000/${req.file.path}`;
        console.log(image);
    }
    if(link){
        if(!link.startsWith('http://') && !link.startsWith('https://')){
            link = 'http://' + link;
            console.log(link);
        }
    }
   
    console.log(mainPage, isAdmin);
    var noticeUpdate = {
        Title: title,
        Description: description,
        Image: filePath,
        MainPage: mainPage,
        isAdmin: isAdmin,
        Link: link
    };
    if(!filePath){
        delete noticeUpdate.Image;
    }
    try {
        const result = await pool.query('UPDATE Notices SET ? WHERE NoticeID = ?', [noticeUpdate, notice_id]);
        res.status(200).json({ success: true, message: 'Notice updated successfully' });
    } catch (error) {
        console.error('Failed to update notice:', error);
        res.status(200).json({ success: false, message: error.message });
    }
});

// Delete notice
router.post('/delete-notice', async (req, res) => {
    const { notice_id } = req.body;
    if (!notice_id) {
        return res.status(400).json({ success: false, message: 'Notice ID is required' });
    }
    try {
        const result = await pool.query('DELETE FROM Notices WHERE NoticeID = ?', notice_id);
        res.status(200).json({ success: true, message: 'Notice deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
