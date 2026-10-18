import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RegistrationProvider } from './context/RegistrationContext';
import LandingPage from './pages/LandingPage';
import SubscriptionPlans from './pages/SubscriptionPlans';
import RegisterCompany from './pages/RegisterCompany';
import Checkout from './pages/Checkout';
import SetupPassword from './pages/SetupPassword';
import PaymentResult from './pages/PaymentResult';
import RegistrationSuccess from './pages/RegistrationSuccess';

function App() {
  return (
    <RegistrationProvider>
      <Router>
        <div className="app-container">
          <Routes>
            {/* Step 1: Pehle Landing Page khulega */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Step 2: Choose Subscription Plan page */}
            <Route path="/plans" element={<SubscriptionPlans />} />
            
            {/* Step 3: Company Details form */}
            <Route path="/register-company" element={<RegisterCompany />} />
            
            {/* Step 4: Checkout & Payment Gateway */}
            <Route path="/checkout" element={<Checkout />} />
            
            {/* Step 5: Password Setup Page (After Payment) */}
            <Route path="/setup-password" element={<SetupPassword />} />
            
            <Route path="/payment-result" element={<PaymentResult />} />
            <Route path="/success" element={<RegistrationSuccess />} />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </RegistrationProvider>
  );
}

export default App;