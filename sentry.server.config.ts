// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const DEFAULT_SENTRY_SERVER_ENVIRONMENT = 'local';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  enabled: process.env.SENTRY_ENVIRONMENT === 'production' || process.env.SENTRY_ENVIRONMENT === 'integration',
  environment: process.env.SENTRY_ENVIRONMENT || DEFAULT_SENTRY_SERVER_ENVIRONMENT,
  // Adjust this value in production, or use tracesSampler for greater control
  release: `${process.env.npm_package_name}@${process.env.npm_package_version}`,
  tracesSampleRate: 1.0,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
