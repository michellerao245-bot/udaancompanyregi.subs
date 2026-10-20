import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlans } from '../services/subscriptionService';
import { useRegistration } from '../context/RegistrationContext';
import PlanCard from '../components/PlanCard';

const FALLBACK_PLANS = [
  {
    id: 1,
    name: 'Basic',
    price: 9999,
    duration: '1 Month',
    description: 'Perfect for small businesses',
    features: [
      '50 Salesman Accounts',
      '100 Products',
      '25 Distributors',
      'Basic Reports',
      'Email Support',
    ],
  },
  {
    id: 2,
    name: 'Growth',
    price: 14999,
    duration: '1 Month',
    description: 'Best for growing companies',
    features: [
      '100 Salesman Accounts',
      '500 Products',
      '50 Distributors',
      'Advanced Reports',
      'Live Tracking',
      'Priority Support',
    ],
  },
  {
    id: 3,
    name: 'Enterprise',
    price: 24999,
    duration: '1 Month',
    description: 'For large-scale operations',
    features: [
      'Unlimited Salesman',
      'Unlimited Products',
      'Unlimited Distributors',
      'Custom Reports',
      '24/7 Support',
    ],
  },
];

// API response se plans ki array safely nikalo
const normalizePlans = (response) => {
  if (response?.error) {
    throw new Error(
      response.error.message || 'Unable to fetch subscription plans'
    );
  }

  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.plans)) {
    return response.plans;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.data?.plans)) {
    return response.data.plans;
  }

  if (Array.isArray(response?.data?.data)) {
    return response.data.data;
  }

  throw new Error('Unexpected plans API response format');
};

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const { setSelectedPlan } = useRegistration();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchPlans = async () => {
      try {
        const response = await getPlans();
        const validPlans = normalizePlans(response);

        if (validPlans.length === 0) {
          throw new Error('No subscription plans returned by API');
        }

        if (isMounted) {
          setPlans(validPlans);
          setLoadError('');
        }
      } catch (error) {
        console.error('Error fetching plans:', error);

        if (isMounted) {
          // Fallback plans sirf display ke liye hain.
          // Production checkout ke prices backend se verify hone chahiye.
          setPlans(FALLBACK_PLANS);
          setLoadError(
            'Live plans load nahi hue. Abhi default plans dikhaye ja rahe hain.'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPlans();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectPlan = (plan) => {
    if (!plan || plan.id == null) {
      console.error('Invalid subscription plan:', plan);
      return;
    }

    setSelectedPlan(plan);
    navigate('/register-company');
  };

  if (loading) {
    return (
      <div
        style={{
          backgroundColor: '#0f172a',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        Loading Plans...
      </div>
    );
  }

  return (
    <div
      style={{
        background:
          'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        minHeight: '100vh',
        width: '100%',
        padding: '40px 20px',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
          boxSizing: 'border-box',
        }}
      >
        {/* Header and Branding */}
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <h1
            style={{
              color: '#38bdf8',
              fontSize: '48px',
              fontWeight: '900',
              margin: 0,
              letterSpacing: '-1px',
              lineHeight: 1,
            }}
          >
            UDAAN
          </h1>

          <p
            style={{
              color: '#94a3b8',
              fontSize: '13px',
              fontWeight: '800',
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              margin: '10px 0 16px',
            }}
          >
            FAST TRACK
          </p>

          <h2
            style={{
              color: '#ffffff',
              fontSize: '26px',
              fontWeight: '800',
              margin: '0 0 10px',
            }}
          >
            Choose Your Subscription Plan
          </h2>

          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
            Select the best plan tailored for your FMCG business growth.
          </p>
        </div>

        {/* API fallback warning */}
        {loadError && (
          <p
            role="status"
            style={{
              color: '#fbbf24',
              textAlign: 'center',
              fontSize: '13px',
              marginBottom: '20px',
            }}
          >
            {loadError}
          </p>
        )}

        {/* Subscription Plans */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'stretch',
            gap: '24px',
          }}
        >
          {plans.map((plan, index) => (
            <PlanCard
              key={plan.id ?? `plan-${index}`}
              plan={plan}
              onSelect={() => handleSelectPlan(plan)}
            />
          ))}
        </div>

        {/* Security Footer */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '35px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#94a3b8',
            fontSize: '13px',
          }}
        >
          🔒 Secure payment • 7-day money back guarantee
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;