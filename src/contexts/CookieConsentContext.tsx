'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface CookieConsentContextType {
  consent: boolean | null;
  setConsent: (consent: boolean | null) => void;
  isLoaded: boolean;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
}

interface CookieConsentProviderProps {
  children: ReactNode;
}

export function CookieConsentProvider({ children }: CookieConsentProviderProps) {
  const [consent, setConsentState] = useState<boolean | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      try {
        const savedConsent = localStorage.getItem('cookieConsent');
        if (savedConsent !== null) {
          const parsedConsent = JSON.parse(savedConsent) as boolean;
          setConsentState(parsedConsent);
        }
      } catch (error) {
        console.error('Error reading cookie consent from localStorage:', error);
        // If there's an error parsing, reset to null
        setConsentState(null);
        // Clear the corrupted data
        try {
          localStorage.removeItem('cookieConsent');
        } catch (clearError) {
          console.error('Error clearing corrupted cookie consent:', clearError);
        }
      } finally {
        setIsLoaded(true);
      }
    }
  }, []);

  const setConsent = useCallback((newConsent: boolean | null) => {
    setConsentState(newConsent);
    // Only save to localStorage on the client side
    if (typeof window !== 'undefined') {
      try {
        if (newConsent !== null) {
          localStorage.setItem('cookieConsent', JSON.stringify(newConsent));
        } else {
          localStorage.removeItem('cookieConsent');
        }
      } catch (error) {
        console.error('Error saving cookie consent to localStorage:', error);
      }
    }
  }, []);

  const value = {
    consent,
    setConsent,
    isLoaded
  };

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}
