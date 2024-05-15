import express from 'express';
import pool from '../../database.js'; // Import your database connection pool
import moment from 'moment';
const router = express.Router();

router.post('/add-medicine', async (req, res) => {
    const { name, entryDate, expiryDate, description, price, addedBy, stockQuantity } = req.body;
console.log(req.body);
    if (!name  || !expiryDate || !price || !addedBy || !stockQuantity) {
        return res.status(200).json({ success: false, message: 'All fields must be provided' });
    }
const date = new Date();
    try {
        const result = await pool.query('INSERT INTO Medicines (Name, EntryDate, ExpiryDate, Description, Price, AddedBy, StockQuantity) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, date, expiryDate, description, price, addedBy, stockQuantity]);
        res.status(200).json({ success: true, message: 'Medicine added successfully', medicineId: result[0].insertId });
    } catch (error) {
        console.error('Failed to add medicine:', error);
        res.status(200).json({ success: false, message: 'Failed to add medicine' });
    }
});

router.post('/request-medicine', async (req, res) => {
    const { medicineId, quantity, requestBy } = req.body;

    if (!medicineId || !quantity || !requestBy) {
        return res.status(200).json({ success: false, message: 'All fields must be provided' });
    }

    try {
        await pool.query('INSERT INTO PharmacyStock (MedicineID, Quantity, StockDate, Status) VALUES (?, ?, NOW(), "Pending")', [medicineId, quantity]);
        res.status(200).json({ success: true, message: 'Medicine request submitted' });
    } catch (error) {
        console.error('Failed to request medicine:', error);
        res.status(200).json({ success: false, message: 'Failed to request medicine' });
    }
});
router.get('/get-stocks', async (req, res) => {
    const { startDate, endDate } = req.query;
    try{
        const [stocks] = await pool.query('SELECT * FROM PharmacyStock JOIN Medicines  on PharmacyStock.MedicineID=Medicines.MedicineID WHERE StockDate BETWEEN ? AND ?', [startDate, endDate]);
        if (stocks.length === 0) {
            return res.status(200).json({ success: false, message: 'No stocks found' });
        }
        console.log(stocks);
        res.status(200).json({ success: true, data: stocks });
    
    }
    catch(error){
        console.error('Error retrieving stocks:', error);
        res.status(200).json({ success: false, message: 'Failed to retrieve stocks' });
    }
}    
);
router.post('/approve-stock', async (req, res) => {
    const { stockId ,status} = req.body;

    if (!stockId) {
        return res.status(400).json({ success: false, message: 'Stock ID must be provided' });
    }

    try {
        if(status==='Approved'){
        await pool.query('UPDATE PharmacyStock SET Status = ? WHERE StockID = ?', [status,stockId]);
        res.status(200).json({ success: true, message: 'Stock request approved' });
        }
        else{
            const [result] = await pool.query('DELETE FROM PharmacyStock WHERE StockID = ?', [stockId]);
        if (result.affectedRows === 0) {
            return res.status(200).json({ success: false, message: 'Stock not found' });
        }
        res.json({ success: true, message: 'Stock deleted successfully' });
        }
    } catch (error) {
        console.error('Failed to approve stock:', error);
        res.status(500).json({ success: false, message: 'Failed to approve stock' });
    }
});
router.post('/book-appointment', async (req, res) => {
    const { userId, appointmentDateTime, concern } = req.body;

    if (!userId || !appointmentDateTime || !concern) {
        return res.status(400).json({ success: false, message: 'All fields must be provided' });
    }



    try {
        const result = await pool.query('INSERT INTO Appointments (UserID, AppointmentDateTime, Concern) VALUES (?, ?, ?)', [userId, appointmentDateTime, concern]);
        console.log(result[0].insertId);
        res.status(200).json({ success: true, message: `Appointment booked successfully.Your token is ${result[0].insertId}.Contact within 3 days.`, appointmentId: result[0].insertId ,token:result[0].insertId,status:'Pending'});

    } catch (error) {
        console.error('Failed to book appointment:', error);
        res.status(500).json({ success: false, message: 'Failed to book appointment' });
    }
});
router.get('/get-appointments', async (req, res) => {
    try {
        const [appointments] = await pool.query(`
            SELECT Appointments.*, appoinment_doctors.PrescriptionID, Users.Name AS UserName, Users.Email AS UserEmail, Users.DOB AS UserDOB, Users.Sex AS UserSex, Users.Phone AS UserPhone, Users.Image AS UserImage
            FROM Appointments
            INNER JOIN Users ON Appointments.UserID = Users.UserID
            LEFT JOIN appoinment_doctors ON Appointments.AppointmentID = appoinment_doctors.AppointmentID
        `);
        
        if (appointments.length === 0) {
            return res.status(404).json({ success: false, message: 'No appointments found' });
        }
        
        res.status(200).json({ success: true, data: appointments });
    } catch (error) {
        console.error('Error retrieving appointments:', error);
        res.status(500).json({ success: false, message: 'Failed to retrieve appointments' });
    }
});

router.post('/accept-appointment', async (req, res) => {
    var { appointmentId, doctorId } = req.body;
    
    console.log(req.body);

    //console.log(appointmentId);

    try {
//fund doctor id form user id by join on users table and get doctor id from doctors table
        //
        const [doctor] = await pool.query('SELECT * FROM Users JOIN Doctors ON Users.UserID = Doctors.UserID WHERE Users.UserID = ?', [doctorId]);
        //console.log(doctor);
        if (doctor.length === 0) {
            return res.status(200).json({ success: false, message: 'Doctor not found' });
        }
        doctorId=doctor[0].DoctorID;
        console.log(doctorId);

        // Check if the appointment exists and is pending
        const [appointment] = await pool.query('SELECT * FROM Appointments WHERE AppointmentID = ? AND Status = ?', [appointmentId, 'Pending']);
        
        if (appointment.length === 0) {
           // console.log(appointment);
            return res.status(200).json({ success: false, message: 'Appointment not found or already accepted' });
        }

        // Check if the appointment is already accepted by another doctor
        const [existingAppointment] = await pool.query('SELECT * FROM appoinment_doctors WHERE AppointmentID = ?', [appointmentId]);
        if (existingAppointment.length > 0) {
            return res.status(200).json({ success: false, message: 'Appointment already accepted by another doctor',prescription_id:existingAppointment[0].PrescriptionID });
        }

        // Update the appointment status to 'Accepted'
        await pool.query('UPDATE Appointments SET Status = ? WHERE AppointmentID = ?', ['Accepted', appointmentId]);

        // Insert the appointment into the appoinment_doctors table
    const[resultE]=    await pool.query('INSERT INTO appoinment_doctors (AppointmentID, DoctorID) VALUES (?, ?)', [appointmentId, doctorId]);
    // return user infos 
    const [user] = await pool.query('SELECT * FROM Users WHERE UserID = ?', [appointment[0].UserID]);
    //console.log(user);

        res.status(200).json({ success: true, message: 'Appointment accepted successfully' ,prescription_id:resultE.insertId, user:user[0]});
    } catch (error) {
        console.error('Failed to accept appointment:', error);
        res.status(200).json({ success: false, message: 'Failed to accept appointment' });
    }
});
router.post('/prescribe-medicines', async (req, res) => {
    const { appointmentId, doctorId, medicines, instructions, tests,prescription_id } = req.body;
    console.log(req.body);

    if (!appointmentId || !doctorId || !medicines || !instructions || !tests) {
        return res.status(200).json({ success: false, message: 'All fields must be provided' });
    }

    try {
       
       

        // Insert medicine prescriptions into MedicinePresription table
        for (const medicine of medicines) {
            const medicineResult = await pool.query('INSERT INTO MedicinePresription (MedicineID, Quantity, Duration, AfterBefore) VALUES (?, ?, ?, ?)', [medicine.medicineId, medicine.quantity, medicine.duration, medicine.afterBefore]);
            const medicinePrescriptionId = medicineResult[0].insertId;
            const prescriptionResult = await pool.query('INSERT INTO Prescriptions (PrescriptionID, MedicinePrescriptionID) VALUES (?, ?)', [prescription_id, medicinePrescriptionId]);
            const prescriptionId = prescriptionResult[0].insertId;

            // Insert entry into Prescriptions table
          //  await pool.query('INSERT INT ob97gO Prescriptions (PrescriptionID, MedicinePrescriptionID) VALUES (?, ?)', [prescriptionId, medicinePrescriptionId]);
        }

        // Update the status of the appointment to 'Prescribed'
        await pool.query('UPDATE Appointments SET Status = ? WHERE AppointmentID = ?', ['Prescribed', appointmentId]);
        //insert tests,medicines and instructions into prescription table
        await pool.query('UPDATE appoinment_doctors SET Tests = ?, Intructions = ? WHERE PrescriptionID = ?', [tests, instructions, prescription_id]); 
               res.status(200).json({ success: true, message: 'Medicines prescribed successfully' });
    } catch (error) {
        console.error('Failed to prescribe medicines:', error);
        res.status(500).json({ success: false, message: 'Failed to prescribe medicines' });
    }
});
router.get('/get-prescriptions/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        // Step 1: Join appoinment_doctors and Appointments to get appointments for the user
        const [userAppointments] = await pool.query(`
            SELECT appoinment_doctors.AppointmentID
            FROM appoinment_doctors
            INNER JOIN Appointments ON appoinment_doctors.AppointmentID = Appointments.AppointmentID
            WHERE Appointments.UserID = ?
        `, [userId]);

        if (userAppointments.length === 0) {
            return res.status(404).json({ success: false, message: 'No appointments found for this user' });
        }

        // Get appointment IDs from the results
        const appointmentIds = userAppointments.map(row => row.AppointmentID);

        // Step 2: Subquery to retrieve Prescription IDs for the user's appointments
        const subquery = `SELECT PrescriptionID FROM appoinment_doctors WHERE AppointmentID IN (?)`;

        // Step 3: Join Prescriptions, MedicinePresription, and Medicines
        const [prescriptions] = await pool.query(`
            SELECT Prescriptions.*, MedicinePresription.*, Medicines.*
            FROM Prescriptions
            INNER JOIN MedicinePresription ON Prescriptions.MedicinePrescriptionID = MedicinePresription.MedicinePrescriptionID
            INNER JOIN Medicines ON MedicinePresription.MedicineID = Medicines.MedicineID
            WHERE Prescriptions.PrescriptionID IN (${subquery})
        `, [appointmentIds]);

        return res.status(200).json({ success: true, data: prescriptions }); // Return prescriptions with related information
    } catch (error) {
        console.error('Error retrieving prescriptions:', error);
        return res.status(500).json({ success: false, message: 'Failed to retrieve prescriptions' });
    }
});

router.post('/get-prescriptions', async (req, res) => {
    const { status } = req.body;
    try {
        // Step 1: Select appointments based on the provided status
        const [appointments] = await pool.query(`
            SELECT Appointments.AppointmentID, Appointments.UserID
            FROM Appointments
            WHERE Appointments.Status = ?
        `, [status]);

        if (appointments.length === 0) {
            return res.status(404).json({ success: false, message: `No appointments found with status: ${status}` });
        }

        // Get appointment IDs and User IDs from the results
        const appointmentIds = appointments.map(row => row.AppointmentID);
        const userIds = appointments.map(row => row.UserID);

        // Step 2: Subquery to retrieve Prescription IDs for the filtered appointments
        const subquery = `SELECT PrescriptionID FROM appoinment_doctors WHERE AppointmentID IN (?)`;

        // Step 3: Join Prescriptions, MedicinePresription, Medicines, and Users
        const [prescriptions] = await pool.query(`
            SELECT Prescriptions.*, MedicinePresription.*, Medicines.*, Users.Name AS UserName, Users.Email AS UserEmail, Users.DOB AS UserDOB, Users.Sex AS UserSex, Users.Phone AS UserPhone, Users.Image AS UserImage
            FROM Prescriptions
            INNER JOIN MedicinePresription ON Prescriptions.MedicinePrescriptionID = MedicinePresription.MedicinePrescriptionID
            INNER JOIN Medicines ON MedicinePresription.MedicineID = Medicines.MedicineID
            INNER JOIN appoinment_doctors ON Prescriptions.PrescriptionID = appoinment_doctors.PrescriptionID
            INNER JOIN Appointments ON appoinment_doctors.AppointmentID = Appointments.AppointmentID
            INNER JOIN Users ON Appointments.UserID = Users.UserID
            WHERE Prescriptions.PrescriptionID IN (${subquery})
        `, [appointmentIds]);

        return res.status(200).json({ success: true, data: prescriptions }); // Return prescriptions with related information
    } catch (error) {
        console.error('Error retrieving prescriptions:', error);
        return res.status(500).json({ success: false, message: 'Failed to retrieve prescriptions' });
    }
});





router.post('/dispense-medicine', async (req, res) => {
    const { medicineId, quantity } = req.body;

    try {
        // Step 1: Retrieve medicine information
        const [medicine] = await pool.query('SELECT * FROM Medicines WHERE MedicineID = ?', [medicineId]);

        if (medicine.length === 0) {
            return res.status(404).json({ success: false, message: 'Medicine not found' });
        }

        // Step 2: Check stock availability
        const currentStock = medicine[0].StockQuantity;
        if (currentStock < quantity) {
            return res.status(400).json({ success: false, message: 'Insufficient stock' });
        }

        // Step 3: Update stock quantity
        const updatedStock = currentStock - quantity;
        await pool.query('UPDATE Medicines SET StockQuantity = ? WHERE MedicineID = ?', [updatedStock, medicineId]);
        //update appoinment status to completed
        await pool.query('UPDATE Appointments SET Status = ? WHERE AppointmentID = ?', ['Completed', medicineId]);

        return res.status(200).json({ success: true, message: 'Medicine dispensed successfully', updatedStock });
    } catch (error) {
        console.error('Error dispensing medicine:', error);
        return res.status(500).json({ success: false, message: 'Failed to dispense medicine' });
    }
});


//get appointment for a specific user
router.get('/get-appointments/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [appointments] = await pool.query('SELECT * FROM Appointments WHERE UserID = ?', [id]);
        if (appointments.length === 0) {
            return res.status(404).json({ success: false, message: 'No appointments found' });
        }
        res.status(200).json({ success: true, data: appointments });
    }
    catch (error) {
        console.error('Error retrieving appointments:', error);
        res.status(500).json({ success: false, message: 'Failed to retrieve appointments' });
    }
});

//create prescription
router.post('/create-prescription', async (req, res) => {
    const { appointmentId, prescription, doctorId } = req.body;

    if (!appointmentId || !prescription || !doctorId) {
        return res.status(400).json({ success: false, message: 'All fields must be provided' });
    }

    try {
        await pool.query('INSERT INTO Prescriptions (AppointmentID, Prescription, DoctorID) VALUES (?, ?, ?)', [appointmentId, prescription, doctorId]);
        res.status(200).json({ success: true, message: 'Prescription created successfully' });
    } catch (error) {
        console.error('Failed to create prescription:', error);
        res.status(500).json({ success: false, message: 'Failed to create prescription' });
    }
});


router.get('/get-medicines', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    try {
        const [results, fields] = await pool.query('SELECT * FROM Medicines LIMIT ?, ?', [offset, limit]);
        const [totalResults] = await pool.query('SELECT COUNT(*) AS count FROM Medicines');

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'No medicines found' });
        }

        res.status(200).json({
            success: true,
            data: results,
            totalPages: Math.ceil(totalResults[0].count / limit),
            currentPage: page
        });
    } catch (error) {
        console.error('Error retrieving medicines:', error);
        res.status(500).json({ success: false, message: 'Failed to retrieve medicines' });
    }
});
router.delete('/delete-medicine/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM Medicines WHERE MedicineID = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Medicine not found' });
        }

        res.json({ success: true, message: 'Medicine deleted successfully' });
    } catch (error) {
        console.error('Error deleting medicine:', error);
        res.status(500).json({ success: false, message: 'Failed to delete medicine' });
    }
});

router.put('/edit-medicine/:id', async (req, res) => {
    const { id } = req.params;
    var { name, entryDate, expiryDate, description, price, stockQuantity } = req.body;
     expiryDate = moment(expiryDate).format('YYYY-MM-DD HH:mm:ss');
     entryDate=moment(entryDate).format('YYYY-MM-DD HH:mm:ss');

    try {
        const [result] = await pool.query(
            'UPDATE Medicines SET Name = ?, EntryDate = ?, ExpiryDate = ?, Description = ?, Price = ?, StockQuantity = ? WHERE MedicineID = ?',
            [name, entryDate, expiryDate, description, price, stockQuantity, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Medicine not found or no new data provided' });
        }

        res.json({ success: true, message: 'Medicine updated successfully' });
    } catch (error) {
        console.error('Error updating medicine:', error);
        res.status(500).json({ success: false, message: 'Failed to update medicine' });
    }
});






export default router;