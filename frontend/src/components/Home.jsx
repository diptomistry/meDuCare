import { TypeAnimation } from "react-type-animation";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import Marquee from "react-fast-marquee";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [notices, setNotices] = useState([]);
  const [slides, setSlides] = useState([
    { url: 'https://tds-images.thedailystar.net/sites/default/files/images/2021/10/03/du_medical_center.jpg' }
  ]);
  const apiUrl = 'http://localhost:8000/api/public/photo-gallery';

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        console.log('fetching photos');
        const response = await axios.get(apiUrl);
        const fetchedPhotos = response.data.photos;
        console.log('fetched photos:', fetchedPhotos);
        setSlides(fetchedPhotos.map((photo) => ({ url: photo.Image }))); // Combine default and fetched images
        console.log('slides:', slides);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };
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
    fetchPhotos();
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
    <div className="flex flex-col min-h-screen  lg:px-32 px-5  ">
      <div>
        {/* Display loading indicator or error message if necessary */}
        {isLoading && <p>Loading photos...</p>}
        {error && <p>Error fetching photos: {error.message}</p>}

        {/* Image carousel with error handling */}
        <div className='max-w-[1000px] h-[600px] md:h-[650px] w-full m-auto py-6 px-4 relative group ' style={{ marginTop: '5rem' }}>
          <div
            style={{ backgroundImage: isLoading || error ? 'none' : `url(${slides[currentIndex].url})` }} // Set background to 'none' if loading or error
            className='w-full h-full rounded-2xl bg-center bg-cover duration-500 flex justify-center items-center'
          >
            {isLoading || error ? ( // Display placeholder or error message within the image area
              <div className="text-center text-white">
                {isLoading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
              </div>
            ) : (
              <div className="w-full lg:w-4/5 space-y-5 mt-10 text-center">
                <TypeAnimation
                  sequence={[
                    "Welcome to Shahid Buddhijibe Dr. Muhammad Mortaza Medical Centre",
                    1000,
                    ''
                  ]}
                  className="text-4xl md:text-6xl text-white  "
                  cursor={false} // Keep the cursor visible during animation
                />
              </div>
            )}
          </div>
    {/* Left Arrow */}
    <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
      <BsChevronCompactLeft onClick={prevSlide} size={30} />
    </div>
    {/* Right Arrow */}
    <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
      <BsChevronCompactRight onClick={nextSlide} size={30} />
    </div>
    <div className='flex top-4 justify-center py-2'>
      {slides.map((slide, slideIndex) => (
        <div
          key={slideIndex}
          onClick={() => goToSlide(slideIndex)}
          className='text-2xl cursor-pointer'
        >
          <RxDotFilled />
        </div>
      ))}
    </div>
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