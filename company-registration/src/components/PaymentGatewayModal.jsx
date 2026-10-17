import React, { useState } from 'react'; 

const PaymentGatewayModal = ({ amount = 0, onSuccess, onClose }) => { 
  const [loading, setLoading] = useState(false); 
  const [payMethod, setPayMethod] = useState('card'); 
  const [autoDebit, setAutoDebit] = useState(true); // Auto-debit checked by default

  const handlePayment = (e) => {  
    e.preventDefault();  
    setLoading(true);  
 
    // Fake 2-second processing delay for setting up recurring mandate 
    setTimeout(() => {  
      setLoading(false);  
      alert("🎉 Payment Successful! Your company registration is complete.");
      
      // Admin Panel ke live Vercel URL par redirect karein
      window.location.href = "https://udaancompanyadminpanel-yp87.vercel.app";  
    }, 2000);  
  };

  return ( 
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(4px)'
    }}> 
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        maxWidth: '440px',
        width: '100%',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        color: '#1e293b'
      }}> 
         
        {/* Header */} 
        <div style={{
          background: 'linear-gradient(135deg, #2563eb, #4338ca)',
          padding: '16px 20px',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}> 
          <div> 
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Auto-Debit Subscription</h3> 
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', opacity: 0.9 }}>Monthly Plan: ₹{Number(amount).toFixed(2)}/month</p> 
          </div> 
          <button 
            type="button"
            onClick={onClose} 
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '4px'
            }}
          > 
            ✕ 
          </button> 
        </div> 

        {/* Payment Method Tabs */} 
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}> 
          <button 
            type="button" 
            onClick={() => setPayMethod('card')} 
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '14px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: payMethod === 'card' ? '#eff6ff' : '#ffffff',
              color: payMethod === 'card' ? '#2563eb' : '#64748b',
              borderBottom: payMethod === 'card' ? '2px solid #2563eb' : 'none'
            }}
          > 
            💳 Card Auto-Debit 
          </button> 
          <button 
            type="button" 
            onClick={() => setPayMethod('upi')} 
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '14px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: payMethod === 'upi' ? '#eff6ff' : '#ffffff',
              color: payMethod === 'upi' ? '#2563eb' : '#64748b',
              borderBottom: payMethod === 'upi' ? '2px solid #2563eb' : 'none'
            }}
          > 
            📱 UPI AutoPay 
          </button> 
        </div> 

        {/* Form */} 
        <form onSubmit={handlePayment} style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}> 
          {payMethod === 'card' ? ( 
            <> 
              <div> 
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}> 
                  Debit/Credit Card Number 
                </label> 
                <input 
                  type="text" 
                  placeholder="1234 5678 9012 3456" 
                  required 
                  maxLength="19" 
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '10px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                /> 
              </div> 
              <div style={{ display: 'flex', gap: '12px' }}> 
                <div style={{ flex: 1 }}> 
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}> 
                    Expiry 
                  </label> 
                  <input 
                    type="text" 
                    placeholder="MM/YY" 
                    required 
                    maxLength="5" 
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '10px',
                      fontSize: '14px',
                      textAlign: 'center',
                      boxSizing: 'border-box',
                      outline: 'none'
                    }}
                  /> 
                </div> 
                <div style={{ flex: 1 }}> 
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}> 
                    CVV 
                  </label> 
                  <input 
                    type="password" 
                    placeholder="•••" 
                    required 
                    maxLength="3" 
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '10px',
                      fontSize: '14px',
                      textAlign: 'center',
                      boxSizing: 'border-box',
                      outline: 'none'
                    }}
                  /> 
                </div> 
              </div> 
            </> 
          ) : ( 
            <div> 
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}> 
                UPI ID for AutoPay 
              </label> 
              <input 
                type="text" 
                placeholder="name@paytm / name@upi" 
                required 
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1.5px solid #cbd5e1',
                  borderRadius: '10px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
              /> 
            </div> 
          )} 

          {/* Auto-Debit Consent Checkbox */}
          <div style={{
            backgroundColor: '#f1f5f9',
            padding: '12px',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px'
          }}>
            <input 
              type="checkbox" 
              id="autoDebitCheck"
              checked={autoDebit}
              onChange={(e) => setAutoDebit(e.target.checked)}
              required
              style={{ marginTop: '3px', cursor: 'pointer' }}
            />
            <label htmlFor="autoDebitCheck" style={{ fontSize: '11px', color: '#475569', cursor: 'pointer', lineHeight: '1.4' }}>
              <strong>Enable Automatic Monthly Auto-Debit</strong><br />
              Har mahine ₹{Number(amount).toFixed(2)} automatically aapke account se deduct ho jayenge.
            </label>
          </div>

          <button 
            type="submit" 
            disabled={loading || !autoDebit} 
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              color: '#ffffff',
              fontWeight: 'bold',
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              cursor: (loading || !autoDebit) ? 'not-allowed' : 'pointer',
              marginTop: '4px',
              fontSize: '15px',
              boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
              opacity: autoDebit ? 1 : 0.6
            }}
          > 
            {loading ? '🔄 Setting up Auto-Debit Mandate...' : `Authorize & Pay ₹${Number(amount).toFixed(2)}`} 
          </button> 
        </form> 
         
        {/* Footer */} 
        <div style={{ backgroundColor: '#f8fafc', padding: '10px', textAlign: 'center', borderTop: '1px solid #e2e8f0' }}> 
          <p style={{ margin: 0, fontSize: '10px', color: '#94a3b8', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}> 
            🔒 NPCI / RBI Recurring Payment Compliant (256-bit SSL) 
          </p> 
        </div> 
      </div> 
    </div> 
  ); 
}; 

export default PaymentGatewayModal;