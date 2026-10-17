import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRegistration } from '../context/RegistrationContext';

const RegistrationSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { companyData, selectedPlan, setCompanyData, setSelectedPlan } = useRegistration();
  
  const paymentId = location.state?.paymentId || 'N/A';

  // Confetti effect ya success animation ke liye useEffect use kar sakte ho
  useEffect(() => {
    // Yahan aap confetti library trigger kar sakte ho
    console.log("Registration Successful! Payment ID:", paymentId);
  }, [paymentId]);

  const handleGoToLogin = () => {
    // Context clear karo taaki naya registration fresh start ho
    setCompanyData(null);
    setSelectedPlan(null);
    // Yahan apne login page ka route daalo
    // navigate('/login'); 
    navigate('/'); // Abhi ke liye home pe bhej rahe hain
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#f0fdf4', // Light green background
      padding: '20px'
    }}>
      <div style={{ 
        backgroundColor: '#fff', 
        padding: '50px 40px', 
        borderRadius: '16px', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%',
        border: '1px solid #bbf7d0'
      }}>
        {/* Success Icon */}
        <div style={{ 
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#dcfce7',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto 20px auto',
          fontSize: '40px'
        }}>
          🎉
        </div>
        
        <h2 style={{ color: '#166534', marginBottom: '12px', fontSize: '28px' }}>
          Registration Successful!
        </h2>
        
        <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '16px', lineHeight: '1.5' }}>
          Badhai ho <strong>{companyData?.ownerName || 'Admin'}</strong>! <br />
          Aapki company <strong>{companyData?.companyName}</strong> ka registration safal ho gaya hai.
        </p>

        {/* Summary Box */}
        <div style={{ 
          backgroundColor: '#f8fafc', 
          padding: '20px', 
          borderRadius: '12px', 
          marginBottom: '30px',
          textAlign: 'left',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#64748b' }}>Plan:</span>
            <span style={{ fontWeight: 'bold', color: '#0f172a' }}>{selectedPlan?.name || 'N/A'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#64748b' }}>Payment ID:</span>
            <span style={{ fontWeight: 'bold', color: '#0f172a', fontSize: '12px' }}>{paymentId}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>Email:</span>
            <span style={{ fontWeight: 'bold', color: '#0f172a' }}>{companyData?.email || 'N/A'}</span>
          </div>
        </div>

        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
          Aapki login credentials aapke email par bhej di gayi hain. Kripya apna inbox check karein.
        </p>

        <button 
          onClick={handleGoToLogin}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#22c55e',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default RegistrationSuccess;