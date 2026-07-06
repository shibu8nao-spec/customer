'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function login() {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      window.location.href = '/calculator'
    } else {
      setError('パスワードが違います')
    }
  }

  return (
    <main style={mainStyle}>
      <h1>ログイン</h1>

      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />

      <button onClick={login} style={buttonStyle}>
        ログイン
      </button>

      {error && <p style={{ color: '#ef4444' }}>{error}</p>}
    </main>
  )
}

const mainStyle = {
  padding: 40,
  background: '#111',
  color: 'white',
  minHeight: '100vh',
}

const inputStyle = {
  display: 'block',
  width: 320,
  padding: 12,
  marginBottom: 12,
  background: '#1a1a1a',
  border: '1px solid #333',
  borderRadius: 8,
  color: 'white',
}

const buttonStyle = {
  padding: '12px 20px',
  background: '#7c3aed',
  border: 'none',
  borderRadius: 8,
  color: 'white',
  cursor: 'pointer',
}