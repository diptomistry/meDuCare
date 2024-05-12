import React from 'react'
import img from '../assets/img/cheifOfficer.png'
import { useEffect,useState } from 'react'
import axios from 'axios'

const ShortNote = () => {
  const [notices, setNotices] = useState([]);
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        console.log('fetching notices');
        const response = await axios.get('http://localhost:8000/api/get-notices');
        const fetchedNotices = response.data.data;
        console.log('fetched notices:', fetchedNotices);
        setNotices(fetchedNotices);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };
    fetchNotices();
  } , []);
  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-between items-center lg:px-32 px-5 pt-24 lg:pt-16 gap-5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="md:w-1/3">
            <img
                src={img}
          
              alt="Vice Chancellor"
              className="rounded-lg shadow-lg"
            />
          </div>
          {notices.filter(notice => notice.isAdmin === 1).map(notice => (
          <div className="md:w-2/3 md:ml-8 mt-6 md:mt-0">
            <h2 className="text-2xl font-bold mb-4">Message from the Cheif Officer</h2>
          

            <p className="mb-4">
            
          
                 <h1>{notice.Title}</h1>
               
            
            
            </p>
            <p className="mb-4">
              
            
                {notice.Description}
            </p>
            <h3 className="text-backgroundColor cursor-pointer hover:text-[#ade9dc] transition duration-300 ease-in-out">
        Read more
      </h3>
   
          </div>
           ))}
        </div>
      </div>
    </div>
  )
}

export default ShortNote