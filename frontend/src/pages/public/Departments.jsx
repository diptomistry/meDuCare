import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCircle, FaEdit, FaTimes } from 'react-icons/fa';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const DepartmentsManage = () => {
  const [name, setName] = useState('');
    const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
const [editingDepartmentId, setEditingDepartmentId] = useState(null);

  const [departments, setDepartments] = useState([]);
  const apiUrl = 'http://localhost:8000/api/doctors/get-departments';
  const createDepartmentUrl = 'http://localhost:8000/api/doctors/create-department';
  const updateDepartmentUrl = 'http://localhost:8000/api/doctors/update-department';
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(apiUrl);
        console.log(response.data.data);
        setDepartments(response.data.data); 

      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);
  const handleEdit = (department) => {
    setName(department.Name);
    setDescription(department.Description);
    setEditingDepartmentId(department.DepartmentID);
    setIsEditing(true);
  };
  
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

    const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('department_id', editingDepartmentId);
    formData.append('description', description);
    if (file) formData.append('file', file);
  
    setUploading(true); // Indicate uploading state
  
    try {
      let response;
      if (isEditing) {
        // Send PUT request to update existing department
        response = await axios.post(updateDepartmentUrl, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log(response.data.message);
      } else {
        // Send POST request to create new department
        response = await axios.post(createDepartmentUrl, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
  
      setDialogMessage(response.data.message);
  
      setTimeout(() => {
        setUploading(false);
       window.location.reload();
      }, 3000);
    } catch (error) {
      console.error('Error saving department:', error);
      setDialogMessage('Error saving department: ' + error.message);
      setUploading(false);
    } finally {
      setName('');
      setDescription('');
      setFile(null);
      setIsEditing(false);
      setEditingDepartmentId(null);
    }
  };
  

  const handleDelete = (departmentId) => {
    setDialogMessage('Are you sure you want to delete this department?');
    setPendingDelete(departmentId);
    setOpenDialog(true);
  };

  const executeDelete = async () => {
    if (pendingDelete) {
      try {
        const response = await axios.delete(`http://localhost:8000/api/admin/delete-department/${pendingDelete}`);

        if (response.data.success) {
          setDepartments(departments.filter(department => department.DepartmentID !== pendingDelete)); // Assuming the data structure includes 'DepartmentID' property
          setDialogMessage('Department deleted successfully.');
        } else {
          setDialogMessage('Failed to delete department.');
        }

        setOpenDialog(false);
        setPendingDelete(null);
      } catch (error) {
        console.error('Error during deletion:', error);
        setDialogMessage('Deletion failed: ' + error.message);
        setOpenDialog(false);
        setPendingDelete(null);
      }
    }
  };

  const confirmDeleteFunc = () => {
    setOpenDialog(false); // Close the dialog before executing deletion to avoid multiple clicks
    executeDelete();
  };

return (
    <div>
        <div className="lg:flex md:columns-2 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex-1 p-4">
                <h2>{isEditing?'Update Department':'Create Department'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Department Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={handleNameChange}
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            About the department:
                        </label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={handleDescriptionChange}
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                            Department Image (Optional):
                        </label>
                        <input type="file" id="file" onChange={handleFileChange} className="mt-1" />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                        disabled={uploading} // Disable button while uploading
                    >
                        {uploading ? 'Uploading...' : isEditing?'Update Department':'Create Department'}
                    </button>
                </form>
            </div>
            <div className="flex flex-col p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Departments</h2>
                <ul className="list-none space-y-3">
                {departments.map((department) => (
  <li key={department.DepartmentID} className="flex justify-between items-center p-3 bg-white shadow rounded-lg">
    <div>
      <h3 className="text-lg font-semibold text-blue-700">{department.Name}</h3>
      <p className="text-sm text-gray-600">{department.Description}</p>
    </div>
    <div className='flex justify-center px-2 mr-2 mx-4 p-2'>

      <button onClick={() => handleEdit(department)} className="p-2 ml-2 rounded-full bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        <FaEdit/>
      </button>
      <button onClick={() => handleDelete(department.DepartmentID)} className="p-2 rounded-full bg-red-500 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
        <FaTimes />
      </button>
    </div>
  </li>
))}

                </ul>
            </div>
        </div>

        <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Confirm Action</DialogTitle>
            <DialogContent>
                <div id="alert-dialog-description">{dialogMessage}</div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDialog(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={confirmDeleteFunc} color="primary" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    </div>
)};
export default DepartmentsManage;
