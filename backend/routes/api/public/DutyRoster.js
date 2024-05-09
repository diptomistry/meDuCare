import express from 'express';
import pool from '../../database.js'; // Ensure correct import path
import fs from 'fs';
import { promisify } from 'util';
import multer from 'multer';
import path from 'path';

const router = express.Router();

router.post('/duty-roster', async (req, res) => {
    const {doctorId,slotId} = req.body;

    try {
        const result = await pool.query('INSERT INTO DutyRoster SET ?', { DoctorID: doctorId});
        const [resultSetHeader] = result;
        const dutyRosterId = resultSetHeader.insertId;
        console.log(dutyRosterId);
        const dutyRosterSlotResult = await pool.query('INSERT INTO DoctorSlot SET ?', { DutyID: dutyRosterId, SlotID: slotId });
        res.status(200).json({ success: true, message: 'Duty roster created successfully', dutyRosterId: result.insertId });
    } catch (error) {
        console.error('Failed to create duty roster:', error);
        res.status(200).json({ success: false, message: error.message });
    }
}
);

router.get('/get-duty-roster', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT
                DutyRoster.DutyID,
                Doctors.DoctorID,
                Users.Name AS DoctorName,
                Slot.SlotID,
                Slot.StartTime,
                Slot.EndTime,
                Department.Name AS DepartmentName
            FROM DutyRoster
            JOIN Doctors ON DutyRoster.DoctorID = Doctors.DoctorID
            JOIN Users ON Doctors.UserID = Users.UserID
            JOIN DoctorSlot ON DutyRoster.DutyID = DoctorSlot.DutyID
            JOIN Slot ON DoctorSlot.SlotID = Slot.SlotID
            JOIN Department ON Doctors.DepartmentID = Department.DepartmentID
            ORDER BY DutyRoster.DutyID ASC;
        `);
        res.json({ success: true, dutyRoster: rows });
    } catch (error) {
        console.error('Failed to fetch duty roster:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});



router.post('/create-slot', async (req, res) => {
    
    const {startTime,endTime,selectedDays} = req.body;
   

   
    
    try{
        const result = await pool.query('INSERT INTO Slot SET ?', { StartTime: startTime, EndTime: endTime });
        console.log(result);
        const [resultSetHeader] = result;

        // Now you can access the insertId which is a property of resultSetHeader
        const slotId = resultSetHeader.insertId;
        console.log("Inserted Slot ID:", slotId);
        for (const day of selectedDays) {
            const dayInsertResult = await pool.query('INSERT INTO SlotDay SET ?', { SlotID: slotId, Day: day });
        }
       

        res.status(200).json({ success: true, message: 'Slot created successfully' });
    } catch (error) {
        console.error('Failed to create slot:', error);
        res.status(200).json({ success: false, message: error.message });
    }
}  );

router.get('/slots', async (req, res) => {
    try {
        const [rows] = await pool.query(`
        SELECT 
            Slot.SlotID,
            Slot.StartTime,
            Slot.EndTime,
            SlotDay.Day
        FROM Slot
        JOIN SlotDay ON Slot.SlotID = SlotDay.SlotID
        ORDER BY Slot.SlotID ASC;
    `);
    
    const slots = {};
    for (const row of rows) {
        if (!slots[row.SlotID]) {
            slots[row.SlotID] = {
                SlotID: row.SlotID,
                StartTime: row.StartTime,
                EndTime: row.EndTime,
                Days: []
            };
        }
        slots[row.SlotID].Days.push(row.Day);
    }
    
    const slotsArray = Object.values(slots);
    res.status(200).json({success:true,slots:slotsArray});
    } catch (error) {
        console.error('Failed to fetch slots:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});


export default router;