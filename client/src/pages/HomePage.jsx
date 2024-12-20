import React from 'react'
import Header from '../components/common/Header'
import SlideShow from '../components/pages/home/SlideShow'
import Heroes from '../components/pages/home/Heroes'
import TabMenu from '../components/pages/home/TabMenu'
import Footer from '../components/common/Footer'
import Canvas from '../components/pages/home/Canvas'
import News from './News'

const Homepage = () => {
  return (
    <div>
      <Header/>
      <SlideShow/>
      <TabMenu/>
      <Heroes/>
      {/* <Canvas/> */}
      <News/>
      <Footer/>
    </div>
  )
}

export default Homepage
