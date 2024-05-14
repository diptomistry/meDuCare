import React, { useState, useEffect } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, Button, TextField } from '@mui/material';
import { useAuth } from '../../auth/AuthContext';
const PrescriptionList = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [quantity, setQuantity] = useState('');
    const {user} = useAuth();
    const role = user.role;
    

    useEffect(() => {
        fetchPrescriptions();
    }, []);

    const fetchPrescriptions = async () => {
        const status = role==='doctor'?'Pending':'Prescribed';
        try {
            const response = await fetch('http://localhost:8000/api/get-prescriptions',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({status:status})
                }
            );
            if (!response.ok) {
                throw new Error('Failed to fetch prescriptions');
            }
            const data = await response.json();
            setPrescriptions(data.data);
        } catch (error) {
            console.error('Error fetching prescriptions:', error);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDispense = (medicineId) => {
        // Call API to dispense medicine with quantity
        console.log(`Dispense medicine with ID ${medicineId} and quantity ${quantity}`);
    };

    const handleReject = (medicineId) => {
        // Call API to reject medicine
        console.log(`Reject medicine with ID ${medicineId}`);
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Prescription List</h1>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Patient Name</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>After/Before</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Stock Quantity</TableCell>
                            <TableCell>Actions</TableCell>
                            <TableCell>Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {prescriptions
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((prescription, index) => (
                                <TableRow key={index}>
                                     <TableCell>{prescription.UserName}</TableCell>
                                    <TableCell>{prescription.Name}</TableCell>
                                    <TableCell>{prescription.Quantity}</TableCell>
                                    <TableCell>{prescription.Duration}</TableCell>
                                    <TableCell>{prescription.AfterBefore}</TableCell>
                                    <TableCell>{prescription.Description}</TableCell>
                                    <TableCell>${prescription.Price}</TableCell>
                                    <TableCell>{prescription.StockQuantity}</TableCell>
                                    
                                    <TableCell>
                                        <Button onClick={() => handleDispense(prescription.MedicineID)}>Dispense</Button>
                                        <Button onClick={() => handleReject(prescription.MedicineID)}>Reject</Button>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={prescriptions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};

export default PrescriptionList;
