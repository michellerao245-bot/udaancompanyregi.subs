import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RegistrationProvider } from './context/RegistrationContext';
import SubscriptionPlans from './pages/SubscriptionPlans';
import RegisterCompany from './pages/RegisterCompany';
import Checkout from './pages/Checkout';
import PaymentResult from './pages/PaymentResult';
import RegistrationSuccess from './pages/RegistrationSuccess';

function App() {
  return (
    <RegistrationProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<SubscriptionPlans />} />
            <Route path="/register-company" element={<RegisterCompany />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment-result" element={<PaymentResult />} />
            <Route path="/success" element={<RegistrationSuccess />} />
          </Routes>
        </div>
      </Router>
    </RegistrationProvider>
  );
}

export default App;