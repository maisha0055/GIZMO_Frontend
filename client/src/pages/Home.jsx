import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Portal from '../components/Portal'
import JobListing from '../components/JobListing'
import Footer from '../components/Footer'
import axios from 'axios'

const backendUrl = import.meta.env.VITE_BACKEND_URL

const NewsSection = () => {
  const [news, setNews] = useState([])

  useEffect(() => {
    axios.get(`${backendUrl}/api/admin/news`)
      .then(r => { if (r.data.success) setNews(r.data.news) })
      .catch(() => {})
  }, [])

  if (news.length === 0) return null

  return (
    <section style={{ padding: '60px 5%', background: '#f8fafc' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>
          📰 Latest News & Journals
        </h2>
        <p style={{ color: '#64748b', marginBottom: 36, fontSize: 15 }}>
          Stay updated with career tips, industry insights, and job market news
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
          {news.map(n => (
            <div key={n._id} style={{
              background: '#fff', borderRadius: 16, overflow: 'hidden',
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'default'
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
    </section>
  )
}

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <JobListing />
      <NewsSection />
      <Portal />
      <Footer />
    </div>
  )
}

export default Home