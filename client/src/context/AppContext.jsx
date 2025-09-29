import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const { user, isLoaded } = useUser();
    const { getToken } = useAuth();

    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: ''
    });

    const [isSearched, setIsSearched] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
    const [companyToken, setCompanyToken] = useState(null);
    const [companyData, setCompanyData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [userApplications, setUserApplications] = useState([]);
    
    const [isLoadingApplications, setIsLoadingApplications] = useState(false);
    const [isLoadingUserData, setIsLoadingUserData] = useState(false);

    // Function to fetch job data
    const fetchJobs = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/jobs');

            if (data.success) {
                setJobs(data.jobs);
                console.log('Jobs fetched:', data.jobs.length);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
            toast.error('Failed to fetch jobs');
        }
    };

    // Function to Fetch company data
    const fetchCompanyData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/company/company', { 
                headers: { token: companyToken } 
            });

            if (data.success) {
                setCompanyData(data.company);
                console.log('Company data fetched:', data.company);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching company data:', error);
            toast.error('Failed to fetch company data');
        }
    };

    // Function to fetch user data - FIXED with better error handling
    const fetchUserData = async () => {
        if (isLoadingUserData || !user || !isLoaded) return;
        
        try {
            setIsLoadingUserData(true);
            const token = await getToken();

            console.log('Fetching user data for:', user.id);

            if (!token) {
                console.log('No token available - waiting for auth');
                return;
            }

            const { data } = await axios.get(backendUrl + '/api/users/user', {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (data.success) {
                setUserData(data.user);
                console.log('✓ User data fetched:', data.user);
            } else {
                console.error('Failed to fetch user data:', data.message);
                // Don't show error toast - user will be created automatically
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            // Don't show error for 404 - user will be created automatically
            if (error.response?.status !== 404) {
                console.error('Unexpected error:', error.message);
            }
        } finally {
            setIsLoadingUserData(false);
        }
    };

    // Function to fetch user applications - FIXED with better error handling
    const fetchUserApplications = async () => {
        if (isLoadingApplications || !user || !isLoaded) return;
        
        try {
            setIsLoadingApplications(true);
            const token = await getToken();
            
            console.log('Fetching applications for:', user.id);

            if (!token) {
                console.log('No token available for applications');
                return;
            }

            const { data } = await axios.get(backendUrl + '/api/users/applications', {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (data.success) {
                setUserApplications(data.applications);
                console.log('✓ Applications fetched:', data.applications.length);
            } else {
                console.error('Failed to fetch applications:', data.message);
            }
        } catch (error) {
            console.error('Error fetching applications:', error);
            // Don't show error toast for authentication issues
        } finally {
            setIsLoadingApplications(false);
        }
    };

    // Initial data fetching
    useEffect(() => {
        fetchJobs();

        const storedCompanyToken = localStorage.getItem('companyToken');
        if (storedCompanyToken) {
            setCompanyToken(storedCompanyToken);
        }
    }, []);

    // Fetch company data when token changes
    useEffect(() => {
        if (companyToken) {
            fetchCompanyData();
        }
    }, [companyToken]);

    // FIXED: Better user data fetching with delays
    useEffect(() => {
        const fetchUserDataAndApplications = async () => {
            if (user && isLoaded && !isLoadingUserData && !isLoadingApplications) {
                console.log('User loaded, fetching data for:', user.id);
                
                // Wait for token to be ready
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                await fetchUserData();
                await fetchUserApplications();
            }
        };

        fetchUserDataAndApplications();
    }, [user?.id, isLoaded]);

    const value = {
        setSearchFilter, searchFilter,
        isSearched, setIsSearched,
        jobs, setJobs,
        showRecruiterLogin, setShowRecruiterLogin,
        companyToken, setCompanyToken,
        companyData, setCompanyData,
        backendUrl,
        userData, setUserData,
        userApplications, setUserApplications,
        fetchUserData,
        fetchUserApplications,
        isLoadingApplications
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};