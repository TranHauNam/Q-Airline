import React from 'react'
import Navbar from '../components/home-components/Navbar'
import Slideshow from '../components/home-components/SlideShow'
import Section from '../components/home-components/Section'
import Review from '../components/home-components/Review'



const Homepage = () => {
  return (
    <div>
      <Navbar/>
      <Slideshow/>
      <Section/>
      <Review/>
    </div>
  )
}

export default Homepage
