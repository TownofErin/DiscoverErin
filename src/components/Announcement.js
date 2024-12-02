import React, { useState, useEffect } from 'react';

const Announcement = ({ 
  message,
  bgColor = 'bg-green-600',
  textColor = 'text-white',
  storageKey = 'announcement-closed',
  persistClosed = false
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isRendered, setIsRendered] = useState(true);

  useEffect(() => {
    if (persistClosed) {
      const isClosed = localStorage.getItem(storageKey) === 'true';
      if (isClosed) {
        setIsVisible(false);
        setIsRendered(false);
      }
    }
  }, [storageKey, persistClosed]);

  const handleClose = () => {
    setIsVisible(false);
    if (persistClosed) {
      localStorage.setItem(storageKey, 'true');
    }
    setTimeout(() => {
      setIsRendered(false);
    }, 300);
  };

  if (!isRendered) return null;

  return (
    <div 
      className={`
        ${bgColor} ${textColor}
        transition-all duration-300 ease-in-out overflow-hidden
        ${isVisible ? 'h-[42px]' : 'h-0'}
      `}
    >
      <div className="h-[42px] max-w-[1280px] mx-auto px-4 relative flex items-center justify-center">
        <p className="text-center text-sm font-medium pr-8">
          {message}
        </p>
        <button
          onClick={handleClose}
          className={`
            absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors
            hover:bg-black/10
          `}
          aria-label="Close announcement"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Announcement;
