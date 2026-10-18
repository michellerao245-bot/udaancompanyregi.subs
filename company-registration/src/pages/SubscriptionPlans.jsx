import React, { useEffect, useState } from 'react';  
import { useNavigate } from 'react-router-dom';  
import { getPlans } from '../services/subscriptionService';  
import { useRegistration } from '../context/RegistrationContext';  
import PlanCard from '../components/PlanCard';  
 
const SubscriptionPlans = () => {  
  const [plans, setPlans] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const { setSelectedPlan } = useRegistration();  
  const navigate = useNavigate();  
 
  useEffect(() => {  
    const fetchPlans = async () => {  
      try {  
        const data = await getPlans();  
        setPlans(data);  
      } catch (error) {  
        console.error("Error fetching plans:", error);  
        setPlans([  
          {   
            id: 1,   
            name: 'Basic',   
            price: 9999,   
            duration: '1 Month',  
            description: 'Perfect for small businesses',  
            features: ['50 Salesman Accounts', '100 Products', '25 Distributor', 'Basic Reports', 'Email Support']  
          },  
          {   
            id: 2,   
            name: 'Growth',   
            price: 14999,   
            duration: '1 Month',  
            description: 'Best for growing companies',  
            features: ['100 Salesman Accounts', '500 Products', '50 Distributors', 'Advanced Reports', 'Live Tracking', 'Priority Support']  
          },  
          {   
            id: 3,   
            name: 'Enterprise',   
            price: 24999,   
            duration: '1 Month',  
            description: 'For large scale operations',  
            features: ['Unlimited Salesman', 'Unlimited Products', 'Unlimited Distributors', 'Custom Reports', '24/7 Support']  
          }  
        ]);  
      } finally {  
        setLoading(false);  
      }  
    };  
    fetchPlans();  
  }, []);  
 
  const handleSelectPlan = (plan) => {  
    setSelectedPlan(plan);  
    navigate('/register-company');  
  };  
 
  if (loading) {  
    return (  
      <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '20px', fontWeight: 'bold' }}>  
        Loading Plans...  
      </div>  
    );  
  }  
 
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
        alignItems: 'center'  
      }} 
    >  
      <div  
        style={{  
          backgroundColor: 'rgba(30, 41, 59, 0.85)',  
          backdropFilter: 'blur(16px)', 
          border: '1px solid rgba(255, 255, 255, 0.1)',  
          borderRadius: '24px',  
          padding: '40px 30px',  
          maxWidth: '1100px',  
          width: '100%',  
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)'  
        }} 
      >  
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>  
          <h1 style={{ color: '#38bdf8', fontSize: '48px', fontWeight: '900', margin: '0', letterSpacing: '-1px', lineHeight: '1' }}>  
            UDAAN  
          </h1>  
           
          {/* Yahan letter-spacing ko theek kar diya hai */} 
          <p style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '800', letterSpacing: '0.99em', textTransform: 'uppercase', margin: '6px 0 16px 6px' }}>  
            FAST TRACK  
          </p> 
 
          <h2 style={{ color: '#ffffff', fontSize: '26px', fontWeight: '800', margin: '0 0 10px 0' }}>  
            Choose Your Subscription Plan  
          </h2>  
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>  
            Select the best plan tailored for your FMCG business growth.  
          </p>  
        </div>  
 
        <div  
          style={{  
            display: 'flex',  
            flexDirection: 'row',  
            flexWrap: 'wrap',  
            justifyContent: 'center',  
            alignItems: 'stretch', 
            gap: '24px'  
          }} 
        >  
          {plans.map((plan) => (  
            <PlanCard   
              key={plan.id}   
              plan={plan}   
              onSelect={() => handleSelectPlan(plan)}   
            />  
          ))}  
        </div>  
 
        <div style={{ textAlign: 'center', marginTop: '35px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8', fontSize: '13px' }}>  
          🔒 Secure payment • 7-day money back guarantee  
        </div>  
 
      </div>  
    </div>  
  );  
};  
 
export default SubscriptionPlans;