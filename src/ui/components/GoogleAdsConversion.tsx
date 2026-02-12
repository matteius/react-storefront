'use client';

import { useEffect, useRef } from 'react';

interface GoogleAdsConversionProps {
  orderId: string;
  orderTotal: number;
  currency: string;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Google Ads Conversion Tracking Component
 * Fires a purchase conversion event when mounted on the order confirmation page
 *
 * Conversion ID: AW-17834401497
 * Conversion Label: CG4fCL-vy_cbENm9jbhC (Purchase conversion)
 */
export function GoogleAdsConversion({ orderId, orderTotal, currency }: GoogleAdsConversionProps) {
  const hasFired = useRef(false);

  useEffect(() => {
    // Prevent duplicate conversion fires
    if (hasFired.current) {
      return;
    }

    // Wait for gtag to be available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-17834401497/CG4fCL-vy_cbENm9jbhC',
        value: orderTotal,
        currency: currency,
        transaction_id: orderId,
      });

      hasFired.current = true;
      console.log('[Google Ads] Purchase conversion tracked:', {
        orderId,
        orderTotal,
        currency,
      });
    } else {
      // If gtag isn't ready yet, wait a bit and try again
      const checkGtag = setInterval(() => {
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'conversion', {
            send_to: 'AW-17834401497/CG4fCL-vy_cbENm9jbhC',
            value: orderTotal,
            currency: currency,
            transaction_id: orderId,
          });
          
          hasFired.current = true;
          console.log('[Google Ads] Purchase conversion tracked (delayed):', {
            orderId,
            orderTotal,
            currency,
          });
          clearInterval(checkGtag);
        }
      }, 100);

      // Clean up after 5 seconds if gtag never loads
      setTimeout(() => clearInterval(checkGtag), 5000);

      return () => clearInterval(checkGtag);
    }
  }, [orderId, orderTotal, currency]);

  // This component doesn't render anything visible
  return null;
}

