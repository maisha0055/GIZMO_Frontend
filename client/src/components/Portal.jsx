import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'

const Portal = () => {
  const { backendUrl } = useContext(AppContext)
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  const defaultCards = [
    {
      title: "Job Market Insights",
      subtitle: "INDUSTRY REPORT",
      description: "Latest trends and hiring demands shaping the global job market.",
      link: "https://www.linkedin.com/pulse/topics/job-search",
      linkText: "Read Report →"
    },
    {
      title: "Company Innovation Spotlight",
      subtitle: "INDUSTRY NEWS",
      description: "Discover how leading companies are transforming industries with innovation.",
      link: "https://www.businessinsider.com/cluster/markets",
      linkText: "Read Article →"
    },
    {
      title: "Research on Work & Careers",
      subtitle: "JOURNAL STUDY",
      description: "Academic research exploring workforce development and industry practices.",
      link: "https://scholar.google.com/",
      linkText: "Read Journal →"
    }
  ]

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/admin/news`)
        if (data.success && data.news.length > 0) {
          // Wrap backend news to match the card structure
          const dynamicNews = data.news.slice(0, 3).map(item => ({
            title: item.title,
            subtitle: item.category === 'journal' ? 'JOURNAL STUDY' : 'LATEST NEWS',
            description: item.content.length > 100 ? item.content.slice(0, 100) + '...' : item.content,
            link: '#', // In a real app, this would link to a /news/:id page
            linkText: item.category === 'journal' ? 'Read Journal →' : 'Read Article →',
            dynamic: true,
            id: item._id
          }))
          setNews(dynamicNews)
        } else {
          setNews([])
        }
      } catch (error) {
        console.error("Error fetching news for portal:", error)
        setNews([])
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [backendUrl])

  const displayCards = news.length > 0 ? news : defaultCards

  return (
    <div className='bg-gradient-to-r from-[#2e3d00] to-[#6b7a2f] text-white py-16 px-6 mx-2 mt-20 rounded-[3rem] shadow-3xl text-center relative overflow-hidden'>
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-2xl -ml-32 -mb-32"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-[#c8d48a] mb-4 tracking-tight">Jobs & Industry News</h2>
        <p className="text-olive-100/70 mb-12 text-lg md:text-xl max-w-2xl mx-auto font-light">
          Stay updated with the latest job market research, industry developments, and career insights.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayCards.map((card, index) => (
            <div 
                key={card.id || index} 
                className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-[0_25px_50px_rgba(0,0,0,0.2)] transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer border border-white/20"
            >
              <div className="flex flex-col h-full text-left">
                <p className="text-xs font-bold text-[#6b7a2f] mb-3 tracking-widest uppercase">{card.subtitle}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-[#4a5a1e] transition-colors line-clamp-2">
                    {card.title}
                </h3>
                <p className="text-gray-600 text-sm mb-8 leading-relaxed line-clamp-3">
                    {card.description}
                </p>
                <div className="mt-auto">
                    <a
                      href={card.link}
                      target={card.dynamic ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#4a5a1e] font-bold hover:gap-3 transition-all duration-300"
                    >
                      {card.linkText}
                    </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 text-olive-100/60 flex items-center justify-center gap-3 italic font-light">
          <span className="w-8 h-[1px] bg-olive-100/30"></span>
          <span>We are glad you are here, please explore our resources</span>
          <span className="w-8 h-[1px] bg-olive-100/30"></span>
        </div>
      </div>
    </div>
  )
}

export default Portal
