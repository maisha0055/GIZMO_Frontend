import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Portal from '../components/Portal'
import JobListing from '../components/JobListing'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <JobListing />
      <Portal />
      <Footer />
    </div>
  )
}

export default Home