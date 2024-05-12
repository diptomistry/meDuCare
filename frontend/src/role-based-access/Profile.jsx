import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';
import { FaUpload } from 'react-icons/fa';

function Profile() {
    const { user, setUser ,updateUser} = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        dob: '',
        newPassword: '',
        confirmNewPassword: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);  // To store the file object
    const [imagePreview, setImagePreview] = useState(user.image );

    useEffect(() => {
        setFormData({
            email: user.email,
            name: user.name,
            dob: user.dob ? user.dob.split('T')[0] : '',
            phone:user.phone
        });
    }, [user]);
   // console.log(user);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmNewPassword) {
            setMessage('New passwords do not match.');
            return;
        }

        const data = new FormData();
        data.append('user_id', user.user_id);
        data.append('email', formData.email);
        data.append('name', formData.name);
        data.append('dob', formData.dob);
        data.append('phone',formData.phone);
        if (formData.newPassword) {
            data.append('password', formData.newPassword);
        }
        if (image) {
            data.append('file', image);
        }

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:8000/api/users/update-user', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setMessage(response.data.message);
            updateUser(true);
            if (response.data.success) {
                setUser({ ...user, ...formData, image: imagePreview });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage(error.response.data.message);
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(''), 5000);
           
        }
    };


    return (
        <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold mb-3">Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center">
            {imagePreview ? (
                <img src={imagePreview} alt="Profile" className="w-24 h-24 rounded-full"/>
            ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                </div>
            )}
            <input 
                type="file" 
                name="profileImage" 
                onChange={handleImageChange} 
                className="hidden" 
                id="profileImageInput"
            />
            <button 
                type="button" 
                onClick={() => document.getElementById('profileImageInput').click()} 
                className="absolute bg-backgroundColor text-white rounded-full p-1"
            >
                <FaUpload/>
            </button>
        </div>
           
            <div className="flex justify-between gap-4">
                <div className="flex-1">
                    <label className="block mb-2">Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="p-2 border rounded w-full"/>
                </div>
                <div className="flex-1">
                    <label className="block mb-2">Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="p-2 border rounded w-full"/>
                </div>
            </div>
            <div className="flex justify-between gap-4">
                <div className="flex-1">
                    <label className="block mb-2">Date of Birth:</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="p-2 border rounded w-full"/>
                </div>
                <div className="flex-1">
                    <label className="block mb-2">Phone</label>
                    <input type="phone" name="phone" value={formData.phone} onChange={handleChange} className="p-2 border rounded w-full"/>
                </div>
            </div>
            <div className="flex justify-between gap-4">
            <div className="flex-1">
                    <label className="block mb-2">New Password:</label>
                    <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} className="p-2 border rounded w-full"/>
                </div>
                <div className='flex-1'>
                <label className="block mb-2">Confirm New Password:</label>
                <input type="password" name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleChange} className="p-2 border rounded w-full"/>
            </div>
            </div>
          
            <div className="flex justify-cent</div>er mt-4">
                <button type="submit" disabled={loading} className="bg-backgroundColor hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {loading ? 'Updating...' : 'Update Profile'}
                </button>
            </div>
        </form>
        {message && <p className="mt-3 text-red-500 text-center">{message}</p>}
    </div>
    
    );
}

export default Profile;
