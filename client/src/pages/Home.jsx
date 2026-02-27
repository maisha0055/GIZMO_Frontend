import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Portal from '../components/Portal'
import JobListing from '../components/JobListing'
import RecruiterCTA from '../components/RecruiterCTA'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Header />
      <JobListing />
      <RecruiterCTA />
      
      {/* Emergency Section */}
      <div className="container mx-auto px-4 2xl:px-20 py-10">
        <div className="bg-red-50 border border-red-100 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow">
          <div>
            <h3 className="text-xl font-bold text-red-900 mb-2">Need Immediate Assistance?</h3>
            <p className="text-red-700">Access our emergency support and designated contact details instantly.</p>
          </div>
          <button 
            onClick={() => navigate('/emergency-contact')}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-red-200"
          >
            Emergency Contact 🚨
          </button>
        </div>
      </div>

      <Portal />
      <Footer />
    </div>
  )
}

export default Home