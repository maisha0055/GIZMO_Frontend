import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Interview = () => {
  return (
    <>
      <Navbar/>
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-2xl font-semibold mb-4'>Interview Board</h2>

        <div className='bg-white border rounded-lg shadow p-6'>
          <h3 className='text-xl font-medium mb-2'>Welcome</h3>
          <p className='text-gray-700 mb-2'>Wait for some Mmoment</p>
          <p className='text-gray-700 mb-2'>Join exact after 5 minutes</p>
          <p className='text-gray-700 mb-4'>Date: 5th September 2025,</p>

          <a 
            href="https://meet.google.com/xyz-abcd-123" 
            target="_blank" 
            rel="noopener noreferrer"
            className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'
          >
            Join Google Meet
          </a>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Interview
