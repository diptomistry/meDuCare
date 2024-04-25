import React from 'react'
import img from '../assets/img/cheifOfficer.png'

const ShortNote = () => {
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
          <div className="md:w-2/3 md:ml-8 mt-6 md:mt-0">
            <h2 className="text-2xl font-bold mb-4">Message from the Cheif Officer</h2>
            <p className="mb-4">
              Respected members of the university community,
            </p>
            <p className="mb-4">
              I am deeply honored and filled with immense enthusiasm as I assume the esteemed position of Vice Chancellor at this illustrious institution. In this capacity, I am aware of the diverse and dynamic spectrum of stakeholders that this university serves, including current and prospective students, dedicated faculty members, accomplished researchers, revered members of the senate and the syndicate, esteemed alumni, and our valued international partners. To our esteemed faculty members, I extend my heartfelt appreciation for...
            </p>
            <h3 className="text-backgroundColor cursor-pointer hover:text-[#ade9dc] transition duration-300 ease-in-out">
        Read more
      </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShortNote