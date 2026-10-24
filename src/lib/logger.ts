/**
 * Structured Logger with ECS (Elastic Common Schema) Format
 * 
 * This logger uses Pino with ECS formatting to ensure logs are compatible
 * with Elasticsearch and can be correlated with APM traces.
 * 
 * Usage:
 *   import { logger } from '@/lib/logger';
 *   logger.info('User logged in', { userId: '123' });
 *   logger.error('Payment failed', { error: err, orderId: 'abc' });
 */

import pino, { type Logger } from 'pino';

// Check if we're in a Node.js environment
const isNode = typeof process !== 'undefined' && process.versions?.node;

// ECS format configuration for Elasticsearch compatibility
const ecsFormat = isNode ? (() => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const ecsModule = require('@elastic/ecs-pino-format');
    return ecsModule.default || ecsModule;
  } catch {
    return null;
  }
})() : null;

// Base configuration
const baseConfig: pino.LoggerOptions = {
  level: process.env.LOG_LEVEL || 'info',
  
  // Add service identification
  base: {
    service: {
      name: process.env.ELASTIC_APM_SERVICE_NAME || 'mattscoinage-storefront',
      environment: process.env.ELASTIC_APM_ENVIRONMENT || process.env.NODE_ENV || 'development',
    },
    ...(process.env.HOSTNAME && { host: { name: process.env.HOSTNAME } }),
  },
  
  // Timestamp in ISO format for Elasticsearch
  timestamp: pino.stdTimeFunctions.isoTime,
};

// Merge ECS format if available (adds trace correlation and ECS field formatting)
const config: pino.LoggerOptions = ecsFormat 
  ? { ...baseConfig, ...ecsFormat() }
  : baseConfig;

// Create the logger instance
export const logger: Logger = pino(config);

// Export typed child logger factory for module-specific logging
export const createLogger = (moduleName: string): Logger => {
  return logger.child({ module: moduleName });
};

// Convenience exports for common logging patterns
export const logError = (message: string, error: Error, context?: Record<string, unknown>): void => {
  logger.error({
    err: error,
    ...context,
  }, message);
};

export const logRequest = (
  method: string,
  url: string,
  statusCode: number,
  duration: number,
  context?: Record<string, unknown>
): void => {
  logger.info({
    http: {
      request: { method },
      response: { status_code: statusCode },
    },
    url: { path: url },
    event: { duration: duration * 1000000 }, // Convert ms to nanoseconds for ECS
    ...context,
  }, `${method} ${url} ${statusCode} ${duration}ms`);
};

export default logger;

