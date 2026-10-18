import React, { useState } from 'react';  
import { useNavigate } from 'react-router-dom';  
import { useRegistration } from '../context/RegistrationContext';  
import ProgressSteps from '../components/ProgressSteps';  
import PaymentGatewayModal from '../components/PaymentGatewayModal';  
  
const Checkout = () => {  
  const navigate = useNavigate();  
  const { selectedPlan, companyData, registrationData } = useRegistration();  
  const [showModal, setShowModal] = useState(false);  
  
  const plan = selectedPlan || { name: 'Basic', price: 9999, duration: '1 Month' };  
  const company = companyData || registrationData || { companyName: 'Marico COM' };  
  
  const basePrice = plan.price || 9999;  
  const gst = basePrice * 0.18;  
  const totalAmount = basePrice + gst;  
  
  const handleSuccess = () => {  
    setShowModal(false);  
    // Payment successful hote hi Step 5 (Create Password / Registration Success) page par le jao: 
    navigate('/setup-password');  
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
          maxWidth: '600px',   
          width: '100%',   
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)'   
        }}  
      >  
        {/* Header */}  
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>  
          <h1 style={{ color: '#38bdf8', fontSize: '42px', fontWeight: '900', margin: '0', letterSpacing: '-1px', lineHeight: '1' }}>   
            UDAAN   
          </h1>   
          <p style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '800', letterSpacing: '0.65em', textTransform: 'uppercase', margin: '6px 0 20px 6px' }}>   
            FAST TRACK   
          </p>  
  
          <ProgressSteps currentStep={3} />  
        </div>  
  
        {/* Order Summary */}  
        <div   
          style={{   
            backgroundColor: '#0f172a',   
            borderRadius: '16px',   
            padding: '24px',   
            border: '1px solid #334155',  
            marginTop: '20px'  
          }}  
        >  
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: '#f8fafc', borderBottom: '1px solid #334155', paddingBottom: '12px', marginTop: 0 }}>  
            Order Summary  
          </h2>  
  
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#cbd5e1' }}>  
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>  
              <span>Company:</span>  
              <strong style={{ color: '#ffffff' }}>{company.companyName || 'Marico COM'}</strong>  
            </div>  
              
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>  
              <span>Plan:</span>  
              <strong style={{ color: '#ffffff' }}>{plan.name || 'Basic'}</strong>  
            </div>  
  
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>  
              <span>Duration:</span>  
              <strong style={{ color: '#ffffff' }}>{plan.duration || '1 Month'}</strong>  
            </div>  
  
            <div style={{ height: '1px', backgroundColor: '#334155', margin: '8px 0' }}></div>  
  
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>  
              <span>Base Price:</span>  
              <span>₹{basePrice.toFixed(2)}</span>  
            </div>  
  
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>  
              <span>GST (18%):</span>  
              <span>₹{gst.toFixed(2)}</span>  
            </div>  
  
            <div style={{ height: '1px', backgroundColor: '#334155', margin: '8px 0' }}></div>  
  
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '800', color: '#ffffff' }}>  
              <span>Total Amount:</span>  
              <span style={{ color: '#38bdf8' }}>₹{totalAmount.toFixed(2)}</span>  
            </div>  
          </div>  
  
          {/* Pay Button - Opens Modal */}  
          <button   
            onClick={() => setShowModal(true)}  
            style={{   
              marginTop: '24px',  
              width: '100%',  
              background: 'linear-gradient(135deg, #16a34a, #15803d)',   
              color: '#ffffff',   
              padding: '14px',   
              borderRadius: '12px',   
              border: 'none',   
              fontWeight: '800',   
              fontSize: '16px',   
              cursor: 'pointer',  
              boxShadow: '0 4px 14px rgba(22, 163, 74, 0.4)',  
              transition: 'all 0.2s',  
              textTransform: 'uppercase'  
            }}  
          >  
            Pay ₹{totalAmount.toFixed(2)}  
          </button>  
        </div>  
  
      </div>  
  
      {/* Payment Gateway Modal Popup */}  
      {showModal && (  
        <PaymentGatewayModal   
          amount={totalAmount}  
          onSuccess={handleSuccess}  
          onClose={() => setShowModal(false)}  
        />  
      )}  
    </div>  
  );  
};

export default Checkout;