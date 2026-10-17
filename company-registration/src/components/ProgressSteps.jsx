import React from 'react';

const ProgressSteps = ({ currentStep }) => {
  const steps = ['Select Plan', 'Company Details', 'Payment'];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px 0', gap: '20px' }}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <React.Fragment key={step}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: isCompleted ? '#22c55e' : isActive ? '#38bdf8' : '#e2e8f0',
                color: isActive || isCompleted ? '#fff' : '#64748b',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                {isCompleted ? '✓' : stepNumber}
              </div>
              <span style={{ 
                fontSize: '14px', 
                fontWeight: isActive ? 'bold' : 'normal',
                color: isActive ? '#0f172a' : '#64748b'
              }}>
                {step}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div style={{ width: '40px', height: '2px', backgroundColor: isCompleted ? '#22c55e' : '#e2e8f0' }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProgressSteps;