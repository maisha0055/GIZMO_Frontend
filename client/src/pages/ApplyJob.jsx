import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import kconvert from 'k-convert';
import moment from 'moment';
import JobCart from '../components/JobCart';
import Footer from '../components/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import { useAuth, useUser } from '@clerk/clerk-react';

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { isLoaded, isSignedIn } = useUser(); // Add useUser hook

  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  const { jobs, backendUrl, userData, userApplications, setUserApplications, fetchUserApplications } = useContext(AppContext);

  // Fetch job details
  const fetchJob = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/jobs/${id}`);

      if (data.success) {
        setJobData(data.job);
      } else {
        toast.error(data.message || 'Failed to fetch job details');
        setTimeout(() => navigate(-1), 2000);
      }
    } catch (error) {
      console.error('Error fetching job:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch job details');
      setTimeout(() => navigate(-1), 2000);
    } finally {
      setLoading(false);
    }
  };

  // Apply to job or redirect if already applied
  const applyHandler = async () => {
    // Check if user is authenticated first
    if (!isSignedIn) {
      toast.error('Please login to apply for jobs');
      return;
    }

    if (!userData?.resume) {
      toast.error('Please upload your resume first');
      navigate('/applications');
      return;
    }

    try {
      setApplying(true);

      // Check if user already applied
      const hasApplied = userApplications.some(app => app.jobId === id);

      if (!hasApplied) {
        const token = await getToken();
        const { data } = await axios.post(
          `${backendUrl}/api/users/apply`,
          { jobId: id },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (data.success) {
          setUserApplications(prev => [...prev, { jobId: id, companyId: jobData.companyId, date: new Date() }]);
          toast.success('Application submitted successfully!');
        } else if (data.message === 'Already Applied') {
          toast.info('You have already applied for this job');
        } else {
          toast.error(data.message || 'Failed to apply');
          return;
        }
      } else {
        toast.info('You have already applied for this job');
      }

      // Navigate to applications page
      navigate('/applications');

    } catch (error) {
      console.error('Application error:', error);
      toast.error(error.response?.data?.message || 'Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  // Handle login redirect
  const handleLoginRedirect = () => {
    toast.info('Please login to apply for jobs');
    // You might want to redirect to login or open auth modal
  };

  // Handle resume upload redirect
  const handleResumeRedirect = () => {
    toast.info('Please upload your resume first');
    navigate('/applications');
  };

  useEffect(() => {
    if (id) {
      const jobFromContext = jobs.find(job => job._id === id);
      if (jobFromContext) {
        setJobData(jobFromContext);
        setLoading(false);
      } else {
        fetchJob();
      }
    }
  }, [id, jobs]);

  if (loading) return <Loading />;

  if (!jobData)
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Job Not Found</h2>
            <p className="text-gray-600 mt-2">The job you're looking for doesn't exist or may have been removed.</p>
            <button
              onClick={() => navigate(-1)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Go Back
            </button>
          </div>
        </div>
      </>
    );

  // Determine button state and behavior
  const getButtonState = () => {
    if (!isLoaded) {
      return { text: 'Loading...', disabled: true, onClick: null, className: 'bg-gray-400 text-white' };
    }

    if (!isSignedIn) {
      return { text: 'Apply Now', disabled: false, onClick: handleLoginRedirect, className: 'bg-green-600 text-white hover:bg-green-700' };
    }

    if (!userData?.resume) {
      return { text: 'Apply Now', disabled: false, onClick: handleResumeRedirect, className: 'bg-green-600 text-white hover:bg-green-700' };
    }

    if (applying) {
      return { text: 'Applying...', disabled: true, onClick: null, className: 'bg-gray-400 text-white' };
    }

    return { text: 'Apply Now', disabled: false, onClick: applyHandler, className: 'bg-green-600 text-white hover:bg-green-700' };
  };

  const buttonState = getButtonState();

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
        <div className="bg-white text-black rounded-lg w-full">
          <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-green-400 rounded-xl">
            <div className="flex flex-col md:flex-row items-center">
              <img
                className="h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border"
                src={jobData.companyId?.image || jobData.companyId?.logo || ''}
                alt={jobData.companyId?.name}
              />

              <div className="text-center md:text-left text-neutral-700">
                <h1 className="text-2xl sm:text-4xl font-medium">{jobData.title}</h1>
                <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2">
                  <span className="flex items-center gap-1">
                    <img src={assets.suitcase_icon} alt="" />
                    {jobData.companyId?.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.location_icon} alt="" />
                    {jobData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.person_icon} alt="" />
                    {jobData.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.money_icon} alt="" />
                    CTC : {kconvert.convertTo(jobData.salary)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">
              <button
                onClick={buttonState.onClick}
                disabled={buttonState.disabled}
                className={`p-2.5 px-10 rounded transition-colors ${buttonState.className}`}
              >
                {buttonState.text}
              </button>
              <p className="mt-1 text-gray-600">Posted {moment(jobData.date).fromNow()}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start">
          <div className="w-full lg:w-2/3">
            <h2 className="font-bold text-2xl mb-4">Job Description</h2>
            <div className="rich-text" dangerouslySetInnerHTML={{ __html: jobData.description }} />
            <button
              onClick={buttonState.onClick}
              disabled={buttonState.disabled}
              className={`p-2.5 px-10 rounded mt-10 transition-colors ${buttonState.className}`}
            >
              {buttonState.text}
            </button>
          </div>

          <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5">
            <h2 className="text-xl font-semibold mb-4">More Jobs From {jobData.companyId?.name}</h2>
            {jobs
              .filter(job => job._id !== jobData._id && job.companyId?._id === jobData.companyId?._id)
              .slice(0, 4)
              .map(job => (
                <JobCart key={job._id} job={job} />
              ))}

            {jobs.filter(job => job._id !== jobData._id && job.companyId?._id === jobData.companyId?._id).length === 0 && (
              <p className="text-gray-500">No other jobs from this company</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ApplyJob;