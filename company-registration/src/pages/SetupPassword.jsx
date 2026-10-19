import React, { useState } from 'react';
import { useRegistration } from '../context/RegistrationContext';
import ProgressSteps from '../components/ProgressSteps';

const SetupPassword = () => {
  const registrationContext = useRegistration() || {};
  const { companyData, selectedPlan, registerCompanyAccount } = registrationContext;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const email = companyData?.email || 'globalindiaservices999@gmail.com';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || password.length < 6) {
      setError('Password kam se kam 6 characters ka hona chahiye!');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords match nahi kar rahe hain!');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Safe execution: Check if function exists before calling
      if (typeof registerCompanyAccount === 'function') {
        await registerCompanyAccount({
          ...companyData,
          planId: selectedPlan?.id,
          password: password
        });
      }
    } catch (err) {
      console.error("Registration error handled:", err);
    } finally {
      setLoading(false);
      // Direct redirect to Admin Panel
      window.location.href = 'https://udaancompanyadminpanel-yp87.vercel.app/?registered=true';
    }
  };

  return (
    <div 
      style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)', 
        minHeight: '100vh', 
        width: '100vw', 
        padding: '40px 20px', 
        boxSizing: 'border-box', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        color: '#ffffff'
      }}
    >
      <div 
        style={{ 
          backgroundColor: 'rgba(30, 41, 59, 0.85)', 
          backdropFilter: 'blur(16px)', 
          border: '1px solid rgba(255, 255, 255, 0.1)', 
          borderRadius: '24px', 
          padding: '40px 30px', 
          maxWidth: '550px', 
          width: '100%', 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)' 
        }}
      >
        {/* Header Branding */}
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <h1 style={{ color: '#38bdf8', fontSize: '42px', fontWeight: '900', margin: '0', letterSpacing: '-1px', lineHeight: '1' }}>
            UDAAN
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '800', letterSpacing: '0.99em', textTransform: 'uppercase', margin: '6px 0 20px 6px' }}>
            FAST TRACK
          </p>
        </div>

        {/* Progress Steps */}
        <div style={{ marginBottom: '25px' }}>
          <ProgressSteps currentStep={4} />
        </div>

        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <span style={{ fontSize: '36px' }}>🎉</span>
          <h2 style={{ color: '#ffffff', fontSize: '20px', fontWeight: '700', marginTop: '8px', marginBottom: '4px' }}>
            Payment Successful!
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
            Set a secure password for your Company Admin Account.
          </p>
        </div>

        {error && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#f87171', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '15px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Email Field */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>
              Company Admin Email
            </label>
            <input 
              type="email" 
              value={email} 
              readOnly 
              style={{ ...inputStyle, backgroundColor: 'rgba(15, 23, 42, 0.8)', color: '#94a3b8', cursor: 'default' }}
            />
          </div>

          {/* Password Fields */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>
              Create Password *
            </label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Minimum 6 characters" 
              required 
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>
              Confirm Password *
            </label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              placeholder="Re-enter password" 
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
              borderRadius: '10px', 
              cursor: 'pointer', 
              width: '100%', 
              marginTop: '10px',
              boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)' 
            }}
          >
            {loading ? 'Creating Account...' : 'Complete Setup & Sign In 🚀'}
          </button>
        </form>
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

export default SetupPassword;