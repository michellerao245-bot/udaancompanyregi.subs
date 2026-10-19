import React, { useState } from 'react'; 

const PaymentGatewayModal = ({ amount = 0, onSuccess, onClose }) => { 
  const [loading, setLoading] = useState(false); 
  const [payMethod, setPayMethod] = useState('upi'); 
  const [autoDebit, setAutoDebit] = useState(true); 
  const [error, setError] = useState(''); 

  // Mock Card Details State (Testing ke liye)
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
 
  const handlePayment = async (e) => { 
    e.preventDefault(); 
    setError(''); 
 
    if (!autoDebit) { 
      setError('Please authorize the recurring payment consent.'); 
      return; 
    } 
 
    if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) { 
      setError('Invalid payment amount. Please select a plan again.'); 
      return; 
    } 

    // Agar card method hai toh fields validate kar lo
    if (payMethod === 'card') {
      if (!cardNumber || cardNumber.length < 15) {
        setError('Please enter a valid card number.');
        return;
      }
      if (!expiry || !cvv) {
        setError('Please enter card expiry and CVV.');
        return;
      }
    }
 
    setLoading(true); 
 
    try { 
      // Testing / Mock Payment: Backend API call ko bypass karke direct success trigger kar rahe hain
      setTimeout(() => {
        setLoading(false);
        if (typeof onSuccess === 'function') {
          onSuccess(); // Yeh seedha SetupPassword page par le jayega
        }
      }, 1000);

    } catch (err) { 
      console.error('Payment error:', err); 
      setError('Unable to process payment. Please try again.'); 
      setLoading(false); 
    } 
  }; 
 
  return ( 
    <div 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="payment-modal-title" 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: 9999, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '16px', 
        backgroundColor: 'rgba(0, 0, 0, 0.75)', 
        backdropFilter: 'blur(4px)', 
      }} 
    > 
      <div 
        style={{ 
          backgroundColor: '#ffffff', 
          borderRadius: '20px', 
          maxWidth: '440px', 
          width: '100%', 
          overflow: 'hidden', 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', 
          color: '#1e293b', 
        }} 
      > 
        {/* Header */} 
        <div 
          style={{ 
            background: 'linear-gradient(135deg, #2563eb, #4338ca)', 
            padding: '16px 20px', 
            color: '#ffffff', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
          }} 
        > 
          <div> 
            <h3 
              id="payment-modal-title" 
              style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }} 
            > 
              Subscription Payment (Testing Mode) 
            </h3> 
            <p style={{ margin: '4px 0 0', fontSize: '12px' }}> 
              Amount: ₹{Number(amount).toFixed(2)} 
            </p> 
          </div> 
 
          <button 
            type="button" 
            onClick={onClose} 
            disabled={loading} 
            aria-label="Close payment dialog" 
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: '#ffffff', 
              fontSize: '20px', 
              cursor: loading ? 'not-allowed' : 'pointer', 
              padding: '4px', 
            }} 
          > 
            ✕ 
          </button> 
        </div> 
 
        {/* Payment method selection */} 
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}> 
          <button 
            type="button" 
            onClick={() => setPayMethod('card')} 
            disabled={loading} 
            style={{ 
              flex: 1, 
              padding: '12px', 
              fontSize: '14px', 
              fontWeight: 'bold', 
              border: 'none', 
              cursor: 'pointer', 
              backgroundColor: payMethod === 'card' ? '#eff6ff' : '#ffffff', 
              color: payMethod === 'card' ? '#2563eb' : '#64748b', 
              borderBottom: payMethod === 'card' ? '2px solid #2563eb' : 'none', 
            }} 
          > 
            💳 Card 
          </button> 
 
          <button 
            type="button" 
            onClick={() => setPayMethod('upi')} 
            disabled={loading} 
            style={{ 
              flex: 1, 
              padding: '12px', 
              fontSize: '14px', 
              fontWeight: 'bold', 
              border: 'none', 
              cursor: 'pointer', 
              backgroundColor: payMethod === 'upi' ? '#eff6ff' : '#ffffff', 
              color: payMethod === 'upi' ? '#2563eb' : '#64748b', 
              borderBottom: payMethod === 'upi' ? '2px solid #2563eb' : 'none', 
            }} 
          > 
            📱 UPI 
          </button> 
        </div> 
 
        <form 
          onSubmit={handlePayment} 
          style={{ 
            padding: '20px 24px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '14px', 
          }} 
        > 
          {/* Agar Card select kiya hai toh inputs dikhao */}
          {payMethod === 'card' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <input 
                type="text" 
                placeholder="Card Number (e.g. 4242 4242 4242)" 
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                style={inputStyle}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  placeholder="MM/YY" 
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  style={inputStyle}
                />
                <input 
                  type="password" 
                  placeholder="CVV" 
                  maxLength={4}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <input 
                type="text" 
                placeholder="Cardholder Name" 
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                style={inputStyle}
              />
            </div>
          )}

          {/* Agar UPI select kiya hai toh UPI ID box dikhao */}
          {payMethod === 'upi' && (
            <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <input 
                type="text" 
                placeholder="Enter UPI ID (e.g. username@oksbi)" 
                defaultValue="success@paytm"
                style={inputStyle}
              />
            </div>
          )}

          <div 
            style={{ 
              backgroundColor: '#f1f5f9', 
              padding: '10px 12px', 
              borderRadius: '10px', 
              border: '1px solid #e2e8f0', 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '10px', 
            }} 
          > 
            <input 
              type="checkbox" 
              id="autoDebitCheck" 
              checked={autoDebit} 
              onChange={(e) => setAutoDebit(e.target.checked)} 
              required 
              disabled={loading} 
              style={{ marginTop: '3px', cursor: 'pointer' }} 
            /> 
 
            <label 
              htmlFor="autoDebitCheck" 
              style={{ 
                fontSize: '12px', 
                color: '#475569', 
                cursor: 'pointer', 
                lineHeight: '1.4', 
              }} 
            > 
              <strong>Recurring payment consent (Test Mode)</strong> 
              <br /> 
              I agree to set up test recurring payment of ₹{Number(amount).toFixed(2)}.
            </label> 
          </div> 
 
          {error && ( 
            <div 
              role="alert" 
              style={{ 
                padding: '10px 12px', 
                backgroundColor: '#fef2f2', 
                border: '1px solid #fecaca', 
                borderRadius: '8px', 
                color: '#b91c1c', 
                fontSize: '13px', 
              }} 
            > 
              {error} 
            </div> 
          )} 
 
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
              cursor: loading || !autoDebit ? 'not-allowed' : 'pointer', 
              fontSize: '15px', 
              opacity: loading || !autoDebit ? 0.6 : 1, 
            }} 
          > 
            {loading 
              ? 'Processing Payment...' 
              : `Pay ₹${Number(amount).toFixed(2)}`} 
          </button> 
        </form> 
 
        {/* Footer */} 
        <div 
          style={{ 
            backgroundColor: '#f8fafc', 
            padding: '10px', 
            textAlign: 'center', 
            borderTop: '1px solid #e2e8f0', 
          }} 
        > 
          <p style={{ margin: 0, fontSize: '10px', color: '#64748b' }}> 
            Mock payment mode enabled for instant testing. 
          </p> 
        </div> 
      </div> 
    </div> 
  ); 
}; 

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: '6px',
  border: '1px solid #cbd5e1',
  fontSize: '13px',
  outline: 'none',
  boxSizing: 'border-box'
};
 
export default PaymentGatewayModal;