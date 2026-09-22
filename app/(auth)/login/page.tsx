'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      })
      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }
      // If email confirmation is ON in Supabase settings, there's no session yet.
      const { data: sessionData } = await supabase.auth.getSession()
      if (!sessionData.session) {
        setError('Check your inbox to confirm your email, then sign in.')
        setMode('signin')
        setLoading(false)
        return
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }
    }

    router.refresh()
    router.push('/')
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <div style={styles.logo}>N</div>
        <h1 style={styles.title}>NEET Prep AI</h1>
        <p style={styles.subtitle}>
          {mode === 'signin' ? 'Welcome back' : 'Create your free account'}
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {mode === 'signup' && (
            <input
              style={styles.input}
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          {error && <div style={styles.error}>{error}</div>}

          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? 'Please wait…' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <button
          style={styles.switchLink}
          onClick={() => {
            setError('')
            setMode(mode === 'signin' ? 'signup' : 'signin')
          }}
        >
          {mode === 'signin'
            ? "Don't have an account? Sign up"
            : 'Already have an account? Sign in'}
        </button>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    minHeight: '100vh',
    background: '#0f1117',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Inter, system-ui, sans-serif',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    background: '#161b22',
    border: '1px solid #21262d',
    borderRadius: 16,
    padding: 32,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 14,
    background: 'linear-gradient(135deg,#58a6ff,#bc8cff)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    fontWeight: 900,
    color: '#fff',
    marginBottom: 16,
  },
  title: { color: '#f0f6fc', fontSize: 22, fontWeight: 700, margin: 0 },
  subtitle: { color: '#8b949e', fontSize: 14, marginTop: 6, marginBottom: 24 },
  form: { width: '100%', display: 'flex', flexDirection: 'column', gap: 12 },
  input: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 10,
    border: '1px solid #30363d',
    background: '#0d1117',
    color: '#f0f6fc',
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box',
  },
  button: {
    marginTop: 4,
    padding: '12px 14px',
    borderRadius: 10,
    border: 'none',
    background: 'linear-gradient(135deg,#58a6ff,#bc8cff)',
    color: '#fff',
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
  },
  error: {
    color: '#f85149',
    fontSize: 13,
    background: 'rgba(248,81,73,0.1)',
    padding: '8px 10px',
    borderRadius: 8,
  },
  switchLink: {
    marginTop: 18,
    background: 'none',
    border: 'none',
    color: '#58a6ff',
    fontSize: 13,
    cursor: 'pointer',
  },
}