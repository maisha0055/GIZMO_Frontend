import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


const Navbar = () => {

    const {openSignIn} = useClerk()
    const {user} = useUser()

    const navigate = useNavigate()

    const {setShowRecruiterLogin} = useContext(AppContext)

    return (
        <div className='shadow py-4'>
            <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center  '>
                <img onClick={()=> navigate('/')} className='cursor-pointer' src={assets.logo} alt="" style={{ width: '150px', height: 'auto' }} />
                
                     <ul className='flex items-center gap-6 text-gray-700 font-medium'>
          <li><Link to="/news" className="hover:text-blue-600 transition-colors duration-200 relative group">
            News & Journals
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link></li>
          {user ? (
            <div className='flex items-center gap-4'>
              <Link to="/dashboard" className="hover:text-blue-600 transition-colors">Applications</Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <div className='flex items-center gap-4 max-sm:text-xs'>
              <button onClick={() => openSignIn()} className='text-gray-600 hover:text-black transition-colors'>Login</button>
              <button onClick={() => navigate('/recruiter-login')} className='bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95'>Recruiter Login</button>
            </div>
          )}
        </ul>
                

            </div>
        </div>
    )
}

export default Navbar