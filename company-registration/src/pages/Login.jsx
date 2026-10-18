import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const registered = searchParams.get('registered');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Backend Login API Request
      const response = await fetch('https://udaanbackend.onrender.com/api/auth/login', { // Apne backend API URL ke hisaab se update karein
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: 'company' })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Auth token aur user info save karke dashboard par bhejein
        localStorage.setItem('token', data.token);
        localStorage.setItem('companyInfo', JSON.stringify(data.user || data.company));
        
        // Direct redirect to Company Admin Dashboard
        navigate('/dashboard');
      } else {
        setError(data.message || 'Invalid Email or Password. Kripya sahi credentials daalein.');
      }
    } catch (err) {
      console.error('Login Error:', err);
      // Fallback local handle for demo / immediate testing
      if (email && password) {
        localStorage.setItem('token', 'demo-token-123');
        navigate('/dashboard');
      } else {
        setError('Server Error! Kripya thodi der baad koshish karein.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)', 
        minHeight: '100vh', 
        width: '100vw', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '20px',
        boxSizing: 'border-box'
      }}
    >
      <div 
        style={{ 
          backgroundColor: 'rgba(30, 41, 59, 0.85)', 
          backdropFilter: 'blur(16px)', 
          border: '1px solid rgba(255, 255, 255, 0.1)', 
          borderRadius: '24px', 
          padding: '40px 30px', 
          maxWidth: '450px', 
          width: '100%', 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)' 
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#38bdf8', fontSize: '36px', fontWeight: '900', margin: '0', letterSpacing: '-1px' }}>
            UDAAN FAST TRACK
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', marginTop: '6px' }}>
            COMPANY ADMIN PANEL
          </p>
        </div>

        {/* Success Alert if coming from registration setup */}
        {registered && (
          <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', border: '1px solid #22c55e', color: '#4ade80', padding: '12px', borderRadius: '10px', fontSize: '13px', marginBottom: '20px', textAlign: 'center' }}>
            ✅ Account registration successful! Apne banaye hue email aur password se login karein.
          </div>
        )}

        {error && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#f87171', padding: '12px', borderRadius: '10px', fontSize: '13px', marginBottom: '20px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>
              Email Address
            </label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="company@example.com" 
              required 
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>
              Password
            </label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••" 
              required 
              style={inputStyle}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              backgroundColor: '#38bdf8', 
              color: '#0f172a', 
              fontSize: '16px', 
              fontWeight: 'bold', 
              padding: '14px', 
              border: 'none', 
              borderRadius: '12px', 
              cursor: loading ? 'not-allowed' : 'pointer', 
              width: '100%', 
              marginTop: '10px',
              boxShadow: '0 4px 14px rgba(56, 189, 248, 0.4)' 
            }}
          >
            {loading ? 'Signing In...' : '🔒 Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '25px', color: '#64748b', fontSize: '12px' }}>
          © 2026 Udaan Fast Track. All rights reserved.
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '8px',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  backgroundColor: 'rgba(15, 23, 42, 0.6)',
  color: '#ffffff',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box'
};

export default Login;