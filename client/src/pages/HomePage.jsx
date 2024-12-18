import React from 'react'
import Header from '../components/common/Header'
import SlideShow from '../components/pages/home/SlideShow'
import Heroes from '../components/pages/home/Heroes'
import TabMenu from '../components/pages/home/TabMenu'
import Footer from '../components/common/Footer'

const Homepage = () => {
  return (
    <div>
      <Header/>
      <SlideShow/>
      <TabMenu/>
      <Heroes/>
      <Footer/>
    </div>
  )
}

export default Homepage
