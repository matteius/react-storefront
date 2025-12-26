import { registerOTel } from '@vercel/otel';

export function register() {
  // Only register OpenTelemetry in production or when explicitly enabled
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const serviceName = process.env.OTEL_SERVICE_NAME || 'mattscoinage-storefront';

    registerOTel({
      serviceName,
    });

    console.log(`[OpenTelemetry] Initialized for ${serviceName}`);
  }
}

