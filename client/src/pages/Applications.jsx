import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { assets } from '../assets/assets'
import moment from 'moment'
import { AppContext } from '../context/AppContext'
import { useAuth, useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Applications = () => {
  const { user, isLoaded } = useUser()
  const { getToken } = useAuth()
  const [isEdit, setIsEdit] = useState(false)
  const [resume, setResume] = useState(null)
  const { backendUrl, userData, userApplications, fetchUserData, fetchUserApplications } = useContext(AppContext)

  const updateResume = async () => {
    try {
      if (!user || !isLoaded) return toast.error('Please wait while we load your profile')
      const formData = new FormData()
      formData.append('resume', resume)
      const token = await getToken()
      if (!token) return toast.error('Authentication failed. Please login again.')
      const { data } = await axios.post(
        backendUrl+'/api/users/update-resume',
        formData,
        {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      if (data.success) {
        toast.success(data.message)
        await fetchUserData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || 'Failed to upload resume')
    }
    setIsEdit(false)
    setResume(null)
  }

  useEffect(() => {
    if (user && isLoaded) setTimeout(fetchUserApplications, 500)
  }, [user, isLoaded])

  if (!isLoaded) return (
    <>
      <Navbar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10 flex justify-center items-center'>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-gradient-to-r from-orange-500 via-orange-500 to-red-500 mx-auto mb-4"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
      <Footer />
    </>
  )

  if (!user) return (
    <>
      <Navbar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10 flex justify-center items-center'>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-orange-600">Please Login</h2>
          <p className="text-gray-500">You need to be logged in to view your applications.</p>
        </div>
      </div>
      <Footer />
    </>
  )

  return (
    <>
      <Navbar />
      <div className='container px-4 2xl:px-20 mx-auto my-10 flex flex-col gap-10'>

        {/* Resume Section */}
        <div className='bg-gradient-to-r from-orange-50 via-orange-50 to-red-50 p-6 rounded-xl shadow-md flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4'>
          <div>
            <h2 className='text-2xl font-bold text-orange-700 mb-2'>Your Resume</h2>
            <p className='text-gray-600'>Upload or edit your resume to keep it up to date</p>
          </div>

          {isEdit || !userData?.resume ? (
            <div className='flex gap-3 items-center flex-wrap'>
              <label className='cursor-pointer'>
                <div className='bg-orange-100 text-orange-700 px-4 py-2 rounded-lg hover:bg-orange-200 transition'>
                  {resume ? resume.name : 'Select Resume'}
                </div>
                <input
                  type="file"
                  accept='application/pdf'
                  className='hidden'
                  onChange={e => setResume(e.target.files[0])}
                />
              </label>
              <button
                onClick={updateResume}
                disabled={!resume}
                className='bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition'
              >
                Save
              </button>
            </div>
          ) : (
            <div className='flex gap-3 items-center flex-wrap'>
              <a
                href={userData?.resume}
                target="_blank"
                rel="noopener noreferrer"
                className='bg-orange-200 text-orange-800 px-4 py-2 rounded-lg hover:bg-orange-300 transition'
              >
                View Resume
              </a>
              <button
                onClick={() => setIsEdit(true)}
                className='text-gray-500 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition'
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Jobs Applied Section */}
        <div>
          <h2 className='text-2xl font-bold text-orange-700 mb-6'>Jobs You Applied For</h2>

          {userApplications.length === 0 ? (
            <div className='bg-white shadow-lg rounded-xl p-8 text-center'>
              <p className='text-gray-500 text-lg mb-2'>No job applications yet</p>
              <p className='text-gray-400 mb-4'>Start applying to jobs to see them here!</p>
              <button
                onClick={() => window.location.href = '/'}
                className='bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition'
              >
                Browse Jobs
              </button>
            </div>
          ) : (
            <div className='flex flex-col gap-4'>
              {/* Header Row */}
              <div className='hidden md:flex bg-gray-100 p-3 rounded-t-xl font-semibold text-gray-700'>
                <div className='w-10'>#</div>
                <div className='flex-1'>Company</div>
                <div className='flex-1'>Job Title</div>
                <div className='flex-1'>Location</div>
                <div className='w-32 text-center'>Status</div>
              </div>

              {/* Job Rows */}
              {userApplications.map((job, index) => (
                <div key={index} className='flex flex-col md:flex-row items-center md:items-start bg-white shadow rounded-xl p-4 md:p-3 hover:shadow-lg transition gap-2'>
                  <div className='w-10 font-semibold text-gray-700'>{index + 1}</div>
                  <div className='flex-1 flex items-center gap-2'>
                    <img src={job.companyId?.image} alt="" className='w-10 h-10 rounded-full object-cover' />
                    <span className='font-medium'>{job.companyId?.name}</span>
                  </div>
                  <div className='flex-1 font-medium text-gray-800'>{job.jobId?.title}</div>
                  <div className='flex-1 text-gray-600'>{job.jobId?.location}</div>
                  <div className='w-32 text-center'>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      job.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                      job.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
      <Footer />
    </>
  )
}

export default Applications
