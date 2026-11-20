
import React, { useState } from 'react'

import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck
} from '../components/Icons.jsx'

import './Login.css'

function MicrosoftLogo() {
  return (
    <span className="microsoft-logo" aria-hidden="true">
      <span className="ms-red" />
      <span className="ms-green" />
      <span className="ms-blue" />
      <span className="ms-yellow" />
    </span>
  )
}

function BrandMark() {
  return (
    <div className="login-brand">
      <img
        src="/favicon.png"
        alt="De Heus Indonesia"
        className="login-brand-image"
      />
    </div>
  )
}

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Please enter your email address and password.')
      return
    }

    // Dummy login: accept any email and password.
    onLogin?.({
      email: email.trim(),
      name: email.trim().split('@')[0],
      provider: 'email'
    })
  }

  const handleMicrosoftLogin = () => {
    setError('')

    // Dummy Microsoft login.
    onLogin?.({
      email: 'demo@deheus.com',
      name: 'Demo User',
      provider: 'microsoft'
    })
  }

  return (
    <main className="login-page">

      {/* LEFT BRANDING PANEL */}
      <section className="login-brand-panel">

        <div className="login-panel-top">
          <BrandMark />

          <span className="panel-label">
            SALES INTELLIGENCE
          </span>
        </div>

        <div className="login-panel-content">

          <div className="panel-kicker">
            <span />
            DE HEUS SALES AGENT
          </div>

          <h1>
            Better insights.
            <br />
            <em>Smarter decisions.</em>
          </h1>

          <p>
            Access your customer, sales, and invoice
            insights through one intelligent conversation.
          </p>

          <div className="login-feature-list">

            <div>
              <span className="feature-check">
                <ShieldCheck size={17} />
              </span>

              <span>
                <strong>Business-ready insights</strong>
                <small>
                  Answers grounded in approved De Heus data.
                </small>
              </span>
            </div>

            <div>
              <span className="feature-check">
                <LockKeyhole size={17} />
              </span>

              <span>
                <strong>Secure access</strong>
                <small>
                  Your information follows your access permissions.
                </small>
              </span>
            </div>

          </div>
        </div>

        <div className="login-panel-footer">
          <span>De Heus Indonesia</span>
          <span>Internal use only</span>
        </div>

      </section>

      {/* RIGHT LOGIN PANEL */}
      <section className="login-form-panel">

        <div className="login-form-wrap">

          <div className="mobile-brand">
            <BrandMark />
          </div>

          <div className="login-heading">
            <div className="login-eyebrow">
              WELCOME BACK
            </div>

            <h2>Sign in to Sales Agent</h2>

            <p>
              Use your De Heus account to continue.
            </p>
          </div>

          {/* MICROSOFT LOGIN */}
          <button
            type="button"
            className="microsoft-button"
            onClick={handleMicrosoftLogin}
          >
            <MicrosoftLogo />
            <span>Continue with Microsoft</span>
          </button>

          <div className="login-divider">
            <span />
            <small>OR SIGN IN WITH EMAIL</small>
            <span />
          </div>

          {/* EMAIL LOGIN */}
          <form
            className="login-form"
            onSubmit={handleSubmit}
          >

            <label htmlFor="login-email">
              Email address
            </label>

            <div className="login-input-wrap">
              <Mail size={17} />

              <input
                id="login-email"
                type="email"
                autoComplete="username"
                placeholder="name@deheus.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="password-label-row">
              <label htmlFor="login-password">
                Password
              </label>
            </div>

            <div
              className="login-input-wrap"
              style={{ marginBottom: '20px' }}
            >
              <LockKeyhole size={17} />

              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? 'Hide password' : 'Show password'
                }
              >
                {showPassword
                  ? <EyeOff size={17} />
                  : <Eye size={17} />
                }
              </button>
            </div>

            {error && (
              <div className="login-error" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-submit"
            >
              Sign in
              <ArrowRight size={17} />
            </button>

          </form>

          <div className="login-security">
            <ShieldCheck size={15} />
            Your account and business data are protected.
          </div>

        </div>

        <footer className="login-footer">
          <span>
            © {new Date().getFullYear()} De Heus Indonesia
          </span>

          <span>
            Sales Agent · POC Environment
          </span>
        </footer>

      </section>

    </main>
  )
}
