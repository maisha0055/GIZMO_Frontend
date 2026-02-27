import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const backendUrl = import.meta.env.VITE_BACKEND_URL

// ─── Styles ──────────────────────────────────────────────────────────────────
const colors = {
  bg: '#0f172a', sidebar: '#1e293b', card: '#1e293b',
  accent: '#e94560', muted: 'rgba(255,255,255,0.45)',
  text: '#f1f5f9', border: 'rgba(255,255,255,0.08)'
}

const badge = (color, text) => (
  <span style={{
    background: color === 'red' ? 'rgba(239,68,68,0.15)' : color === 'green' ? 'rgba(34,197,94,0.15)' : 'rgba(234,179,8,0.15)',
    color: color === 'red' ? '#ef4444' : color === 'green' ? '#22c55e' : '#eab308',
    padding: '2px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 600
  }}>{text}</span>
)

// ─── Sub-panels ───────────────────────────────────────────────────────────────

const UsersPanel = ({ token }) => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    axios.get(`${backendUrl}/api/admin/users`, { headers: { token } })
      .then(r => { if (r.data.success) setUsers(r.data.users) })
  }, [])

  const toggle = async (id, banned) => {
    const url = `${backendUrl}/api/admin/${banned ? 'unban' : 'ban'}-user/${id}`
    const { data } = await axios.put(url, {}, { headers: { token } })
    if (data.success) {
      setUsers(prev => prev.map(u => u._id === id ? { ...u, isBanned: !banned } : u))
      toast.success(data.message)
    }
  }

  return (
    <div>
      <h2 style={{ color: colors.text, marginBottom: 20 }}>👤 All Users</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: colors.text, fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
              {['Image','Name','Email','Status','Action'].map(h =>
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', color: colors.muted, fontWeight: 500 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} style={{ borderBottom: `1px solid ${colors.border}` }}>
                <td style={{ padding: '12px 16px' }}>
                  <img src={u.image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(u.name)} alt="" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                </td>
                <td style={{ padding: '12px 16px' }}>{u.name}</td>
                <td style={{ padding: '12px 16px', color: colors.muted }}>{u.email}</td>
                <td style={{ padding: '12px 16px' }}>{u.isBanned ? badge('red','Banned') : badge('green','Active')}</td>
                <td style={{ padding: '12px 16px' }}>
                  <button onClick={() => toggle(u._id, u.isBanned)} style={{
                    padding: '6px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                    background: u.isBanned ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                    color: u.isBanned ? '#22c55e' : '#ef4444'
                  }}>{u.isBanned ? 'Unban' : 'Ban'}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && <p style={{ color: colors.muted, textAlign: 'center', marginTop: 32 }}>No users found.</p>}
      </div>
    </div>
  )
}

const CompaniesPanel = ({ token }) => {
  const [companies, setCompanies] = useState([])
  useEffect(() => {
    axios.get(`${backendUrl}/api/admin/companies`, { headers: { token } })
      .then(r => { if (r.data.success) setCompanies(r.data.companies) })
  }, [])

  const toggle = async (id, banned) => {
    const url = `${backendUrl}/api/admin/${banned ? 'unban' : 'ban'}-company/${id}`
    const { data } = await axios.put(url, {}, { headers: { token } })
    if (data.success) {
      setCompanies(prev => prev.map(c => c._id === id ? { ...c, isBanned: !banned } : c))
      toast.success(data.message)
    }
  }

  return (
    <div>
      <h2 style={{ color: colors.text, marginBottom: 20 }}>🏢 All Companies</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: colors.text, fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
              {['Logo','Name','Email','Status','Action'].map(h =>
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', color: colors.muted, fontWeight: 500 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {companies.map(c => (
              <tr key={c._id} style={{ borderBottom: `1px solid ${colors.border}` }}>
                <td style={{ padding: '12px 16px' }}>
                  <img src={c.image} alt="" style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover' }} />
                </td>
                <td style={{ padding: '12px 16px', fontWeight: 500 }}>{c.name}</td>
                <td style={{ padding: '12px 16px', color: colors.muted }}>{c.email}</td>
                <td style={{ padding: '12px 16px' }}>{c.isBanned ? badge('red','Banned') : badge('green','Active')}</td>
                <td style={{ padding: '12px 16px' }}>
                  <button onClick={() => toggle(c._id, c.isBanned)} style={{
                    padding: '6px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                    background: c.isBanned ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                    color: c.isBanned ? '#22c55e' : '#ef4444'
                  }}>{c.isBanned ? 'Unban' : 'Ban'}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {companies.length === 0 && <p style={{ color: colors.muted, textAlign: 'center', marginTop: 32 }}>No companies found.</p>}
      </div>
    </div>
  )
}

const NewsPanel = ({ token }) => {
  const [newsList, setNewsList] = useState([])
  const [form, setForm] = useState({ title: '', content: '', category: 'news', imageUrl: '' })
  const [submitting, setSubmitting] = useState(false)

  const fetchNews = () => {
    axios.get(`${backendUrl}/api/admin/news`)
      .then(r => { if (r.data.success) setNewsList(r.data.news) })
  }
  useEffect(fetchNews, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const { data } = await axios.post(`${backendUrl}/api/admin/news`, form, { headers: { token } })
    if (data.success) { toast.success('Published!'); setForm({ title: '', content: '', category: 'news', imageUrl: '' }); fetchNews() }
    else toast.error(data.message)
    setSubmitting(false)
  }

  const handleDelete = async (id) => {
    const { data } = await axios.delete(`${backendUrl}/api/admin/news/${id}`, { headers: { token } })
    if (data.success) { toast.success('Deleted'); fetchNews() }
  }

  const inputStyle = {
    width: '100%', padding: '10px 14px', boxSizing: 'border-box', marginBottom: 14,
    background: 'rgba(255,255,255,0.06)', border: `1px solid ${colors.border}`,
    borderRadius: 10, color: colors.text, fontSize: 14, outline: 'none'
  }

  return (
    <div>
      <h2 style={{ color: colors.text, marginBottom: 20 }}>📰 News & Journals</h2>

      {/* Add Form */}
      <form onSubmit={handleAdd} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: 24, marginBottom: 32, border: `1px solid ${colors.border}` }}>
        <h3 style={{ color: colors.text, marginTop: 0, marginBottom: 16, fontSize: 15 }}>Publish New Article</h3>
        <input style={inputStyle} placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        <textarea style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }} placeholder="Content..." value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required />
        <input style={inputStyle} placeholder="Image URL (optional)" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
        <select style={inputStyle} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
          <option value="news">📰 News</option>
          <option value="journal">📘 Journal</option>
        </select>
        <button type="submit" disabled={submitting} style={{
          padding: '10px 28px', background: colors.accent, border: 'none', borderRadius: 10,
          color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer'
        }}>{submitting ? 'Publishing...' : 'Publish'}</button>
      </form>

      {/* List */}
      <div style={{ display: 'grid', gap: 16 }}>
        {newsList.map(n => (
          <div key={n._id} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${colors.border}`, borderRadius: 14, padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                <span style={{ color: colors.text, fontWeight: 600 }}>{n.title}</span>
                {n.category === 'journal' ? badge('yellow','Journal') : badge('green','News')}
              </div>
              <p style={{ color: colors.muted, fontSize: 13, margin: 0 }}>{n.content.slice(0, 120)}...</p>
            </div>
            <button onClick={() => handleDelete(n._id)} style={{
              marginLeft: 16, padding: '6px 14px', background: 'rgba(239,68,68,0.15)',
              color: '#ef4444', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13, flexShrink: 0
            }}>Delete</button>
          </div>
        ))}
        {newsList.length === 0 && <p style={{ color: colors.muted, textAlign: 'center' }}>No articles yet.</p>}
      </div>
    </div>
  )
}

const ReportsPanel = ({ token }) => {
  const [reports, setReports] = useState([])

  const fetchReports = () => {
    axios.get(`${backendUrl}/api/admin/reports`, { headers: { token } })
      .then(r => { if (r.data.success) setReports(r.data.reports) })
  }
  useEffect(fetchReports, [])

  const resolve = async (id) => {
    const { data } = await axios.put(`${backendUrl}/api/admin/reports/${id}/resolve`, {}, { headers: { token } })
    if (data.success) { toast.success('Marked as resolved'); fetchReports() }
  }

  return (
    <div>
      <h2 style={{ color: colors.text, marginBottom: 20 }}>🚨 Reports</h2>
      <div style={{ display: 'grid', gap: 14 }}>
        {reports.map(r => (
          <div key={r._id} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${colors.border}`, borderRadius: 14, padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ marginBottom: 6, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ color: colors.text, fontWeight: 600 }}>Reported {r.targetType}: <em>{r.targetName || r.targetId}</em></span>
                {r.status === 'pending' ? badge('red','Pending') : badge('green','Resolved')}
              </div>
              <p style={{ color: colors.muted, fontSize: 13, margin: '0 0 4px' }}>
                <strong style={{ color: colors.text }}>Reason:</strong> {r.reason}
              </p>
              <p style={{ color: colors.muted, fontSize: 12, margin: 0 }}>
                Reported by {r.reportedByType} • {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </div>
            {r.status === 'pending' && (
              <button onClick={() => resolve(r._id)} style={{
                marginLeft: 16, padding: '7px 16px', background: 'rgba(34,197,94,0.15)',
                color: '#22c55e', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13, flexShrink: 0
              }}>Resolve</button>
            )}
          </div>
        ))}
        {reports.length === 0 && <p style={{ color: colors.muted, textAlign: 'center' }}>No reports yet.</p>}
      </div>
    </div>
  )
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

const TABS = [
  { key: 'users', label: '👤 Users' },
  { key: 'companies', label: '🏢 Companies' },
  { key: 'news', label: '📰 News & Journals' },
  { key: 'reports', label: '🚨 Reports' },
]

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [tab, setTab] = useState('users')
  const token = localStorage.getItem('adminToken')

  useEffect(() => {
    if (!token) navigate('/admin/login')
  }, [])

  const logout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: colors.bg, fontFamily: 'Inter, sans-serif' }}>

      {/* Sidebar */}
      <aside style={{ width: 240, background: colors.sidebar, borderRight: `1px solid ${colors.border}`, padding: '28px 0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '0 24px 28px', borderBottom: `1px solid ${colors.border}` }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: colors.text }}>🛡️ GIZMO</div>
          <div style={{ fontSize: 12, color: colors.muted, marginTop: 4 }}>Admin Panel</div>
        </div>
        <nav style={{ flex: 1, paddingTop: 16 }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '12px 24px', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500,
              background: tab === t.key ? 'rgba(233,69,96,0.12)' : 'transparent',
              color: tab === t.key ? colors.accent : colors.muted,
              borderLeft: tab === t.key ? `3px solid ${colors.accent}` : '3px solid transparent',
              transition: 'all 0.15s'
            }}>{t.label}</button>
          ))}
        </nav>
        <button onClick={logout} style={{
          margin: '0 16px 8px', padding: '10px 16px', background: 'rgba(239,68,68,0.1)',
          border: 'none', borderRadius: 10, color: '#ef4444', fontSize: 13, fontWeight: 600, cursor: 'pointer'
        }}>🚪 Logout</button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '36px 40px', overflowY: 'auto' }}>
        {tab === 'users'     && <UsersPanel token={token} />}
        {tab === 'companies' && <CompaniesPanel token={token} />}
        {tab === 'news'      && <NewsPanel token={token} />}
        {tab === 'reports'   && <ReportsPanel token={token} />}
      </main>
    </div>
  )
}

export default AdminDashboard
