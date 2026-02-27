import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'   
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets'
import JobCart from './JobCart'

const JobListing = () => {
    const navigate = useNavigate()   
    const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext)

    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedLocations, setSelectedLocations] = useState([])
    const [filteredJobs, setFilteredJobs] = useState(jobs)

    // Handle filter changes
    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        )
    }

    const handleLocationChange = (location) => {
        setSelectedLocations(prev =>
            prev.includes(location)
                ? prev.filter(c => c !== location)
                : [...prev, location]
        )
    }

    // Apply filters whenever jobs or filters change
    useEffect(() => {
        const matchesCategory = job =>
            selectedCategories.length === 0 || selectedCategories.includes(job.category)

        const matchesLocations = job =>
            selectedLocations.length === 0 || selectedLocations.includes(job.location)

        const matchesTitle = job =>
            searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())

        const matchesSearchLocation = job =>
            searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

        const newFilteredJobs = jobs
            .slice()
            .reverse()
            .filter(job =>
                matchesCategory(job) &&
                matchesLocations(job) &&
                matchesTitle(job) &&
                matchesSearchLocation(job)
            )

        setFilteredJobs(newFilteredJobs)
        setCurrentPage(1)
    }, [jobs, selectedCategories, selectedLocations, searchFilter])

    return (
        <div className='container 2xl:px-20 mx-auto flex flex-col py-8'>

            {/* CURRENT SEARCH CHIPS */}
            {isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
                <div className='flex flex-wrap gap-2 mb-6'>
                    {searchFilter.title && (
                        <span className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-2 py-1 rounded'>
                            {searchFilter.title}
                            <img
                                onClick={() => setSearchFilter(prev => ({ ...prev, title: "" }))}
                                className='cursor-pointer w-4 h-4'
                                src={assets.cross_icon}
                                alt="remove"
                            />
                        </span>
                    )}
                    {searchFilter.location && (
                        <span className='inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-2 py-1 rounded'>
                            {searchFilter.location}
                            <img
                                onClick={() => setSearchFilter(prev => ({ ...prev, location: "" }))}
                                className='cursor-pointer w-4 h-4'
                                src={assets.cross_icon}
                                alt="remove"
                            />
                        </span>
                    )}
                </div>
            )}

            {/* FILTER BARS */}
            <div className='flex flex-col sm:flex-row gap-8 mb-8'>

                {/* Category Filter */}
                <div className='flex flex-col'>
                    <h4 className='font-bold text-xl mb-2'>Search by Category</h4>
                    <div className='flex flex-wrap items-center gap-3'>
                        {JobCategories.map((category, index) => (
                            <label
                                key={index}
                                className={`px-3 py-1 border rounded cursor-pointer ${
                                    selectedCategories.includes(category)
                                        ? 'bg-blue-100 text-blue-700 border-blue-300'
                                        : 'text-gray-700 border-gray-300'
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    className='hidden'
                                    onChange={() => handleCategoryChange(category)}
                                    checked={selectedCategories.includes(category)}
                                />
                                {category}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Location Filter */}
                <div className='flex flex-col'>
                    <h4 className='font-bold text-xl mb-2'>Search by Location</h4>
                    <div className='flex flex-wrap items-center gap-3'>
                        {JobLocations.map((location, index) => (
                            <label
                                key={index}
                                className={`px-3 py-1 border rounded cursor-pointer ${
                                    selectedLocations.includes(location)
                                        ? 'bg-red-100 text-red-700 border-red-300'
                                        : 'text-gray-700 border-gray-300'
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    className='hidden'
                                    onChange={() => handleLocationChange(location)}
                                    checked={selectedLocations.includes(location)}
                                />
                                {location}
                            </label>
                        ))}
                    </div>
                </div>

            </div>

            {/* JOB LISTINGS */}
            <section className='w-full text-gray-800'>
                <h3 className='font-medium text-3xl py-2' id='job-list'>Latest Jobs</h3>
                <p className='mb-8'>Get your desired job from top companies</p>

                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
                        <JobCart key={index} job={job} />
                    ))}
                </div>

                {/* PAGINATION */}
                {filteredJobs.length > 0 && (
                    <div className='flex items-center justify-center space-x-2 mt-10'>
                        <a href="#job-list">
                            <img
                                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                                src={assets.left_arrow_icon}
                                alt="prev"
                            />
                        </a>
                        {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                            <a key={index} href="#job-list">
                                <button
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === index + 1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}
                                >
                                    {index + 1}
                                </button>
                            </a>
                        ))}
                        <a href="#job-list">
                            <img
                                onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6)))}
                                src={assets.right_arrow_icon}
                                alt="next"
                            />
                        </a>
                    </div>
                )}
            </section>

        </div>
    )
}

export default JobListing
