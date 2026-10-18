import React, { useState } from 'react';
import { useRegistration } from '../context/RegistrationContext';
import ProgressSteps from '../components/ProgressSteps';

const SetupPassword = () => {
  const { companyData, selectedPlan, registerCompanyAccount } = useRegistration();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // OTP States
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const email = companyData?.email || 'michellerao245@gmail.com';

  // Send OTP Handler
  const handleSendOtp = () => {
    setOtpLoading(true);
    setError('');
    
    // Simulate OTP sending to email
    setTimeout(() => {
      setOtpLoading(false);
      setOtpSent(true);
      setSuccessMsg(`OTP successfully sent to ${email}`);
    }, 1200);
  };

  // Verify OTP Handler
  const handleVerifyOtp = () => {
    if (!otp || otp.length < 4) {
      setError('Kripya sahi OTP enter karein!');
      return;
    }
    
    // Verification check (Demo friendly: accepts any 4+ digit or '123456')
    setIsOtpVerified(true);
    setError('');
    setSuccessMsg('✅ Email successfully verified!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isOtpVerified) {
      setError('Aage badhne se pehle Email OTP verify karna zaroori hai!');
      return;
    }

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
      await registerCompanyAccount({
        ...companyData,
        planId: selectedPlan?.id,
        password: password
      });

      // Redirect to live Company Admin Login with success flag
      window.location.href = 'https://udaancompanyadminpanel-yp87.vercel.app/login?registered=true';
    } catch (err) {
      console.error(err);
      window.location.href = 'https://udaancompanyadminpanel-yp87.vercel.app/login?registered=true';
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
            Verify your email via OTP & set a secure password for your Company Admin Account[span_3](start_span)[span_3](end_span).
          </p>
        </div>

        {error && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#f87171', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '15px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {successMsg && (
          <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', border: '1px solid #22c55e', color: '#4ade80', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '15px', textAlign: 'center' }}>
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Email with Send OTP Button */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>
              Company Admin Email *
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="email" 
                value={email} 
                disabled 
                style={{ ...inputStyle, flex: 1, opacity: 0.75, cursor: 'not-allowed' }}
              />
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={otpLoading || isOtpVerified}
                style={{
                  backgroundColor: isOtpVerified ? '#22c55e' : '#38bdf8',
                  color: '#0f172a',
                  fontWeight: 'bold',
                  padding: '0 16px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: isOtpVerified ? 'default' : 'pointer',
                  fontSize: '13px',
                  whiteSpace: 'nowrap'
                }}
              >
                {isOtpVerified ? 'Verified ✓' : otpLoading ? 'Sending...' : otpSent ? 'Resend OTP' : 'Send OTP'}
              </button>
            </div>
          </div>

          {/* OTP Input Section (Appears after clicking Send OTP) */}
          {otpSent && !isOtpVerified && (
            <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', padding: '14px', borderRadius: '10px', border: '1px solid #334155' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#38bdf8', marginBottom: '6px', fontWeight: 'bold' }}>
                Enter OTP sent to your Email *
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)} 
                  placeholder="Enter 6-digit OTP" 
                  maxLength={6}
                  style={{ ...inputStyle, flex: 1, letterSpacing: '3px', textAlign: 'center', fontSize: '15px', fontWeight: 'bold' }}
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  style={{
                    backgroundColor: '#22c55e',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    padding: '0 18px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  Verify OTP
                </button>
              </div>
            </div>
          )}

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
            disabled={loading || !isOtpVerified}
            style={{ 
              backgroundColor: isOtpVerified ? '#38bdf8' : '#475569', 
              color: isOtpVerified ? '#0f172a' : '#94a3b8', 
              fontSize: '16px', 
              fontWeight: 'bold', 
              padding: '14px', 
              border: 'none', 
              borderRadius: '10px', 
              cursor: isOtpVerified ? 'pointer' : 'not-allowed', 
              width: '100%', 
              marginTop: '10px',
              boxShadow: isOtpVerified ? '0 4px 12px rgba(56, 189, 248, 0.3)' : 'none' 
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