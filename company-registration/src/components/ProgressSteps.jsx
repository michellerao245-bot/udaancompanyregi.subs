import React from 'react';

const STEPS = ['Select Plan', 'Company Details', 'Payment'];

const ProgressSteps = ({ currentStep }) => {
  const parsedStep = Number(currentStep);

  const activeStep = Number.isFinite(parsedStep)
    ? Math.min(Math.max(Math.trunc(parsedStep), 1), STEPS.length)
    : 1;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        margin: '30px 0',
        gap: '12px',
      }}
    >
      {STEPS.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === activeStep;
        const isCompleted = stepNumber < activeStep;

        return (
          <React.Fragment key={step}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  flexShrink: 0,
                  borderRadius: '50%',
                  backgroundColor: isCompleted
                    ? '#22c55e'
                    : isActive
                    ? '#38bdf8'
                    : '#e2e8f0',
                  color:
                    isActive || isCompleted ? '#ffffff' : '#64748b',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontWeight: 'bold',
                  fontSize: '14px',
                }}
                aria-current={isActive ? 'step' : undefined}
              >
                {isCompleted ? '✓' : stepNumber}
              </div>

              <span
                style={{
                  fontSize: '14px',
                  fontWeight: isActive ? 'bold' : 'normal',
                  color: isActive ? '#0f172a' : '#64748b',
                }}
              >
                {step}
              </span>
            </div>

            {index < STEPS.length - 1 && (
              <div
                style={{
                  width: '40px',
                  height: '2px',
                  backgroundColor: isCompleted
                    ? '#22c55e'
                    : '#e2e8f0',
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProgressSteps;