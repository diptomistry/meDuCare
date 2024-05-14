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
          Doctors.DoctorID,
          Users.Name AS DoctorName,
          Slot.SlotID,
          Slot.StartTime,
          Slot.EndTime,
          Department.Name AS DepartmentName,
          DATE(Slot.StartTime) AS SlotDate
        FROM DoctorSlot
        JOIN Doctors ON DoctorSlot.DoctorID = Doctors.DoctorID
        JOIN Users ON Doctors.UserID = Users.UserID
        JOIN Slot ON DoctorSlot.SlotID = Slot.SlotID
        JOIN Department ON Doctors.DepartmentID = Department.DepartmentID
        WHERE DATE(Slot.StartTime) BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 6 DAY)
        ORDER BY Doctors.DoctorID ASC, SlotDate ASC;
      `);
  
      const dutyRoster = rows.reduce((acc, row) => {
        const doctorIndex = acc.findIndex(doctor => doctor.DoctorID === row.DoctorID);
  
        if (doctorIndex === -1) {
          acc.push({
            DoctorID: row.DoctorID,
            DoctorName: row.DoctorName,
            Slots: [
              {
                SlotID: row.SlotID,
                StartTime: row.StartTime,
                EndTime: row.EndTime,
                DepartmentName: row.DepartmentName
              }
            ]
          });
        } else {
          acc[doctorIndex].Slots.push({
            SlotID: row.SlotID,
            StartTime: row.StartTime,
            EndTime: row.EndTime,
            DepartmentName: row.DepartmentName
          });
        }
  
        return acc;
      }, []);
  
      res.json({ success: true, dutyRoster });
    } catch (error) {
      console.error('Failed to fetch duty roster:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  });




//assign slot 
router.post('/assign-slot', async (req, res) => {
    const { doctorId, slotIds } = req.body;
    console.log(doctorId, slotIds);
    try {
    for(const slotId of slotIds){
   
    
        const [result] = await pool.query('INSERT INTO DoctorSlot (DoctorID, SlotID) VALUES (?, ?)', [doctorId, slotId]);
    }
    res.status(200).json({ success: true, message: 'Slot assigned successfully' });
    } catch (error) {
        console.log('Failed to assign slot:', error);
        res.status(500).json({ success:false,message: 'An error occurred while assigning the slot' });
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