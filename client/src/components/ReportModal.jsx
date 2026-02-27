import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const backendUrl = import.meta.env.VITE_BACKEND_URL

const ReportModal = ({ reportedBy, reportedByType, targetId, targetType, targetName, onClose }) => {
  const [reason, setReason] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!reason.trim()) return toast.error('Please provide a reason.')
    setSubmitting(true)
    try {
      const { data } = await axios.post(`${backendUrl}/api/reports`, {
        reportedBy, reportedByType, targetId, targetType, targetName, reason
      })
      if (data.success) {
        toast.success('Report submitted. Our team will review it.')
        onClose()
      } else {
        toast.error(data.message)
      }
    } catch {
      toast.error('Failed to submit report.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }} onClick={onClose}>
      <div style={{
        background: '#1e293b', borderRadius: 18, padding: 32, width: '100%', maxWidth: 440,
        border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ margin: 0, color: '#f1f5f9', fontSize: 18 }}>🚨 Report {targetType}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 22, cursor: 'pointer' }}>×</button>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 0, marginBottom: 20 }}>
          Reporting: <strong style={{ color: '#f1f5f9' }}>{targetName || targetId}</strong>
        </p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={reason}
            onChange={e => setReason(e.target.value)}
            rows={4}
            placeholder="Describe the issue (e.g. fake job posting, scam, inappropriate content...)"
            required
            style={{
              width: '100%', padding: '12px 14px', boxSizing: 'border-box',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10, color: '#f1f5f9', fontSize: 14, outline: 'none',
              resize: 'vertical', marginBottom: 20
            }}
          />
          <div style={{ display: 'flex', gap: 12 }}>
            <button type="button" onClick={onClose} style={{
              flex: 1, padding: '11px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)',
              background: 'transparent', color: 'rgba(255,255,255,0.6)', fontWeight: 600, cursor: 'pointer'
            }}>Cancel</button>
            <button type="submit" disabled={submitting} style={{
              flex: 1, padding: '11px', borderRadius: 10, border: 'none',
              background: '#e94560', color: '#fff', fontWeight: 600, fontSize: 14,
              cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1
            }}>{submitting ? 'Submitting...' : 'Submit Report'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReportModal
