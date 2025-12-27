/**
 * Next.js Instrumentation file
 *
 * This file is loaded early in the Next.js lifecycle and is used to initialize
 * the Elastic APM agent for performance monitoring and error tracking.
 *
 * The agent sends data to our Elastic APM server for centralized observability.
 */

export async function register() {
  // Only register in Node.js runtime (not Edge runtime)
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Check if Elastic APM is enabled
    const apmEnabled = process.env.ELASTIC_APM_ENABLED === 'true';

    if (apmEnabled) {
      // Dynamically import elastic-apm-node to avoid issues with Edge runtime
      const apm = await import('elastic-apm-node');

      // Start the APM agent with configuration from environment variables
      apm.default.start({
        // Service identification
        serviceName: process.env.ELASTIC_APM_SERVICE_NAME || 'mattscoinage-storefront',
        environment: process.env.ELASTIC_APM_ENVIRONMENT || 'production',

        // APM Server connection
        serverUrl: process.env.ELASTIC_APM_SERVER_URL || 'http://localhost:8200',
        secretToken: process.env.ELASTIC_APM_SECRET_TOKEN || '',

        // Performance settings
        captureBody: 'errors', // Only capture request body for errors
        captureHeaders: true,

        // Logging configuration
        logLevel: (process.env.ELASTIC_APM_LOG_LEVEL as 'trace' | 'debug' | 'info' | 'warning' | 'error' | 'critical' | 'off') || 'info',

        // Next.js specific settings
        frameworkName: 'next.js',
        frameworkVersion: process.env.npm_package_dependencies_next || '15.x',

        // Sampling - adjust based on traffic volume
        transactionSampleRate: parseFloat(process.env.ELASTIC_APM_TRANSACTION_SAMPLE_RATE || '1.0'),
      });

      console.log(`[Elastic APM] Agent initialized for ${process.env.ELASTIC_APM_SERVICE_NAME || 'mattscoinage-storefront'}`);
    } else {
      console.log('[Elastic APM] Agent disabled (ELASTIC_APM_ENABLED !== true)');
    }
  }
}
