// eslint-disable-next-line no-unused-vars
import React from 'react'
import Navbar from '../components/Navbar'
import Home from '../components/Home'
import About from '../components/About'
import Services from '../components/Services'
import Doctors from '../components/Doctors'
import Blogs from '../components/Blogs'
import Footer from '../components/Footer'
import ShortNote from '../components/ShortNote'
import DoctorsSchedule from '../components/DoctorsSchedule'
import PhotoGallery from '../models/PhotoGallery'


const HomeRootLayout = () => {
  return (
    <div>
        <div>
      <Navbar />

      <main>
        <div id="home">
          <Home />
        </div>
        <div id='photo-gallery'>
          <PhotoGallery />
        </div>
       

        <div id="about">
          <About />
        </div>
        <div id="short-note">
          <ShortNote />
        </div>
        <div id="services">
          <Services />
        </div>
        <div id='doctor-schedule'>
          <DoctorsSchedule />
        </div>

        <div id="doctors">
          <Doctors />
        </div>
        

        

        <div id="blog">
          <Blogs />
        </div>
      </main>

      <div id='footer'>
        <Footer />
      </div>
    </div>
    </div>
  )
}

export default HomeRootLayout