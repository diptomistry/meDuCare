import React, { useState, useEffect } from 'react';

const EditMedicineModal = ({ isOpen, onClose, onSave, medicine }) => {
    const [name, setName] = useState(medicine.Name);
    const [entryDate, setEntryDate] = useState(medicine.EntryDate);
    const [expiryDate, setExpiryDate] = useState(medicine.ExpiryDate);
    const [description, setDescription] = useState(medicine.Description);
    const [price, setPrice] = useState(medicine.Price);
    const [stockQuantity, setStockQuantity] = useState(medicine.StockQuantity);
    console.log(medicine);

    // Populate form when medicine changes
    useEffect(() => {
        if (medicine) {
            setName(medicine.Name);
            setEntryDate(medicine.EntryDate);
            setExpiryDate(medicine.ExpiryDate);
            setDescription(medicine.Description);
            setPrice(medicine.Price);
            setStockQuantity(medicine.StockQuantity);
        }
    }, [medicine]);

    if (!isOpen) return null;

    const handleSubmit = () => {
        onSave(medicine.MedicineID, { name, entryDate, expiryDate, description, price, stockQuantity });
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
        <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full mx-auto">
                <h3 className="text-lg font-bold">Edit Medicine</h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>
                   <div className="w-full p-2 my-2 border border-gray-300 rounded">
    <input
        className="w-full px-2 py-1"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
    />
</div>
<div className="w-full p-2 my-2 border border-gray-300 rounded">
    <input
        type="date"
        className="w-full px-2 py-1"
        value={entryDate}
        onChange={e => setEntryDate(e.target.value)}
    />
</div>
<div className="w-full p-2 my-2 border border-gray-300 rounded">
    <input
        type="date"
        className="w-full px-2 py-1"
        value={expiryDate}
        onChange={e => setExpiryDate(e.target.value)}
    />
</div>
<div className="w-full p-2 my-2 border border-gray-300 rounded">
    <textarea
        className="w-full px-2 py-1"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
    />
</div>
<div className="w-full p-2 my-2 border border-gray-300 rounded">
    <input
        type="number"
        className="w-full px-2 py-1"
        value={price}
        onChange={e => setPrice(parseFloat(e.target.value))}
        placeholder="Price"
    />
</div>
<div className="w-full p-2 my-2 border border-gray-300 rounded">
    <input
        type="number"
        className="w-full px-2 py-1"
        value={stockQuantity}
        onChange={e => setStockQuantity(parseInt(e.target.value))}
        placeholder="Stock Quantity"
    />
</div>
<div className="flex justify-end space-x-2 mt-4">
    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
    <button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
</div>

                </form>
            </div>
        </div>
    );
};

export default EditMedicineModal;
