import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCircle, FaTimes } from 'react-icons/fa';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const PhotoUpload = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null); // Store the pending delete ID
  const [upload, setUpload] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [photos, setPhotos] = useState([]);
  const apiUrl = 'http://localhost:8000/api/public/photo-gallery';
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(apiUrl);
        setPhotos(response.data.photos);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUpload(true);

      setDialogMessage(response.data.message);
     
      setTimeout(() => {
        setUpload(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error uploading photo:', error);
      setUpload(true);

      setDialogMessage(response.data.message);
     
      setTimeout(() => {
        setUpload(false);
      }, 3000);
      //close after some time 
    
    }
    finally
    {
      setTitle('');
      setFile(null);
      window.location.reload();
    }
  };
  const handleDelete = (photoId) => {
    setDialogMessage('Are you sure you want to delete this photo?');
    setPendingDelete(photoId);
    setOpenDialog(true);
  };
  const executeDelete = async () => {
    if (pendingDelete) {
      try {
        const response = await axios.delete(`${apiUrl}/${pendingDelete}`);
        if (response.data.success) {
          setPhotos(photos.filter(photo => photo.PhotoID !== pendingDelete));
          setDialogMessage('Photo deleted successfully.');
        } else {
          setDialogMessage('Failed to delete photo.');
        }
        setOpenDialog(false);  // Close the dialog after the operation
        setPendingDelete(null);
      } catch (error) {
        console.error('Error during deletion:', error);
        setDialogMessage('Deletion failed: ' + error.message);
        setOpenDialog(false);  // Close the dialog after the operation
        setPendingDelete(null);
      }
    }
  };
  const confirmDeleteFunc = () => {
    setOpenDialog(false);  // Close the dialog before executing deletion to avoid multiple clicks
    executeDelete();       // Call the delete function
  };
 
  return (
    <div className="lg:flex md:columns-2 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex-1 p-4">
        <h2 className="text-2xl mb-4">Upload Photo</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">
              Choose a file:
            </label>
            <input type="file" id="file" onChange={handleFileChange} className="mt-1" />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Upload
          </button>
        </form>
      </div>
      <div className="flex-3 p-4">
        <h2 className="text-2xl mb-4">Gallery</h2>
        <div className="grid grid-cols-3 gap-4">
          {photos.length === 0 && <p>No photos available</p>}
          {photos.map(photo => (
            <div key={photo.PhotoID} className="relative rounded-lg overflow-hidden shadow-md">
              <button
                onClick={() => handleDelete(photo.PhotoID)}
                className="absolute right-2 top-2 bg-red-500 text-white p-1 rounded-full focus:outline-none hover:bg-red-700"
                aria-label="Delete photo"
              >
                <FaTimes />
              </button>
              <img src={photo.Image} alt={photo.Title} className="w-full h-auto" />
              <div className="p-4">
                <p className="text-lg font-medium">{photo.Title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dialog Component to Show Messages */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <div id="alert-dialog-description">{dialogMessage}</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmDeleteFunc} color="primary">
            Confirm
          </Button>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={upload}
        
        onClose={() => {
          setUpload(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
        <DialogContent>
            <div id="alert-dialog-description">{dialogMessage}</div>
        
        </DialogContent>
        <DialogActions>
        
          <Button color="primary" autoFocus onClick={()=>{
            setUpload(false);
          }}>
            Close
          </Button>
          
      
        
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PhotoUpload;