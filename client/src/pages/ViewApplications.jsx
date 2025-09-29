import React, { useState, useEffect, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const ViewApplications = () => {
  const [openAction, setOpenAction] = useState(null);
  const { backendUrl, companyToken } = useContext(AppContext);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch applications data
  const fetchCompanyJobApplications = async () => {
    try {
      setLoading(true);
      console.log('Fetching company job applications...');
      console.log('Company token:', !!companyToken);
      console.log('Backend URL:', backendUrl);
      
      const { data } = await axios.get(
        backendUrl + "/api/company/job-applications",
        { headers: { token: companyToken } }
      );
      
      console.log('Response received:', data);
      
      if (data.success) {
        console.log('Applications found:', data.applications.length);
        setApplicants(data.applications.reverse());
        
        // Log sample application for debugging
        if (data.applications.length > 0) {
          console.log('Sample application:', data.applications[0]);
        }
      } else {
        console.error('Failed to fetch applications:', data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // update job application status
  const changeJobApplicationStatus = async (id, status) => {
    try {
      console.log('Changing application status:', { id, status });
      
      const { data } = await axios.post(
        backendUrl + "/api/company/change-application-status",
        { id, status },
        { headers: { token: companyToken } }
      );
      
      if (data.success) {
        toast.success(`Application ${status.toLowerCase()} successfully`);
        fetchCompanyJobApplications(); // Refresh the list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error changing application status:', error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      console.log('Company token available, fetching applications...');
      fetchCompanyJobApplications();
    } else {
      console.log('No company token available');
      setLoading(false);
    }
  }, [companyToken]);

  if (loading) {
    return <Loading />;
  }

  // Show message if no company token
  if (!companyToken) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-xl sm:text-2xl">Please login as a company to view applications</p>
      </div>
    );
  }

  return applicants.length === 0 ? (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="text-center">
        <p className="text-xl sm:text-2xl mb-4">No Applications Available</p>
        <p className="text-gray-500">Job applications will appear here when users apply to your posted jobs.</p>
      </div>
    </div>
  ) : (
    <div className="p-8 w-full">
      <h2 className="text-2xl font-bold mb-6">Job Applications ({applicants.length})</h2>
      
      <div className="bg-white rounded shadow border">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="py-3 px-4 font-medium text-gray-600">#</th>
              <th className="py-3 px-4 font-medium text-gray-600">User Name</th>
              <th className="py-3 px-4 font-medium text-gray-600">Job Title</th>
              <th className="py-3 px-4 font-medium text-gray-600">Location</th>
              <th className="py-3 px-4 font-medium text-gray-600">Resume</th>
              <th className="py-3 px-4 font-medium text-gray-600">Status</th>
              <th className="py-3 px-4 font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants
              .filter((item) => item.jobId && item.userId)
              .map((applicant, index) => (
                <tr key={applicant._id || index} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4 flex items-center gap-2">
                    <img
                      src={applicant.userId?.image || '/default-avatar.png'}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = '/default-avatar.png'
                      }}
                    />
                    <span>{applicant.userId?.name || 'Unknown User'}</span>
                  </td>
                  <td className="py-2 px-4">{applicant.jobId?.title || 'Unknown Job'}</td>
                  <td className="py-2 px-4">{applicant.jobId?.location || 'Unknown Location'}</td>
                  <td className="py-2 px-4">
                    {applicant.userId?.resume ? (
                      <a
                        href={applicant.userId.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition inline-flex items-center gap-1"
                      >
                        Resume
                        <img
                          src={assets.resume_download_icon}
                          alt="download"
                          className="w-4 h-4"
                        />
                      </a>
                    ) : (
                      <span className="text-gray-400">No Resume</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      applicant.status === 'Accepted' 
                        ? 'bg-green-100 text-green-800' 
                        : applicant.status === 'Rejected' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {applicant.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 relative">
                    {applicant.status === "Pending" ? (
                      <>
                        <button
                          onClick={() =>
                            setOpenAction(openAction === index ? null : index)
                          }
                          className="text-gray-500 px-2 py-1 hover:bg-gray-100 rounded"
                        >
                          •••
                        </button>
                        {openAction === index && (
                          <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg flex flex-col gap-1 p-2 z-10 min-w-[100px]">
                            <button
                              onClick={() => {
                                changeJobApplicationStatus(applicant._id, "Accepted");
                                setOpenAction(null);
                              }}
                              className="text-green-600 hover:bg-green-50 text-sm px-2 py-1 rounded text-left"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => {
                                changeJobApplicationStatus(applicant._id, "Rejected");
                                setOpenAction(null);
                              }}
                              className="text-red-500 hover:bg-red-50 text-sm px-2 py-1 rounded text-left"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;


//no it still shows the same , but it should give me the same resume  in ViewApplications.jsx that was uploaded in Applications.jsx code, fix it