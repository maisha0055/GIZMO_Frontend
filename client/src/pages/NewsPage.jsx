import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const backendUrl = import.meta.env.VITE_BACKEND_URL

const NewsCard = ({ n }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 250;
  const isTooLong = n.content.length > maxLength;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      {n.imageUrl && (
        <div className="relative h-56 overflow-hidden flex-shrink-0">
          <img 
            src={n.imageUrl} 
            alt={n.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          <div className="absolute top-4 left-4">
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-sm ${
              n.category === 'journal' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
            }`}>
              {n.category === 'journal' ? '📘 Journal' : '📰 News'}
            </span>
          </div>
        </div>
      )}
      {!n.imageUrl && (
        <div className="p-6 bg-slate-100 flex-shrink-0">
          <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
            n.category === 'journal' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
          }`}>
            {n.category === 'journal' ? '📘 Journal' : '📰 News'}
          </span>
        </div>
      )}
      <div className="p-8 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-green-800 transition-colors">
          {n.title}
        </h2>
        <div className="text-slate-600 mb-6 leading-relaxed flex-grow">
          {isExpanded || !isTooLong ? (
            <p className="whitespace-pre-wrap">{n.content}</p>
          ) : (
            <p>{n.content.slice(0, maxLength)}...</p>
          )}
          
          {isTooLong && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-green-800 font-bold mt-2 hover:underline focus:outline-none"
            >
              {isExpanded ? 'See less' : 'See more'}
            </button>
          )}
        </div>
        <div className="flex items-center text-slate-400 text-sm font-medium mt-auto border-t pt-4 border-slate-50">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {new Date(n.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
    </div>
  );
};

const NewsPage = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${backendUrl}/api/admin/news`)
      .then(r => { 
        if (r.data.success) setNews(r.data.news)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">News & Journals</h1>
            <p className="text-lg text-slate-600">The latest updates from the industry and job market.</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold hover:bg-slate-50 transition flex items-center gap-2 shadow-sm self-start"
          >
            ← Back Home
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map(n => (
              <NewsCard key={n._id} n={n} />
            ))}
          </div>
        )}

        {!loading && news.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm">
            <p className="text-slate-400 text-lg">No news articles found yet.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default NewsPage
