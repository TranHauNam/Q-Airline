import React from 'react'
import Header from '../components/common/Header'
import SlideShow from '../components/pages/home/SlideShow'
import Heroes from '../components/pages/home/Heroes'
import TabMenu from '../components/pages/home/TabMenu'
import Footer from '../components/common/Footer'
import FlightSearch from '../components/flight/FlightSearch'
import FlightSearchPage from './FlightSearchPage'

const Homepage = () => {
  return (
    <div>
      <Header/>
      <SlideShow/>
      <TabMenu/>
      <Heroes/>
      <Footer/>
      <FlightSearch/>
    </div>
  )
}

export default Homepage
