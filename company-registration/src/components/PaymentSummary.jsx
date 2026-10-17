import React from 'react';

const PaymentSummary = ({ plan, companyName, onPay, loading }) => {
  // Assuming plan has price and duration
  const gstRate = 0.18; // 18% GST
  const basePrice = plan ? plan.price : 0;
  const gstAmount = basePrice * gstRate;
  const totalAmount = basePrice + gstAmount;

  return (
    <div style={{ 
      border: '1px solid #e2e8f0', 
      borderRadius: '12px', 
      padding: '24px', 
      backgroundColor: '#fff',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      width: '100%',
      maxWidth: '400px'
    }}>
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
        Order Summary
      </h3>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#475569' }}>
        <span>Company:</span>
        <span style={{ fontWeight: '600', color: '#0f172a' }}>{companyName || 'N/A'}</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#475569' }}>
        <span>Plan:</span>
        <span style={{ fontWeight: '600', color: '#0f172a' }}>{plan ? plan.name : 'N/A'}</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#475569' }}>
        <span>Duration:</span>
        <span style={{ fontWeight: '600', color: '#0f172a' }}>{plan ? plan.duration : 'N/A'}</span>
      </div>

      <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '16px 0' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#475569' }}>
        <span>Base Price:</span>
        <span>₹{basePrice.toFixed(2)}</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#475569' }}>
        <span>GST (18%):</span>
        <span>₹{gstAmount.toFixed(2)}</span>
      </div>

      <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '16px 0' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', color: '#0f172a', fontWeight: 'bold', fontSize: '18px' }}>
        <span>Total Amount:</span>
        <span>₹{totalAmount.toFixed(2)}</span>
      </div>

      <button 
        onClick={onPay}
        disabled={loading}
        style={{
          width: '100%',
          padding: '14px',
          backgroundColor: loading ? '#94a3b8' : '#22c55e',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s'
        }}
      >
        {loading ? 'Processing...' : `Pay ₹${totalAmount.toFixed(2)}`}
      </button>
      
      <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', marginTop: '12px' }}>
        Secure payment powered by Razorpay/Stripe
      </p>
    </div>
  );
};

export default PaymentSummary;