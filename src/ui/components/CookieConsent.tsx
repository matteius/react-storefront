'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCookieConsent } from '@/contexts/CookieConsentContext';

export function CookieConsent() {
  const { consent, setConsent, isLoaded } = useCookieConsent();
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Check if we need to show the banner once the context is loaded
  useEffect(() => {
    if (isLoaded && consent === null) {
      setShowBanner(true);
      // Add a small delay for smooth animation
      setTimeout(() => setIsVisible(true), 100);
    } else if (consent !== null) {
      setShowBanner(false);
      setIsVisible(false);
    }
  }, [isLoaded, consent]);

  const handleConsent = () => {
    setConsent(true);
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  const handleDecline = () => {
    setConsent(false);
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  // Don't render anything until the context is loaded to prevent hydration mismatch
  if (!isLoaded || !showBanner) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
      role="banner"
      aria-label="Cookie consent banner"
    >
      {/* Backdrop blur effect */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      
      {/* Main banner content */}
      <div className="relative bg-white/95 backdrop-blur-md border-t border-gray-200/50 shadow-2xl">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            {/* Content section */}
            <div className="flex items-start gap-3 flex-1">
              {/* Cookie icon */}
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              
              {/* Text content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  We value your privacy
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We use cookies to enhance your experience and analyze site usage. 
                  <Link 
                    href="/privacy-policy" 
                    className="text-blue-600 hover:text-blue-700 underline ml-1 font-medium"
                  >
                    Learn more
                  </Link>
                </p>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={handleDecline}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                aria-label="Decline cookies"
              >
                Decline
              </button>
              <button
                onClick={handleConsent}
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                aria-label="Accept cookies"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
