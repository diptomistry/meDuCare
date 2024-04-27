import express from 'express';
import pool from '../../database.js'; // Ensure correct import path

const router = express.Router();

// Create notice
router.post('/create-notice', async (req, res) => {
    const { title, description, image, mainPage, isAdmin, date, link } = req.body;
    //today date
    var today = new Date();
    // Prepare the notice data according to your table structure
    const noticeData = {
        Title: title,
        Description: description,
        Image: image,
        MainPage: mainPage,
        IsAdmin: isAdmin,
        Date: today,
        Link: link
    };
    try {
        const result = await pool.query('INSERT INTO Notices SET ?', noticeData);
        res.status(201).json({ success: true, message: 'Notice created successfully', noticeId: result.insertId });
    } catch (error) {
        console.error('Failed to create notice:', error);
        res.status(500).json({ success: false, message: error.message });
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
router.post('/update-notice', async (req, res) => {
    const { notice_id, title, description, image, mainPage, isAdmin, link } = req.body;
    if (!notice_id) {
        return res.status(200).json({ success: false, message: 'Notice ID is required' });
    }
    const noticeUpdate = {
        Title: title,
        Description: description,
        Image: image,
        MainPage: mainPage,
        IsAdmin: isAdmin,
        Link: link
    };
    try {
        const result = await pool.query('UPDATE Notices SET ? WHERE NoticeID = ?', [noticeUpdate, notice_id]);
        res.status(200).json({ success: true, message: 'Notice updated successfully' });
    } catch (error) {
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
