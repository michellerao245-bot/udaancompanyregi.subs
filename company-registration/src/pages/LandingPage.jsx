import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "🏢 C&F & Distributor Management",
      desc: "Apne saare C&F distributors aur regional distributors ka network asani se manage karein aur unka stock track karein."
    },
    {
      title: "📦 Primary & Secondary Sales",
      desc: "Company se distributor tak ki primary sale aur distributor se retailer tak ki secondary sale ka poora data live dekhein."
    },
    {
      title: "📊 Stock & Inventory Control",
      desc: "Real-time stock tracking rakhein taaki kabhi bhi maal kam na ho aur expiry ya damage stock ka hisaab rahe."
    },
    {
      title: "🚶‍♂️ Salesman & Field Staff Tracking",
      desc: "Apne sales team aur field staff ki daily activities, visits, aur orders ko track karein aur performance badhayein."
    },
    {
      title: "📈 Schemes & Billing Automation",
      desc: "Market schemes, discounts, aur automated billing system se apne business ke operations ko fast aur error-free banayein."
    }
  ];

  return (
    <div 
      style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)', 
        minHeight: '100vh', 
        width: '100vw', 
        padding: '40px 20px', 
        boxSizing: 'border-box', 
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }} 
    >
      {/* Header / Branding */}
      <div style={{ textAlign: 'center', marginBottom: '40px', marginTop: '20px' }}>
        <h1 style={{ color: '#38bdf8', fontSize: '48px', fontWeight: '900', margin: '0', letterSpacing: '-1px' }}> 
          UDAAN FAST TRACK 
        </h1> 
        <p style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '800', letterSpacing: '0.8em', textTransform: 'uppercase', margin: '8px 0 0 6px' }}> 
          Complete FMCG Distribution & Sales Management Software 
        </p> 
      </div>

      {/* Main Hero Banner / Intro */}
      <div 
        style={{ 
          backgroundColor: 'rgba(30, 41, 59, 0.85)', 
          backdropFilter: 'blur(16px)', 
          border: '1px solid rgba(255, 255, 255, 0.1)', 
          borderRadius: '24px', 
          padding: '40px', 
          maxWidth: '900px', 
          width: '100%', 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
          textAlign: 'center',
          marginBottom: '40px'
        }}
      >
        <h2 style={{ fontSize: '28px', color: '#f8fafc', marginBottom: '15px' }}>
          Apne Business ko banayein Tez, Smart aur Profitable! 🚀
        </h2>
        <p style={{ fontSize: '16px', color: '#94a3b8', lineHeight: '1.6', maxWidth: '750px', margin: '0 auto 30px auto' }}>
          Hamara software ek hi jagah par aapki **Company, C&F Distributors, Salesmen, aur Retailers** ke poore network ko manage karne ki poori taqat deta hai. Primary/Secondary sales se lekar stock management tak sab kuch ab ek click par!
        </p>

        <button
          onClick={() => navigate('/plans')} // Yeh aapke plans page par le jayega
          style={{
            backgroundColor: '#38bdf8',
            color: '#0f172a',
            fontSize: '18px',
            fontWeight: 'bold',
            padding: '14px 40px',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 10px 25px -5px rgba(56, 189, 248, 0.4)',
            transition: 'all 0.3s ease'
          }}
        >
          GET PLAN 🚀
        </button>
      </div>

      {/* Features Grid */}
      <div style={{ maxWidth: '900px', width: '100%', marginBottom: '50px' }}>
        <h3 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '30px', color: '#e2e8f0' }}>
          Hamare Software me aapko kya-kya milta hai?
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {features.map((feat, index) => (
            <div 
              key={index}
              style={{
                backgroundColor: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
              }}
            >
              <h4 style={{ color: '#38bdf8', fontSize: '18px', marginBottom: '10px' }}>{feat.title}</h4>
              <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

LandingPage.displayName = 'LandingPage';

export default LandingPage;