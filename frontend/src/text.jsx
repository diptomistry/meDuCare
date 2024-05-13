import { TypeAnimation } from "react-type-animation";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import Marquee from "react-fast-marquee";
import homeImage from '../assets/img/homeImg.svg';
import { Link } from "react-scroll";
import Button from "../layouts/Button";
import { Meteors } from "../animation/home/Meteors";

const Home = () => {
  
  const [notices, setNotices] = useState([]);
  const [slides, setSlides] = useState([
    { url: 'https://tds-images.thedailystar.net/sites/default/files/images/2021/10/03/du_medical_center.jpg' }
  ]);
  const apiUrl = 'http://localhost:8000/api/public/photo-gallery';

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
  }, []); 


  const breakingNewsText = "Breaking News: Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // Handle potential errors and loading states
  const isLoading = slides.length === 0; // Check if slides haven't been populated yet
  const error = null; // Placeholder for potential error message

  return (
    <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 text-white">
        
      <div class="grid  max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
  
        <div class=" lg:col-span-7 ">
        
          
          <div className="relative shadow-xl bg-backgroundColor/50 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
      

          <h1 className="font-bold text-xl text-white mb-4 relative z-50">
          Shahid Buddhijibe Dr. Muhammad Mortaza Medical Centre
          </h1>

          <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
          Excellent health service to students, teachers and staffs of the University of Dhaka and also family members of the teachers and staffs.
          </p>

          <Link
              to="photo-gallery"
              spy={true}
              smooth={true}
              duration={500}
              className=" inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-brightColor hover:bg-hoverColor cursor-pointer"
            >
                Photo Gallery
                <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </Link>
          {/* Meaty part - Meteor effect */}
          <Meteors number={20} />
        </div>
          
            
            
           
        </div>
        
      
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img className="" src={homeImage} alt="image"/>
           
        </div>   
                  
    </div>
    <div className="mt-2 bg-backgroundColor text-md md:text-xl text-red-700 py-3 px-1 flex items-center rounded-md relative">
      {/* Left border */}
      <div className="absolute inset-y-0 left-0 w-2  bg-gray-700 rounded-lg"></div>
      {/* Right border */}
      <div className="absolute inset-y-0 right-0 w-2  bg-gray-700 rounded-lg"></div>
      {/* Main content */}
      <div className="flex-grow">
        <Marquee speed={100}>
        {notices
              .filter((notice) => notice.MainPage) // Filter notices based on isMainpage property
              .map((notice) => (
                <div key={notice.NoticeID} className="px-2 ">
                  <span className="text-white flex">
                    <div className="rounded-full bg-black h-5 w-5 mt-2 mr-1 "></div>
                    {notice.Title}
                  </span>
                </div>
              ))}
        </Marquee>
      </div>
    </div>
   
   
   
    </div>
);
}
export default Home;