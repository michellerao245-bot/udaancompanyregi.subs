import React, { createContext, useContext, useState } from 'react';  // ✅ React add karo
const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [companyData, setCompanyData] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <RegistrationContext.Provider value={{ companyData, setCompanyData, selectedPlan, setSelectedPlan }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => useContext(RegistrationContext);