import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import hov1 from '../assets/hov1.png'
import hov2 from '../assets/hov2.png'

const RecruiterCTA = () => {
  const { setShowRecruiterLogin } = useContext(AppContext)

  return (
    <div className="container mx-auto px-4 2xl:px-20 py-16">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-gray-50 rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100 overflow-hidden relative">
        
        {/* Abstract Background Elements for "Alive" feel */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-green-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>

        {/* Images Section */}
        <div className="flex gap-4 sm:gap-6 items-end relative z-10 w-full lg:w-1/2 justify-center lg:justify-start">
          <div className="w-1/2 max-w-[240px] transform hover:scale-[1.02] transition-transform duration-500 shadow-xl rounded-2xl overflow-hidden border-4 border-white">
            <img 
              src={hov1} 
              alt="Professional Recruiter 1" 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="w-1/2 max-w-[240px] mb-8 transform hover:scale-[1.02] transition-transform duration-500 shadow-xl rounded-2xl overflow-hidden border-4 border-white">
            <img 
              src={hov2} 
              alt="Professional Recruiter 2" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2 lg:pl-8 text-center lg:text-left relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2e7d32] mb-6 leading-tight">
            Need Skilled Candidates for <br className="hidden sm:block" />
            Your Business?
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl mb-10 max-w-lg mx-auto lg:mx-0">
            The best talent is just a click away. Reach thousands of qualified professionals instantly.
          </p>
          
          <button 
            onClick={() => { setShowRecruiterLogin(true); window.scrollTo(0, 0); }}
            className="group flex items-center justify-center lg:justify-start gap-3 border-2 border-[#2e7d32] text-[#2e7d32] hover:bg-[#2e7d32] hover:text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-sm hover:shadow-lg active:scale-95 mx-auto lg:mx-0"
          >
            Post a Job 
            <svg 
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecruiterCTA
