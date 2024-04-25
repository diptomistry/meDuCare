import React from "react";
import { TypeAnimation } from "react-type-animation";
/*
     <div class="relative flex overflow-x-hidden">
        <div class="py-12 animate-marquee whitespace-nowrap">
          <span class="text-4xl mx-4">রাণীর নেকলেস চুরির মাস্টারপ্ল্যান</span>
          <span class="text-4xl mx-4">Marquee Item 2</span>
          <span class="text-4xl mx-4">Marquee Item 3</span>
          <span class="text-4xl mx-4">Marquee Item 4</span>
          <span class="text-4xl mx-4">Marquee Item 5</span>
        </div>

        <div class="absolute top-0 py-12 animate-marquee2 whitespace-nowrap">
          <span class="text-4xl mx-4">রাণীর নেকলেস চুরির মাস্টারপ্ল্যান</span>
          <span class="text-4xl mx-4">Marquee Item 2</span>
          <span class="text-4xl mx-4">Marquee Item 3</span>
          <span class="text-4xl mx-4">Marquee Item 4</span>
          <span class="text-4xl mx-4">Marquee Item 5</span>
        </div>
      </div>
*/

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center lg:px-32 px-5 text-white bg-[url('assets/img/homeFinal.png')] bg-no-repeat bg-cover opacity-90">
      
      <div className="w-full lg:w-4/5 space-y-5 mt-10 text-center">
 
        <TypeAnimation
          sequence={[
            "Welcome to Shahid Buddhijibe Dr. Muhammad Mortaza Medical Centre",
            1000,
            "Du HealthCare",
            1000,
           
          ]}
          className="text-4xl md:text-6xl text-white"
          cursor={false} // Keep the cursor visible during animation
        />
      </div>
    </div>
  );
};

export default Home;