import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Portal from '../components/Portal'
import JobListing from '../components/JobListing'
import RecruiterCTA from '../components/RecruiterCTA'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <Header />
      <JobListing />
      <RecruiterCTA />
      <Portal />
      <Footer />
    </div>
  )
}

export default Home