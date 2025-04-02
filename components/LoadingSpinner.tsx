// components/LoadingSpinner.tsx
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = '#3498db' 
}) => {
  // Determine the width/height based on size
  const dimensions = {
    small: '24px',
    medium: '40px',
    large: '64px'
  };
  
  const spinnerSize = dimensions[size];
  
  return (
    <div 
      style={{
        display: 'inline-block',
        position: 'relative',
        width: spinnerSize,
        height: spinnerSize
      }}
    >
      {[...Array(12)].map((_, index) => {
        const rotateStyle = {
          transform: `rotate(${index * 30}deg)`,
          animationDelay: `${-1.1 + (index / 12)}s`
        };
        
        return (
          <div 
            key={index}
            style={{
              transformOrigin: '50% 100%',
              position: 'absolute',
              top: '0',
              left: '50%',
              width: '2px',
              height: '30%',
              backgroundColor: color,
              borderRadius: '1px',
              animation: 'spinner-fade 1.2s linear infinite',
              ...rotateStyle
            }}
          />
        );
      })}
      <style jsx>{`
        @keyframes spinner-fade {
          0%, 39%, 100% { opacity: 0.25; }
          40% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;