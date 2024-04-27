import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NoticeManagement = () => {
    const [notices, setNotices] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [mainPage, setMainPage] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [date, setDate] = useState('');
    const [link, setLink] = useState('');
    const [noticeId, setNoticeId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch notices on component mount
    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/get-notices');
            setNotices(response.data.data);
        } catch (error) {
            console.error('Error fetching notices:', error);
            alert('Error fetching notices: ' + error.message);
        }
    };

    const handleCreateOrUpdateNotice = async (event) => {
        event.preventDefault();
        const method = noticeId ? 'post' : 'post'; // Consider using 'put' for updates
        const url = noticeId ? `http://localhost:8000/api/update-notice` : `http://localhost:8000/api/create-notice`;
        const payload = { notice_id: noticeId, title, description, image, mainPage, isAdmin, date, link };

        try {
            setIsLoading(true);
            const response = await axios[method](url, payload);
            setIsLoading(false);
            alert(response.data.message);
            fetchNotices();
            // Reset form
            setTitle('');
            setDescription('');
            setImage('');
            setMainPage(false);
            setIsAdmin(false);
            setDate('');
            setLink('');
            setNoticeId(null);
        } catch (error) {
            setIsLoading(false);
            console.error('Failed to process notice:', error);
            alert('Failed to process notice: ' + error.message);
        }
    };

    const handleDeleteNotice = async (id) => {
        if (!window.confirm('Are you sure you want to delete this notice?')) return;

        try {
            const response = await axios.post('http://localhost:8000/api/delete-notice', { notice_id: id });
            alert(response.data.message);
            fetchNotices();
        } catch (error) {
            console.error('Failed to delete notice:', error);
            alert('Failed to delete notice: ' + error.message);
        }
    };

    const handleEditClick = (notice) => {
        setNoticeId(notice.NoticeID);
        setTitle(notice.Title);
        setDescription(notice.Description);
        setImage(notice.Image);
        setMainPage(notice.MainPage);
        setIsAdmin(notice.IsAdmin);
        setDate(notice.Date);
        setLink(notice.Link);
    };

    return (
        <div class="container mx-auto px-4 flex flex-wrap justify-between">
        <div class="w-full lg:w-1/2 px-4 mb-4 lg:mb-0">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Manage Notices</h2>
          <form onSubmit={handleCreateOrUpdateNotice} class="mb-6">
          <input
  type="text"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  placeholder="Title"
  required
  className={`mt-1 p-2 mb-2 border rounded-md w-full`}
/>
<textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Description"
  required
  className={`textarea  bordered w-full mb-4 rounded-md p-2`}
/>
<input
  type="text"
  value={image}
  onChange={(e) => setImage(e.target.value)}
  placeholder="Image URL"
  className={`mt-1 p-2 border rounded-md w-full`}
/>
<input
  type="text"
  value={link}
  onChange={(e) => setLink(e.target.value)}
  placeholder="Link"
  className={`mt-1 p-2 border rounded-md w-full`}
/>
<label className="flex items-center space-x-2 mb-4">
  <input
    type="checkbox"
    checked={mainPage}
    onChange={(e) => setMainPage(e.target.checked)}
    className="checkbox checkbox-primary"
  />
  <span>Urgent Notice</span>
</label>


            <label class="flex items-center space-x-2 mb-4">
              <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} class="checkbox checkbox-primary" />
              <span>Cheif Medical Officer Note</span>
            </label>
            {/* <input type="date" value={date} onChange={(e) => setDate(e.target.value)} class="input input-bordered input-primary w-full mb-4" /> */}
           
            <button type="submit" disabled={isLoading} class="bg-backgroundColor text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
              {noticeId ? 'Update' : 'Create'} Notice
            </button>
          </form>
        </div>
      
        <div class="w-full lg:w-1/2 px-4 pb-4">
          {notices.length > 0 ? (
            notices.map((notice) => (
              <div key={notice.NoticeID} class="p-4 rounded shadow-md bg-gray-100 text-gray-800 mb-3 border-b border-gray-200">
                <h3 class="text-xl font-semibold">{notice.Title}</h3>
                <p class="text-gray-600">{notice.Description}</p>
                <div class="flex mt-4">
                  <button onClick={() => handleEditClick(notice)} class="btn btn-sm btn-info mr-2">Edit</button>
                  <button onClick={() => handleDeleteNotice(notice.NoticeID)} class="btn btn-sm btn-error">Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p class="text-gray-500">No notices available.</p>
          )}
        </div>
      </div>
      
    );
};

export default NoticeManagement;
