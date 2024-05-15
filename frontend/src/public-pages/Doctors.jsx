import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft } from "react-icons/fa";
import { useState,useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

const Doctors = () => {
  const [data, setData] = useState([]);
 

  useEffect(() => {
    // Fetch data from API endpoint
    fetch("http://localhost:8000/api/doctors/get-doctors")
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success) {
          setData(responseData.data);
          console.log(responseData.data);
        } else {
          console.error("Failed to fetch data");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  // const data = [
  //   {
  //     img: "/src/assets/img/doc1.jpg",
  //     name: "Dr. Serena Mitchell",
  //     specialties: "Orthopedic Surgeon",
  //   },
  //   {
  //     img: "/src/assets/img/doc2.jpg",
  //     name: "Dr. Julian Bennett",
  //     specialties: "Cardiologist",
  //   },
  //   {
  //     img: "/src/assets/img/doc3.jpg",
  //     name: "Dr. Camila Rodriguez",
  //     specialties: "Pediatrician",
  //   },
  //   {
  //     img: "/src/assets/img/doc4.jpg",
  //     name: "Dr. Victor Nguyen",
  //     specialties: "Neurologist",
  //   },
  //   {
  //     img: "/src/assets/img/doc5.jpg",
  //     name: "Dr. Ethan Carter",
  //     specialties: "Dermatologist",
  //   },
  //   {
  //     img: "/src/assets/img/doc6.jpg",
  //     name: "Dr. Olivia Martinez",
  //     specialties: "Ophthalmologist",
  //   },
  // ];

  const slider = useRef(null);

  const settings = {
    accessibility: true,
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <div className=" min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-16">
      <div className=" flex flex-col items-center lg:flex-row justify-between mb-10 lg:mb-0">
        <div>
          <h1 className=" text-4xl font-semibold text-center lg:text-start">
            Our Doctors
          </h1>
          <p className=" mt-2 text-center lg:text-start">
          We Nurture Student Well-Being
          </p>
        </div>
        <div className="flex gap-5 mt-4 lg:mt-0">
          <button
            className=" bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc]"
            onClick={() => slider.current.slickPrev()}//to slide to the previous slide
          >
            <FaArrowLeft size={25} />
          </button>
          <button
            className=" bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc]"
            onClick={() => slider.current.slickNext()}
          >
            <FaArrowRight size={25} />
          </button>
        </div>
      </div>
      <div className=" mt-5">
        <Slider ref={slider} {...settings}>
          {data.map((e, index) => (
            <div
              className="h-[350px] text-black rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-2 cursor-pointer"
              key={index}
            >
              <div>
                <img
                  src={e.Image}
                  alt="img"
                  className=" h-56 rounded-t-xl w-full"
                />
              </div>

              <div className=" flex flex-col justify-center items-center">
                <h1 className=" font-semibold text-xl pt-4">{e.Name}</h1>
                <h3 className=" pt-2">{e.DepartmentName}</h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Doctors;
