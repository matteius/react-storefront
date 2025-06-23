'use client';

import React, { useEffect } from 'react';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { GoogleAnalytics, consent } from 'nextjs-google-analytics';

export default function GoogleAnalyticsWrapper() {
  const { consent: cookieConsent, isLoaded } = useCookieConsent();

  // Set default consent state (denied by default for GDPR compliance)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      consent({
        arg: 'default',
        params: {
          ad_storage: 'denied',
          analytics_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          wait_for_update: 500
        },
      });
    }
  }, []);

  // Update Google Analytics consent when cookie consent changes
  useEffect(() => {
    if (isLoaded && cookieConsent !== null) {
      const consentValue = cookieConsent ? 'granted' : 'denied';
      
      consent({
        arg: 'update',
        params: {
          ad_storage: consentValue,
          analytics_storage: consentValue,
          ad_user_data: consentValue,
          ad_personalization: consentValue
        },
      });
    }
  }, [cookieConsent, isLoaded]);

  // Always render GoogleAnalytics component, but consent will control actual tracking
  return <GoogleAnalytics trackPageViews />;
}
