import React from 'react';

// Har plan ke liye alag vibrant color themes
const CARD_THEMES = {
  1: {
    // Basic Plan: Blue Theme
    headerBg: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    cardBg: '#eff6ff',
    borderColor: '#93c5fd',
    btnBg: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    icon: '🚀',
  },

  2: {
    // Growth Plan: Green/Emerald Theme
    headerBg: 'linear-gradient(135deg, #059669, #047857)',
    cardBg: '#ecfdf5',
    borderColor: '#6ee7b7',
    btnBg: 'linear-gradient(135deg, #059669, #047857)',
    icon: '📈',
  },

  3: {
    // Enterprise Plan: Purple Theme
    headerBg: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
    cardBg: '#f5f3ff',
    borderColor: '#c4b5fd',
    btnBg: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
    icon: '👑',
  },
};

const PlanCard = ({ plan, onSelect }) => {
  // Fallback theme if plan ID is missing or unknown
  const theme = CARD_THEMES[plan?.id] || CARD_THEMES[1];

  // Ensure features is always treated as an array
  const features = Array.isArray(plan?.features)
    ? plan.features
    : [];

  // Safely handle missing plan details
  const planName = plan?.name || 'Subscription Plan';
  const planPrice = plan?.price ?? 0;
  const planDuration = plan?.duration || 'month';
  const planDescription = plan?.description;

  return (
    <div
      style={{
        backgroundColor: theme.cardBg,
        border: `2px solid ${theme.borderColor}`,
        borderRadius: '20px',
        width: '300px',
        maxWidth: '100%',
        overflow: 'hidden',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: '10px',
        transition: 'transform 0.2s ease-in-out',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Header with Gradient Background */}
      <div
        style={{
          background: theme.headerBg,
          color: '#ffffff',
          padding: '24px',
          position: 'relative',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            fontSize: '30px',
          }}
          aria-hidden="true"
        >
          {theme.icon}
        </span>

        <h3
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            margin: '0 35px 8px 0',
            textTransform: 'uppercase',
          }}
        >
          {planName}
        </h3>

        <div
          style={{
            fontSize: '32px',
            fontWeight: '900',
          }}
        >
          ₹{planPrice}{' '}
          <span
            style={{
              fontSize: '14px',
              fontWeight: 'normal',
              opacity: 0.8,
            }}
          >
            / {planDuration}
          </span>
        </div>

        {planDescription && (
          <p
            style={{
              fontSize: '12px',
              margin: '8px 0 0 0',
              opacity: 0.9,
            }}
          >
            {planDescription}
          </p>
        )}
      </div>

      {/* Card Features Body */}
      <div
        style={{
          padding: '24px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {features.length > 0 && (
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 20px 0',
            }}
          >
            {features.map((feature, idx) => (
              <li
                key={`${idx}-${String(feature)}`}
                style={{
                  fontSize: '13px',
                  color: '#334155',
                  fontWeight: '600',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  overflowWrap: 'anywhere',
                }}
              >
                <span
                  style={{
                    color: '#16a34a',
                    fontWeight: 'bold',
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  ✓
                </span>

                <span>{String(feature)}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Action Button */}
        <button
          type="button"
          onClick={() => {
            if (typeof onSelect === 'function') {
              onSelect(plan);
            }
          }}
          style={{
            background: theme.btnBg,
            color: '#ffffff',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '12px',
            fontWeight: 'bold',
            fontSize: '14px',
            cursor: 'pointer',
            width: '100%',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Select {planName} →
        </button>
      </div>
    </div>
  );
};

export default PlanCard;