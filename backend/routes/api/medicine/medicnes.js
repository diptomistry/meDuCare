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
        const [appointments] = await pool.query('SELECT * FROM Appointments');
        if (appointments.length === 0) {
            return res.status(404).json({ success: false, message: 'No appointments found' });
        }
        res.status(200).json({ success: true, data: appointments });
    } catch (error) {
        console.error('Error retrieving appointments:', error);
        res.status(500).json({ success: false, message: 'Failed to retrieve appointments' });
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