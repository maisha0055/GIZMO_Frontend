import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from "framer-motion"
import { useLocation } from 'react-router-dom' 
import backLogo from '../assets/back_logo.jpg'

const Header = () => {
  const { setSearchFilter, setIsSearched, isRecruiterLoginOpen } = useContext(AppContext)
  const location = useLocation()

  const titleRef = useRef(null)
  const locationRef = useRef(null)

  // Hide header if recruiter login modal is open OR if path matches login routes
  const hideHeaderRoutes = [
    '/recruiter-login',
    '/recruiter/login',
    '/company-login',
    '/company/login',
    '/recruiter',
    '/company'
  ]

  if (isRecruiterLoginOpen || hideHeaderRoutes.includes(location.pathname)) {
    return null
  }

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value
    })
    setIsSearched(true)
  }

  return (
    <div className='container 2xl:px-20 mx-auto my-10'>
      <div
        className='relative text-white py-20 text-center mx-2 rounded-xl overflow-hidden'
        style={{
          backgroundImage: `url(${backLogo})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        <div className="relative z-10">
          <motion.h2
            className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Advance Your Career With The Right Job
          </motion.h2>

          <motion.p
            className='mb-8 max-w-xl mx-auto text-sm font-light px-5'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            Your next Big Career Move Starts Here
          </motion.p>

          <motion.div
            className='flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className='flex items-center'>
              <img className='h-4 sm:h-5' src={assets.search_icon} alt="" />
              <input
                type="text"
                placeholder='Search for jobs'
                className='max-sm:text-xs p-2 rounded outline-none w-full'
                ref={titleRef}
              />
            </div>

            <div className='flex items-center'>
              <img className='h-4 sm:h-5' src={assets.location_icon} alt="" />
              <input
                type="text"
                placeholder='Location'
                className='max-sm:text-xs p-2 rounded outline-none w-full'
                ref={locationRef}
              />
            </div>

            <button
              onClick={onSearch}
              className='bg-blue-600 px-6 py-2 rounded text-white m-1'
            >
              Search
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Header
