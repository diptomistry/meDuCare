
import { TypeAnimation } from "react-type-animation";





import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import Marquee from "react-fast-marquee";

   

const Home = () => {
  const breakingNewsText = "Breaking News: i am gone";
  const slides = [
    {
      url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
    },
  
    {
      url: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
    },
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
const prevSlide = () => {
  const isFirstSlide = currentIndex === 0;
  const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
  setCurrentIndex(newIndex);
};

const nextSlide = () => {
  const isLastSlide = currentIndex === slides.length - 1;
  const newIndex = isLastSlide ? 0 : currentIndex + 1;
  setCurrentIndex(newIndex);
};

const goToSlide = (slideIndex) => {
  setCurrentIndex(slideIndex);
};


return (
  <div className="flex flex-col min-h-screen  lg:px-32 px-5  ">
    
    <div>
     
        
    <div className='max-w-[900px] h-[600px] md:h-[650px] w-full m-auto py-6 px-4 relative group ' style={{ marginTop: '5rem' }}>
   
    <div
      style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
      className='w-full h-full rounded-2xl bg-center bg-cover duration-500 flex justify-center items-center'
    >
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
    
   
    <div className="mt-2 bg-backgroundColor md:text-2xl text-red-700 py-2 px-1 flex items-center rounded-md relative">
      {/* Left border */}
      <div className="absolute inset-y-0 left-0 w-2  bg-gray-700 rounded-lg"></div>
      {/* Right border */}
      <div className="absolute inset-y-0 right-0 w-2  bg-gray-700 rounded-lg"></div>
      {/* Main content */}
      <div className="flex-grow">
        <Marquee speed={100}>
          {breakingNewsText }
        </Marquee>
      </div>
    </div>
  </div>
);
}
export default Home;