import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {FaEdit, FaTrashAlt} from 'react-icons/fa';

const NoticeManagement = () => {
    const [notices, setNotices] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [mainPage, setMainPage] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [date, setDate] = useState('');
    const [link, setLink] = useState('');
    const [noticeId, setNoticeId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [noticesPerPage] = useState(2);
    const indexOfLastNotice = currentPage * noticesPerPage;
const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);
const paginate = pageNumber => setCurrentPage(pageNumber);

const pageNumbers = [];
for (let i = 1; i <= Math.ceil(notices.length / noticesPerPage); i++) {
    pageNumbers.push(i);
}

const renderPageNumbers = pageNumbers.map(number => (
    <button key={number} onClick={() => paginate(number)} className="bg-backgroundColor text-white px-4 py-2 border rounded-full mr-2">
        {number}
    </button>
));

  
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
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('mainPage', mainPage? 1 : 0);
      formData.append('isAdmin', isAdmin? 1 : 0);
      formData.append('date', date); // You might want to add date input field back
      formData.append('link', link);

      if (image) formData.append('file', image);
      if(noticeId) formData.append('notice_id', noticeId  );
  
      const method = noticeId ? 'post' : 'post';  // Changed to 'put' for updates
      const url = noticeId ? `http://localhost:8000/api/update-notice/` : `http://localhost:8000/api/create-notice`;
  
      try {
          setIsLoading(true);
          const response = await axios({
              method: method,
              url: url,
              data: formData,
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
          setIsLoading(false);
          alert(response.data.message);
          fetchNotices();
          resetForm();
      } catch (error) {
          setIsLoading(false);
          console.error('Failed to process notice:', error);
          alert('Failed to process notice: ' + error.message);
      }
  };
  
  const resetForm = () => {
      setTitle('');
      setDescription('');
      setImage(null);
      setMainPage(false);
      setIsAdmin(false);
      setDate('');
      setLink('');
      setNoticeId(null);
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
        setIsAdmin(notice.isAdmin);
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
  className={`textarea  border w-full mb-4 rounded-md p-2`}
/>
<input
  type="file"
  onChange={(e) => setImage(e.target.files[0])}
  className="mt-1 p-2 border rounded-md w-full"
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
        <div className="w-full lg:w-1/2 px-4 pb-4">
            {currentNotices.length > 0 ? (
                currentNotices.map((notice) => (
                    <div key={notice.NoticeID} className="flex items-center p-4 bg-gray-100 text-gray-800 mb-3 border-b border-gray-200">
                        <img src={notice.Image} alt="Notice" className="w-24 h-24 object-cover rounded-md mr-4" />
                        <div className="flex-grow">
                            <div className='flex items-center mr-2'>
                            <h3 className="text-xl font-semibold  mr-2 text-backgroundColor">{notice.Title}</h3>
                                {notice.isAdmin===0 && notice.MainPage===1 && <span className="bg-red-500 text-white px-2 py-1 rounded-md text-sm mr-3">Urgent</span>}
                                {notice.isAdmin===1 && notice.MainPage===0 && <span className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm">Cheif Medical Officer</span>}
                                {notice.isAdmin===0 && notice.MainPage===0 && <span className="bg-green-500 text-white px-2 py-1 rounded-md text-sm">Health Tips</span>}
                               
                            </div>
                            <p className="text-gray-600">{notice.Description}</p>
                            <div className="flex items-center justify-between mt-4">
                                {notice.Link && <a href={notice.Link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">Link</a>}
                                <div className='flex items-center'>
                                    <FaEdit onClick={() => handleEditClick(notice)} className="p-2 text-blue-500 hover:text-blue-700 ml-2" size="2em" />
                                    <FaTrashAlt onClick={() => handleDeleteNotice(notice.NoticeID)} className="p-2 text-red-500 hover:text-red-700" size="2em" />
                                </div>
                                <span className="text-sm text-gray-500">{new Date(notice.Date).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No notices available.</p>
            )}
            <div className="flex justify-center mt-4">
                {renderPageNumbers}
            </div>
        </div>
    </div>
      
    );
};

export default NoticeManagement;
