import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { status, message } = location.state || { status: 'failed', message: 'Unknown error occurred' };

  const isSuccess = status === 'success';

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      padding: '20px'
    }}>
      <div style={{ 
        backgroundColor: '#fff', 
        padding: '40px', 
        borderRadius: '16px', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        textAlign: 'center',
        maxWidth: '450px',
        width: '100%'
      }}>
        {/* Icon */}
        <div style={{ 
          fontSize: '60px', 
          marginBottom: '20px',
          color: isSuccess ? '#22c55e' : '#ef4444'
        }}>
          {isSuccess ? '✅' : '❌'}
        </div>
        
        <h2 style={{ color: '#0f172a', marginBottom: '12px' }}>
          {isSuccess ? 'Payment Successful!' : 'Payment Failed'}
        </h2>
        
        <p style={{ color: '#64748b', marginBottom: '30px', fontSize: '16px' }}>
          {message || (isSuccess ? 'Aapka payment safaltapoorvak ho gaya hai.' : 'Kripya dobara prayas karein ya apne bank se sampark karein.')}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button 
            onClick={() => navigate('/')}
            style={{
              padding: '12px',
              backgroundColor: '#38bdf8',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            {isSuccess ? 'Go to Dashboard' : 'Try Again'}
          </button>
          
          {!isSuccess && (
            <button 
              onClick={() => navigate('/checkout')}
              style={{
                padding: '12px',
                backgroundColor: 'transparent',
                color: '#64748b',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Back to Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentResult;