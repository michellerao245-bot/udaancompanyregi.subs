import React from 'react';   
import { useNavigate } from 'react-router-dom';   
import { useRegistration } from '../context/RegistrationContext';   
import RegistrationForm from '../components/RegistrationForm';   
import ProgressSteps from '../components/ProgressSteps';   
  
const RegisterCompany = () => {   
  const { setCompanyData } = useRegistration();   
  const navigate = useNavigate();   
  
  const handleFormSubmit = (data) => {   
    setCompanyData(data);   
    navigate('/checkout'); // Payment / Checkout page par le jao   
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
          maxWidth: '700px',    
          width: '100%',    
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)'    
        }}   
      >   
        {/* Header Branding */}   
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>   
          <h1 style={{ color: '#38bdf8', fontSize: '42px', fontWeight: '900', margin: '0', letterSpacing: '-1px', lineHeight: '1' }}>    
            UDAAN    
          </h1>    
          <p style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '800', letterSpacing: '0.99em', textTransform: 'uppercase', margin: '6px 0 20px 6px' }}>    
            FAST TRACK    
          </p>   
        </div>   
  
        {/* Progress Steps */}   
        <div style={{ marginBottom: '20px' }}>   
          <ProgressSteps currentStep={2} />   
        </div>   
  
        {/* Form Component */}   
        <RegistrationForm onSubmit={handleFormSubmit} />   
      </div>   
    </div>   
  );   
};   
  
export default RegisterCompany;