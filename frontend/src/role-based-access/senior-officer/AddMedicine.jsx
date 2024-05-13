import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../auth/AuthContext';

function AddMedicine() {
    const [name, setName] = useState('');
    
    const [expiryDate, setExpiryDate] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [message, setMessage] = useState('');
    const { user } = useAuth();
    const userId=user.user_id;
   
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/add-medicine', {
                name,
              
                expiryDate,
                description,
                price: parseFloat(price),
                addedBy: userId,
                stockQuantity: parseInt(stockQuantity),
            });
            setMessage(response.data.message);
             resetForm();
        } catch (error) {
            setMessage('Failed to add medicine.');
            console.error('There was an error!', error);
        }
    };
    const resetForm = () => {
        setName('');
       
        setExpiryDate('');
        setDescription('');
        setPrice('');
        setStockQuantity('');
        setTimeout(() => setMessage(''), 3000);
       
       
    }


    return (
        <div className="max-w-md mx-auto my-10 p-5 rounded-lg shadow-xl">
            <h1 className="text-lg font-bold mb-5 text-center sm:text-sm text-backgroundColor">Add New Medicine</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="name">Medicine Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary-600"
                        required
                    />
                </div>
               
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="expiryDate">Expiry Date:</label>
                    <input
                        type="date"
                        id="expiryDate"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary-600"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary-600"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary-600"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="stockQuantity">Stock Quantity:</label>
                    <input
                        type="number"
                        id="stockQuantity"
                        value={stockQuantity}
                        onChange={(e) => setStockQuantity(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary-600"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-backgroundColor text-white px-3 py-2 rounded-lg hover:bg-primary-700 transition duration-300">Add Medicine</button>
                {message && <p className="mt-3 text-center">{message}</p>}
            </form>
        </div>
    );
}

export default AddMedicine;
