import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const backendUrl = import.meta.env.VITE_BACKEND_URL

const olive = {
  dark:   '#4a5a1e',
  main:   '#6b7a2f',
  mid:    '#8a9a45',
  light:  '#c8d48a',
  pale:   '#f0f4e0',
  bg:     '#ffffff',
}

const AdminLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password })
      if (data.success) {
        localStorage.setItem('adminToken', data.token)
        toast.success('Admin login successful!')
        navigate('/admin/dashboard')
      } else {
        toast.error(data.message)
      }
    } catch {
      toast.error('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: olive.bg,
    }}>
      {/* Decorative olive blobs */}
      <div style={{ position: 'fixed', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: olive.pale, zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: -100, left: -80, width: 360, height: 360, borderRadius: '50%', background: olive.pale, zIndex: 0 }} />

      <div style={{
        position: 'relative', zIndex: 1,
        background: '#fff',
        border: `1.5px solid ${olive.light}`,
        borderRadius: 24,
        padding: '48px 40px',
        width: '100%',
        maxWidth: 420,
        boxShadow: '0 8px 40px rgba(107,122,47,0.12)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 64, height: 64,
            background: `linear-gradient(135deg, ${olive.mid}, ${olive.dark})`,
            borderRadius: 16,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, marginBottom: 14, boxShadow: `0 4px 16px rgba(107,122,47,0.3)`
          }}>🛡️</div>
          <h1 style={{ color: olive.dark, fontSize: 24, fontWeight: 700, margin: 0 }}>GIZMO Admin</h1>
          <p style={{ color: olive.mid, fontSize: 14, marginTop: 6 }}>Super Admin Portal</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ color: olive.dark, fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="admin@gizmo.com"
              style={{
                width: '100%', padding: '12px 16px', boxSizing: 'border-box',
                background: olive.pale, border: `1.5px solid ${olive.light}`,
                borderRadius: 10, color: olive.dark, fontSize: 14, outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={{ color: olive.dark, fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: '100%', padding: '12px 16px', boxSizing: 'border-box',
                background: olive.pale, border: `1.5px solid ${olive.light}`,
                borderRadius: 10, color: olive.dark, fontSize: 14, outline: 'none'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '14px',
              background: loading ? olive.mid : `linear-gradient(135deg, ${olive.main}, ${olive.dark})`,
              border: 'none', borderRadius: 10,
              color: '#fff', fontSize: 15, fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: `0 4px 14px rgba(107,122,47,0.3)`,
              transition: 'all 0.2s'
            }}
          >
            {loading ? 'Logging in...' : 'Login as Admin'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
