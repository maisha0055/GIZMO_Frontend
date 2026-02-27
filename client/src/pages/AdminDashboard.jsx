import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const backendUrl = import.meta.env.VITE_BACKEND_URL

const ol = {
  dark:   '#4a5a1e',
  main:   '#6b7a2f',
  mid:    '#8a9a45',
  light:  '#c8d48a',
  pale:   '#f0f4e0',
  bdr:    '#dde7b0',
  bg:     '#ffffff',
  sidebar:'#f7faee',
  text:   '#1e2d00',
  muted:  '#7a8860',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const Badge = ({ type }) => {
  const styles = {
    banned:   { bg: '#fde8e8', color: '#c0392b', label: 'Banned' },
    active:   { bg: '#e8f5e9', color: '#2e7d32', label: 'Active' },
    pending:  { bg: '#fff3e0', color: '#e65100', label: 'Pending' },
    resolved: { bg: '#e8f5e9', color: '#2e7d32', label: 'Resolved' },
    news:     { bg: ol.pale,   color: ol.main,   label: '📰 News' },
    journal:  { bg: '#fef9e7', color: '#7d6608', label: '📘 Journal' },
  }
  const s = styles[type] || styles.active
  return (
    <span style={{ background: s.bg, color: s.color, padding: '3px 12px', borderRadius: 99, fontSize: 12, fontWeight: 600 }}>
      {s.label}
    </span>
  )
}

const Btn = ({ children, onClick, variant = 'primary', disabled, type = 'button' }) => {
  const styles = {
    primary:  { bg: '#4a5a1e', color: '#000', border: 'none' }, // Darker green with black text
    danger:   { bg: '#fde8e8', color: '#c0392b', border: 'none' },
    success:  { bg: '#e8f5e9', color: '#2e7d32', border: 'none' },
    ghost:    { bg: 'transparent', color: ol.muted, border: `1px solid ${ol.bdr}` },
  }
  const s = styles[variant] || styles.primary
  return (
    <button type={type} onClick={onClick} disabled={disabled} style={{
      padding: '10px 24px', borderRadius: 10, cursor: disabled ? 'not-allowed' : 'pointer',
      fontWeight: '700', fontSize: 14, opacity: disabled ? 0.6 : 1, transition: 'all 0.2s',
      boxShadow: variant === 'primary' ? '0 4px 12px rgba(74, 90, 30, 0.2)' : 'none',
      ...s
    }}
    onMouseEnter={e => { if(!disabled) e.currentTarget.style.filter = 'brightness(1.1)' }}
    onMouseLeave={e => { if(!disabled) e.currentTarget.style.filter = 'none' }}
    >{children}</button>
  )
}

const inputStyle = {
  width: '100%', padding: '10px 14px', boxSizing: 'border-box', marginBottom: 12,
  background: ol.pale, border: `1.5px solid ${ol.bdr}`,
  borderRadius: 10, color: ol.text, fontSize: 14, outline: 'none'
}

const Card = ({ children }) => (
  <div style={{ background: '#fff', border: `1.5px solid ${ol.bdr}`, borderRadius: 14, padding: 20, marginBottom: 14 }}>
    {children}
  </div>
)

const tableHead = ['', 'Name', 'Email', 'Status', 'Action']

// ─── Users Panel ─────────────────────────────────────────────────────────────
const UsersPanel = ({ token }) => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    axios.get(`${backendUrl}/api/admin/users`, { headers: { token } })
      .then(r => r.data.success && setUsers(r.data.users))
  }, [])

  const toggle = async (id, banned) => {
    const { data } = await axios.put(`${backendUrl}/api/admin/${banned ? 'unban' : 'ban'}-user/${id}`, {}, { headers: { token } })
    if (data.success) { setUsers(p => p.map(u => u._id === id ? { ...u, isBanned: !banned } : u)); toast.success(data.message) }
  }

  return (
    <div>
      <h2 style={{ color: ol.dark, marginBottom: 20, fontSize: 20 }}>👤 All Users</h2>
      <div style={{ overflowX: 'auto', background: '#fff', border: `1.5px solid ${ol.bdr}`, borderRadius: 14 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, color: ol.text }}>
          <thead>
            <tr style={{ background: ol.pale }}>
              {tableHead.map(h => <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: ol.muted, fontWeight: 600, borderBottom: `1px solid ${ol.bdr}` }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} style={{ borderBottom: `1px solid ${ol.pale}` }}>
                <td style={{ padding: '12px 16px' }}><img src={u.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=c8d48a&color=4a5a1e`} alt="" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} /></td>
                <td style={{ padding: '12px 16px', fontWeight: 500 }}>{u.name}</td>
                <td style={{ padding: '12px 16px', color: ol.muted }}>{u.email}</td>
                <td style={{ padding: '12px 16px' }}><Badge type={u.isBanned ? 'banned' : 'active'} /></td>
                <td style={{ padding: '12px 16px' }}><Btn variant={u.isBanned ? 'success' : 'danger'} onClick={() => toggle(u._id, u.isBanned)}>{u.isBanned ? 'Unban' : 'Ban'}</Btn></td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && <p style={{ color: ol.muted, textAlign: 'center', padding: 32 }}>No users found.</p>}
      </div>
    </div>
  )
}

// ─── Companies Panel ──────────────────────────────────────────────────────────
const CompaniesPanel = ({ token }) => {
  const [companies, setCompanies] = useState([])
  useEffect(() => {
    axios.get(`${backendUrl}/api/admin/companies`, { headers: { token } })
      .then(r => r.data.success && setCompanies(r.data.companies))
  }, [])

  const toggle = async (id, banned) => {
    const { data } = await axios.put(`${backendUrl}/api/admin/${banned ? 'unban' : 'ban'}-company/${id}`, {}, { headers: { token } })
    if (data.success) { setCompanies(p => p.map(c => c._id === id ? { ...c, isBanned: !banned } : c)); toast.success(data.message) }
  }

  return (
    <div>
      <h2 style={{ color: ol.dark, marginBottom: 20, fontSize: 20 }}>🏢 All Companies</h2>
      <div style={{ overflowX: 'auto', background: '#fff', border: `1.5px solid ${ol.bdr}`, borderRadius: 14 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, color: ol.text }}>
          <thead>
            <tr style={{ background: ol.pale }}>
              {tableHead.map(h => <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: ol.muted, fontWeight: 600, borderBottom: `1px solid ${ol.bdr}` }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {companies.map(c => (
              <tr key={c._id} style={{ borderBottom: `1px solid ${ol.pale}` }}>
                <td style={{ padding: '12px 16px' }}><img src={c.image} alt="" style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover' }} /></td>
                <td style={{ padding: '12px 16px', fontWeight: 500 }}>{c.name}</td>
                <td style={{ padding: '12px 16px', color: ol.muted }}>{c.email}</td>
                <td style={{ padding: '12px 16px' }}><Badge type={c.isBanned ? 'banned' : 'active'} /></td>
                <td style={{ padding: '12px 16px' }}><Btn variant={c.isBanned ? 'success' : 'danger'} onClick={() => toggle(c._id, c.isBanned)}>{c.isBanned ? 'Unban' : 'Ban'}</Btn></td>
              </tr>
            ))}
          </tbody>
        </table>
        {companies.length === 0 && <p style={{ color: ol.muted, textAlign: 'center', padding: 32 }}>No companies found.</p>}
      </div>
    </div>
  )
}

// ─── News Panel ───────────────────────────────────────────────────────────────
const NewsPanel = ({ token }) => {
  const [newsList, setNewsList] = useState([])
  const [form, setForm] = useState({ title: '', content: '', category: 'news', imageUrl: '' })
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const fetch = () => axios.get(`${backendUrl}/api/admin/news`).then(r => r.data.success && setNewsList(r.data.news))
  useEffect(() => { fetch() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault(); setSubmitting(true)
    const url = editingId ? `${backendUrl}/api/admin/news/${editingId}` : `${backendUrl}/api/admin/news`
    const method = editingId ? 'put' : 'post'
    
    const { data } = await axios[method](url, form, { headers: { token } })
    if (data.success) { 
      toast.success(editingId ? 'Updated!' : 'Published!'); 
      setForm({ title: '', content: '', category: 'news', imageUrl: '' }); 
      setEditingId(null);
      fetch() 
    }
    else toast.error(data.message)
    setSubmitting(false)
  }

  const handleEdit = (n) => {
    setEditingId(n._id)
    setForm({ title: n.title, content: n.content, category: n.category, imageUrl: n.imageUrl || '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setForm({ title: '', content: '', category: 'news', imageUrl: '' })
  }

  const del = async (id) => {
    if (!window.confirm('Delete this article?')) return
    const { data } = await axios.delete(`${backendUrl}/api/admin/news/${id}`, { headers: { token } })
    if (data.success) { toast.success('Deleted'); fetch() }
  }

  return (
    <div>
      <h2 style={{ color: ol.dark, marginBottom: 20, fontSize: 20 }}>📰 News & Journals</h2>

      {/* Form */}
      <div style={{ background: ol.pale, border: `1.5px solid ${ol.bdr}`, borderRadius: 16, padding: 24, marginBottom: 28 }}>
        <h3 style={{ color: ol.dark, margin: '0 0 16px', fontSize: 15, fontWeight: 700 }}>
          {editingId ? '📝 Edit Article' : 'Publish New Article'}
        </h3>
        <form onSubmit={handleSubmit}>
          <input style={inputStyle} placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <textarea style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }} placeholder="Content..." value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required />
          <input style={inputStyle} placeholder="Image URL (optional)" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
          <select style={inputStyle} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            <option value="news">📰 News</option>
            <option value="journal">📘 Journal</option>
          </select>
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn variant="primary" disabled={submitting}>{submitting ? 'Working...' : editingId ? 'Update Article' : 'Publish Article'}</Btn>
            {editingId && <Btn variant="ghost" onClick={cancelEdit}>Cancel</Btn>}
          </div>
        </form>
      </div>

      {/* List */}
      {newsList.map(n => (
        <Card key={n._id}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => handleEdit(n)}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontWeight: 700, color: ol.text }}>{n.title}</span>
                <Badge type={n.category} />
              </div>
              <p style={{ color: ol.muted, fontSize: 13, margin: '0 0 6px' }}>{n.content.slice(0, 130)}...</p>
              <p style={{ color: ol.light, fontSize: 12, margin: 0 }}>{new Date(n.createdAt).toLocaleDateString()}</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn variant="ghost" onClick={() => handleEdit(n)}>Edit</Btn>
              <Btn variant="danger" onClick={() => del(n._id)}>Delete</Btn>
            </div>
          </div>
        </Card>
      ))}
      {newsList.length === 0 && <p style={{ color: ol.muted, textAlign: 'center' }}>No articles yet.</p>}
    </div>
  )
}

// ─── Reports Panel ────────────────────────────────────────────────────────────
const ReportsPanel = ({ token }) => {
  const [reports, setReports] = useState([])

  const fetch = () => axios.get(`${backendUrl}/api/admin/reports`, { headers: { token } }).then(r => r.data.success && setReports(r.data.reports))
  useEffect(() => { fetch() }, [])

  const resolve = async (id) => {
    const { data } = await axios.put(`${backendUrl}/api/admin/reports/${id}/resolve`, {}, { headers: { token } })
    if (data.success) { toast.success('Resolved'); fetch() }
  }

  return (
    <div>
      <h2 style={{ color: ol.dark, marginBottom: 20, fontSize: 20 }}>🚨 Reports</h2>
      {reports.map(r => (
        <Card key={r._id}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontWeight: 700, color: ol.text }}>Reported {r.targetType}: <em>{r.targetName || r.targetId}</em></span>
                <Badge type={r.status} />
              </div>
              <p style={{ color: ol.muted, fontSize: 13, margin: '0 0 4px' }}><strong>Reason:</strong> {r.reason}</p>
              <p style={{ color: ol.light, fontSize: 12, margin: 0 }}>By {r.reportedByType} • {new Date(r.createdAt).toLocaleDateString()}</p>
            </div>
            {r.status === 'pending' && <Btn variant="success" onClick={() => resolve(r._id)}>Resolve</Btn>}
          </div>
        </Card>
      ))}
      {reports.length === 0 && <p style={{ color: ol.muted, textAlign: 'center' }}>No reports yet.</p>}
    </div>
  )
}

// ─── Dashboard Shell ──────────────────────────────────────────────────────────
const TABS = [
  { key: 'users',     label: '👤 Users' },
  { key: 'companies', label: '🏢 Companies' },
  { key: 'news',      label: '📰 News & Journals' },
  { key: 'reports',   label: '🚨 Reports' },
]

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [tab, setTab] = useState('users')
  const token = localStorage.getItem('adminToken')

  useEffect(() => { if (!token) navigate('/admin/login') }, [])

  const logout = () => { localStorage.removeItem('adminToken'); navigate('/admin/login') }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: ol.bg, fontFamily: 'Inter, sans-serif' }}>

      {/* Sidebar */}
      <aside style={{
        width: 240, background: ol.sidebar,
        borderRight: `1.5px solid ${ol.bdr}`,
        display: 'flex', flexDirection: 'column',
        padding: '28px 0'
      }}>
        {/* Brand */}
        <div style={{ padding: '0 24px 24px', borderBottom: `1px solid ${ol.bdr}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: `linear-gradient(135deg, ${ol.mid}, ${ol.dark})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18
            }}>🛡️</div>
            <div>
              <div style={{ fontWeight: 700, color: ol.dark, fontSize: 16 }}>GIZMO</div>
              <div style={{ fontSize: 11, color: ol.muted }}>Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, paddingTop: 16 }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '11px 24px', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500,
              background: tab === t.key ? '#e8f0c8' : 'transparent',
              color: tab === t.key ? ol.dark : ol.muted,
              borderLeft: tab === t.key ? `3px solid ${ol.main}` : '3px solid transparent',
              transition: 'all 0.15s'
            }}>{t.label}</button>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: '0 16px' }}>
          <button onClick={logout} style={{
            width: '100%', padding: '10px 16px',
            background: '#fde8e8', border: 'none', borderRadius: 10,
            color: '#c0392b', fontSize: 13, fontWeight: 700, cursor: 'pointer'
          }}>🚪 Logout</button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '36px 40px', overflowY: 'auto', background: ol.bg }}>
        {tab === 'users'     && <UsersPanel token={token} />}
        {tab === 'companies' && <CompaniesPanel token={token} />}
        {tab === 'news'      && <NewsPanel token={token} />}
        {tab === 'reports'   && <ReportsPanel token={token} />}
      </main>
    </div>
  )
}

export default AdminDashboard
