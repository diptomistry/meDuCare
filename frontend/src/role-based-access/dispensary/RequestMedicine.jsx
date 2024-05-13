import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../auth/AuthContext';
function RequestMedicine() {
    const [medicines, setMedicines] = useState([]);
    const [selectedMedicine, setSelectedMedicine] = useState('');
    const [quantity, setQuantity] = useState('');
    const {user} = useAuth();
    const resetForm = () => {
        setSelectedMedicine('');
        setQuantity('');
    };


    useEffect(() => {
        axios.get('http://localhost:8000/api/get-medicines')
            .then(response => setMedicines(response.data.data))
            .catch(error => console.error('Error fetching medicines:', error));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/request-medicine', {
                medicineId: selectedMedicine,
                quantity:quantity,
                requestBy:user.user_id
            });
            alert(response.data.message);
            resetForm();
        } catch (error) {
            console.error('Error requesting stock:', error);
            alert('Failed to submit stock request.');
        }
    };

    return (
        <div className="flex-col justify-center items-center max-w-md mx-auto my-10 p-5 bg-white shadow-lg rounded">
            <h1 className="text-lg font-bold mb-4">Request Medicine Stock</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Medicine:</label>
                    <select
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={selectedMedicine}
                        onChange={e => setSelectedMedicine(e.target.value)}
                        required
                    >
                        <option value="">Select Medicine</option>
                        {medicines.map(medicine => (
                            <option key={medicine.MedicineID} value={medicine.MedicineID}>
                                {medicine.Name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Quantity:</label>
                    <input
                        type="number"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                        min="1"
                        required
                    />
                </div>
                <button type="submit" className="text-sm bg-backgroundColor hover:bg-hoverColor text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Submit Request
                </button>
            </form>
        </div>
    );
}

export default RequestMedicine;
