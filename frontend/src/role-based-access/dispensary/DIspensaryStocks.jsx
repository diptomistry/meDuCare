import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import { format, subDays } from 'date-fns';
import { useAuth } from '../../auth/AuthContext';
import { Stack } from '@mui/material';
import { PDFDownloadLink } from '@react-pdf/renderer';
import StockPDFDocument from './StockPDFDocument';// Assuming StockPDFDocument is in a separate file

function ViewStocks() {
    const [stocks, setStocks] = useState([]);
    const [startDate, setStartDate] = useState(format(subDays(new Date(), 3), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const { user } = useAuth();
    const canApprove = user.role === 'admin' || user.role === 'senior-officer';
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const initialStocks = stocks.length;

    useEffect(() => {
        fetchStocks();
    }, [startDate, endDate]);

    useEffect(() => {
        if(currentPage === 1) fetchStocks();
        setCurrentPage(1);
    }, [currentPage]);

    const fetchStocks = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/get-stocks?startDate=${startDate}&endDate=${endDate}`);
            setStocks(response.data.data); // Assume response.data.data contains an array of stocks
        } catch (error) {
            console.error('Error fetching stocks:', error);
        }
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const approveMedicine = async (stockId, status) => {
        try {
            const response = await axios.post('http://localhost:8000/api/approve-stock', { stockId, status });
            alert(response.data.message);
            fetchStocks(); // Refetch stocks to update the list
        } catch (error) {
            console.error('Error approving stock:', error);
            alert('Failed to approve stock request');
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = stocks.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="max-w-4xl mx-auto my-10 p-5 bg-white shadow-lg rounded">
            <h1 className="text-lg font-bold mb-4">Stocks and Medicines</h1>
            <div className="flex justify-between mb-4">
                <input
                    type="date"
                    className="shadow border rounded py-2 px-3 text-gray-700"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                />
                <input
                    type="date"
                    className="shadow border rounded py-2 px-3 text-gray-700"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow rounded">
                    <thead>
                        <tr className="w-full bg-gray-200">
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Stock Quantity</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Price</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Status</th>
                            {canApprove && <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Requested On</th>}
                            {canApprove && <th className="text-left py-3 px -4 uppercase font-semibold text-sm">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((medicine, index) => (
                            <tr key={medicine.MedicineID || index} className="text-gray-700">
                                <td className="text-left py-2 px-4 border-b border-gray-200">{medicine.Name}</td>
                                <td className="text-left py-2 px-4 border-b border-gray-200">{medicine.StockQuantity}</td>
                                <td className="text-left py-2 px-4 border-b border-gray-200">${medicine.Price}</td>
                                <td className="text-left py-2 px-4 border-b border-gray-200 text-green-500">{medicine.Status}</td>
                                {canApprove && (
                                    <td className="text-left py-2 px-4 border-b border-gray-200">{format(new Date(medicine.StockDate), 'yyyy-MM-dd')}</td>
                                )}
                                {canApprove && medicine.Status === 'Pending' && (
                                    <td className="text-left py-2 px-4 border-b border-gray-200">
                                        <button onClick={() => approveMedicine(medicine.StockID, 'Approved')}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 text-sm">
                                            Approve
                                        </button>
                                        <button onClick={() => approveMedicine(medicine.StockID, 'Rejected')}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm">
                                            Reject
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Stack spacing={2} className="mt-2 flex justify-center items-center">
                    <Pagination count={Math.ceil(stocks.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} hidePrevButton={true} />
                    <PDFDownloadLink className='underline hover:text-hoverColor' document={<StockPDFDocument stocks={stocks} />} fileName="stocks.pdf">
                        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
                    </PDFDownloadLink>
                </Stack>
            </div>
        </div>
    );
}

export default ViewStocks;
