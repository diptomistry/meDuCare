import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit,FaTrash } from 'react-icons/fa';
import DeleteConfirmationModal from './DeleteConfirm';
import EditMedicineModal from './EditMedicine';
import { useAuth } from '../../auth/AuthContext';
function ShowMedicines() {
    const [medicines, setMedicines] = useState([]);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sort, setSort] = useState('Name');
    const {user} =useAuth();
    const [currentMedicine, setCurrentMedicine] = useState(null);
    
    const canEditOrDelete = user.role === 'admin' || user.role === 'senior_officer';
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEditMedicine, setCurrentEditMedicine] = useState({});

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const handleSave = async (id, updatedData) => {
        try {
            await axios.put(`http://localhost:8000/api/edit-medicine/${id}`, updatedData);
            fetchMedicines();
            setIsEditModalOpen(false);
        } catch (error) {
            console.error('Failed to update medicine:', error);
        }
    };
    useEffect(() => {
        fetchMedicines();
    }, [page, sort]);

    const fetchMedicines = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/get-medicines?page=${page}&limit=${limit}&sort=${sort}`);
            setMedicines(response.data.data);
        } catch (error) {
            setError('Failed to fetch medicines');
            console.error('Error fetching medicines:', error);
        }
    };

    const handleDelete = async (medicineId) => {
       
        try {
            await axios.delete(`http://localhost:8000/api/delete-medicine/${medicineId}`);
            fetchMedicines();  // Refresh list after deletion
        } catch (error) {
            console.error('Error deleting medicine:', error);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="max-w-4xl mx-auto my-10 p-5 bg-white rounded-lg shadow-sm">
            <h1 className="text-lg font-bold mb-5 text-center sm:text-md text-backgroundColor">All Medicines</h1>
            {error ? <p className="text-center text-red-500">{error}</p> : (
                <div className="space-y-3">
                    {medicines.map(medicine => (
                        <div key={medicine.MedicineID} className="p-4 bg-white rounded-lg shadow flex flex-col md:flex-row justify-between items-center">
                            <div>
                                <h2 className="text-xl font-semibold text-backgroundColor">{medicine.Name}</h2>
                                <p className="text-sm text-gray-600">Description: {medicine.Description}</p>
                                <p className="text-sm text-gray-600">Price: ${medicine.Price}</p>
                                <p className="text-sm text-gray-600">Stock: {medicine.StockQuantity}</p>
                            </div>
                           {canEditOrDelete && <div>
                                <button onClick={() => {
                                  
                                    setCurrentMedicine(medicine);
                                    setIsModalOpen(true);
                                }} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                   <FaTrash/>
                                </button>
                                <button onClick={() => {
                        setCurrentEditMedicine(medicine);
                        setIsEditModalOpen(true);
                    }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
                                <FaEdit></FaEdit>
                                </button>
                            </div>}
                        </div>
                    ))}
                </div>
            )}
          
           <div className="fixed inset-x-0 bottom-0 p-4 bg-white ml-5">
    <div className="flex justify-center">
        <button onClick={() => setPage(page - 1)} disabled={page === 1} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold text-md py-2 px-4 rounded-l">
            Prev
        </button>
        <button onClick={() => setPage(page + 1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 text-md font-bold py-2 px-4 rounded-r">
            Next
        </button>
    </div>
    <DeleteConfirmationModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={() => handleDelete(currentMedicine?.MedicineID)}
                itemName={currentMedicine?.Name}
            />
             <EditMedicineModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleSave}
                medicine={currentEditMedicine}
            />
</div>

        </div>
    );
}

export default ShowMedicines;
