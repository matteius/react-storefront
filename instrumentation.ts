import { registerOTel } from '@vercel/otel';

export function register() {
  // Only register OpenTelemetry in production or when explicitly enabled
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const serviceName = process.env.OTEL_SERVICE_NAME || 'mattscoinage-storefront';
    const endpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'https://apm.opensensor.io/v1/traces';
    
    registerOTel({
      serviceName,
      traceExporter: 'otlp-http',
      instrumentations: [
        // Auto-instrumentation for common libraries
        {
          '@opentelemetry/instrumentation-http': {},
          '@opentelemetry/instrumentation-fetch': {},
          '@opentelemetry/instrumentation-graphql': {},
        },
      ],
    });

    console.log(`[OpenTelemetry] Initialized for ${serviceName}`);
    console.log(`[OpenTelemetry] Exporting to ${endpoint}`);
  }
}

