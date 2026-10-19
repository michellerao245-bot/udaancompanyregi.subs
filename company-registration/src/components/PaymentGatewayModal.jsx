import React, { useState } from 'react';
import api from '../services/api';

const PaymentGatewayModal = ({ amount = 0, onSuccess, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [payMethod, setPayMethod] = useState('upi');
  const [autoDebit, setAutoDebit] = useState(true);
  const [error, setError] = useState('');

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

    setLoading(true);

    try {
      // Request the backend to create a payment order.
      const response = await api.post('/payment/create-order', {
        amount: Number(amount),
        paymentMethod: payMethod,
        autoDebit: true,
      });

      const result = response.data;

      // Do not treat order creation as successful payment.
      if (!result || result.success !== true) {
        throw new Error(
          result?.message || 'Could not create the payment order.'
        );
      }

      // The backend must return the real gateway's checkout URL
      // after creating the order with the payment provider.
      if (result.checkoutUrl) {
        window.location.assign(result.checkoutUrl);
        return;
      }

      // Some gateways return checkout options instead of a URL.
      // Do not claim payment success without a real gateway flow.
      if (result.paymentUrl) {
        window.location.assign(result.paymentUrl);
        return;
      }

      setError(
        'Order created, but no payment checkout URL was returned. ' +
        'The backend payment gateway integration needs to be completed.'
      );
    } catch (err) {
      console.error('Payment order error:', err);

      setError(
        err.response?.data?.message ||
        err.message ||
        'Unable to start payment. Please try again.'
      );
    } finally {
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
              Subscription Payment
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
              borderBottom:
                payMethod === 'card' ? '2px solid #2563eb' : 'none',
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
              borderBottom:
                payMethod === 'upi' ? '2px solid #2563eb' : 'none',
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
          <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
            Continue to the payment provider's secure checkout to complete
            your payment.
          </p>

          <div
            style={{
              backgroundColor: '#f1f5f9',
              padding: '12px',
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
                lineHeight: '1.5',
              }}
            >
              <strong>Recurring payment consent</strong>
              <br />
              I agree to set up recurring payments of ₹
              {Number(amount).toFixed(2)} if supported by the payment provider.
              The provider will display the mandate terms for confirmation.
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
                overflowWrap: 'anywhere',
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
              marginTop: '4px',
              fontSize: '15px',
              opacity: loading || !autoDebit ? 0.6 : 1,
            }}
          >
            {loading
              ? 'Creating payment order...'
              : `Continue to Pay ₹${Number(amount).toFixed(2)}`}
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
          <p
            style={{
              margin: 0,
              fontSize: '10px',
              color: '#64748b',
            }}
          >
            Payment will be confirmed by the payment provider.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentGatewayModal;