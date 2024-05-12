// eslint-disable-next-line no-unused-vars
import React from 'react'
import Navbar from '../public-pages/Navbar'
import Home from '../public-pages/Home'
import About from '../public-pages/About'
import Services from '../public-pages/Services'
import Doctors from '../public-pages/Doctors'
import Blogs from '../public-pages/Blogs'
import Footer from '../public-pages/Footer'
import ShortNote from '../public-pages/ShortNote'
import DoctorsSchedule from '../public-pages/DoctorsSchedule'
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