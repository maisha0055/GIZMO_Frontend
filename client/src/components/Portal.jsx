import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const backendUrl = import.meta.env.VITE_BACKEND_URL

const Portal = () => {
  const [news, setNews] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${backendUrl}/api/admin/news`)
      .then(r => { if (r.data.success) setNews(r.data.news) })
      .catch(() => {})
  }, [])

  const cards = [
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

  return (
    <div className='bg-gradient-to-r from-green-800 to-yellow-200 text-white py-8 text-center px-4 md:px-8 mx-2 rounded-xl'>
      {/* Heading */}
      <h2 className="text-3xl font-bold text-yellow-900 mb-2">Jobs & Industry News</h2>
      <p className="text-yellow-800 mb-8">
        Stay updated with the latest job market research, industry developments, and career insights.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <p className="text-xs font-medium text-gray-500 mb-2">{card.subtitle}</p>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{card.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{card.description}</p>
            <a
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium hover:underline"
            >
              {card.linkText}
            </a>
          </div>
        ))}
      </div>

      {/* Dynamic News & Journals Section */}
      {news.length > 0 && (
        <div className="mt-12 text-left">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderTop: '1px solid rgba(133, 91, 0, 0.2)', pt: '32px' }}>
            <h2 className="text-2xl font-bold text-yellow-900 pt-8">
              Latest News & Journals
            </h2>
            {news.length > 3 && (
              <button 
                onClick={() => navigate('/news')}
                className="text-yellow-900 font-bold hover:underline flex items-center gap-1 pt-8"
              >
                See All News & Journals →
              </button>
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {news.slice(0, 3).map(n => (
              <div key={n._id} style={{
                background: '#fff', borderRadius: 16, overflow: 'hidden',
                boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'default', color: '#1e293b'
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)' }}
              >
                {n.imageUrl && (
                  <img src={n.imageUrl} alt={n.title} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                )}
                <div style={{ padding: '20px 22px' }}>
                  <span style={{
                    display: 'inline-block', padding: '3px 12px', borderRadius: 99,
                    fontSize: 12, fontWeight: 600, marginBottom: 10,
                    background: n.category === 'journal' ? '#fef3c7' : '#dcfce7',
                    color: n.category === 'journal' ? '#92400e' : '#166534'
                  }}>
                    {n.category === 'journal' ? '📘 Journal' : '📰 News'}
                  </span>
                  <h3 style={{ margin: '0 0 10px', fontSize: 16, fontWeight: 700, color: '#1e293b', lineHeight: 1.4 }}>
                    {n.title}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6, margin: '0 0 14px' }}>
                    {n.content.length > 140 ? n.content.slice(0, 140) + '...' : n.content}
                  </p>
                  <p style={{ color: '#94a3b8', fontSize: 12, margin: 0 }}>
                    {new Date(n.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer note */}
      <div className="mt-8 text-sm text-yellow-900 flex items-center justify-center gap-2">
        <span>➝</span> You are welcome, please explore our resources
      </div>
    </div>
  )
}

export default Portal
